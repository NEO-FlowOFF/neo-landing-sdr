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

O repositório `neo-landing-sdr` é a superfície pública de tração comercial, diagnóstico em tempo real e vitrine tecnológica da oferta **Operação SDR IA Plug & Play** e categoria **Agent SDR IA** do ecossistema `NEO-FlowOFF · neoflowoff.agency`.

Projetado para máxima conversão sem latência na borda, converte visitantes em leads qualificados e direciona as interações comerciais para o agente operacional **NEØ:one** em `https://chat.neoflowoff.agency`.

────────────────────────────────────────

## ◈ Especificação Tecnológica e Setup (`SETUP.md`)

* **Setup e Arquitetura Canônica:** Consulte sempre o **[SETUP.md](./SETUP.md)** para instruções completas de instalação, comandos de terminal (`Makefile`) e protocolo de acoplamento de borda (`_worker.js`).
* **Framework Core:** Astro 5 (`^5.12.0`) + Cloudflare Edge Adapter (`@astrojs/cloudflare` em modo `static` híbrido via `prerender = false`)
* **Gerenciador de Pacotes:** `pnpm` (`make install`)
* **Ambiente de Hospedagem:** Cloudflare Pages (com `dist/client/_worker.js` acoplado via `make build`)
* **Motor Cognitivo do SDR:** OpenAI API (`OPENAI_API_KEY`) no Edge via rota `/api/chat` operando com os prompts de qualificação do **NEØ:one** (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`)

────────────────────────────────────────

## ❖ Contratos Operacionais e de Design System

1. **Roteamento Comercial Duplo (Bolha + Fullscreen):**
   * A Landing Page embarca o widget interativo flutuante (`ChatBubble.astro`) processando atendimento na página em `/api/chat`.
   * Todos os CTAs principais direcionam para a experiência dedicada em tela cheia do **NEØ:one** em `https://chat.neoflowoff.agency`.
2. **Paleta Canônica Proporcional:**
   * `#000000` (~50%): Fundo e superfícies escuras profundas.
   * `#DEDDD3` (~40%): Superfícies claras de alto contraste e tipografia principal.
   * `#EDFF00` (~8%): Cor primária de tração para botões, CTAs, tags e destaques neon (Acid Green).
   * `#FF7A05` (~2%): Linhas divisórias de alta precisão e bordas ativas.
   * `#1B1E00` (Olive): Pílulas e cards neutros escuras sobre áreas claras.
   * **Títulos `.kicker`**: Operam com opacidade (`opacity: 0.4`) e transição para `opacity: 1` no hover.
3. **Diagrama Arquitetural (`InfrastructureMap.astro` & `InfrastructureNode.astro`):**
   * Nó central com case exato **`NEØ:one`**, rotulado como `AGENT SDR IA` com telemetria `ORCHESTRATION: ACTIVE`.
4. **Roteamento Canônico Multi-Rotas e Oferta (`/oferta`):**
   * A página inicial (`/`) foca em tração, calculadora de ROAS e diagnóstico. A Seção 06 reside em `src/pages/oferta.astro` (`/oferta`), estruturada como gráfico de Gantt de 14 dias (`GanttDeployment.astro`) com Concierge Executiva.
   * Rotas de governança (`/privacidade`, `/termos`, `/tratamento-dados`) complementam a conformidade LGPD.
5. **Componentes Vetoriais e Assinatura no DevTools:**
   * `AgentNodeIcon.astro`: Nó vetorial limpo em `currentColor` com detalhe em `#EDFF00`.
   * `TractionPipeline.astro`: Linha pontilhada (`stroke-dasharray="4 4"`) de separação.
   * `console-signature.ts`: Acoplado ao `Layout.astro`, exibe no DevTools (`F12`) a assinatura do arquiteto (`"Code is law. I can see u"`), aviso Anti Self-XSS e hook de telemetria.
6. **Blindagem Mobile (`Safe-Area & Overflow Protection`):**
   * Metatag canônica: `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`.
   * `overflow-x: hidden` e `max-width: 100%` em `html`, `body` e `.page-shell` para bloqueio de deslocamento horizontal.
   * Paddings móveis reativos em `env(safe-area-inset-left/right/bottom)` para proteção contra *notches*, Dynamic Island e barras de gestos.

────────────────────────────────────────

## ⬡ Estrutura de Diretórios

* `SETUP.md` — Documentação técnica canônica de arquitetura, build e comandos (`Makefile`).
* `src/pages/` — Páginas renderizadas via Astro e rotas de API (`src/pages/api/chat.ts`).
* `src/components/` — Componentes reutilizáveis de interface, vitrine tecnológica, mapa vetorial e widget de atendimento (`ChatBubble.astro`).
* `src/lib/` — Base de conhecimento e prompts do Agente SDR (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`).
* `src/layouts/` — Layouts estruturais base do site.
* `docs/assets/` — Diagramas, banners SVG institucionais (`neo-landing-sdr-banner.svg`) e documentação técnica.
