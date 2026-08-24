export const RENOVERA_CONTACT = {
  whatsapp: "5519996514827",
  email: "contato@renovera.com.br",
  privacyUrl: "https://renovera.com.br/lgpd.html"
} as const;

export const RENOVERA_HOME = "https://renovera.com.br/";

export const RENOVERA_SOLUTIONS = [
  { label: "Energia Solar", href: "https://renovera.com.br/solar/" },
  { label: "Renovera Charge", href: "https://renovera.com.br/eletroposto/" },
  { label: "Regulatória", href: "https://renovera.com.br/design/" },
  { label: "Projetos Elétricos", href: "https://renovera.com.br/consultoria/" },
  { label: "Renô Compartilha", href: "https://renovera.com.br/compartilha/" },
  { label: "Renô Gestão", href: "https://renovera.com.br/gestao/" }
] as const;

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid"
] as const;

export function getAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ATTRIBUTION_KEYS.flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value]] : [];
    })
  );
}

export function trackEvent(
  event: string,
  context: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  const payload = { event, ...context, ...getAttribution() };
  window.dispatchEvent(new CustomEvent("renovera:event", { detail: payload }));
  const dataLayer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(payload);
}

export function buildWhatsappUrl(message: string, whatsapp = RENOVERA_CONTACT.whatsapp) {
  const attribution = getAttribution();
  const campaign = Object.entries(attribution)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
  const suffix = campaign ? `\n\nOrigem da visita: ${campaign}` : "";
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`${message}${suffix}`)}`;
}
