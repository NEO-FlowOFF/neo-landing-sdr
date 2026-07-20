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

O `neo-landing-sdr` é a vitrine tecnológica e superfície de tração comercial para a oferta **Operação SDR IA Plug & Play** e categoria **Agent SDR IA** da **neoflowoff.agency**.

Sua missão não é apenas apresentar informações estáticas ou enquadrar protótipos, mas provar imediatamente o valor da nossa tecnologia conversacional e arquitetura vetorial contínua com o agente operacional **NEØ:one**, direcionando leads qualificados para o handoff humano e diagnóstico comercial.

> [!NOTE]
> Para detalhes técnicos de instalação, comandos, build híbrido (Astro 5 + Cloudflare Edge) e acoplamento de worker (`_worker.js`), consulte o **[SETUP.md](./SETUP.md)**.

────────────────────────────────────────

## ◈ Topologia de Integração

1. **Superfície de Captura, Tração e Oferta (`neo-landing-sdr` & `sdr.neoflowoff.agency`):**
   * Apresenta calculadora de ROAS, economia de CPA e vitrine do diagrama dinâmico da infraestrutura autônoma em 10 estágios.
   * Embarca o componente Glassmorphic flutuante (`ChatBubble.astro`), que processa as interações comerciais diretamente na borda via rota `/api/chat` conectada à OpenAI (`OPENAI_API_KEY`).
   * A rota do Edge consome os arquivos de governança conversacional do agente **NEØ:one** em `src/lib/` (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`) via imports estáticos `?raw`.
   * **Oferta e Cronograma (`/oferta`):** Seção dedicada com o cronograma de 14 dias de implantação em gráfico de Gantt (`GanttDeployment.astro`), Concierge Executiva e checklist de entregáveis.
   * **Conformidade LGPD (`/privacidade`, `/termos`, `/tratamento-dados`):** Rotas institucionais e de governança de dados.
   * **Segurança e Blindagem Mobile:** Assinatura no DevTools (`console-signature.ts` com aviso Anti Self-XSS) e proteção contra overflow e *notches* (`viewport-fit=cover`, `overflow-x: hidden`, `env(safe-area-inset-*)`).
2. **Superfície de Conversão e Fechamento:**
   * O contato comercial primário direciona o visitante para o WhatsApp oficial em `https://wa.me/5562994789032`.
   * A experiência dedicada em tela cheia do **NEØ:one** em `https://chat.neoflowoff.agency` permanece como rota secundária e demonstrativa.
3. **Motor Inclusivo de Eventos e Telemetria (`neo-growth-system`):**
   * Conecta conversões e rastreamentos de intenção ao CAPI da Meta para otimização contínua das campanhas, emitindo sinais de telemetria e segurança na borda.

────────────────────────────────────────

## ❖ Público-Alvo e Proposta de Valor

* **Público:** Diretores Comerciais, CEOs e Fundadores de Operações Digitais/SaaS que sofrem com perda de leads fora do horário comercial ou lentidão de resposta.
* **Proposta:** Operação SDR IA Plug & Play disponível 24/7, integrada aos canais oficiais de comunicação da empresa com resposta instantânea e qualificação orientada a dados (`proof of intention (POI)` ➔ `QUALIFICAÇÃO` ➔ `ATENDIMENTO HUMANO`).
