import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { createElement } from "react";
import { createRenoveraLandingUi } from "@renovera/landing-ui";

const whatsapp = "https://wa.me/5519996514827";
const { FloatingWhatsApp, PageProgress, ProductHeader, ScrollToTop, SiteFooter } = createRenoveraLandingUi({ createElement, useEffect, useState });
const email = "contato@renovera.com.br";
const complianceEmail = "compliance@renovera.com.br";
const address = "Rua Visconde de Rio Branco, 106, SÃ£o JoÃ£o da Boa Vista - SP";
const assetBase = import.meta.env.BASE_URL || "/";
export function assetUrl(path: string) {
  return `${assetBase}${path.replace(/^\//, "")}`;
}
const renoveraAsset = (file: string) => assetUrl(`assets/renovera/${file}`);

const landingUrls = {
  solar: "https://luscaarmstrong1.github.io/renovera-energia-solar/",
  regulatorio: "https://luscaarmstrong1.github.io/renovera-consultoria-regulatoria/",
  projetos: "https://luscaarmstrong1.github.io/renovera-projetos-eletricos/",
  eletropostos: "https://luscaarmstrong1.github.io/renovera-eletroposto/",
};

type IconName = "solar" | "regulatorio" | "projetos" | "eletropostos" | "diagnostico" | "aprovacao" | "performance";

const ctas = {
  solar: "Dimensionar minha usina",
  regulatorio: "Analisar negativa de conexÃ£o",
  projetos: "Planejar minha infraestrutura",
  eletropostos: "Simular viabilidade de recarga",
};

const solutions = [
  {
    id: "solar",
    title: "Energia Solar",
    eyebrow: "GeraÃ§Ã£o fotovoltaica",
    problem: "Quero reduzir o custo da minha energia.",
    desc: "Dimensionamento, anÃ¡lise de consumo, projeto, homologaÃ§Ã£o, implantaÃ§Ã£o e viabilidade fotovoltaica.",
    fit: "Empresas, propriedades rurais, condomÃ­nios e operaÃ§Ãµes com consumo relevante.",
    scope: ["AnÃ¡lise de consumo e tarifa", "Dimensionamento tÃ©cnico", "Projeto e homologaÃ§Ã£o", "ImplantaÃ§Ã£o e acompanhamento"],
    url: landingUrls.solar,
    cta: ctas.solar,
    icon: "solar" as IconName,
    tone: "gold",
    image: "blog-aterramento.jpg",
  },
  {
    id: "regulatorio",
    title: "Consultoria RegulatÃ³ria",
    eyebrow: "ConexÃ£o e concessionÃ¡rias",
    problem: "Meu projeto foi negado pela concessionÃ¡ria.",
    desc: "Defesa tÃ©cnica, auditoria de estudos, estratÃ©gia administrativa, ANEEL, concessionÃ¡rias e parecer tÃ©cnico.",
    fit: "Consumidores, integradores, investidores e operaÃ§Ãµes com conexÃ£o travada.",
    scope: ["Auditoria tÃ©cnica", "Parecer regulatÃ³rio", "EstratÃ©gia perante concessionÃ¡rias", "DocumentaÃ§Ã£o de defesa"],
    url: landingUrls.regulatorio,
    cta: ctas.regulatorio,
    icon: "regulatorio" as IconName,
    tone: "forest",
    image: "blog-direitos-concessionaria.jpg",
  },
  {
    id: "projetos",
    title: "Projetos ElÃ©tricos",
    eyebrow: "Infraestrutura elÃ©trica",
    problem: "Preciso aprovar ou ampliar minha infraestrutura.",
    desc: "Projetos industriais e comerciais, entrada de energia, subestaÃ§Ãµes de consumidor, estudos elÃ©tricos e aprovaÃ§Ã£o.",
    fit: "IndÃºstrias, comÃ©rcios, empreendimentos e operaÃ§Ãµes crÃ­ticas em expansÃ£o.",
    scope: ["Estudos elÃ©tricos", "Entrada de energia", "ProteÃ§Ã£o e seletividade", "Aumento de carga e aprovaÃ§Ã£o"],
    url: landingUrls.projetos,
    cta: ctas.projetos,
    icon: "projetos" as IconName,
    tone: "deep",
    image: "digital-text.png",
  },
  {
    id: "eletropostos",
    title: "Eletropostos",
    eyebrow: "Mobilidade elÃ©trica",
    problem: "Quero avaliar um projeto de recarga veicular.",
    desc: "Estudo de viabilidade, carregadores AC/DC, adequaÃ§Ã£o elÃ©trica, projeto, implantaÃ§Ã£o e expansÃ£o.",
    fit: "Postos, estacionamentos, frotas, condomÃ­nios, varejo e operadores de ativos.",
    scope: ["Viabilidade tÃ©cnica e comercial", "AdequaÃ§Ã£o de demanda", "Projeto de infraestrutura", "ImplantaÃ§Ã£o e monetizaÃ§Ã£o"],
    url: landingUrls.eletropostos,
    cta: ctas.eletropostos,
    icon: "eletropostos" as IconName,
    tone: "green",
    image: "about1.png",
  },
];

