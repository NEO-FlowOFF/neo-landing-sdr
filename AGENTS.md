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
2. **CTAs e Roteamento Comercial:**
   * **CTAs e Botões de Ação:** Todos os botões e links de aquisição em tela cheia apontam para `https://chat.neoflowoff.agency`.
   * **Atendimento na Landing Page:** O componente flutuante (`ChatBubble.astro`) processa mensagens na própria página consultando a rota de borda `/api/chat`.
3. **Build e Deploy no Cloudflare Pages:**
   * O projeto utiliza **Astro 5** com o adaptador `@astrojs/cloudflare` em modo `static` (com suporte híbrido via `export const prerender = false`).
   * **Protocolo de Acoplamento (`_worker.js`):** O `Makefile` está configurado para copiar e acoplar automaticamente todo o conteúdo de `dist/server/` para dentro de `dist/client/_worker.js/` (com `entry.mjs` renomeado para `index.js` e a pasta `chunks/` incluída).
   * **NUNCA altere ou remova a lógica de acoplamento do `Makefile`** nem introduza arquivos `wrangler.json` com `pages_build_output_dir` dentro de `dist/server`, pois isso causará regressões (erros 404 ou falhas na resolução de chunks no Cloudflare Pages).
4. **Regras de Nomenclatura e Hierarquia Comercial (Node Redactor):**
   * **Identificação do Agente:** Usar estritamente **NEØ:one** (nunca NΞØ:One, Agente demonstrador, Chatbot, Assistente virtual ou Demo de IA).
   * **Categoria Principal:** **Agent SDR IA**.
   * **Produto Comercial Contratado:** **Operação SDR IA Plug & Play** por neoflowoff.agency.
   * **Promessa Central:** **Diagnóstico e instalação rápida**.
   * **Posicionamento da Página:** Superfície ativa e real de atendimento comercial, diagnóstico da operação e verificação da arquitetura conversacional. Proibido enquadrar como "protótipo" ou apenas "demonstração".

────────────────────────────────────────

## ❖ Definição de Pronto (DoD)

Uma tarefa só é considerada concluída quando:

* O build estático/híbrido foi verificado localmente via comando oficial do Makefile.
* A documentação reflete o estado exato da base de código.
* Nenhuma regressão de links comerciais ou de estilo Markdown foi introduzida.
