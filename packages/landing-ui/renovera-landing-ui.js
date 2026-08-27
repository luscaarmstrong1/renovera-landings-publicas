import "./renovera-landing-ui.css";

const WHATSAPP_PATH = "M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18.2h-.1c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C1.9 6.4 6.4 2 12 2c2.7 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 .9 4.1.8.7-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z";

const SITE_ORIGIN = "https://renovera.com.br";

const solutions = [
  ["Solar", `${SITE_ORIGIN}/solar/`],
  ["Renovera Charge", `${SITE_ORIGIN}/eletroposto/`],
  ["Renovera Regulatória", `${SITE_ORIGIN}/design/`],
  ["Projetos Elétricos", `${SITE_ORIGIN}/consultoria/`],
  ["Renô Compartilha", `${SITE_ORIGIN}/compartilha/`],
  ["Renô Gestão", `${SITE_ORIGIN}/gestao/`]
];

function actionIcon(h) {
  return h("svg", { "aria-hidden": "true", width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    h("path", { d: "M5 12h14" }),
    h("path", { d: "m13 6 6 6-6 6" })
  );
}

export function createRenoveraLandingUi({ createElement: h, useEffect, useState }) {
  function ProductHeader({ product, logoSrc, homeHref = "/", className = "site-header", contentClassName = "container", children }) {
    return h("header", { className: `renovera-product-header ${className}` },
      h("div", { className: contentClassName },
        h("a", { className: "renovera-product-brand", href: homeHref, "aria-label": "Ir para a Renovera" },
          h("img", { src: logoSrc, alt: "Renovera", width: 176, height: 48 }),
          h("span", null, product)
        ),
        children
      )
    );
  }

  function FloatingWhatsApp({ href, onClick }) {
    return h("a", {
      className: "renovera-floating-whatsapp",
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Falar com a Renovera no WhatsApp",
      onClick
    },
    h("span", { className: "renovera-floating-whatsapp__ring", "aria-hidden": "true" }),
    h("span", { className: "renovera-floating-whatsapp__ring renovera-floating-whatsapp__ring--delayed", "aria-hidden": "true" }),
    h("svg", { "aria-hidden": "true", width: 28, height: 28, viewBox: "0 0 24 24", fill: "currentColor" }, h("path", { d: WHATSAPP_PATH })));
  }

  function SiteFooter({ logoSrc, whatsappHref, privacyHref = `${SITE_ORIGIN}/lgpd.html`, termsHref, onWhatsappClick }) {
    return h("footer", { className: "renovera-site-footer" },
      h("div", { className: "renovera-site-footer__container" },
        h("div", { className: "renovera-site-footer__grid" },
          h("div", { className: "renovera-site-footer__brand" },
            h("img", { src: logoSrc, alt: "Renovera", width: 176, height: 48 }),
            h("p", null, "Engenharia, energia e inteligência para projetos que exigem segurança técnica, eficiência e resultado.")
          ),
          h("nav", { className: "renovera-site-footer__links renovera-site-footer__links--solutions", "aria-label": "Soluções Renovera" },
            h("h2", null, "SOLUÇÕES"),
            ...solutions.map(([label, href]) => h("a", { href, key: href }, label))
          ),
          h("nav", { className: "renovera-site-footer__links", "aria-label": "Links institucionais" },
            h("h2", null, "INSTITUCIONAL"),
            h("a", { href: `${SITE_ORIGIN}/sobre.html` }, "Sobre"),
            h("a", { href: `${SITE_ORIGIN}/contato.html` }, "Contato"),
            h("a", { href: privacyHref }, "LGPD e privacidade"),
            termsHref ? h("a", { href: termsHref }, "Termos de uso") : null
          ),
          h("div", { className: "renovera-site-footer__links renovera-site-footer__contact" },
            h("h2", null, "CONTATO"),
            h("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", onClick: onWhatsappClick }, "WhatsApp"),
            h("a", { href: "mailto:contato@renovera.com.br" }, "contato@renovera.com.br")
          )
        ),
        h("div", { className: "renovera-site-footer__legal" }, `© ${new Date().getFullYear()} Renovera. Todos os direitos reservados.`)
      )
    );
  }

  function PageProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
    }, []);
    return h("div", { className: "renovera-page-progress", "aria-hidden": "true", style: { transform: `scaleX(${progress})` } });
  }

  function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const update = () => setVisible(window.scrollY > 560);
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }, []);
    return h("button", { className: `renovera-scroll-top${visible ? " is-visible" : ""}`, type: "button", "aria-label": "Voltar ao topo", title: "Voltar ao topo", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      h("svg", { "aria-hidden": "true", width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "m18 15-6-6-6 6" }), h("path", { d: "M12 21V9" }))
    );
  }

  function MediaComposition({ className = "", children }) {
    return h("div", { className: `renovera-media-composition ${className}`.trim() }, children);
  }

  function SectionImage({ className = "", src, srcSet, sizes, alt, width, height, loading = "lazy" }) {
    return h(
      "figure",
      { className: `renovera-section-image ${className}`.trim() },
      h("img", { src, srcSet, sizes, alt, width, height, loading, decoding: "async" }),
    );
  }

  function HeroArtworkFrame({ className = "", label, children }) {
    return h("div", { className: `renovera-hero-artwork ${className}`.trim(), "aria-label": label }, children);
  }

  function CombinedInsightSection({ id, eyebrow, title, description, points = [], primaryAction, secondaryAction, images = [], className = "" }) {
    const imageNodes = images.slice(0, 2).map((image, index) => h("figure", { className: `renovera-combined-insight__image renovera-combined-insight__image--${index === 0 ? "primary" : "secondary"}`, key: image.src },
      h("img", {
        src: image.src,
        srcSet: image.srcSet,
        sizes: "(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 58vw, 42vw",
        alt: image.alt,
        width: image.width,
        height: image.height,
        loading: "lazy",
        decoding: "async"
      })
    ));

    const actionNode = (action, variant) => action ? h("a", {
      className: `renovera-action renovera-action--${variant}`,
      href: action.href,
      target: action.external ? "_blank" : undefined,
      rel: action.external ? "noopener noreferrer" : undefined,
      onClick: action.onClick
    }, action.label, actionIcon(h)) : null;

    return h("section", { className: `renovera-combined-insight ${className}`.trim(), "aria-labelledby": id },
      h("div", { className: "container renovera-combined-insight__grid" },
        h("div", { className: "renovera-combined-insight__copy" },
          h("span", { className: "renovera-combined-insight__eyebrow" }, eyebrow),
          h("h2", { id }, title),
          h("p", null, description),
          points.length ? h("div", { className: "renovera-combined-insight__points" }, ...points.slice(0, 3).map((point) => h("span", { key: point }, point))) : null,
          h("div", { className: "renovera-combined-insight__actions" }, actionNode(primaryAction, "primary"), actionNode(secondaryAction, "secondary"))
        ),
        h("div", { className: "renovera-combined-insight__media" }, ...imageNodes)
      )
    );
  }

  function FinalParallaxCta({
    id = "renovera-final-cta",
    eyebrow,
    title,
    description,
    imageSrc,
    imagePosition = "center",
    primaryAction,
    secondaryAction,
    className = ""
  }) {
    useEffect(() => {
      const section = document.getElementById(id);
      const background = section?.querySelector(".renovera-final-cta__background");
      if (!section || !background) return undefined;

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) return undefined;

      let visible = false;
      let frame = 0;
      const render = () => {
        frame = 0;
        if (!visible) return;
        const rect = section.getBoundingClientRect();
        const travel = window.innerHeight + rect.height;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
        const viewportWidth = window.innerWidth;
        const amplitude = viewportWidth <= 760 ? 48 : viewportWidth <= 1024 ? 76 : 110;
        background.style.setProperty("--renovera-parallax-y", `${(progress - 0.5) * amplitude}px`);
      };
      const requestRender = () => {
        if (!frame) frame = window.requestAnimationFrame(render);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) requestRender();
      }, { rootMargin: "15% 0px" });

      observer.observe(section);
      window.addEventListener("scroll", requestRender, { passive: true });
      window.addEventListener("resize", requestRender);
      requestRender();

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", requestRender);
        window.removeEventListener("resize", requestRender);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }, [id]);

    const renderAction = (action, variant) => {
      if (!action) return null;
      const props = {
        className: `renovera-final-cta__action renovera-final-cta__action--${variant}`,
        onClick: action.onClick,
        target: action.external ? "_blank" : undefined,
        rel: action.external ? "noopener noreferrer" : undefined
      };
      const children = [h("span", { key: "label" }, action.label), actionIcon(h)];
      return action.href
        ? h("a", { ...props, href: action.href }, ...children)
        : h("button", { ...props, type: "button" }, ...children);
    };

    return h("section", { id, className: `renovera-final-cta ${className}`.trim(), "data-renovera-parallax": "", "aria-labelledby": `${id}-title` },
      h("div", {
        className: "renovera-final-cta__background",
        "aria-hidden": "true",
        style: { backgroundImage: `url(${imageSrc})`, backgroundPosition: imagePosition }
      }),
      h("div", { className: "renovera-final-cta__overlay", "aria-hidden": "true" }),
      h("div", { className: "renovera-final-cta__content" },
        h("span", { className: "renovera-final-cta__eyebrow" }, eyebrow),
        h("h2", { id: `${id}-title` }, title),
        h("p", null, description),
        h("div", { className: "renovera-final-cta__actions" },
          renderAction(primaryAction, "primary"),
          renderAction(secondaryAction, "secondary")
        )
      )
    );
  }

  return { CombinedInsightSection, FinalParallaxCta, FloatingWhatsApp, HeroArtworkFrame, MediaComposition, PageProgress, ProductHeader, ScrollToTop, SectionImage, SiteFooter };
}
