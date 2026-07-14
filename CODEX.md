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

O repositório `neo-landing-sdr` é a superfície pública de captura e vitrine tecnológica comercial da oferta **AI SDR Plug & Play** do ecossistema `NEO-FlowOFF`.

Foi projetado para operar sem latência, convertendo visitantes em leads qualificados e direcionando todas as interações comerciais para o Agente SDR em `https://chat.neoflowoff.agency`.

────────────────────────────────────────

## ◈ Especificação Tecnológica

* **Framework Core:** Astro 5 (`^5.12.0`)
* **Edge Adapter:** `@astrojs/cloudflare` (`^12.6.8`)
* **Gerenciador de Pacotes:** `npm` / `pnpm`
* **Ambiente de Hospedagem:** Cloudflare Pages

────────────────────────────────────────

## ❖ Contratos Operacionais e de Tração (V1)

1. **Roteamento Comercial Único:**
   * Todos os botões de ação principal (CTAs) devem direcionar para o agente conversacional em `https://chat.neoflowoff.agency`.
2. **Integração de Eventos CAPI:**
   * Eventos de conversão e rastreamento são coordenados com o control plane `neo-growth-system`.
3. **Design System Minimalista:**
   * Fundo escuro matte (`#09131A`), tipografia geométrica e contrastes de alta visibilidade (Cyan `#6EE7F9` / Acid Green `#D7FF64`).

────────────────────────────────────────

## ⬡ Estrutura de Diretórios

* `src/pages/` — Páginas estáticas/híbridas renderizadas via Astro.
* `src/components/` — Componentes reutilizáveis de interface e vitrine tecnológica.
* `src/layouts/` — Layouts estruturais base do site.
* `docs/assets/` — Diagramas, banners SVG institucionais e documentação técnica.
