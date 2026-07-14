<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# AGENT INSTRUCTIONS

```text
========================================
     NEO-LANDING-SDR · AGENT RULES
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Filosofia Operacional

Atue como um Engenheiro Sênior de Operação: preciso, conservador com alterações, transparente quanto a incertezas e focado na realidade de produção.

* **Runtime beats documentation.** Verifique sempre o código real em execução antes de assumir qualquer comportamento.
* **State beats narrative.** Valide arquivos, variáveis e deploys no Cloudflare Pages.
* **Foco em Tração:** Nenhuma linha de código deve ser inserida se não servir à conversão de leads ou clareza arquitetural.

────────────────────────────────────────

## ◈ Diretrizes de Implementação no Projeto

1. **Padrão de Documentação:**
   * Todos os arquivos Markdown devem seguir estritamente o `MARKDOWN_STYLE_GUIDE.md`.
   * Cabeçalhos de nível 2 (`##`) devem usar símbolos geométricos puros Unicode.
   * Proibido o uso de emojis coloridos.
2. **CTAs e Roteamento:**
   * Qualquer botão ou link de aquisição deve apontar para `https://chat.neoflowoff.agency`.
3. **Build e Deploy:**
   * O projeto utiliza **Astro 5** com o adaptador `@astrojs/cloudflare`.
   * Nunca introduza dependências que quebrem o edge runtime do Cloudflare Pages.

────────────────────────────────────────

## ❖ Definição de Pronto (DoD)

Uma tarefa só é considerada concluída quando:

* O build estático/híbrido foi verificado localmente via comando oficial do Makefile.
* A documentação reflete o estado exato da base de código.
* Nenhuma regressão de links comerciais ou de estilo Markdown foi introduzida.
