<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# PRÓXIMOS PASSOS OPERACIONAIS (NEXT STEPS)

```text
========================================
     NEO-LANDING-SDR · NEXT STEPS
========================================
Status: ACTIVE
Version: v1.1.1
Foco: TRAÇÃO, REFATORAÇÃO & INTEGRAÇÃO CAPI
========================================
```

## ⟠ Visão Geral

Este documento detalha o mapa de execução sequencial e operacional da vitrine **neo-landing-sdr**. Ele consolida as fases concluídas de build estático/híbrido e design system, define a refatoração prioritária da seção de impacto executivo (`03 / IMPACTO`) e da adaptação mobile do diagrama vetorial, e mapeia todas as pendências técnicas de integração de borda (`Cloudflare Pages`), persistência de leads e rastreamento server-side (`Meta CAPI`).

────────────────────────────────────────

## ◈ Fase 1 — Validação Estática e Build na Borda (Concluída)

* [x] **1.1. Verificação Estática (`make check`):** Tipagem TypeScript e integridade dos componentes `.astro` verificadas sem erros ou avisos.
* [x] **1.2. Compilação de Produção (`make build`):** Gerado bundle otimizado com acoplamento canônico automático de `dist/server` dentro de `dist/client/_worker.js` via `Makefile`.
* [x] **1.3. Pré-visualização e Responsividade (`make preview`):** Validação de comportamento do layout em resoluções desktop e mobile.

────────────────────────────────────────

## ◈ Fase 1.5 — Alinhamento Canônico da Paleta Proporcional (Concluída)

* [x] **1.5.1. Tokens Canônicos CSS (`:root`):** Configuração da paleta sob proporção de contraste arquitetural:
  * `#000000` (~50%): Fundo principal e superfícies escuras profundas.
  * `#DEDDD3` (~40%): Superfícies de alto contraste e seções claras (`.light-section`).
  * `#EDFF00` (~8%): Cor primária de tração para botões, CTAs, tags e destaques neon (Acid Green).
  * `#FF7A05` (~2%): Linhas divisórias de alta precisão e bordas ativas (Orange).
  * `#1B1E00` (Olive): Pílulas e cards neutros escuras sobre áreas claras.
* [x] **1.5.2. Governança de Títulos `.kicker`:** Aplicado `opacity: 0.4` com transição para `opacity: 1` no hover em todos os cabeçalhos de seção.

────────────────────────────────────────

## ◈ Fase 1.6 — Glassmorphism & Profundidade Ótica (Concluída)

* [x] **1.6.1. ChatBubble Flutuante:** Conversão em painel de vidro translúcido (`backdrop-filter: blur(20px) saturate(180%)`) operando na rota `/api/chat`.
* [x] **1.6.2. Painel HUD (`.signal-panel`):** Acabamento especular reflexivo (`inset box-shadow`) com bordas translúcidas no Hero.
* [x] **1.6.3. Cartões de Fluxo (`.flow-card`):** Fundo acetinado com transição dinâmica (`translateY(-3px)` e realce luminiscente em `#EDFF00`).
* [x] **1.6.4. Header e Footer Acetinados:** Sobreposição translúcida com saturação acentuada ao rolar pelas seções claras.

────────────────────────────────────────

## ◈ Fase 1.7 — Refatoração e Evolução Executiva da Seção `03 / IMPACTO` (Prioridade)

Evoluir a seção de impacto operacional (`index.astro:L18` e `L11`) para que elimine a percepção de blocos de texto estáticos e demonstre valor quantitativo imediato, reforçando autoridade perante diretores comerciais e CEOs:

* [x] **1.7.1. Estruturação de Métricas Tangíveis (`index.astro:L11`):** Substituir o array simples de títulos por cards enriquecidos com indicadores numéricos de tração:
  * Card 01 (`-68% Tempo de Resposta`): Eliminação do tempo de espera fora do horário comercial, atendendo o lead no pico exato de interesse.
  * Card 02 (`+3.4x Qualificação de Intenção`): Coleta estruturada de nome, cargo, dor e histórico de conversação antes do handoff.
  * Card 03 (`100% Rastreabilidade Comercial`): Integração total de dados de origem entre captura, CRM e Meta CAPI sem perda de sinais.
* [x] **1.7.2. Acabamento Ótico de Alta Profundidade (`.benefit-grid` em `index.astro:L775`):**
  * Refatorar o card em fundo `#DEDDD3` acetinado (`rgba(222, 221, 211, 0.85)`) com bordas interativas que reagem ao hover com reflexo em `#FF7A05` (Laranja) e `#EDFF00` (Acid Green).
  * Aplicar micro-animação de elevação (`translateY(-4px)`) e sombra difusa para destaque visual na rolagem.
* [x] **1.7.3. Hierarquia de Informação:** Destacar os indicadores quantitativos como pílulas monoespaçadas de tração (`.mono code-accent`), mantendo a leitura clara e acionável.

────────────────────────────────────────

## ◈ Fase 1.8 — Revisão do Código e Adaptação Responsiva do Diagrama Vetorial Mobile (Prioridade)

Auditar e refatorar a arquitetura e renderização do diagrama de infraestrutura (`InfrastructureMap.astro` e `infrastructure-map.css`) na versão móvel, garantindo experiência visual perfeita em resoluções compactas (< 768px e < 480px):

