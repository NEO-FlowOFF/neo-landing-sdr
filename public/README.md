# NEØ Assets · Public Directory (`public/`)

Este diretório destina-se a **arquivos estáticos servidos diretamente na raiz do site sem processamento** pelo pipeline do Astro.

## ◈ O Que Colocar Aqui

1. **`og-image.png` / `og-image.jpg`** (`public/og-image.png`)
   * Imagem de Open Graph / Compartilhamento social (WhatsApp, LinkedIn, Instagram, X).
   * **Dimensão recomendada:** `1200x630 px` (formato PNG ou JPG, alta qualidade e peso otimizado `< 300KB`).
   * **Como é acessado:** Pela URL canônica raiz `https://[dominio]/og-image.png` (já referenciado na meta tag `<meta property="og:image" content="..." />`).

2. **`favicon.svg` / `favicon.ico`** (`public/favicon.svg` ou `public/favicon.ico`)
   * Ícone da aba do navegador.
   * **Dimensão recomendada:** Arquivo `.svg` vetorial (preferencial) ou `.ico` (`32x32 px`).
   * **Como é acessado:** Pelo navegador na URL raiz `/favicon.svg` ou `/favicon.ico`.

3. **`images/`** (`public/images/`)
   * Subdiretório opcional para armazenar logotipos ou imagens estáticas gerais (`public/images/logo.svg`, `public/images/banner.png`) que você queira referenciar por caminho estático direto via HTML (`<img src="/images/logo.svg" />`).

────────────────────────────────────────

## ◈ Como Funciona no Build (`dist/`)

Durante o comando `make build` (ou `astro build`), todos os arquivos desta pasta são copiados intactos diretamente para a raiz do diretório final de saída (`dist/`).
Exemplo:

* `public/og-image.png` ➔ `dist/og-image.png`
* `public/favicon.svg` ➔ `dist/favicon.svg`
