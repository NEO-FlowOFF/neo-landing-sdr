<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# OPERAÇÃO SDR IA PLUG & PLAY

```text
========================================
     NEO-LANDING-SDR · CONTROL PLANE
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

![neo-landing-sdr banner](./docs/assets/neo-landing-sdr-banner.svg)

## ⟠ Visão Geral

O repositório **neo-landing-sdr** é a superfície pública de tração comercial, diagnóstico operacional em tempo real e vitrine arquitetural da oferta **Operação SDR IA Plug & Play** e da categoria **Agent SDR IA** da [neoflowoff.agency](https://neoflowoff.agency).

Projetada para máxima conversão e autoridade técnica sem enquadramentos de protótipo, a página atua como primeiro ponto de contato na Operação Tração (V1), qualificando visitantes através de diferenciais operacionais e encaminhando o lead para fechamento no agente de conversão autônomo **NEØ:one**.

────────────────────────────────────────

## ◈ Proposta Operacional e Superfícies Canônicas

A operação conecta três camadas centrais no ecossistema comercial através de uma topologia multi-rotas na borda:

1. **Superfície de Captura, Diagnóstico e Oferta (`neo-landing-sdr`):**
   * **Página de Tração (`/`):** Apresenta calculadora de ROAS, economia operacional de CPA, cards de impacto quantitativo e diagrama vetorial em tempo real da arquitetura em 10 estágios.
   * **Página de Oferta (`/oferta`):** Seção dedicada à apresentação do cronograma de implantação em 14 dias (`GanttDeployment.astro`), Concierge Executiva, checklist canônico e ícone de Inteligência e Orquestração (`AgentNodeIcon.astro`).
   * **Governança e Conformidade (`/privacidade`, `/termos`, `/tratamento-dados`):** Rotas institucionais e de conformidade LGPD.
   * **Atendimento na Borda (`ChatBubble.astro`):** Widget flutuante Glassmorphic com blur e saturação que atende na própria página consultando `/api/chat`.
2. **Superfície de Conversão e Fechamento:**
   * O contato comercial primário direciona o lead para o WhatsApp oficial em `https://wa.me/5562994789032`.
   * A experiência fullscreen do **NEØ:one** em `https://chat.neoflowoff.agency` pode existir como rota secundária, especialmente no rodapé.
3. **Persistência, Segurança e Telemetria (`neo-growth-system`):**
   * **Console Signature & Security (`src/lib/console-signature.ts`):** Assinatura executiva do arquiteto, alerta anti-engenharia social (Anti Self-XSS) e hook de telemetria visível no DevTools (`F12`).
   * **Blindagem Mobile:** Suporte nativo a *notches* e Dynamic Island (`viewport-fit=cover`), trava anti-deslocamento horizontal (`overflow-x: hidden`) e paddings reativos via `env(safe-area-inset-*)`.
   * **Governança Crawler:** Arquivos `robots.txt`, `sitemap.xml` e `manifest.json` com permissão para IAs de busca e bloqueio de rotas de API.

────────────────────────────────────────

## ❖ Guia de Setup e Documentação Técnica

Para instalação, comandos de terminal (`make install` com aprovação automática de builds `pnpm approve-builds`), especificação arquitetural (Astro 5 + Cloudflare Edge Runtime) e protocolo de acoplamento do worker em borda (`_worker.js`), consulte a documentação dedicada:

* **[SETUP.md](./SETUP.md)** — Guia completo de instalação, comandos (`Makefile`) e arquitetura técnica.

────────────────────────────────────────

## ⬡ Governança e Instruções para Agentes IA

Todo o desenvolvimento no repositório obedece a regras estritas de engenharia de operação sênior e governança visual:

* **Regras para Agentes IA:** [AGENTS.md](./AGENTS.md)
* **Especificação do Codex:** [CODEX.md](./CODEX.md)
* **Contexto Arquitetural e de Negócio:** [CONTEXT.md](./CONTEXT.md)
* **Guia de Estilo Markdown:** [MARKDOWN_STYLE_GUIDE.md](./MARKDOWN_STYLE_GUIDE.md)
* **Especificação de Banners SVG:** [SVG.md](./SVG.md)
