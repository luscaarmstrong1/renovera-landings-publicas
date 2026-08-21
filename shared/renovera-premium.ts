function makeScrollTopButton() {
  if (document.querySelector(".rv-scroll-top")) return;
  const button = document.createElement("button");
  button.className = "rv-scroll-top";
  button.type = "button";
  button.setAttribute("aria-label", "Voltar ao topo");
  button.title = "Voltar ao topo";
  button.innerHTML = '<svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/><path d="M12 21V9"/></svg>';
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.append(button);
}

function normalizeWhatsAppButton(attempt = 0) {
  const float = document.querySelector<HTMLAnchorElement>(".whatsapp-float");
  if (!float && attempt < 20) {
    window.setTimeout(() => normalizeWhatsAppButton(attempt + 1), 50);
    return;
  }
  const existing = float
    ?? Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href*='wa.me'], a[href*='whatsapp']")).at(-1);
  const link = existing ?? document.createElement("a");
  if (!existing) {
    link.href = "https://wa.me/5519996514827";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Falar com a Renovera no WhatsApp");
    link.innerHTML = '<svg aria-hidden="true" width="27" height="27" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18.2h-.1c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C1.9 6.4 6.4 2 12 2c2.7 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 .9 4.1.8.7-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z"/></svg>';
    link.className = "whatsapp-float";
    document.body.append(link);
  }
  link.classList.add("rv-whatsapp-premium");
}

function initPremiumLayer() {
  if (typeof window === "undefined") return;
  makeScrollTopButton();
  normalizeWhatsAppButton();
  const progress = document.createElement("div");
  progress.className = "rv-page-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);

  const sections = Array.from(document.querySelectorAll("main > section, .section, .card, .service-card, .timeline-item, .faq-item"));
  sections.forEach((section, index) => {
    if (!section.classList.contains("rv-reveal")) {
      section.classList.add("rv-reveal");
      const delay = index % 4;
      if (delay) section.setAttribute("data-rv-delay", String(delay));
    }
  });

  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
  sections.forEach((section) => reveal.observe(section));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    document.querySelector(".rv-scroll-top")?.classList.toggle("is-visible", window.scrollY > 560);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => window.setTimeout(initPremiumLayer, 0), { once: true });
else window.setTimeout(initPremiumLayer, 0);
