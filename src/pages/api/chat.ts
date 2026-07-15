import ecosystemContext from "@/lib/CONTEXT.json";
import humanizationSkill from "@/lib/humanization-skill.md?raw";
import systemPrompt from "@/lib/system-prompt.md?raw";
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
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = (await request.json()) as {
      messages?: { role: string; content: string }[];
      session?: {
        session_id?: string;
        utms?: Record<string, string>;
        _fbp?: string | null;
        _fbc?: string | null;
        landing_url?: string;
      };
    };
    const userMessages = body.messages || [];
    const session = body.session || {};

    if (userMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma mensagem enviada." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Identificar se há captura de contato nas mensagens do usuário (WhatsApp/Email/Nome)
    const lastUserMsg = userMessages[userMessages.length - 1]?.content || "";
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
      };
      console.log(
        "[NEO-SDR-CAPTURE] Lead de contato identificado na conversa:",
        JSON.stringify(leadEvent),
      );

      // Persistência em KV de borda se disponível no ambiente Cloudflare
      const kv =
        (locals as any)?.runtime?.env?.SDR_LEADS ||
        (locals as any)?.runtime?.env?.KV_SDR;
      if (kv && typeof kv.put === "function") {
        try {
          await kv.put(
            `lead:${leadEvent.session_id}:${Date.now()}`,
            JSON.stringify(leadEvent),
          );
          console.log(
            "[NEO-SDR-CAPTURE] Lead gravado no Cloudflare KV com sucesso.",
          );
        } catch (e) {
          console.error("[NEO-SDR-CAPTURE] Erro ao gravar lead no KV:", e);
        }
      }
    }

    const sessionContextStr = session.session_id
      ? `\n--- DADOS DE SESSÃO E ORIGEM DO LEAD ---
Session ID: ${session.session_id}
UTMs: ${JSON.stringify(session.utms || {})}
FBP/FBC: ${session._fbp || "N/A"} / ${session._fbc || "N/A"}
Landing URL: ${session.landing_url || "N/A"}
----------------------------------------`
      : "";

    const fullSystemPrompt = [
      systemPrompt.trim(),
      humanizationSkill.trim(),
      `--- ECOSYSTEM CONTEXT ---\n${JSON.stringify(ecosystemContext, null, 2)}\n--- END CONTEXT ---`,
      sessionContextStr,
      `INSTRUÇÕES ADICIONAIS DA BOLHA (EMBED WIDGET):
Você está atendendo o visitante diretamente no widget flutuante da Landing Page sdr.neoflowoff.agency.
Seja conciso, natural, focado em qualificar o lead (Nome e WhatsApp) e mostrar na prática como a Operação SDR IA elimina o gargalo comercial dele.
Sempre conduza o lead para o handoff humano ou para o diagnóstico completo em https://chat.neoflowoff.agency.`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const model =
      import.meta.env.OPENAI_MODEL ||
      (locals as any)?.runtime?.env?.OPENAI_MODEL ||
      process.env.OPENAI_MODEL ||
      "gpt-4o-mini";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: fullSystemPrompt },
          ...userMessages.map((m) => ({
            role:
              m.role === "agent" || m.role === "assistant"
                ? "assistant"
                : "user",
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({
          error: "Erro na resposta do provedor OpenAI.",
          details: errText,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = (await response.json()) as any;
    const reply =
      data.choices?.[0]?.message?.content ??
      "Olá! Como posso ajudar na sua operação comercial hoje?";

    return new Response(
      JSON.stringify({ reply, session_id: session.session_id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Erro interno no servidor do widget.",
        message: error?.message || String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
