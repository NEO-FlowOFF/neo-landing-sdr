/**
 * src/lib/session-handler.ts
 * Gerenciador unificado de sessão e rastreabilidade (UTMs, _fbp, _fbc, referrer, landing_url)
 * entre Landing Page (sdr.neoflowoff.agency), Widget Flutuante (/api/chat) e Tela Cheia (chat.neoflowoff.agency).
 */

export interface SdrSessionPayload {
  session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  _fbp?: string;
  _fbc?: string;
  referrer?: string;
  landing_url?: string;
  created_at: string;
}

const STORAGE_KEY = "neo_sdr_session_data";

/**
 * Obtém ou inicializa a sessão do visitante capturando parâmetros da URL, cookies da Meta (_fbp, _fbc) e referrer.
 */
export function initOrGetSession(): SdrSessionPayload {
  if (typeof window === "undefined") {
    return {
      session_id: "server_side_placeholder",
      created_at: new Date().toISOString(),
    };
  }

  let sessionData: SdrSessionPayload | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      sessionData = JSON.parse(raw);
    }
  } catch (e) {
    console.warn("[NEØ:One] Erro ao ler sessão do localStorage:", e);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : undefined;
  };

  const currentSource = urlParams.get("utm_source") || undefined;
  const currentMedium = urlParams.get("utm_medium") || undefined;
  const currentCampaign = urlParams.get("utm_campaign") || undefined;
  const currentTerm = urlParams.get("utm_term") || undefined;
  const currentContent = urlParams.get("utm_content") || undefined;
  const currentFbp = urlParams.get("_fbp") || getCookie("_fbp") || undefined;
  const currentFbc = urlParams.get("_fbc") || getCookie("_fbc") || undefined;

  const sessionId =
    sessionData?.session_id ||
    (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `neo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

  const updatedPayload: SdrSessionPayload = {
    session_id: sessionId,
    utm_source: currentSource || sessionData?.utm_source,
    utm_medium: currentMedium || sessionData?.utm_medium,
    utm_campaign: currentCampaign || sessionData?.utm_campaign,
    utm_term: currentTerm || sessionData?.utm_term,
    utm_content: currentContent || sessionData?.utm_content,
    _fbp: currentFbp || sessionData?._fbp,
    _fbc: currentFbc || sessionData?._fbc,
    referrer: sessionData?.referrer || document.referrer || undefined,
    landing_url: sessionData?.landing_url || window.location.href,
    created_at: sessionData?.created_at || new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPayload));
  } catch (e) {
    console.warn("[NEØ:One] Erro ao gravar sessão no localStorage:", e);
  }

  return updatedPayload;
}

/**
 * Anexa dados de sessão e rastreamento em links comerciais rastreáveis.
 */
export function decorateUrl(targetUrl: string): string {
  if (typeof window === "undefined") return targetUrl;
  const session = initOrGetSession();
  try {
    const url = new URL(targetUrl, window.location.origin);
    if (session.session_id) url.searchParams.set("session_id", session.session_id);
    if (session.utm_source) url.searchParams.set("utm_source", session.utm_source);
    if (session.utm_medium) url.searchParams.set("utm_medium", session.utm_medium);
    if (session.utm_campaign) url.searchParams.set("utm_campaign", session.utm_campaign);
    if (session.utm_term) url.searchParams.set("utm_term", session.utm_term);
    if (session.utm_content) url.searchParams.set("utm_content", session.utm_content);
    if (session._fbp) url.searchParams.set("_fbp", session._fbp);
    if (session._fbc) url.searchParams.set("_fbc", session._fbc);
    if (session.landing_url) url.searchParams.set("landing_url", session.landing_url);
    return url.toString();
  } catch (e) {
    return targetUrl;
  }
}

/**
 * Decora links comerciais marcados com .neo-sdr-link.
 */
export function setupClientSideSessionTracking(): void {
  if (typeof window === "undefined") return;
  initOrGetSession();

  const updateLinks = () => {
    document.querySelectorAll("a.neo-sdr-link").forEach((el) => {
      const anchor = el as HTMLAnchorElement;
      if (anchor.href) {
        anchor.href = decorateUrl(anchor.href);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateLinks);
  } else {
    updateLinks();
  }

  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest("a.neo-sdr-link") as HTMLAnchorElement | null;
    if (target && target.href) {
      target.href = decorateUrl(target.href);
    }
  });
}
