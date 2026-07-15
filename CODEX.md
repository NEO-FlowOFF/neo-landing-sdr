<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# PROJECT CODEX

```text
========================================
       NEO-LANDING-SDR · CODEX
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Visão Geral do Projeto

O repositório `neo-landing-sdr` é a superfície pública de captura e vitrine tecnológica comercial da oferta **Operação SDR IA Plug & Play** e categoria **Agent SDR IA** do ecossistema `NEO-FlowOFF`.

Foi projetado para operar sem latência, convertendo visitantes em leads qualificados e direcionando todas as interações comerciais para o agente operacional **NEØ:one** em `https://chat.neoflowoff.agency`.

────────────────────────────────────────

## ◈ Especificação Tecnológica

* **Framework Core:** Astro 5 (`^5.12.0`)
* **Edge Adapter:** `@astrojs/cloudflare` (`^14.1.3` em modo `static` híbrido)
* **Gerenciador de Pacotes:** `npm` / `pnpm`
* **Ambiente de Hospedagem:** Cloudflare Pages
* **Motor Cognitivo do SDR:** OpenAI API (`OPENAI_API_KEY`) no Edge via rota `/api/chat` operando com a persona e governança do **NEØ:one**

────────────────────────────────────────

## ❖ Contratos Operacionais e de Tração (V1)

1. **Roteamento Comercial Duplo (Bolha + Fullscreen):**
   * A Landing Page embarca o widget interativo flutuante (`ChatBubble.astro`), que processa o atendimento na própria página usando o endpoint de borda `/api/chat`.
   * Todos os botões de ação principal (CTAs na página) direcionam para a experiência dedicada em tela cheia em `https://chat.neoflowoff.agency`.
2. **Integração de Eventos CAPI:**
   * Eventos de conversão e rastreamento são coordenados com o control plane `neo-growth-system`.
3. **Design System Minimalista:**
   * Fundo escuro matte (`#09131A`), tipografia geométrica e contrastes de alta visibilidade (Cyan `#6EE7F9` / Acid Green `#D7FF64`).

────────────────────────────────────────

## ⬡ Estrutura de Diretórios

* `src/pages/` — Páginas renderizadas via Astro e rotas de API (`src/pages/api/chat.ts`).
* `src/components/` — Componentes reutilizáveis de interface, vitrine tecnológica e widget de atendimento (`ChatBubble.astro`).
* `src/lib/` — Base de conhecimento, prompts do Agente SDR (`system-prompt.md`, `humanization-skill.md`) e contexto de negócios (`CONTEXT.json`).
* `src/layouts/` — Layouts estruturais base do site.
* `docs/assets/` — Diagramas, banners SVG institucionais e documentação técnica.
