/**
 * ============================================================================
 *  ▓▓▓ NEØ PROTOCOL — Client-Side Console Signature & Security Advisory ▓▓▓
 * ============================================================================
 * Architect : Neo Mello @neomello.pro
 * Protocol  : NΞØ Protocol (Code is Law)
 * Legal     : NEO FlowOFF Agency
 * ============================================================================
 */

export function initConsoleSignature(): void {
  if (typeof window === "undefined" || typeof console === "undefined") return;

  // Evita múltipla execução em re-renders ou navegação SPA
  if ((window as any).__NEO_CONSOLE_SIGNED__) return;
  (window as any).__NEO_CONSOLE_SIGNED__ = true;

  const badgeStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "font-weight: 700",
    "color: #000000",
    "background: #EDFF00",
    "padding: 3px 8px",
    "border-radius: 4px",
    "letter-spacing: 0.08em",
  ].join(";");

  const headerStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 12px",
    "font-weight: 700",
    "color: #EDFF00",
    "background: #09090B",
    "padding: 14px 18px",
    "border: 1px solid rgba(237, 255, 0, 0.4)",
    "border-radius: 6px",
    "line-height: 1.6",
  ].join(";");

  const warningStyle = [
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "font-size: 13px",
    "font-weight: 600",
    "color: #FF7A05",
    "line-height: 1.5",
  ].join(";");

  const textStyle = [
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "font-size: 12px",
    "color: #D8DCD3",
    "line-height: 1.5",
  ].join(";");

  const codeStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "color: #70FF00",
    "background: rgba(255, 255, 255, 0.06)",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";");

  setTimeout(() => {
    // 1. Assinatura Institucional & Arquitetural do Projeto
    console.log(
      `%c\n` +
        `  ========================================  \n` +
        `  ▓  NEØ PROTOCOL // WE ARE NEØ AND FLOW ▓   \n` +
        `  ========================================  \n` +
        `   Architect : Neo Mello @neomello.pro      \n` +
        `   Protocol  : NΞØ Protocol (Code is Law)   \n` +
        `   Legal     : NEO FlowOFF Agency           \n` +
        `   "Code is law. I can see u"               \n` +
        `  ========================================  \n`,
      headerStyle,
    );

    // 2. Alerta de Segurança Anti-XSS (Self-XSS Protection)
    console.log(
      `%c▲ SECURITY ADVISORY (PROTEÇÃO DE INTEGRIDADE)%c\n` +
        `Este é um recurso do navegador voltado para desenvolvedores e arquitetos de sistemas.\n` +
        `Se alguém solicitou que você copie e cole scripts, tokens ou códigos nesta janela para "ativar recursos escondidos", "hackear leads" ou resolver problemas, %cPARE AGORA%c.\n` +
        `A execução de códigos de terceiros nesta janela pode comprometer sua sessão, dados de captura e credenciais da operação.`,
      badgeStyle,
      textStyle,
      warningStyle,
      textStyle,
    );

    // 3. Telemetria e Convite para Arquitetura
    console.log(
      `%cNEØ:one Edge Telemetry:%c Operação ativa sob Cloudflare Pages + Edge Workers com isolamento e rastreabilidade Meta CAPI.\n` +
        `Inspecionando a arquitetura? Fale diretamente com o nosso nó de inteligência: %chttps://chat.neoflowoff.agency`,
      codeStyle,
      textStyle,
      codeStyle,
    );
  }, 300);
}
