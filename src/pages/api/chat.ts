import type { APIRoute } from "astro";
import systemPromptRaw from "../../lib/system-prompt.md?raw";
import humanizationSkill from "../../lib/humanization-skill.md?raw";
import ecosystemContextRaw from "../../lib/CONTEXT.json?raw";

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
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = (await request.json()) as {
      messages?: { role: string; content: string }[];
    };
    const userMessages = body.messages || [];

    if (userMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma mensagem enviada." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const fullSystemPrompt = [
      systemPromptRaw.trim(),
      humanizationSkill.trim(),
      `--- ECOSYSTEM CONTEXT ---\n${ecosystemContextRaw.trim()}\n--- END CONTEXT ---`,
      `INSTRUÇÕES ADICIONAIS DA BOLHA (EMBED WIDGET):
Você está atendendo o visitante diretamente no widget flutuante da Landing Page sdr.neoflowoff.agency.
Seja conciso, natural, focado em qualificar o lead (Nome e WhatsApp) e demonstrar como o NEØ Growth System elimina o gargalo comercial dele.`,
    ].join("\n\n");

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
            role: m.role === "agent" || m.role === "assistant" ? "assistant" : "user",
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
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = (await response.json()) as any;
    const reply =
      data.choices?.[0]?.message?.content ??
      "Olá! Como posso ajudar na sua operação comercial hoje?";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Erro interno no servidor do widget.",
        message: error?.message || String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
