# ========================================
# NEO-LANDING-SDR · CONTROL PLANE
# ========================================
# Makefile oficial conforme makefile_standards.md

.PHONY: help install dev build preview clean check

.DEFAULT_GOAL := help

# Paleta Visual
CYAN    := \033[36m
MAGENTA := \033[35m
WHITE   := \033[1;37m
GREEN   := \033[32m
YELLOW  := \033[33m
RED     := \033[31m
DIM     := \033[2m
RESET   := \033[0m

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
	@grep -E '^(install|clean):.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[0;36m◆ %-16s\033[0m \033[0;90m%s\033[0m\n", $$1, $$2}'
	@printf "\n$(DIM)  ·─── DESENVOLVIMENTO & DEPLOY ──────────────$(RESET)\n"
	@grep -E '^(dev|build|preview|check):.*## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[0;36m◆ %-16s\033[0m \033[0;90m%s\033[0m\n", $$1, $$2}'
	@printf "\n"

install: ## Instala as dependências isoladas (pnpm install --ignore-workspace)
	@printf "$(CYAN)◆ Instalando dependências (isolado da raiz)...$(RESET)\n"
	pnpm install --ignore-workspace

dev: ## Inicia o servidor local de desenvolvimento Astro isolado
	@printf "$(CYAN)◆ Subindo servidor local de desenvolvimento...$(RESET)\n"
	pnpm --ignore-workspace run dev

build: ## Executa a compilação de produção para Cloudflare Edge isolado
	@printf "$(CYAN)◆ Compilando build para produção...$(RESET)\n"
	pnpm --ignore-workspace run build

preview: ## Pré-visualiza o build localmente isolado
	@printf "$(CYAN)◆ Subindo preview local do build...$(RESET)\n"
	pnpm --ignore-workspace run preview

check: ## Executa a verificação estática do projeto Astro isolado
	@printf "$(CYAN)◆ Verificando tipagem e integridade...$(RESET)\n"
	npx astro check

clean: ## Limpa cache e arquivos de build gerados (.astro, dist, node_modules)
	@printf "$(CYAN)◆ Limpando artefatos de build e cache...$(RESET)\n"
	rm -rf dist .astro node_modules
