<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# PRÓXIMOS PASSOS OPERACIONAIS (NEXT STEPS)

```text
========================================
     NEO-LANDING-SDR · NEXT STEPS
========================================
Status: ACTIVE
Foco: TRAÇÃO, DEPLOY & INTEGRAÇÃO CAPI
========================================
```

## ⟠ Visão Geral

Este documento detalha a cadência de execução sequencial para levar a landing page `neo-landing-sdr` do estado de compilação local para a produção na borda (Cloudflare Pages), conectando-a ao fluxo de captura do Agente SDR e ao motor de webhooks (`neo-growth-system`).

────────────────────────────────────────

## ◈ Fase 1 — Validação Estática e Build na Borda (Local)

Antes do deploy, garantir que o bundle estático/edge do Astro 5 compila sem regressões ou avisos de tipagem.

* [x] **1.1. Verificação Estática:** Executar `make check` (`astro check`) para validar tipagem TypeScript e integridade de componentes `.astro`.
* [x] **1.2. Compilação de Produção:** Executar `make build` (`astro build`) para gerar o artefato otimizado em `dist/` compatível com `@astrojs/cloudflare`.
* [x] **1.3. Pré-visualização de Borda:** Executar `make preview` e verificar tempo de carregamento local e responsividade dos CTAs.

────────────────────────────────────────

## ◈ Fase 1.5 — Alinhamento Canônico da Paleta de Cores (Proporcional)

Aplicar a paleta de cores canônica NEØ com rigor nas proporções visuais antes de publicar na borda:

* [x] **1.5.1. Ajuste de Tokens CSS (`:root`):** Configurar no `index.astro` e componentes os tokens oficiais:
  * `#000000` (**~50% da proporção visual**): Fundo principal e superfícies escuras profundas.
  * `#DEDDD3` (**~40% da proporção visual**): Superfícies de alto contraste, seções claras de apoio e tipografia principal.
  * `#EDFF00` (**~8% da proporção visual**): Cor primária de tração para botões, CTAs, tags e destaques neon.
  * `#FF7A05` (**~2% da proporção visual**): Linhas divisórias de alta precisão, bordas ativas e micro-detalhes.
  * `#1B1E00` (**Pílulas e Cards Oliva**): Superfícies neutras escuras para badges, pílulas e headers sobre áreas claras.
* [x] **1.5.2. Verificação Visual:** Rodar novo build e checar a harmonia proporcional da paleta.

────────────────────────────────────────

## ◈ Fase 1.6 — Glassmorphism & Profundidade Ótica (Modern UI)

Aplicar efeitos de vidro fosco (`backdrop-filter: blur`), bordas translúcidas interativas e reflexos de luz (`inset box-shadow`) em componentes de alta atenção, conferindo acabamento estético de ponta sem dependências externas ou perda de performance no Edge:

* [x] **1.6.1. ChatBubble Flutuante:** Transformar a pílula de chat fixa no canto inferior direito em um painel de vidro translúcido (`backdrop-filter: blur(20px) saturate(180%)`) com borda neon suave (`rgba(237, 255, 0, 0.25)`), permitindo transparecer o conteúdo durante a rolagem.
* [x] **1.6.2. Painel HUD de Demonstração (`.signal-panel`):** Converter o console interativo do Hero em uma interface HUD de vidro escuro (`rgba(16, 18, 16, 0.72)` + `blur(24px)`) com bordas especulares reflexivas (`inset 0 1px 1px rgba(255, 255, 255, 0.12)`).
* [x] **1.6.3. Cartões do Fluxo e Demonstração (`.flow-card`, `.demo-action`):** Aplicar fundo translúcido acetinado com transição de hover dinâmico (`translateY(-3px)` + `box-shadow` luminescente em `#EDFF00`).
* [x] **1.6.4. Header Acetinado:** Refinar a barra superior fixa com saturação acentuada (`saturate(160%)`) e borda inferior translúcida para criar um borrão elegante ao sobrepor as seções claras (`#DEDDD3`).

────────────────────────────────────────

## ◈ Fase 2 — Deploy no Cloudflare Pages

* [x] **2.1. Conexão do Repositório:** Configurar projeto no Cloudflare Pages apontando para o repositório `NEO-FlowOFF/neo-landing-sdr` (ou realizar deploy via terminal com `pnpm dlx wrangler pages deploy dist`).
* [x] **2.2. Variáveis de Ambiente e Cache:** Validar headers de cache na borda e garantir que variáveis de ambiente (se necessárias para analytics ou CAPI front) estejam injetadas.
* [x] **2.3. Domínio de Produção:** Apontar domínio canônico de apresentação comercial e verificar certificado SSL na borda.

────────────────────────────────────────

## ◈ Fase 3 — Conexão com o Motor de Tração (`neo-growth-system`)

Conforme `docs/SDR_Agent_Roadmap.md`, a página é a superfície de contato; a conversão acontece no chat e no backend.

* [ ] **3.1. Webhook de Ingestão (`neo-growth-system`):** Subir o endpoint do serviço `neo-event-ingestor` para receber chamadas da Meta (WhatsApp / Instagram Direct).
* [x] **3.2. Roteamento do Agente SDR (`sdr.neoflowoff.agency` & `chat.neoflowoff.agency`):** Conectado o prompt de qualificação comercial (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`) diretamente na rota de borda `/api/chat` com widget Glassmorphic flutuante integrado na Landing Page operando via OpenAI, além do link em tela cheia para `chat.neoflowoff.agency`.
* [ ] **3.3. Disparo Server-Side (Meta CAPI):** Configurar o envio de evento de conversão via CAPI assim que o Agente SDR capturar e qualificar o lead.

────────────────────────────────────────

## ❖ Fase 4 — Auditoria de Ponta a Ponta (E2E Lead Flow)

* [ ] **4.1. Simulação de Aquisição:** Percorrer o fluxo: Acesso à Landing Page ➔ Clique no CTA (`https://chat.neoflowoff.agency`) ➔ Interação com IA ➔ Registro do Lead no Banco/CRM.
* [ ] **4.2. Confirmação de Evento:** Verificar nos logs do `neo-growth-system` e no Gerenciador de Eventos da Meta se o CAPI registrou a conversão com match de dados de origem.
