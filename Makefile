# ========================================
# NEO-LANDING-SDR · CONTROL PLANE
# ========================================
# Makefile canônico padronizado conforme Makefile_neo_protocol.md
# Respeitando as particularidades de workspace isolado e acoplamento Edge Worker.

.PHONY: help check-node install dev build preview check clean audit docs verify commit repair repair-lockfile update

.DEFAULT_GOAL := help

# Constantes do Projeto
NODE_MIN_VERSION := 22.12.0

# Paleta Visual ANSI
CYAN    := \033[36m
MAGENTA := \033[35m
WHITE   := \033[1;37m
GREEN   := \033[32m
YELLOW  := \033[33m
RED     := \033[31m
DIM     := \033[2m
RESET   := \033[0m

# ========================================
#   HELP
# ========================================
help: ## Exibe o menu de comandos disponíveis
	@printf "$(CYAN)╔══════════════════════════════════════════╗$(RESET)\n"
	@printf "$(CYAN)║$(MAGENTA)▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓$(CYAN)║$(RESET)\n"
	@printf "$(CYAN)║                                          ║$(RESET)\n"
	@printf "$(CYAN)║$(RESET)       $(WHITE)NEO-FLOWOFF · NEO-LANDING-SDR$(RESET)      $(CYAN)║$(RESET)\n"
	@printf "$(CYAN)║$(RESET)       $(MAGENTA)── SDR IA Plug & Play v1.0 ──$(RESET)      $(CYAN)║$(RESET)\n"
	@printf "$(CYAN)║                                          ║$(RESET)\n"
	@printf "$(CYAN)║$(MAGENTA)▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓$(CYAN)║$(RESET)\n"
	@printf "$(CYAN)╚══════════════════════════════════════════╝$(RESET)\n"
	@printf "$(DIM) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░$(RESET)\n\n"
	@printf "$(DIM)  ·─── AMBIENTE & DEPENDÊNCIAS ───────────────$(RESET)\n"
	@grep -E '^(check-node|install|clean):.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[0;36m◆ %-16s\033[0m \033[0;90m%s\033[0m\n", $$1, $$2}'
	@printf "\n$(DIM)  ·─── DESENVOLVIMENTO & DEPLOY ──────────────$(RESET)\n"
	@grep -E '^(dev|build|preview|check):.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[0;36m◆ %-16s\033[0m \033[0;90m%s\033[0m\n", $$1, $$2}'
	@printf "\n$(DIM)  ·─── GOVERNANÇA, VERIFICAÇÃO & REPARO ──────$(RESET)\n"
	@grep -E '^(audit|docs|verify|commit|repair|repair-lockfile|update):.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[0;36m◆ %-16s\033[0m \033[0;90m%s\033[0m\n", $$1, $$2}'
	@printf "\n"

# ========================================
#   CHECK-NODE
# ========================================
check-node: ## Valida se Node.js >= 22.12.0 está instalado
	@printf "$(CYAN)◆ Verificando versão do Node.js...$(RESET)\n"
	@node -e "\
		const [major, minor, patch] = process.versions.node.split('.').map(Number); \
		const [rMaj, rMin, rPat] = '$(NODE_MIN_VERSION)'.split('.').map(Number); \
		if (major < rMaj || (major === rMaj && minor < rMin) || (major === rMaj && minor === rMin && patch < rPat)) { \
			process.stderr.write('\033[0;31m✗ Node.js ' + process.versions.node + ' não atende ao mínimo $(NODE_MIN_VERSION)\033[0m\n'); \
			process.exit(1); \
		} else { \
			process.stdout.write('\033[0;32m✓ Node.js ' + process.versions.node + ' OK\033[0m\n'); \
		}"

# ========================================
#   INSTALL
# ========================================
install: ## Instala as dependências isoladas e aprova builds (pnpm install + approve-builds)
	@printf "$(CYAN)◆ Instalando dependências (isolado da raiz)...$(RESET)\n"
	-pnpm install --ignore-workspace --config.minimum-release-age=0
	@printf "$(CYAN)◆ Aprovando scripts de build necessários (pnpm approve-builds)...$(RESET)\n"
	-pnpm approve-builds
	@printf "$(GREEN)✓ Instalação concluída.$(RESET)\n"

# ========================================
#   DEV
# ========================================
dev: ## Inicia o servidor local de desenvolvimento Astro isolado
	@printf "$(CYAN)◆ Subindo servidor local de desenvolvimento...$(RESET)\n"
	pnpm --ignore-workspace run dev

# ========================================
#   BUILD
# ========================================
build: ## Executa a compilação de produção para Cloudflare Edge isolado
	@printf "$(CYAN)◆ Compilando build para produção...$(RESET)\n"
	pnpm --ignore-workspace run build
	@if [ -d dist/server ]; then \
		rm -rf dist/client/_worker.js && mkdir -p dist/client/_worker.js; \
		cp -R dist/server/* dist/client/_worker.js/; \
		mv dist/client/_worker.js/entry.mjs dist/client/_worker.js/index.js; \
		rm -f dist/client/_worker.js/wrangler.json; \
		printf "$(GREEN)✓ Edge Worker (_worker.js + chunks) acoplado a dist/client para o Cloudflare Pages!$(RESET)\n"; \
	fi

# ========================================
#   PREVIEW
# ========================================
preview: ## Pré-visualiza o build localmente isolado
	@printf "$(CYAN)◆ Subindo preview local do build...$(RESET)\n"
	pnpm --ignore-workspace run preview

# ========================================
#   CHECK
# ========================================
check: ## Executa a verificação estática do projeto Astro isolado
	@printf "$(CYAN)◆ Verificando tipagem e integridade...$(RESET)\n"
	pnpm exec astro check

# ========================================
#   CLEAN
# ========================================
clean: ## Remove dist/, .astro/ e .wrangler/ — preserva o lockfile e node_modules
	@printf "$(YELLOW)◆ Limpando artefatos de build gerados (dist/, .astro/ e .wrangler/)...$(RESET)\n"
	rm -rf dist .astro .wrangler
	@printf "$(GREEN)✓ Limpeza concluída. lockfile preservado.$(RESET)\n"

# ========================================
#   AUDIT
# ========================================
audit: ## Varredura estrita de vulnerabilidades (pnpm audit)
	@printf "$(CYAN)◆ Auditando dependências...$(RESET)\n"
	pnpm audit
	@printf "$(GREEN)✓ Auditoria concluída.$(RESET)\n"

# ========================================
#   DOCS
# ========================================
docs: ## Valida existência de docs/, SETUP.md e AGENTS.md
	@printf "$(CYAN)◆ Validando estrutura de governança do projeto...$(RESET)\n"
	@test -d docs/ || (printf "$(RED)✗ Pasta docs/ não encontrada.$(RESET)\n" && exit 1)
	@test -f SETUP.md || (printf "$(RED)✗ Arquivo SETUP.md não encontrado.$(RESET)\n" && exit 1)
	@test -f AGENTS.md || (printf "$(RED)✗ Arquivo AGENTS.md não encontrado.$(RESET)\n" && exit 1)
	@printf "$(GREEN)✓ Estrutura de documentação e governança íntegra.$(RESET)\n"

# ========================================
#   VERIFY
# ========================================
verify: check-node audit docs check build ## Pipeline completo: check-node → audit → docs → check → build
	@printf "$(GREEN)✓ Pipeline de verificação concluído com sucesso.$(RESET)\n"

# ========================================
#   COMMIT
# ========================================
commit: verify ## Executa verify completo e abre fluxo de commit (Conventional Commits)
	@printf "$(MAGENTA)◆ Pipeline aprovado. Iniciando fluxo de commit...$(RESET)\n"
	@printf "$(YELLOW)◆ Informe a mensagem de commit (Conventional Commits):$(RESET)\n"
	@read -r msg; \
		git add -A && \
		git commit -m "$$msg" && \
		printf "$(MAGENTA)✓ Commit realizado com sucesso: $$msg$(RESET)\n"

# ========================================
#   REPAIR
# ========================================
repair: clean ## Nível 1: Remove node_modules/ e reinstala preservando o lockfile
	@printf "$(YELLOW)◆ Reparando node_modules/ (lockfile preservado)...$(RESET)\n"
	rm -rf node_modules
	-pnpm install --ignore-workspace --frozen-lockfile
	-pnpm approve-builds
	@printf "$(GREEN)✓ Reparo Nível 1 concluído.$(RESET)\n"

# ========================================
#   REPAIR-LOCKFILE
# ========================================
repair-lockfile: clean ## Nível 2: Remove node_modules/ e pnpm-lock.yaml — regeneração completa
	@printf "$(RED)◆ ATENÇÃO: Eliminando node_modules/ e pnpm-lock.yaml...$(RESET)\n"
	rm -rf node_modules pnpm-lock.yaml
	-pnpm install --ignore-workspace
	-pnpm approve-builds
	@printf "$(GREEN)✓ Reparo Nível 2 concluído. Lockfile regenerado.$(RESET)\n"

# ========================================
#   UPDATE
# ========================================
update: ## Atualiza Astro e dependências isoladas ignorando o lockfile
	@printf "$(CYAN)◆ Atualizando Astro e dependências...$(RESET)\n"
	pnpm --ignore-workspace update astro --latest
	pnpm --ignore-workspace update
	@printf "$(GREEN)✓ Dependências atualizadas. Execute make verify para validar.$(RESET)\n"
