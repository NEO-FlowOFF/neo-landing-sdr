<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# PROJECT CONTEXT

```text
========================================
     NEO-LANDING-SDR · CONTEXT
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Contexto do Negócio e Tração (V1)

O `neo-landing-sdr` é a vitrine tecnológica e página de captura comercial para a oferta **Operação SDR IA Plug & Play** e categoria **Agent SDR IA** da **neoflowoff.agency**.

Sua missão não é apenas apresentar informações estáticas, mas provar imediatamente o valor da nossa tecnologia conversacional com o agente operacional **NEØ:one** e direcionar leads qualificados para o handoff humano e diagnóstico comercial.

────────────────────────────────────────

## ◈ Topologia de Integração

1. **Superfície de Captura (`neo-landing-sdr` & `sdr.neoflowoff.agency`):**
   * Apresenta calculadora de ROAS, economia de CPA e vitrine dos diferenciais da infraestrutura autônoma.
   * Embarca o componente Glassmorphic flutuante (`ChatBubble.astro`), que processa as interações comerciais diretamente na borda via rota `/api/chat` conectada à OpenAI (`OPENAI_API_KEY`).
   * A rota do Edge consome os arquivos de governança conversacional do agente **NEØ:one** em `src/lib/` (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`) via imports estáticos `?raw`.
2. **Superfície de Conversão Fullscreen (`neoflowoff-chat-ui`):**
   * Todos os CTAs e botões principais de aquisição direcionam o visitante para a experiência dedicada em tela cheia do **NEØ:one** em `https://chat.neoflowoff.agency`.
3. **Motor Inclusivo de Eventos (`neo-growth-system`):**
   * Conecta conversões ao CAPI da Meta para otimização contínua das campanhas.

────────────────────────────────────────

## ❖ Público-Alvo e Proposta de Valor

* **Público:** Diretores Comerciais, CEOs e Fundadores de Operações Digitais/SaaS que sofrem com perda de leads fora do horário comercial.
* **Proposta:** Agente SDR disponível 24/7 integrado aos canais oficiais de comunicação da empresa com resposta instantânea e qualificação orientada a dados.
