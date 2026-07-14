<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# STANDARD MARKDOWN STYLE

```text
========================================
     NEO-FlowOFF · MARKDOWN STYLE
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Objetivo

Garantir que todo arquivo Markdown do repositório `neo-landing-sdr` siga o mesmo sistema de escrita, composição visual e organização semântica do ecossistema NEO-FlowOFF.

────────────────────────────────────────

## ⨷ Regras de Formatação

### 1. Cabeçalho Inicial

Quando o documento for principal, estrutural ou indexador, comece com:

```md
<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
```

Na sequência, abra com um bloco `text` usando banner visual com título centralizado:

```text
========================================
          PROJECT NAME · SECTION
========================================
```

### 2. Separadores Visuais

Entre blocos principais, use sempre esta linha isolada:

```text
────────────────────────────────────────
```

### 3. Símbolos, Bullet Points e Títulos

Use títulos Markdown de nível 2 (`##`) com um símbolo geométrico puro (Unicode) e nome curto.
**Nunca utilize emojis sistêmicos coloridos.**

Padrão de cabeçalho:

* `## ⟠ Visão Geral`
* `## ◈ Arquitetura`
* `## ❖ Regras e Diretrizes`
* `## ⬡ Fluxos Operacionais`

────────────────────────────────────────

## ◈ Linhas em Branco Obrigatórias

* Sempre deixe uma linha em branco após qualquer título (`#`, `##`, `###`).
* Sempre deixe uma linha em branco antes e depois de blocos de código ou tabelas.
* Mantenha espaçamento consistente entre itens estruturados.