const segments = [
  { title: "IndÃºstrias e plantas produtivas", context: "OperaÃ§Ãµes com alta exigÃªncia de continuidade, demanda contratada e expansÃ£o de carga.", risks: "Paradas, inadequaÃ§Ã£o de proteÃ§Ã£o, energia cara e atrasos em aprovaÃ§Ã£o.", solution: "Projetos ElÃ©tricos, Energia Solar e Consultoria RegulatÃ³ria" },
  { title: "Hospitais, clÃ­nicas e operaÃ§Ãµes crÃ­ticas", context: "Ambientes onde seguranÃ§a elÃ©trica, redundÃ¢ncia e previsibilidade importam antes de qualquer intervenÃ§Ã£o.", risks: "Risco operacional, qualidade de energia e interface regulatÃ³ria sensÃ­vel.", solution: "Projetos ElÃ©tricos e Consultoria RegulatÃ³ria" },
  { title: "ComÃ©rcio, varejo e serviÃ§os", context: "Unidades com pressÃ£o por reduÃ§Ã£o de custo, expansÃ£o de carga e novas demandas de recarga.", risks: "Infraestrutura subdimensionada, consumo elevado e decisÃµes fragmentadas.", solution: "Energia Solar, Projetos ElÃ©tricos e Eletropostos" },
  { title: "AgronegÃ³cio", context: "Consumo intensivo, bombeamento, geraÃ§Ã£o prÃ³pria e conexÃµes em Ã¡reas rurais.", risks: "Instabilidade de fornecimento, custo tarifÃ¡rio e gargalos de conexÃ£o.", solution: "Energia Solar e Projetos ElÃ©tricos" },
  { title: "CondomÃ­nios e empreendimentos", context: "Projetos com Ã¡reas comuns, entrada de energia, recarga e documentaÃ§Ã£o tÃ©cnica.", risks: "AprovaÃ§Ãµes lentas, escopo incompleto e infraestrutura sem plano de expansÃ£o.", solution: "Projetos ElÃ©tricos, Energia Solar e Eletropostos" },
  { title: "Integradores solares", context: "Parceiros que precisam de defesa tÃ©cnica, apoio regulatÃ³rio e clareza em conexÃµes.", risks: "Negativas, inversÃ£o de fluxo, documentaÃ§Ã£o incompleta e perda de prazo comercial.", solution: "Consultoria RegulatÃ³ria" },
  { title: "Investidores e operadores de ativos", context: "DecisÃµes que exigem due diligence tÃ©cnica, viabilidade e leitura de risco.", risks: "Premissas frÃ¡geis, CAPEX mal definido e baixa previsibilidade regulatÃ³ria.", solution: "Consultoria RegulatÃ³ria, Energia Solar e Eletropostos" },
  { title: "Empresas com frotas elÃ©tricas", context: "OperaÃ§Ãµes que precisam transformar recarga em infraestrutura escalÃ¡vel.", risks: "Demanda insuficiente, carregadores sem adequaÃ§Ã£o elÃ©trica e baixa monetizaÃ§Ã£o.", solution: "Eletropostos e Projetos ElÃ©tricos" },
];

const caseItems = [
  { tag: "Projeto fotovoltaico", segment: "AgronegÃ³cio", title: "Estudo tÃ©cnico fotovoltaico", label: "Em atualizaÃ§Ã£o", context: "OperaÃ§Ã£o com consumo recorrente e necessidade de reduzir exposiÃ§Ã£o tarifÃ¡ria.", challenge: "Estruturar estudo de viabilidade sem assumir premissas comerciais frÃ¡geis.", strategy: "AnÃ¡lise de consumo, cenÃ¡rio tÃ©cnico e rota de implantaÃ§Ã£o fotovoltaica.", deliverables: "DiagnÃ³stico, memorial preliminar e prÃ³ximos passos tÃ©cnicos." },
  { tag: "AnÃ¡lise regulatÃ³ria", segment: "Integradores solares", title: "Defesa tÃ©cnica de conexÃ£o", label: "Estudo tÃ©cnico", context: "SolicitaÃ§Ã£o de conexÃ£o com exigÃªncias adicionais da concessionÃ¡ria.", challenge: "Avaliar a base tÃ©cnica da negativa e organizar resposta consistente.", strategy: "Auditoria do estudo e construÃ§Ã£o de argumentaÃ§Ã£o tÃ©cnica e regulatÃ³ria.", deliverables: "Parecer tÃ©cnico, matriz de documentos e estratÃ©gia administrativa." },
  { tag: "Infraestrutura elÃ©trica", segment: "IndÃºstrias", title: "AmpliaÃ§Ã£o de carga", label: "Em atualizaÃ§Ã£o", context: "Unidade comercial ou industrial com necessidade de expansÃ£o operacional.", challenge: "Compatibilizar demanda, proteÃ§Ã£o, entrada de energia e aprovaÃ§Ã£o.", strategy: "Projeto elÃ©trico, estudos e interface tÃ©cnica com a concessionÃ¡ria.", deliverables: "Diagramas, memoriais, estudos e documentaÃ§Ã£o de aprovaÃ§Ã£o." },
  { tag: "Mobilidade elÃ©trica", segment: "Empresas com frotas elÃ©tricas", title: "Viabilidade de recarga", label: "Estudo tÃ©cnico", context: "AvaliaÃ§Ã£o de ponto de recarga para operaÃ§Ã£o aberta ou frota prÃ³pria.", challenge: "Entender demanda, carregadores e adequaÃ§Ãµes antes do investimento.", strategy: "Estudo de viabilidade, infraestrutura e expansÃ£o por fases.", deliverables: "Mapa de cargas, escopo tÃ©cnico e plano de implantaÃ§Ã£o." },
];

const articles = [
  { category: "RegulaÃ§Ã£o e concessionÃ¡rias", title: "Como organizar uma defesa tÃ©cnica em casos de conexÃ£o negada", summary: "CritÃ©rios, documentos e cuidados para reduzir ruÃ­do tÃ©cnico em tratativas com concessionÃ¡rias.", read: "6 min" },
  { category: "Energia Solar", title: "O que avaliar antes de investir em geraÃ§Ã£o fotovoltaica", summary: "Consumo, tarifa, Ã¡rea, demanda e homologaÃ§Ã£o vistos como decisÃ£o de engenharia.", read: "5 min" },
  { category: "Projetos ElÃ©tricos", title: "Aumento de carga: sinais de que a infraestrutura precisa ser revista", summary: "Quando expansÃ£o operacional exige estudos, proteÃ§Ã£o, entrada de energia e nova documentaÃ§Ã£o.", read: "7 min" },
  { category: "Mobilidade ElÃ©trica", title: "Eletropostos: infraestrutura elÃ©trica antes do carregador", summary: "Demanda, ponto de conexÃ£o e operaÃ§Ã£o precisam caminhar junto com a escolha dos equipamentos.", read: "5 min" },
  { category: "Mercado Livre", title: "Energia como decisÃ£o estratÃ©gica para empresas", summary: "Pontos de atenÃ§Ã£o para avaliar contrataÃ§Ã£o, risco e gestÃ£o de energia.", read: "4 min" },
  { category: "GestÃ£o e eficiÃªncia de energia", title: "Documentos que aceleram uma anÃ¡lise tÃ©cnica de energia", summary: "Uma lista prÃ¡tica para iniciar diagnÃ³sticos com mais precisÃ£o e menos retrabalho.", read: "4 min" },
];