* [x] **1.8.1. Auditoria e Refatoração da Topologia Mobile (`InfrastructureMap.astro`):**
  * Revisar a estrutura de nós, espaçamento vertical e alinhamento em telas móveis, garantindo que a sequência canônica (`ORIGEM / CANAL` ➔ `NEØ:one` ➔ `proof of intention (POI)` ➔ `CAPTURA DE CONTATO` ➔ `QUALIFICAÇÃO` ➔ `CRM / DADOS` ➔ `ATENDIMENTO HUMANO` ➔ `COMERCIAL + CONVERSÃO` ➔ `CAMADA DE SINAIS / META CAPI`) permaneça 100% legível, sem sobreposição de textos, truncamento ou transbordamento lateral (`overflow-x`).
* [x] **1.8.2. Ajuste de Escala e Geometria dos Caminhos SVG (`#mobile-paths` / viewBox):**
  * Calibrar as coordenadas SVG verticais, curvas de ramificação do `proof of intention (POI)` e o posicionamento dos pinos luminosos de entrada (`.node-entry-pin.status-dot`), assegurando que as linhas de conexão alcancem milimetricamente a borda superior de cada card nas resoluções mobile.
* [x] **1.8.3. Otimização CSS e Ergonomia Touch (`infrastructure-map.css`):**
  * Calibrar fontes, padding dos cards (`.infra-node`) e o espaçamento vertical para smartphones, preservando a fluidez estética do Glassmorphic sem comprometer a usabilidade ao tocar ou rolar a tela.

────────────────────────────────────────

## ◈ Fase 2 — Deploy no Cloudflare Pages (Concluída)

* [x] **2.1. Publicação Inicial (`wrangler pages deploy dist/client`):** Projeto submetido e homologado no Cloudflare Pages (`neo-landing-sdr-8q7.pages.dev`).
* [x] **2.2. Execução Edge Worker (`_worker.js`):** Rota de API e funções de borda ativadas sem erros de resolução de chunks.

────────────────────────────────────────

## ◈ Fase 3 — Conexão com Motor de Tração, Persistência e Segredos (Pendente / Próximo Passo)

Para que a vitrine converta leads reais e opere com governança completa no ambiente canônico:

* [x] **3.1. Injeção de Segredos no Cloudflare (`OPENAI_API_KEY`):** Cadastrar a chave `OPENAI_API_KEY` `OPENAI_MODEL=gpt-5.6-terra` no painel do Cloudflare Pages (`Settings > Environment variables > Production & Preview`) para que o `ChatBubble.astro` (`/api/chat`) execute o motor cognitivo do **NEØ:one** em produção.
* [ ] **3.2. Persistência e Handoff de Leads (`neo-event-ingestor` / Cloudflare D1 / KV):**
  * Modificar a rota de borda `/api/chat.ts` para que, ao identificar intenção qualificada (nome, telefone/WhatsApp e dor do cliente), os dados sejam persistidos em banco de borda (`Cloudflare D1` ou `KV`) ou disparados via webhook HTTP POST para o control plane (`neo-growth-system` / CRM / n8n).
* [ ] **3.3. Rastreamento Client-Side (Meta Pixel + Roteamento Duplo):**
  * Verificar e testar o acionamento de eventos no clique dos CTAs em tela cheia (`https://chat.neoflowoff.agency`), emitindo o evento de `Lead` ou `Contact` com `event_id` determinístico (`lib/session-handler.ts`).
* [ ] **3.4. Disparo Server-Side via Conversion API (`Meta CAPI`):**
  * Plugar o envio do evento de conversão server-side direto do worker no momento exato da qualificação no chat, imunizando a operação contra bloqueadores de anúncios (AdBlock / Safari ITP).

────────────────────────────────────────

## ◈ Fase 4 — Auditoria de SEO, Domínio Canônico e Performance (Pendente)

* [ ] **4.1. Configuração de Domínio Canônico e SSL:** Apontar o domínio comercial definitivo (ex: `sdr.neoflowoff.agency` ou rota em `neoflowoff.agency`) no Cloudflare Pages com redirecionamento canônico HTTPS e sem rotas duplicadas.
* [ ] **4.2. Meta Tags e Social Graph (`src/components/SEO.astro`):** Confirmar se as tags OpenGraph (`og:title`, `og:description`, `og:image`) apontam para as imagens vetoriais finais em `docs/assets/` e URLs de produção, garantindo preview perfeito ao compartilhar no WhatsApp, LinkedIn e Slack.
* [ ] **4.3. Auditoria Core Web Vitals (LCP / INP / CLS):** Testar performance em redes móveis 4G no Lighthouse/PageSpeed, garantindo:
  * **Largest Contentful Paint (LCP):** < 1.2s
  * **Interaction to Next Paint (INP):** < 100ms
  * **Cumulative Layout Shift (CLS):** 0.00

────────────────────────────────────────

## ❖ Fase 5 — Simulação E2E e Homologação Comercial (DoD Final)

* [ ] **5.1. Simulação Real de Aquisição (E2E Lead Flow):**
  1. Acesso à Landing Page no celular e no desktop.
  2. Abertura do `ChatBubble.astro` e teste de conversação com **NEØ:one**.
  3. Clique nos CTAs de tela cheia rumo a `https://chat.neoflowoff.agency`.
  4. Validação da recepção do lead qualificado no banco de dados / CRM comercial da agência.
* [ ] **5.2. Conciliação de Eventos Meta (Pixel + CAPI):** Validar no Gerenciador de Eventos da Meta se o rastreamento duplo está efetuando a deduplicação exata pelo parâmetro `event_id` / `fbp` / `fbc`.
