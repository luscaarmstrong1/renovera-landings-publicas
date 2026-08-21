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

function initPremiumLayer() {
  if (typeof window === "undefined") return;
  makeScrollTopButton();
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