const legacyPosts = [
  {
    date: "24 de dezembro de 2025",
    category: "RegulaÃ§Ã£o e concessionÃ¡rias",
    title: 'REN 1.000/2021: O "GlossÃ¡rio" do Integrador para Exigir seus Direitos na ConcessionÃ¡ria',
    image: "blog-direitos-concessionaria.jpg",
    href: "blog-direitos-concessionaria",
  },
  {
    date: "17 de dezembro de 2025",
    category: "Energia Solar",
    title: "As 6 REN 1.059/2023: O Guia PrÃ¡tico da Nova RegulamentaÃ§Ã£o para Autoconsumo e GeraÃ§Ã£o Compartilhada",
    image: "blog-nova-regulamentacao.jpg",
    href: "blog-nova-regulamentacao",
  },
  {
    date: "10 de dezembro de 2025",
    category: "Energia Solar",
    title: "As 6 DÃºvidas Mais Comuns de Quem Pensa em Instalar Energia Solar",
    image: "blog-6-duvidas.jpg",
    href: "blog-6-duvidas",
  },
  {
    date: "03 de dezembro de 2025",
    category: "Projetos ElÃ©tricos",
    title: "Aterramento e EquipotencializaÃ§Ã£o em Sistemas Fotovoltaicos: O Guia para a NBR 5410",
    image: "blog-aterramento.jpg",
    href: "blog-aterramento",
  },
];

const partnerGroups = [
  { title: "Distribuidores Parceiros", logos: [1, 2, 3, 4, 5, 6, 7] },
  { title: "Marcas Parceiras", logos: [8, 9, 10, 11, 12, 13] },
];

const meta: Record<string, { title: string; description: string }> = {
  "/": { title: "Renovera | Engenharia, energia e regulaÃ§Ã£o", description: "Portal institucional da Renovera para soluÃ§Ãµes de energia, engenharia elÃ©trica, regulaÃ§Ã£o e mobilidade elÃ©trica." },
  "/solucoes": { title: "SoluÃ§Ãµes Renovera", description: "Energia solar, consultoria regulatÃ³ria, projetos elÃ©tricos e eletropostos com escopo tÃ©cnico claro." },
  "/segmentos": { title: "Segmentos atendidos | Renovera", description: "SoluÃ§Ãµes de energia para indÃºstrias, comÃ©rcios, agronegÃ³cio, condomÃ­nios, integradores e operadores." },
  "/cases": { title: "Cases e projetos | Renovera", description: "Estrutura preparada para cases tÃ©cnicos da Renovera, sem dados comerciais inventados." },
  "/insights": { title: "Blog | Renovera", description: "ConteÃºdos originais da Renovera sobre energia solar, regulaÃ§Ã£o, concessionÃ¡rias e infraestrutura elÃ©trica." },
  "/blog": { title: "Blog | Renovera", description: "ConteÃºdos originais da Renovera sobre energia solar, regulaÃ§Ã£o, concessionÃ¡rias e infraestrutura elÃ©trica." },
  "/blog-direitos-concessionaria": { title: "Direitos perante a concessionÃ¡ria | Renovera", description: "Artigo Renovera sobre direitos do consumidor perante a concessionÃ¡ria." },
  "/blog-nova-regulamentacao": { title: "Nova regulamentaÃ§Ã£o e energia solar | Renovera", description: "Artigo Renovera sobre regulamentaÃ§Ã£o e energia solar." },
  "/blog-6-duvidas": { title: "6 dÃºvidas sobre energia solar | Renovera", description: "Artigo Renovera com dÃºvidas frequentes sobre energia solar." },
  "/blog-aterramento": { title: "Aterramento e seguranÃ§a elÃ©trica | Renovera", description: "Artigo Renovera sobre aterramento e seguranÃ§a elÃ©trica." },
  "/sobre": { title: "Sobre a Renovera", description: "ConheÃ§a a atuaÃ§Ã£o tÃ©cnica da Renovera em engenharia, energia e regulaÃ§Ã£o." },
  "/contato": { title: "Contato | Renovera", description: "Triagem comercial da Renovera via WhatsApp e e-mail." },
};

const legacyPathAliases: Record<string, string> = {
  "/index.html": "/",
  "/sobre.html": "/sobre",
  "/blog.html": "/blog",
  "/contato.html": "/contato",
  "/blog-direitos-concessionaria.html": "/blog-direitos-concessionaria",
  "/blog-nova-regulamentacao.html": "/blog-nova-regulamentacao",
  "/blog-6-duvidas.html": "/blog-6-duvidas",
  "/blog-aterramento.html": "/blog-aterramento",
};

function routePath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const base = "/renovera-landings-publicas";
  const current = path.startsWith(base) ? path.slice(base.length) || "/" : path;
  return legacyPathAliases[current] || current;
}

function wa(message: string) {
  return `${whatsapp}?text=${encodeURIComponent(message)}`;
}

