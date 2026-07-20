# BIQADX site — rebuild to the Metasurface Content Master (v1.0, 19 Jul 2026)

The master doc (`BIQADX_METASURFACE_FOCUSED_WEBSITE_CONTENT_MASTER.docx`) supersedes
the earlier Rev 2.0 draft. It makes the site the explicit **METACARD + OMEGA-PRO +
UDOS** platform, defines ~20 pages, and tightens compliance. This plan folds it onto
the existing foundation (design system, motion, components, contact, compliance
furniture all reused).

## Defaults chosen (no answer given)
- **Scope: Core-first.** Build 9 core pages now, expand to the rest after.
- **Entity name: "BIQADX Private Limited"** (master). Keep CIN `U32500DL2025PTC458561`
  but mark `TODO(verify)` — master Appendix C requires confirming name + CIN.

## Global rebrand (applies to every page)
- Company: **BIQADX Private Limited**. Products: **METACARD™**, **OMEGA-PRO**, **UDOS**.
- Primary H1/positioning: "Metasurface-Integrated Diagnostics for Decentralized Healthcare"; brand line "Engineering the Diagnostic Surface".
- Stage label (nav pill + pages): **"Research · Prototype · Engineering Development"**.
- Standard short disclaimer + R&D-stage notice component, shown on product/tech pages, each linking to `/legal/development-stage`.
- Primary CTA everywhere = **"Partner With BIQADX"** (never sales language).
- Footer + legal block rewritten from master page 20 (full public disclaimer) + short disclaimer; entity line flagged.
- Founders: Arun Kumar — Founder & CEO; Dilranjan Kumar Patel — Co-Founder & CTO.

## Routes / nav (core-first)
Nav: **Platform** (Metasurface Diagnostics · METACARD · OMEGA-PRO · How it Works) · **About** · **Partners** · **Contact**, CTA "Partner With BIQADX".

Phase 1 — core (build now):
`/` · `/about` · `/metasurface-diagnostics` · `/metacard` · `/omega-pro` · `/how-it-works` · `/partners` · `/contact` · `/legal/development-stage`

Phase 2 — expand:
`/measurement-methods` · `/quality-validation` · `/udos` · `/test-roadmap` · `/ip-engineering` · `/sustainability` · `/impact` · `/careers` · `/insights` · `/faq` · `/media`

Old routes are repurposed/redirected: `/technology`→`/metasurface-diagnostics`, `/company`→`/about`, `/work-with-us`→`/partners`, `/opportunity`→folded into Home/Impact (next.config redirects to avoid dead links).

## Content
Each page's page-ready copy (H1, hero lead, sections, CTAs, per-page notice) comes
verbatim/near-verbatim from the master and is centralized in `lib/copy.ts`. "Developer
note / publishing control / verification required" text is internal — never rendered.

## Compliance (master §1 + Appendix A) — enforced in copy + grep
Research/prototype/engineering-development only; no clinical, regulatory, or sales
claims; no invented scale; "patent filed ≠ granted" (don't label granted or under
examination without evidence); numeric-claim control (label targets, omit risky
numbers); terminology control (metasurface vs micro-optical element vs thin-film
filter); no confidential engineering (zone maps, stacks, formulations, algorithms).
Contact form must NOT collect patient data and must not offer "book a test".

## Reused visuals mapped to the platform
- Immersive exploded-card hero → METACARD zones/layers assembling.
- Metasurface canvas → the "what a metasurface contributes" science.
- Reader + card "one system" → METACARD (disposable) + OMEGA-PRO (reusable).

## Reconcile / TODO(verify) before launch (master Appendix C)
Legal name + CIN · founder titles/bios · official email · office address · any
DPIIT/grant/award/patent statement · privacy/cookie/terms counsel review.

## Verification
Rebuild + `next start :3001`; DOM-check each page's H1/sections; stage label + footer
disclaimer + disclaimer link on every page; compliance grep (emoji, "granted",
sales words, patient-data fields); contact form categories/fields + no patient data.
