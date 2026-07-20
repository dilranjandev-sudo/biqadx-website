// Shared, compliance-checked copy for the BIQADX platform site.
// Source of truth: BIQADX Metasurface-Focused Website Content Master v1.0.
// Page body copy is co-located in each page; this file holds the global shell,
// messaging library, stage/disclaimer language, nav and footer.
//
// Compliance (master §1 + Appendix A): research/prototype/engineering-development
// only; NO clinical, regulatory, or sales claims; no invented scale; "patent
// filed" is never "granted"; no confidential engineering; no emoji/pictographs.

export const brand = {
  name: "BIQADX",
  // TODO(verify): master says "BIQADX Private Limited"; earlier registration docs
  // say "BIQADX Diagnostics Private Limited · CIN U32500DL2025PTC458561".
  // Confirm legal name + CIN with counsel before launch (master Appendix C).
  legalName: "BIQADX Private Limited",
  location: "New Delhi, India",
  products: { card: "METACARD", analyzer: "OMEGA-PRO", software: "UDOS" },
} as const;

export const messaging = {
  headline: "Metasurface-Integrated Diagnostics for Decentralized Healthcare",
  brandStatement: "Engineering the Diagnostic Surface",
  oneLine:
    "BIQADX Private Limited is an India-based deep-tech healthcare R&D company developing metasurface-integrated diagnostic cartridges, cooperative analyzers and responsible medical technologies for future decentralized testing.",
  boilerplate:
    "BIQADX is developing METACARD and OMEGA-PRO, a research-stage diagnostic platform that moves selected optical, fluidic, sensing, calibration and identity functions into an intelligent cartridge while retaining controlled illumination, detection, actuation and quality logic in a reusable analyzer.",
  primaryMessage:
    "BIQADX is engineering diagnostic surfaces that make the disposable cartridge an active part of measurement — not merely a container for sample and reagents.",
} as const;

export const stage = {
  // Short label for the nav pill; full label used on page heroes/notices.
  pill: "Research · Prototype",
  label: "Research · Prototype · Engineering Development",
  badges: [
    "Research stage",
    "Prototype",
    "Engineering development",
    "Not for sale or diagnostic use",
  ],
  shortDisclaimer:
    "Research-stage platform under engineering development. No clinical validation, regulatory approval or commercial availability is claimed.",
  notice:
    "This content describes research-stage, prototype-stage and engineering-development work. It does not claim clinical validation, regulatory approval, commercial availability or suitability for patient diagnosis.",
} as const;

export const cta = {
  primary: { label: "Partner With BIQADX", href: "/partners" },
  secondary: { label: "Explore the Metasurface Platform", href: "/metasurface-diagnostics" },
} as const;

export const announcement =
  "Research · Prototype · Engineering Development — serious research and engineering collaboration welcome.";

