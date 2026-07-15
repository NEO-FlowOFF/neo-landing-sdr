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
2. **Setup, Build e Arquitetura (`SETUP.md`):**
   * Consulte sempre o **`SETUP.md`** como fonte canônica da arquitetura técnica (Astro 5 + Cloudflare Edge), comandos de terminal (`Makefile`) e protocolo de acoplamento do worker (`_worker.js`).
   * **NUNCA altere ou remova a lógica de acoplamento do `Makefile`** nem introduza arquivos `wrangler.json` com `pages_build_output_dir` apontando para `dist/server`.
3. **CTAs e Roteamento Comercial:**
   * **CTAs e Botões de Ação:** Todos os botões e links de aquisição em tela cheia apontam para `https://chat.neoflowoff.agency`.
   * **Atendimento na Landing Page:** O componente flutuante (`ChatBubble.astro`) processa mensagens na própria página consultando a rota de borda `/api/chat`.
4. **Design System & Paleta Proporcional:**
   * `#000000` (~50%): Fundo principal e superfícies escuras profundas.
   * `#DEDDD3` (~40%): Superfícies de alto contraste, seções claras de apoio e tipografia principal.
   * `#EDFF00` (~8%): Cor primária de tração para botões, CTAs, tags e destaques neon (Acid Green).
   * `#FF7A05` (~2%): Linhas divisórias de alta precisão e bordas ativas (Orange).
   * `#1B1E00` (Olive): Pílulas e cards neutros escuras sobre áreas claras.
   * **Títulos `.kicker`**: Operam com opacidade (`opacity: 0.4`) e transição para `opacity: 1` no hover.
5. **Regras de Nomenclatura e Diagrama de Infraestrutura (`InfrastructureMap.astro`):**
   * **Identificação do Agente:** Usar estritamente **NEØ:one** (nunca NΞØ:One, Agente demonstrador, Chatbot, Assistente virtual ou Demo de IA).
   * **Nó Core do Diagrama:** O card principal (`isCore: true`) preserva `NEØ:one` em caixa alta/baixa exata sem `text-transform: uppercase`, rotulado como `AGENT SDR IA` com telemetria `ORCHESTRATION: ACTIVE`.
   * **Luz de Entrada (`status-dot`):** Os pontos de luz nos cards do diagrama de infraestrutura devem ser posicionados estritamente na borda superior central (`.node-entry-pin.status-dot`), no ponto exato onde as linhas de conexão chegam.
   * **Fluxo e Conexões POI:** `proof of intention (POI)` conecta-se à `CAPTURA DE CONTATO` e à `QUALIFICAÇÃO` por caminhos horizontais e arco inferior direto.

────────────────────────────────────────

## ❖ Definição de Pronto (DoD)

Uma tarefa só é considerada concluída quando:

* O build estático/híbrido foi verificado localmente via comando oficial do `Makefile` (`make build`).
* A documentação reflete o estado exato da base de código (`SETUP.md`, `README.md`, `AGENTS.md`).
* Nenhuma regressão de links comerciais ou de estilo Markdown foi introduzida.
