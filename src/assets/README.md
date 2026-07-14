# NΞØ Assets · Component Assets (`src/assets/`)

Este diretório destina-se a **imagens e recursos importados diretamente dentro dos componentes Astro (`.astro`)** para otimização automática pelo pipeline do Astro (`astro:assets`).

## ◈ O Que Colocar Aqui

1. **Logotipos para Componentes (`src/assets/logo.svg`)**
   * Imagens ou ícones vetoriais que serão importados no frontmatter dos componentes (`Header.astro`, `Hero.astro`, `Footer.astro`).
   * Exemplo de uso em componente `.astro`:

     ```astro
     ---
     import { Image } from 'astro:assets';
     import logoNeo from '../assets/logo.svg';
     ---
     <Image src={logoNeo} alt="neoflowoff.agency" />
     ```

2. **Imagens de Seção, Mockups e Gráficos (`src/assets/images/`)**
   * Imagens de interface, ilustrações ou mockups de produto que necessitem de otimização de largura, formato (`WebP` / `AVIF`) e geração de hash no build.

────────────────────────────────────────

## ◈ Diferença entre `public/` e `src/assets/`

| Tipo de Asset | Onde Colocar | Por Que |
| :--- | :--- | :--- |
| **`og-image.png`** | **`public/og-image.png`** | Redes sociais (WhatsApp/Instagram/LinkedIn) exigem uma URL estática e fixa sem hash de build (`https://dominio.com/og-image.png`). |
| **`favicon.svg / .ico`** | **`public/favicon.svg`** | O navegador busca na raiz do site ou pela tag `<link rel="icon" href="/favicon.svg" />`. |
| **`logo.svg`** | **`public/logo.svg`** ou **`src/assets/logo.svg`** | Se usado estaticamente via `<img src="/logo.svg" />` coloque em `public/`. Se quiser que o Astro otimize e processe, coloque em `src/assets/`. |
