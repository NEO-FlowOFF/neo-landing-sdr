<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# SETUP & ARQUITETURA TÉCNICA

```text
========================================
     NEO-LANDING-SDR · SETUP & BUILD
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Visão Geral

Este documento detalha os procedimentos de instalação, comandos de desenvolvimento, especificação arquitetural e o protocolo de deploy em borda (`Cloudflare Pages`) para o projeto **neo-landing-sdr**.

────────────────────────────────────────

## ◈ Arquitetura e Stack Tecnológico

* **Core Framework:** Astro 5 (`^5.12.0`)
* **Deployment Adapter:** Cloudflare Edge (`@astrojs/cloudflare ^14.0.0` em modo `static` híbrido via `export const prerender = false`)
* **Gerenciador de Pacotes:** `pnpm` (`make install` / `pnpm install`)
* **Atendimento na Borda (Widget Flutuante):** Componente `ChatBubble.astro` consumindo a rota `/api/chat` integrada na nuvem Edge via OpenAI (`OPENAI_API_KEY`), carregando os prompts de qualificação do agente **NEØ:one** em `src/lib/` (`system-prompt.md`, `humanization-skill.md`, `CONTEXT.json`).
* **Destino Comercial Fullscreen (CTAs):** `https://chat.neoflowoff.agency` (`neoflowoff-chat-ui`)
* **Design System & Paleta Proporcional:**
  * `#000000` (~50%): Fundo principal e superfícies escuras profundas.
  * `#DEDDD3` (~40%): Superfícies de alto contraste, seções claras de apoio e tipografia principal.
  * `#EDFF00` (~8%): Cor primária de tração para botões, CTAs, tags e destaques neon (Acid Green).
  * `#FF7A05` (~2%): Linhas divisórias de alta precisão e bordas ativas (Orange).
  * `#1B1E00` (Olive): Pílulas e cards neutros escuras sobre áreas claras.

────────────────────────────────────────

## ❖ Comandos e Interface de Terminal (`Makefile`)

A interface canônica recomendada para interação com o repositório é o `Makefile` oficial:

```bash
# Exibe o menu canônico de comandos disponíveis
make help

# Instala todas as dependências via pnpm e aprova builds nativos (pnpm approve-builds)
make install

# Inicia o servidor de desenvolvimento local
make dev

# Executa a verificação estática de tipagem e integridade (.astro / .ts)
make check

# Executa o build de produção completo com acoplamento para Cloudflare Pages
make build

# Pré-visualiza localmente o build de produção
make preview
```

────────────────────────────────────────

## ⬡ Protocolo de Acoplamento do Edge Worker (`_worker.js`)

O comando `make build` (`pnpm run build`) compila o projeto gerando os arquivos estáticos na pasta `dist/client/` e as rotas dinâmicas de borda em `dist/server/`.

Para garantir a execução no **Cloudflare Pages** sem erros de configuração (`pages_build_output_dir`), erros 404 de API ou falhas na resolução de pacotes de código (`chunks`), o `Makefile` executa um protocolo de acoplamento automático:

1. Copia integralmente o conteúdo de `dist/server/` para dentro de `dist/client/_worker.js/`.
2. Renomeia o arquivo `dist/client/_worker.js/entry.mjs` para `index.js`.
3. Preserva a pasta `chunks/` e dependências no mesmo nível do worker.

### Deploy na Nuvem

Ao publicar via terminal ou pipeline canônico:

```bash
npx -y wrangler@latest pages deploy dist/client --project-name=neo-landing-sdr --branch=main
```

O Cloudflare Pages identifica a estrutura `dist/client/_worker.js/` como um **Advanced Mode Worker**, ativando instantaneamente a execução da rota `/api/chat` diretamente na borda (Edge Runtime).

> [!IMPORTANT]
> **Nunca altere ou remova a lógica de acoplamento do `Makefile`** nem introduza arquivos `wrangler.json` com `pages_build_output_dir` apontando para `dist/server`. A superfície pública de deploy deve ser sempre `dist/client` contendo o `_worker.js` acoplado.

────────────────────────────────────────

## ◈ Componentes Estruturais e Canônicos Chave

* **`src/pages/index.astro`**: Página canônica de tração comercial, calculadora de ROAS e diagnóstico operacional em tempo real.
* **`src/pages/oferta.astro`**: Página canônica da OFERTA (`/oferta`), estruturada em formato de gráfico de Gantt com o cronograma de implantação em 14 dias (`GanttDeployment.astro`), Concierge Executiva e checklist interativo.
* **`src/pages/privacidade.astro` / `termos.astro` / `tratamento-dados.astro`**: Rotas canônicas de governança jurídica e conformidade LGPD.
* **`src/components/ChatBubble.astro`**: Widget flutuante com acabamento Glassmorphic (`backdrop-filter: blur(20px)`) processando mensagens no local via `/api/chat`.
* **`src/components/infrastructure/InfrastructureMap.astro` & `InfrastructureNode.astro`**: Diagrama dinâmico vetorial de arquitetura contendo o nó central **`NEØ:one`**, fluxo vertical em 10 estágios (com `proof of intention (POI)` ➔ `CAPTURA DE CONTATO` ➔ `QUALIFICAÇÃO` conectado em curva e horizontal) e pontos de luz superiores (`.node-entry-pin.status-dot`).
* **`src/components/GanttDeployment.astro`**: Cronograma reativo de 14 dias com pílulas monoespaçadas, barras em transição e indicadores de fases.
* **`src/components/AgentNodeIcon.astro`**: Ícone canônico do Nó de Inteligência e Orquestração (`NEØ:one`) parametrizado em `currentColor` e `--acid` (`#EDFF00`).
* **`src/components/TractionPipeline.astro`**: Conector vetorial de fluxo com linha pontilhada (`stroke-dasharray="4 4"`) para transições óticas e quebra de blocos.
* **`src/components/MetaProviderBadge.astro`**: Selo de autoridade "META Tech Provider" adaptável ao tema light/dark no rodapé.
* **`src/lib/console-signature.ts`**: Assinatura institucional de console, alerta de segurança cibernética (Anti Self-XSS) e hook de telemetria no DevTools (`window.__NEO_CONSOLE_SIGNED__ = true`).
* **`src/layouts/Layout.astro` & `src/styles/global.css`**: Wrapper global e Design System contendo a metatag `viewport-fit=cover`, trava anti-deslocamento horizontal (`overflow-x: hidden`), paddings seguros mobile (`env(safe-area-inset-*)`) e injeção do `console-signature.ts`.