export const nav = {
  brand: brand.name,
  // Dropdown groups, then direct links.
  groups: [
    {
      label: "Platform",
      items: [
        { label: "Metasurface Diagnostics", href: "/metasurface-diagnostics" },
        { label: "METACARD Cartridge", href: "/metacard" },
        { label: "OMEGA-PRO Analyzer", href: "/omega-pro" },
        { label: "UDOS Software", href: "/udos" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Measurement Methods", href: "/measurement-methods" },
        { label: "Quality & Validation", href: "/quality-validation" },
        { label: "Test Roadmap", href: "/test-roadmap" },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Intended Impact", href: "/impact" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "IP & Engineering", href: "/ip-engineering" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ],
  links: [
    { label: "Partners", href: "/partners" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: cta.primary,
} as const;

export const footer = {
  tagline: messaging.brandStatement,
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Metasurface Diagnostics", href: "/metasurface-diagnostics" },
        { label: "METACARD Cartridge", href: "/metacard" },
        { label: "OMEGA-PRO Analyzer", href: "/omega-pro" },
        { label: "UDOS Software", href: "/udos" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Measurement Methods", href: "/measurement-methods" },
        { label: "Quality & Validation", href: "/quality-validation" },
        { label: "Test Roadmap", href: "/test-roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Intended Impact", href: "/impact" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "IP & Engineering", href: "/ip-engineering" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Partners", href: "/partners" },
        { label: "Insights", href: "/insights" },
        { label: "FAQ", href: "/faq" },
        { label: "Media", href: "/media" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Transparency",
      links: [
        { label: "Development-stage disclaimer", href: "/legal/development-stage" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ],
  disclaimerHref: "/legal/development-stage",
  // Visible entity line (CIN intentionally omitted publicly per master — publish
  // only after legal confirmation). TODO(verify) name before launch.
  entity: `© 2026 ${brand.legalName} · ${brand.location}.`,
} as const;

// Full public disclaimer (master page 20) — for /legal/development-stage.
export const developmentStageDisclaimer = {
  title: "Development Stage and Website Information Disclaimer",
  intro: [
    "BIQADX product names, program names, concepts, visual representations, described functions, use cases, scientific mechanisms, specifications, roadmaps and technical architectures represent research-stage, concept-stage, prototype-stage, engineering-development or future-validation-planning work unless a specific statement is supported by independently verifiable evidence and formally authorized for publication.",
    "Nothing on this website should be interpreted as a claim of completed analytical validation, clinical validation, diagnostic accuracy, clinical utility, patient benefit, regulatory authorization, quality-system certification, manufacturing release, commercial availability, hospital deployment, government adoption or fitness for routine patient testing.",
    "All dimensions, wavelengths, sample volumes, test counts, zone counts, turnaround targets, materials, algorithms, assay examples, performance expectations, cost estimates, manufacturing approaches and product configurations are subject to change through design control, experimentation, risk management, supplier development, validation and regulatory review.",
    "A scientific mechanism, simulation, patent filing, engineering drawing, prototype image, benchtop result or component measurement does not by itself establish the safety or performance of a complete diagnostic product. Each intended-use configuration requires appropriate analytical, clinical, manufacturing, software, usability, safety and regulatory evidence.",
    "BIQADX technologies described on this website are not offered for sale, procurement, deployment, self-testing, patient diagnosis or treatment decisions unless BIQADX expressly announces a specific product and provides the relevant authorization and intended-use information.",
    "This website does not provide medical advice, diagnosis, treatment recommendations, laboratory interpretation or emergency guidance. Users should consult qualified healthcare professionals for medical questions.",
    "Patent-pending, patent-filed or intellectual-property statements refer to legal-development activity and do not imply patent grant, freedom to operate, product validation, regulatory approval or commercial readiness. Patent details are subject to official-record verification.",
    "BIQADX may modify, restructure, postpone, discontinue or advance any program as research, funding, partnerships, validation, regulation and business priorities evolve.",
  ],
  sections: [
    {
      heading: "Website privacy boundary",
      body: "Public website forms should collect only the information necessary to respond to professional inquiries. They must not solicit patient data, medical records, diagnostic results, biological-sample information or other sensitive health information. A lawyer-reviewed privacy policy, cookie policy and terms of use should be published before launch based on the actual website technology and data flows.",
    },
    {
      heading: "Intellectual-property and content use",
      body: "BIQADX names, technical descriptions, documents, diagrams, images and platform concepts may be protected by trademark, copyright, patent, confidentiality and other rights. Public website access does not grant a license to reproduce confidential engineering, reverse-engineer prototypes, use BIQADX branding or make unauthorized clinical or commercial claims.",
    },
  ],
} as const;

// Contact inquiry categories (master page 19). Shared by the form + API so they
// never drift. Order matters (index used for nothing else).
export const contactCategories = [
  "Investment and strategic funding",
  "Research and academic collaboration",
  "Metasurface, nanofabrication and optical-coating collaboration",
  "Cartridge, microfluidic and manufacturing collaboration",
  "Assay development and reagent partnership",
  "Analyzer, electronics, software and systems engineering",
  "Clinical advisory and validation collaboration",
  "Quality and regulatory advisory",
  "Incubator, grant and public-health program",
  "Media and public information",
  "Careers and talent interest",
  "General inquiry",
] as const;

export const contact = {
  hero: {
    title: "Contact BIQADX",
    lead: "One official channel — for investment, research, engineering, media or talent.",
  },
  success: "Thank you — your message is on its way. We'll be in touch.",
  location: "New Delhi, India",
  website: "biqadx.com",
  // Master: forms must not collect patient/health data or offer "book a test".
  privacyNote:
    "This form is for professional inquiries only. Please do not submit patient information, medical records, diagnostic reports or biological-sample details.",
} as const;

// Honest Organization schema — no clinical/regulatory/patent-grant claims.
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.legalName,
  legalName: brand.legalName,
  url: "https://biqadx.com",
  description: messaging.oneLine,
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
} as const;
