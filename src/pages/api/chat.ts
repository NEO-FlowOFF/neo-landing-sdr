import ecosystemContext from "../../lib/CONTEXT.json";
import humanizationSkill from "../../lib/humanization-skill.md?raw";
import systemPrompt from "../../lib/system-prompt.md?raw";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const apiKey =
      import.meta.env.OPENAI_API_KEY ||
      (locals as any)?.runtime?.env?.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY não configurada no servidor de borda.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    let body: {
      messages?: { role: string; content: string }[];
      session?: {
        session_id?: string;
        utms?: Record<string, string>;
        _fbp?: string | null;
        _fbc?: string | null;
        landing_url?: string;
      };
    };

    try {
      body = (await request.json()) as typeof body;
    } catch {
      return new Response(
        JSON.stringify({ error: "Payload JSON inválido." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    const rawMessages = body?.messages || [];
    const session = body?.session || {};

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma mensagem enviada." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    // Trava de payload: limita histórico a no máximo 12 mensagens e 1000 caracteres por mensagem
    const userMessages = rawMessages.slice(-12).map((m) => ({
      role: m.role === "agent" || m.role === "assistant" ? "assistant" : "user",
      content: typeof m.content === "string" ? m.content.substring(0, 1000) : "",
    }));

    // Captura de IP e Geolocalização via cabeçalhos do Cloudflare
    const cf = (request as any).cf || (locals as any)?.runtime?.cf || {};
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "desconhecido";
    const country =
      cf.country || request.headers.get("cf-ipcountry") || "desconhecido";
    const city = cf.city || "desconhecida";
    const region = cf.region || "";

    const securityContext = {
      ip,
      location: `${city}${region ? ", " + region : ""}, ${country}`,
      rayId: request.headers.get("cf-ray") || "desconhecido",
    };

    const lastUserMsg = userMessages[userMessages.length - 1]?.content || "";

    // Análise rigorosa de segurança (SQLi, XSS ou payload gigante)
    const isSuspicious =
      /drop table|<script>|select \* from|union all/i.test(lastUserMsg) ||
      lastUserMsg.length > 800;

    let kv: any = null;
    try {
      const cfEnv = (locals as any)?.cloudflare?.env;
      if (cfEnv) {
        kv = cfEnv.SDR_LEADS || cfEnv.KV_SDR;
      } else {
        kv =
          (locals as any)?.runtime?.env?.SDR_LEADS ||
          (locals as any)?.runtime?.env?.KV_SDR;
      }
    } catch (e) {
      // Ignora erro de acesso a runtime.env no Astro v6
    }

    if (isSuspicious) {
      const threatLog = {
        timestamp: new Date().toISOString(),
        securityContext,
        lastUserMsg,
      };
      if (kv && typeof kv.put === "function") {
        try {
          await kv.put(
            `security:${Date.now()}:${securityContext.rayId}`,
            JSON.stringify(threatLog),
            { expirationTtl: 604800 } // TTL 7 dias
          );
        } catch (e) {}
      } else {
        console.warn(
          "[NEO-SDR-SECURITY] Atividade suspeita bloqueada. JSON RAW:",
          JSON.stringify(threatLog),
        );
      }
      return new Response(
        JSON.stringify({ error: "Requisição bloqueada por filtro de segurança." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    // Identificar se há captura de contato nas mensagens do usuário (WhatsApp/Email)
    const hasPhone =
      /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-.\s]?\d{4}|\d{4}[-.\s]?\d{4})/i.test(
        lastUserMsg,
      );
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(
      lastUserMsg,
    );

    if (hasPhone || hasEmail) {
      const leadEvent = {
        timestamp: new Date().toISOString(),
        session_id: session.session_id || "unknown",
        contact_raw: lastUserMsg,
        utms: session.utms || {},
        _fbp: session._fbp || null,
        _fbc: session._fbc || null,
        landing_url: session.landing_url || "",
        security: securityContext,
      };
      console.log(
        "[NEO-SDR-CAPTURE] Lead de contato identificado na conversa:",
        JSON.stringify(leadEvent),
      );

      if (kv && typeof kv.put === "function") {
        try {
          await kv.put(
            `lead:${leadEvent.session_id}:${Date.now()}`,
            JSON.stringify(leadEvent),
            { expirationTtl: 2592000 } // TTL 30 dias
          );
          console.log(
            "[NEO-SDR-CAPTURE] Lead gravado no Cloudflare KV com sucesso.",
          );
        } catch (e) {
          console.error("[NEO-SDR-CAPTURE] Erro ao gravar lead no KV:", e);
        }
      }
    }

    let sessionContextStr = `\n--- DADOS DE SESSÃO E ORIGEM DO LEAD ---`;
    if (session.session_id) {
      sessionContextStr += `\nSession ID: ${session.session_id}
UTMs: ${JSON.stringify(session.utms || {})}
FBP/FBC: ${session._fbp || "N/A"} / ${session._fbc || "N/A"}
Landing URL: ${session.landing_url || "N/A"}`;
    }
    sessionContextStr += `\nLocalização Detectada: ${securityContext.location} (IP: ${securityContext.ip})\n----------------------------------------`;

    const fullSystemPrompt = [
      systemPrompt.trim(),
      humanizationSkill.trim(),
      `--- ECOSYSTEM CONTEXT ---\n${JSON.stringify(ecosystemContext, null, 2)}\n--- END CONTEXT ---`,
      sessionContextStr,
      `INSTRUÇÕES ADICIONAIS DA BOLHA (EMBED WIDGET):
Você está atendendo o visitante diretamente no widget flutuante da Landing Page sdr.neoflowoff.agency.
Seja conciso, extremamente natural e direto, como um especialista de alto nível, sem usar roteiros prontos ou parecer um bot.
Se a mensagem recebida for "[ABRIU_A_BOLHA_DE_CHAT]", sua primeira resposta deve ser um cumprimento curto, natural e que não pressione o visitante. Reconheça que ele apenas abriu o chat. NÃO faça perguntas sobre "dores", "desafios" ou "operação". Aja como um especialista humano que está presente e disponível, mas sem interromper. Algo como "Opa, boa. Se precisar de qualquer coisa, estou por aqui." funciona bem.

O seu principal objetivo é ter uma conversa natural e genuína. Antes de pensar em guiar o lead para qualquer lugar, entenda o que ele realmente disse. Responda ao contexto específico dele, não a um objetivo de vendas. Apenas se a conversa evoluir naturally para um interesse claro, você pode sugerir o handoff humano ou o diagnóstico completo em https://chat.neoflowoff.agency. A conversa vem primeiro, o handoff é uma consequência, não uma meta.`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const model =
      import.meta.env.OPENAI_MODEL ||
      (locals as any)?.runtime?.env?.OPENAI_MODEL ||
      process.env.OPENAI_MODEL;

    if (!model) {
      console.error(
        "[NEO-SDR-CHAT] Erro de configuração: OPENAI_MODEL não definida.",
      );
      return new Response(
        JSON.stringify({
          error: "Erro de configuração no servidor de borda.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    const payload = {
      model,
      instructions: fullSystemPrompt,
      input: userMessages,
      reasoning: {
        effort: "low",
      },
      text: {
        verbosity: "low",
      },
      max_output_tokens: 4000,
      store: false,
    };

    let attempt = 0;
    const maxRetries = 1;
    let finalResponse = null;
    const startTime = Date.now();

    while (attempt <= maxRetries) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 14000); // 14 segundos

      try {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const { status } = response;
          const isTransientError = [429, 500, 502, 503, 504].includes(status);

          if (isTransientError && attempt < maxRetries) {
            console.warn(
              `[NEO-SDR-CHAT] Erro transitório ${status} na OpenAI. Tentativa ${attempt + 1} de ${maxRetries}...`,
            );
            attempt++;
            await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
            continue;
          }

          console.error(
            `[NEO-SDR-CHAT] Erro na OpenAI (Status: ${status}):`,
            await response.text(),
          );
          throw new Error("Falha no provedor");
        }

        finalResponse = response;
        break;
      } catch (error: any) {
        clearTimeout(timeoutId);

        if (error.name === "AbortError") {
          console.error(
            `[NEO-SDR-CHAT] Timeout de comunicação com a OpenAI na tentativa ${attempt + 1}.`,
          );
        } else {
          console.error(
            `[NEO-SDR-CHAT] Erro de rede na comunicação com OpenAI:`,
            error,
          );
        }

        if (attempt < maxRetries) {
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
          continue;
        }
        throw new Error("Falha de comunicação persistente");
      }
    }

    if (!finalResponse) {
      throw new Error("Não foi possível obter resposta após tentativas.");
    }

    const data = (await finalResponse.json()) as any;

    const durationMs = Date.now() - startTime;
    console.log(
      `[NEO-SDR-CHAT] OpenAI call stats: status=${data.status}, model=${data.model}, total_tokens=${data.usage?.total_tokens}, duration=${durationMs}ms`,
    );

    if (data.status === "incomplete") {
      console.error(
        `[NEO-SDR-CHAT] Resposta incompleta da OpenAI. Motivo: ${data.incomplete_details?.reason}`,
      );
      if (data.incomplete_details?.reason === "max_output_tokens") {
        throw new Error("Resposta interrompida por limite de tokens.");
      }
    }

    let reply =
      "⚠️ Falha de comunicação com o servidor de IA. Poderia mandar a mensagem novamente?";

    if (data.output && Array.isArray(data.output)) {
      let parsedReply = "";
      const messageItems = data.output.filter(
        (item: any) => item.type === "message",
      );

      for (const msg of messageItems) {
        if (msg.content && Array.isArray(msg.content)) {
          const textContents = msg.content.filter(
            (c: any) => c.type === "output_text",
          );
          for (const textItem of textContents) {
            if (textItem.text) {
              parsedReply += textItem.text;
            }
          }
        }
      }
      if (parsedReply.trim().length > 0) {
        reply = parsedReply.trim();
      }
    }

    return new Response(
      JSON.stringify({ reply, session_id: session.session_id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error: any) {
    console.error("[NEO-SDR-CHAT] Erro interno no endpoint /api/chat:", error);
    return new Response(
      JSON.stringify({
        error: "Erro interno no processamento da requisição.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
};
