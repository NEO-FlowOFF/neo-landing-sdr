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

O repositório **neo-landing-sdr** é a página pública de captura e vitrine tecnológica da oferta comercial **SDR IA Plug & Play** da [neoflowoff.agency](https://neoflowoff.agency).

Desenvolvido para máxima velocidade em borda (*edge runtime*), este projeto atua como primeiro ponto de contato na Operação Tração (V1), qualificando o visitante através da vitrine de diferenciais e encaminhando o lead para fechamento no agente de conversão.

────────────────────────────────────────

## ◈ Arquitetura e Stack

* **Core Framework:** Astro 5 (`^5.12.0`)
* **Deployment Adapter:** Cloudflare Edge (`@astrojs/cloudflare ^12.6.8`)
* **Destino Comercial (CTA):** `https://chat.neoflowoff.agency` (`neoflowoff-chat-ui`)
* **Estética Visual:** Matte Black (`#09131A`), tipografia geométrica e acentos neon Cyan (`#6EE7F9`) e Acid Green (`#D7FF64`).

────────────────────────────────────────

## ❖ Comandos e Desenvolvimento

A interface de terminal recomendada é o `Makefile` canônico do projeto:

```bash
# Exibe o menu de comandos disponíveis
make help

# Instala dependências do projeto
make install

# Inicia o servidor de desenvolvimento local
make dev

# Executa o build de produção para Cloudflare Pages
make build

# Pré-visualiza o build localmente
make preview
```

────────────────────────────────────────

## ⬡ Governança e Estilo

* **Estilo de Documentação:** Todo Markdown segue o padrão [MARKDOWN_STYLE_GUIDE.md](./MARKDOWN_STYLE_GUIDE.md).
* **Especificação Arquitetural:** Consulte [CODEX.md](./CODEX.md) e [CONTEXT.md](./CONTEXT.md).
* **Regras para Agentes IA:** Consulte [AGENTS.md](./AGENTS.md).