function localHref(path: string) {
  return path === "/" ? "./" : path.replace(/^\//, "");
}

function Icon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 48 48", "aria-hidden": true, focusable: false } as const;
  const icons: Record<IconName, ReactElement> = {
    solar: <svg {...common}><circle cx="24" cy="19" r="7" /><path d="M24 5v5M24 28v5M10 19H5M43 19h-5M14 9l3 3M34 9l-3 3M14 29l3-3M34 29l-3-3M9 40h30M14 34h20" /></svg>,
    regulatorio: <svg {...common}><path d="M13 11h22v26H13zM18 17h12M18 23h12M18 29h7M34 16l5 5-12 12-6 1 1-6z" /></svg>,
    projetos: <svg {...common}><path d="M8 34h32M12 34V14l12-6 12 6v20M18 34V20h12v14M8 20h8M32 20h8M24 8v8" /></svg>,
    eletropostos: <svg {...common}><path d="M15 38V10h15l4 5v23M19 17h8M30 21h4c3 0 5 2 5 5v6c0 3-2 5-5 5M19 38h15M22 25h5l-4 8h6" /></svg>,
    diagnostico: <svg {...common}><path d="M8 34l10-10 7 6 15-17M8 40h32M12 14h10M12 20h6" /></svg>,
    aprovacao: <svg {...common}><path d="M12 9h19l5 5v25H12zM30 9v7h6M18 27l4 4 9-11" /></svg>,
    performance: <svg {...common}><path d="M24 6v8M24 34v8M6 24h8M34 24h8M12 12l6 6M30 30l6 6M36 12l-6 6M18 30l-6 6M24 16a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" /></svg>,
  };
  return icons[name];
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16.02 2.5A13.36 13.36 0 0 0 4.6 22.76L3 29.5l6.9-1.55A13.37 13.37 0 1 0 16.02 2.5Zm0 2.42a10.94 10.94 0 0 1 9.3 16.7l-.33.52.88 3.84-3.94-.88-.5.3a10.94 10.94 0 0 1-16.34-9.48A10.95 10.95 0 0 1 16.02 4.92Zm-5.4 5.83c-.25 0-.66.1-1 .47-.35.38-1.32 1.3-1.32 3.15 0 1.86 1.35 3.66 1.54 3.91.2.26 2.6 4.16 6.48 5.66 3.22 1.25 3.88 1 4.58.94.7-.07 2.27-.93 2.59-1.82.32-.9.32-1.66.22-1.82-.1-.16-.36-.25-.76-.45-.4-.2-2.34-1.16-2.7-1.29-.36-.13-.62-.2-.88.2-.26.39-1.01 1.29-1.24 1.55-.23.26-.46.29-.85.1-.4-.2-1.67-.62-3.18-1.97a11.9 11.9 0 0 1-2.2-2.74c-.23-.4-.02-.61.17-.8.18-.18.4-.46.6-.69.2-.23.26-.4.4-.66.13-.26.06-.49-.04-.69-.1-.2-.88-2.12-1.2-2.9-.32-.76-.64-.65-.88-.66h-.83Z" />
    </svg>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  const current = routePath();
  const normalized = href === "./" || href === "/" ? "/" : `/${href.replace(/^\/+/, "")}`;
  const target = normalized === "/" ? assetBase : `${assetBase}${normalized.replace(/^\/+/, "")}`;
  const active = current === normalized || (normalized === "/insights" && current.startsWith("/blog"));
  return <a href={target} className={active ? "active" : ""}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const currentPath = routePath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (open && headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <header className={`site-header ${currentPath !== "/" || scrolled || open ? "solid" : ""}`} ref={headerRef}>
      <a className="brand" href={assetBase} aria-label="Renovera">
        <img src={renoveraAsset("logo.png")} alt="Renovera" />
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menu">
        <span />
      </button>
      <nav className={open ? "open" : ""} aria-label="Menu principal" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
        <NavLink href="/">InÃ­cio</NavLink>
        <NavLink href="solucoes">SoluÃ§Ãµes</NavLink>
        <NavLink href="cases">Cases</NavLink>
        <NavLink href="insights">Blog</NavLink>
        <NavLink href="sobre">A Renovera</NavLink>
        <NavLink href="contato">Contato</NavLink>
      </nav>
      <a className="nav-cta" href={wa("OlÃ¡, Renovera. Gostaria de conversar com um especialista sobre uma soluÃ§Ã£o de energia para minha operaÃ§Ã£o.")}>Falar com um especialista</a>
    </header>
  );
}

function LegacyFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <img src={renoveraAsset("logo.png")} alt="Renovera" />
            <p>Engenharia, energia e regulaÃ§Ã£o para decisÃµes tÃ©cnicas, comerciais e operacionais que exigem clareza.</p>
          </div>
          <nav className="site-footer__nav" aria-label="Menu do rodapÃ©">
            <h3>Menu</h3>
            <a href={assetBase}>InÃ­cio</a>
            <a href={`${assetBase}solucoes`}>SoluÃ§Ãµes</a>
            <a href={`${assetBase}cases`}>Cases</a>
            <a href={`${assetBase}insights`}>Blog</a>
            <a href={`${assetBase}sobre`}>A Renovera</a>
            <a href={`${assetBase}contato`}>Contato</a>
          </nav>
          <div className="site-footer__contact">
            <h3>Contato</h3>
            <a href={`mailto:${email}`}>{email}</a>
            <p>Atendimento: Segunda a Sexta</p>
          </div>
          <div className="site-footer__ethics">
            <h3>DenÃºncias</h3>
            <p>Canal seguro e confidencial para denÃºncias</p>
            <a className="site-footer__compliance" href={`mailto:${complianceEmail}`}>COMPLIANCE@RENOVERA.COM.BR</a>
          </div>
        </div>
        <div className="site-footer__divider" />
        <div className="site-footer__bottom">
          <span>Â© 2026 Renovera. Todos os direitos reservados.</span>
          <nav aria-label="Links legais">
            <a href={`${assetBase}politica-de-privacidade`}>PolÃ­tica de Privacidade</a>
            <a href={`${assetBase}termos-de-uso`}>Termos de Uso</a>
            <a href={`${assetBase}canal-de-etica`}>Canal de Ã‰tica</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function HeroSolutionIndicators() {
  return (
    <nav className="hero-solutions" aria-label="SoluÃ§Ãµes Renovera">
      {solutions.map((solution, index) => (
        <a href={solution.url} key={solution.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {solution.title}
        </a>
      ))}
    </nav>
  );
}

function PartnersSection() {
  return (
    <section className="section partners-section">
      <SectionHead
        title="Ecossistema que fortalece cada projeto."
        text="A Renovera atua com distribuidores e marcas que ajudam a estruturar soluÃ§Ãµes tÃ©cnicas mais consistentes, seguras e eficientes."
      />
      <div className="partner-groups">
        {partnerGroups.map((group) => (
          <article key={group.title} className="partner-group">
            <h3>{group.title}</h3>
            <div className="partner-logos">
              {group.logos.map((logo) => (
                <div key={logo} className="partner-logo">
                  <img src={renoveraAsset(`parceiros/logo-${logo}.png`)} alt={`${group.title} ${logo}`} loading="lazy" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LegacyBlogSection() {
  const [featured, ...side] = legacyPosts;
  return (
    <section className="section legacy-blog">
      <SectionHead title="AnÃ¡lises para decidir com mais seguranÃ§a." text="ConteÃºdos tÃ©cnicos da Renovera sobre regulaÃ§Ã£o, energia solar e infraestrutura elÃ©trica." />
      <div className="legacy-blog-grid">
        <a className="legacy-post featured" href={featured.href} style={{ backgroundImage: `linear-gradient(180deg, rgba(3,49,24,.08), rgba(3,49,24,.9)), url("${renoveraAsset(featured.image)}")` }}>
          <span>{featured.category}</span>
          <small>{featured.date}</small>
          <h3>{featured.title}</h3>
          <em>Ler anÃ¡lise</em>
        </a>
        <div className="legacy-post-list">
          {side.map((post) => (
            <a className="legacy-post" href={post.href} key={post.title} style={{ backgroundImage: `linear-gradient(180deg, rgba(3,49,24,.18), rgba(3,49,24,.88)), url("${renoveraAsset(post.image)}")` }}>
              <span>{post.category}</span>
              <small>{post.date}</small>
              <h3>{post.title}</h3>
              <em>Ler anÃ¡lise</em>
            </a>
          ))}
        </div>
      </div>
      <a className="btn dark blog-all" href="insights">Ver todos os conteÃºdos</a>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="engineering-visual" aria-label="ComposiÃ§Ã£o visual de engenharia energÃ©tica">
      <div className="perspective-grid" />
      <div className="unifilar-line line-a" />
      <div className="unifilar-line line-b" />
      <div className="visual-core core-solar"><Icon name="solar" /><span>Solar</span></div>
      <div className="visual-core core-grid"><Icon name="projetos" /><span>Infraestrutura</span></div>
      <div className="visual-core core-reg"><Icon name="regulatorio" /><span>RegulaÃ§Ã£o</span></div>
      <div className="visual-core core-ev"><Icon name="eletropostos" /><span>Mobilidade</span></div>
      <div className="editorial-panel">
        <span>Rota tÃ©cnica</span>
        <strong>Viabilidade</strong>
        <strong>Engenharia</strong>
        <strong>RegulaÃ§Ã£o</strong>
        <strong>ImplantaÃ§Ã£o</strong>
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, text }: { kicker?: string; title: string; text: string }) {
  return <div className="section-head">{kicker && <p className="kicker">{kicker}</p>}<h2>{title}</h2><p>{text}</p></div>;
}

function Home() {
  return (
    <>
      <section className="hero home-hero renovera-photo-section" style={{ backgroundImage: `url("${renoveraAsset("fachada-renovera.jpg")}")` }}>
        <div className="hero-texture" style={{ backgroundImage: `url("${renoveraAsset("digital-text.png")}")` }} />
        <div className="hero-copy hero-content">
          <p className="kicker">RENOVERA Â· ENERGIA, ENGENHARIA E REGULAÃ‡ÃƒO</p>
          <h1>DecisÃµes de energia exigem clareza tÃ©cnica.</h1>
          <p>A Renovera conecta energia solar, infraestrutura elÃ©trica, regulaÃ§Ã£o e mobilidade para transformar desafios complexos em decisÃµes mais seguras, eficientes e rentÃ¡veis.</p>
          <div className="actions"><a className="btn gold" href="#seletor">Encontrar minha soluÃ§Ã£o</a><a className="btn ghost" href={wa("OlÃ¡, Renovera. Quero entender qual soluÃ§Ã£o de energia faz sentido para minha operaÃ§Ã£o.")}>Falar com a Renovera</a></div>
          <div className="hero-indicators"><span>Engenharia aplicada</span><span>RegulaÃ§Ã£o estratÃ©gica</span><span>ImplantaÃ§Ã£o orientada a resultado</span></div>
        </div>
        <HeroSolutionIndicators />
      </section>
      <AuthorityBand />
      <ChallengeSelector />
      <Method />
      <SolutionBlocks />
      <PartnersSection />
      <SegmentPreview />
      <CasesPreview />
      <LegacyBlogSection />
      <FinalCta />
    </>
  );
}

function AuthorityBand() {
  const items = [
    ["DiagnÃ³stico tÃ©cnico", "diagnostico" as IconName],
    ["Engenharia e aprovaÃ§Ã£o", "aprovacao" as IconName],
    ["RegulaÃ§Ã£o e concessionÃ¡rias", "regulatorio" as IconName],
    ["ImplantaÃ§Ã£o e performance", "performance" as IconName],
  ];
  return <section className="authority-band">{items.map(([label, icon]) => <div key={label}><Icon name={icon as IconName} /><span>{label}</span></div>)}</section>;
}

function ChallengeSelector() {
  return (
    <section className="section challenges" id="seletor">
      <SectionHead title="Qual decisÃ£o de energia estÃ¡ na sua frente?" text="Escolha o desafio principal e siga para a soluÃ§Ã£o tÃ©cnica mais adequada." />
      <div className="challenge-layout">
        {solutions.map((s, index) => (
          <a className={`challenge-card ${index === 0 ? "featured" : ""} tone-${s.tone}`} href={s.url} key={s.id} style={{ backgroundImage: `linear-gradient(120deg, rgba(7,45,37,.94), rgba(7,45,37,.58)), url("${renoveraAsset(s.image)}")` }}>
            <span className="card-number">0{index + 1}</span>
            <Icon name={s.icon} />
            <small>{s.title}</small>
            <h3>{s.problem}</h3>
            <p>{s.desc}</p>
            <strong>{s.id === "solar" ? "Simular sistema solar" : s.id === "regulatorio" ? "Enviar parecer para anÃ¡lise" : s.id === "projetos" ? "Solicitar diagnÃ³stico elÃ©trico" : "Avaliar meu eletroposto"}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    ["01", "DiagnÃ³stico e viabilidade", "Leitura tÃ©cnica, comercial e regulatÃ³ria antes de comprometer CAPEX."],
    ["02", "Engenharia e aprovaÃ§Ã£o", "Projetos, estudos, documentaÃ§Ã£o e interface com concessionÃ¡rias."],
    ["03", "ImplantaÃ§Ã£o e performance", "ExecuÃ§Ã£o, comissionamento, acompanhamento e expansÃ£o futura."],
  ];
  return (
    <section className="section method-section">
      <SectionHead title="Da anÃ¡lise inicial ao ativo em operaÃ§Ã£o." text="Um fluxo de decisÃ£o para transformar diagnÃ³stico em projeto defensÃ¡vel." />
      <div className="method-flow">
        {steps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionBlocks() {
  return (
    <section className="section solutions-editorial">
      <SectionHead title="SoluÃ§Ãµes principais" text="Cada frente resolve uma parte da cadeia de decisÃ£o energÃ©tica: viabilidade, conexÃ£o, projeto, implantaÃ§Ã£o e operaÃ§Ã£o." />
      <div className="solution-bento">
        {solutions.map((s, index) => (
          <article className={`solution-panel tone-${s.tone} ${index === 0 || index === 3 ? "wide" : ""}`} key={s.id} style={{ backgroundImage: `linear-gradient(120deg, rgba(6,31,26,.94), rgba(6,31,26,.58)), url("${renoveraAsset(s.image)}")` }}>
            <Icon name={s.icon} />
            <small>{s.eyebrow}</small>
            <h3>{s.title}</h3>
            <p>{s.problem}</p>
            <ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
            <a className="text-cta" href={s.url}>{s.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentPreview() {
  return (
    <section className="section segment-preview">
      <div className="split-head">
        <SectionHead title="Segmentos atendidos" text="Contextos diferentes exigem rotas tÃ©cnicas diferentes. A Renovera conecta engenharia e regulaÃ§Ã£o ao risco de cada operaÃ§Ã£o." />
        <a className="btn dark" href="segmentos">Ver soluÃ§Ãµes por segmento</a>
      </div>
      <div className="segment-strip">
        {segments.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.context}</p><span>{item.solution}</span></article>)}
      </div>
    </section>
  );
}

function CasesPreview() {
  return (
    <section className="section cases-preview">
      <SectionHead title="Projetos tÃ©cnicos em anÃ¡lise" text="Estrutura pronta para receber cases reais, sem nÃºmeros, clientes ou indicadores inventados." />
      <div className="case-ledger">
        {caseItems.slice(0, 3).map((item) => <CaseCard key={item.title + item.tag} item={item} />)}
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: typeof caseItems[number] }) {
  return (
    <article className="case-card">
      <div className="case-meta"><span>{item.tag}</span><span>{item.label}</span></div>
      <h3>{item.title}</h3>
      <dl>
        <div><dt>Contexto</dt><dd>{item.context}</dd></div>
        <div><dt>Desafio</dt><dd>{item.challenge}</dd></div>
        <div><dt>EstratÃ©gia aplicada</dt><dd>{item.strategy}</dd></div>
        <div><dt>EntregÃ¡veis</dt><dd>{item.deliverables}</dd></div>
      </dl>
      <a className="text-cta" href="cases">Explorar case</a>
    </article>
  );
}

function InsightsPreview() {
  return (
    <section className="section insights-preview">
      <SectionHead title="InteligÃªncia aplicada ao setor elÃ©trico." text="ConteÃºdo tÃ©cnico como apoio para decisÃµes de investimento, conexÃ£o, infraestrutura e operaÃ§Ã£o." />
      <div className="magazine-grid">
        <ArticleCard article={articles[0]} featured image="blog-6-duvidas.jpg" />
        <div className="magazine-side">
          {articles.slice(1, 3).map((article) => <ArticleCard article={article} key={article.title} />)}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, featured = false, image }: { article: typeof articles[number]; featured?: boolean; image?: string }) {
  return (
    <article className={`article-card ${featured ? "featured" : ""}`} style={image ? { backgroundImage: `linear-gradient(140deg, rgba(6,31,26,.94), rgba(6,31,26,.56)), url("${renoveraAsset(image)}")` } : undefined}>
      <span>{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <div><small>{article.read}</small><a href={`insights?article=${encodeURIComponent(article.title)}`}>Ler anÃ¡lise</a></div>
    </article>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <h2>Seu desafio de energia precisa de uma resposta tecnicamente defensÃ¡vel.</h2>
        <p>Converse com a Renovera para estruturar uma rota segura de reduÃ§Ã£o de custos, aprovaÃ§Ã£o de infraestrutura, conexÃ£o, implantaÃ§Ã£o ou expansÃ£o.</p>
      </div>
      <div className="actions"><a className="btn gold" href={wa("OlÃ¡, Renovera. Quero estruturar uma rota tÃ©cnica para meu desafio de energia.")}>Falar no WhatsApp</a><a className="btn ghost" href="solucoes">Conhecer todas as soluÃ§Ãµes</a></div>
    </section>
  );
}

function PageHero({ title, text, variant = "default" }: { title: string; text: string; variant?: string }) {
  return <section className={`page-hero ${variant}`}><div><p className="kicker">Renovera</p><h1>{title}</h1><p>{text}</p></div><div className="page-hero-mark" /></section>;
}

function SolutionsPage() {
  return (
    <main className="page-main">
      <PageHero title="SoluÃ§Ãµes Renovera" text="Um mapa de decisÃµes para energia solar, regulaÃ§Ã£o, infraestrutura elÃ©trica e mobilidade." variant="decision-map" />
      <div className="solution-detail-list">
        {solutions.map((s) => (
          <section className="solution-detail" key={s.id}>
            <div><Icon name={s.icon} /><small>{s.eyebrow}</small><h2>{s.title}</h2><p>{s.problem}</p></div>
            <div className="detail-grid">
              <p><b>Para quem Ã© indicada:</b> {s.fit}</p>
              <p><b>Escopo:</b> {s.desc}</p>
              <ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="actions"><a className="btn gold small" href={s.url}>{s.cta}</a><a className="btn light small" href={wa(`OlÃ¡, Renovera. Gostaria de falar sobre ${s.title}.`)}>Conversar no WhatsApp</a></div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function SegmentsPage() {
  const [filter, setFilter] = useState(segments[0].title);
  const active = segments.find((item) => item.title === filter) || segments[0];
  return (
    <main className="page-main">
      <PageHero title="SoluÃ§Ãµes por contexto operacional" text="A Renovera adapta a anÃ¡lise ao risco, Ã  operaÃ§Ã£o e Ã  decisÃ£o energÃ©tica de cada segmento." />
      <div className="segment-page">
        <div className="segment-filters">{segments.map((item) => <button className={active.title === item.title ? "selected" : ""} onClick={() => setFilter(item.title)} key={item.title}>{item.title}</button>)}</div>
        <article>
          <h2>{active.title}</h2>
          <p><b>Contexto operacional:</b> {active.context}</p>
          <p><b>Riscos comuns:</b> {active.risks}</p>
          <p><b>SoluÃ§Ãµes Renovera:</b> {active.solution}</p>
          <a className="btn gold" href={wa(`OlÃ¡, Renovera. Quero avaliar soluÃ§Ãµes para ${active.title}.`)}>Solicitar anÃ¡lise contextual</a>
        </article>
      </div>
    </main>
  );
}

function CasesPage() {
  const [solutionFilter, setSolutionFilter] = useState("Todos");
  const [segmentFilter, setSegmentFilter] = useState("Todos");
  const solutionOptions = ["Todos", ...Array.from(new Set(caseItems.map((c) => c.tag)))];
  const segmentOptions = ["Todos", ...Array.from(new Set(caseItems.map((c) => c.segment)))];
  const shown = caseItems.filter((c) => (solutionFilter === "Todos" || c.tag === solutionFilter) && (segmentFilter === "Todos" || c.segment === segmentFilter));
  return (
    <main className="page-main">
      <PageHero title="Cases e projetos" text="Uma biblioteca visual preparada para receber projetos reais, mantendo estrutura tÃ©cnica e campos editÃ¡veis." />
      <div className="filter-panel"><select value={solutionFilter} onChange={(e) => setSolutionFilter(e.target.value)}>{solutionOptions.map((o) => <option key={o}>{o}</option>)}</select><select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)}>{segmentOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
      <div className="case-ledger">{shown.map((item) => <CaseCard key={item.title + item.tag} item={item} />)}</div>
      <FinalCta />
    </main>
  );
}

function InsightsPage() {
  return <UnifiedLegacyPage page="insights" eyebrow="Blog" title="Blog" text="ConteÃºdos originais da Renovera sobre energia solar, regulaÃ§Ã£o, concessionÃ¡rias e infraestrutura elÃ©trica." />;
}

function AboutPage() {
  return <UnifiedLegacyPage page="sobre" eyebrow="A Renovera" title="Nossa HistÃ³ria" text="Transformando o mercado de energia com engenharia, regulaÃ§Ã£o e clareza tÃ©cnica." />;
}

function ContactPage() {
  return <UnifiedLegacyPage page="contato" eyebrow="Contato" title="Entre em Contato" text="Canais oficiais para falar com a Renovera sobre energia, projetos, regulaÃ§Ã£o e atendimento institucional." />;
}


const legacyPageFiles: Record<string, string> = {
  sobre: "sobre.html",
  insights: "blog.html",
  contato: "contato.html",
  "blog-direitos-concessionaria": "blog-direitos-concessionaria.html",
  "blog-nova-regulamentacao": "blog-nova-regulamentacao.html",
  "blog-6-duvidas": "blog-6-duvidas.html",
  "blog-aterramento": "blog-aterramento.html",
};

function cleanLegacyHtml(raw: string) {
  const doc = new DOMParser().parseFromString(raw, "text/html");
  doc.querySelectorAll("header, footer, script, style, .scroll-top-arrow, .wa__btn_popup, .wa__popup_chat_box, .wa__popup_powered").forEach((node) => node.remove());
  doc.querySelectorAll("[style]").forEach((node) => {
    const el = node as HTMLElement;
    el.style.removeProperty("visibility");
    el.style.removeProperty("animation-name");
  });
  doc.querySelectorAll("a[href]").forEach((node) => {
    const link = node as HTMLAnchorElement;
    const href = link.getAttribute("href") || "";
    if (href.includes("/index.html")) link.setAttribute("href", "./");
    if (href.includes("/sobre.html")) link.setAttribute("href", "sobre");
    if (href.includes("/blog.html")) link.setAttribute("href", "insights");
    if (href.includes("/contato.html")) link.setAttribute("href", "contato");
    if (href.includes("/blog-direitos-concessionaria")) link.setAttribute("href", "blog-direitos-concessionaria");
    if (href.includes("/blog-nova-regulamentacao")) link.setAttribute("href", "blog-nova-regulamentacao");
    if (href.includes("/blog-6-duvidas")) link.setAttribute("href", "blog-6-duvidas");
    if (href.includes("/blog-aterramento")) link.setAttribute("href", "blog-aterramento");
  });
  return doc.body.innerHTML;
}

function UnifiedLegacyPage({ page, eyebrow, title, text }: { page: keyof typeof legacyPageFiles; eyebrow: string; title: string; text: string }) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    let active = true;
    fetch(`${assetBase}legacy-pages/${legacyPageFiles[page]}`)
      .then((response) => response.text())
      .then((raw) => { if (active) setHtml(cleanLegacyHtml(raw)); })
      .catch(() => { if (active) setHtml("<p>ConteÃºdo temporariamente indisponÃ­vel.</p>"); });
    return () => { active = false; };
  }, [page]);
  return (
    <main className="page-main unified-page">
      <section className="page-hero legacy-unified-hero">
        <div>
          <p className="kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <div className="page-hero-mark" />
      </section>
      <article className="legacy-unified-content" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

function BlogArticlePage({ page }: { page: keyof typeof legacyPageFiles }) {
  const titles: Record<string, string> = {
    "blog-direitos-concessionaria": "Direitos perante a concessionÃ¡ria",
    "blog-nova-regulamentacao": "Nova regulamentaÃ§Ã£o e energia solar",
    "blog-6-duvidas": "6 dÃºvidas sobre energia solar",
    "blog-aterramento": "Aterramento e seguranÃ§a elÃ©trica",
  };
  return <UnifiedLegacyPage page={page} eyebrow="Blog" title={titles[page] || "Blog"} text="Artigo original da Renovera, integrado ao portal com o mesmo cabeÃ§alho e rodapÃ© globais." />;
}

function LegalPage({ type }: { type: "privacy" | "terms" | "ethics" }) {
  const content = {
    privacy: ["PolÃ­tica de Privacidade", "A Renovera utiliza os dados enviados em formulÃ¡rios apenas para contato comercial, triagem tÃ©cnica e retorno sobre solicitaÃ§Ãµes feitas pelo prÃ³prio usuÃ¡rio."],
    terms: ["Termos de Uso", "As informaÃ§Ãµes deste site tÃªm carÃ¡ter institucional e nÃ£o substituem anÃ¡lise tÃ©cnica, regulatÃ³ria ou comercial especÃ­fica para cada projeto."],
    ethics: ["Canal de Ã‰tica", "Use este canal para relatar situaÃ§Ãµes que exijam anÃ¡lise Ã©tica, transparÃªncia ou integridade. O contato inicial pode ser feito pelo e-mail oficial da Renovera."],
  }[type];
  return <main className="page-main"><PageHero title={content[0]} text={content[1]} /><article className="article-body"><p>Contato oficial: <a href={`mailto:${email}`}>{email}</a>.</p><p>EndereÃ§o: {address}.</p></article></main>;
}


function CookieBanner({ path }: { path: string }) {
  const cookieKey = "renovera-cookie-consent";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (path !== "/") {
      setVisible(false);
      return;
    }
    setVisible(localStorage.getItem(cookieKey) !== "accepted");
    (window as typeof window & { clearRenoveraCookieConsent?: () => void }).clearRenoveraCookieConsent = () => {
      localStorage.removeItem(cookieKey);
      setVisible(true);
    };
  }, [path]);
  if (!visible) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <p>Ao acessar o site vocÃª concorda com o uso de cookies para melhorar a sua experiÃªncia de navegaÃ§Ã£o. Para saber mais acesse a nossa <a href="politica-de-privacidade">PolÃ­tica de Privacidade</a>.</p>
      <button type="button" onClick={() => { localStorage.setItem(cookieKey, "accepted"); setVisible(false); }}>Continuar e fechar</button>
    </div>
  );
}

function Footer() {
  return <SiteFooter logoSrc={renoveraAsset("logo.png")} whatsappHref={whatsapp} privacyHref={`${assetBase}politica-de-privacidade`} termsHref={`${assetBase}termos-de-uso`} />;
}

function BackToTop({ visible }: { visible: boolean }) {
  return (
    <button className={`back-to-top ${visible ? "visible" : ""}`} type="button" aria-label="Voltar ao inÃ­cio da pÃ¡gina" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5 5.5 11.5l1.42 1.42L11 8.84V20h2V8.84l4.08 4.08 1.42-1.42L12 5Z" />
      </svg>
    </button>
  );
}

function App() {
  const [path, setPath] = useState(routePath());
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    if (path !== "/segmentos") return;
    window.history.replaceState({}, "", `${assetBase}solucoes`);
    setPath("/solucoes");
  }, [path]);
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("section, article, .page-hero, .solution-detail"));
    targets.forEach((target, index) => {
      target.classList.add("reveal");
      if (index % 3 === 1) target.classList.add("reveal-delay-1");
      if (index % 3 === 2) target.classList.add("reveal-delay-2");
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
      const nextUrl = new URL(href, href.startsWith("/") ? window.location.origin : `${window.location.origin}${assetBase}`);
      event.preventDefault();
      window.history.pushState({}, "", nextUrl.pathname + nextUrl.search);
      setPath(routePath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onPop = () => setPath(routePath());
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("popstate", onPop); };
  }, []);
  useEffect(() => {
    const data = meta[path] || meta["/"];
    document.title = data.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", data.description);
  }, [path]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const page = useMemo(() => {
    if (path === "/solucoes") return <SolutionsPage />;
    if (path === "/segmentos") return <SolutionsPage />;
    if (path === "/cases") return <CasesPage />;
    if (path === "/sobre") return <AboutPage />;
    if (path === "/contato") return <ContactPage />;
    if (path === "/blog" || path === "/insights") return <InsightsPage />;
    if (path === "/blog-direitos-concessionaria") return <BlogArticlePage page="blog-direitos-concessionaria" />;
    if (path === "/blog-nova-regulamentacao") return <BlogArticlePage page="blog-nova-regulamentacao" />;
    if (path === "/blog-6-duvidas") return <BlogArticlePage page="blog-6-duvidas" />;
    if (path === "/blog-aterramento") return <BlogArticlePage page="blog-aterramento" />;
    if (path === "/politica-de-privacidade") return <LegalPage type="privacy" />;
    if (path === "/termos-de-uso") return <LegalPage type="terms" />;
    if (path === "/canal-de-etica") return <LegalPage type="ethics" />;
    return <Home />;
  }, [path]);
  return (
    <>
      <Header />
      {page}
      <Footer />
      <CookieBanner path={path} />
      <BackToTop visible={showTop} />
      <FloatingWhatsApp href={wa("Olá, Renovera. Gostaria de conversar sobre uma solução de energia para minha operação.")} />
      <PageProgress />
      <ScrollToTop />
    </>
  );
}

export default App;
