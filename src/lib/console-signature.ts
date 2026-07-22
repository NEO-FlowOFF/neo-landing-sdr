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

  const headerTitleStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "font-weight: 700",
    "color: #000000",
    "background: #EDFF00",
    "padding: 2px 8px",
    "border-radius: 3px",
  ].join(";");

  const headerBodyStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "font-weight: 600",
    "color: #EDFF00",
    "line-height: 1.35",
  ].join(";");

  const badgeStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 10px",
    "font-weight: 700",
    "color: #000000",
    "background: #FF7A05",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";");

  const warningStyle = [
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "font-size: 12px",
    "font-weight: 600",
    "color: #FF7A05",
    "line-height: 1.4",
  ].join(";");

  const textStyle = [
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    "font-size: 11px",
    "color: #D8DCD3",
    "line-height: 1.4",
  ].join(";");

  const codeStyle = [
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "color: #EDFF00",
  ].join(";");

  setTimeout(() => {
    // 1. Assinatura Institucional & Arquitetural do Projeto
    console.log(
      `%c ▓ NEØ PROTOCOL // WE ARE NEØ AND FLOW ▓ %c\n` +
        `Architect : Neo Mello @neomello.pro\n` +
        `Protocol  : NΞØ Protocol (Code is Law)\n` +
        `Legal     : NEO FlowOFF Agency\n` +
        `"Code is law. I can see u"\n`,
      headerTitleStyle,
      headerBodyStyle,
    );

    // 2. Alerta de Segurança Anti-XSS (Self-XSS Protection)
    console.log(
      `%c▲ SECURITY ADVISORY (PROTEÇÃO DE INTEGRIDADE)%c\n` +
        `Este é um recurso do navegador voltado para desenvolvedores e arquitetos de sistemas.\n` +
        `Se alguém solicitou que você copie e cole scripts ou códigos nesta janela, %cPARE AGORA%c.\n` +
        `A execução de códigos de terceiros pode comprometer sua sessão e credenciais da operação.`,
      badgeStyle,
      textStyle,
      warningStyle,
      textStyle,
    );

    // 3. Telemetria e Convite para Arquitetura
    console.log(
      `%cNEØ:one Edge Telemetry:%c Operação ativa sob Cloudflare Pages + Edge Workers com isolamento.\n` +
        `Diagnóstico e chat: %chttps://chat.neoflowoff.agency`,
      codeStyle,
      textStyle,
      codeStyle,
    );
  }, 300);
}
