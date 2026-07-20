# BIQADX — Metasurface-Integrated Diagnostics platform site

Marketing/education site for **BIQADX Private Limited** — the **METACARD** cartridge,
**OMEGA-PRO** analyzer and **UDOS** software-control platform. Content source of
truth: `BIQADX_METASURFACE_FOCUSED_WEBSITE_CONTENT_MASTER.docx` (v1.0). Visual-first,
minimal-text, research-stage honest.

## Stack
Next.js 14 (App Router, TS) · Tailwind (tokens only) · Framer Motion (site-wide
reveals) · GSAP + ScrollTrigger (Home hero only, code-split) · Lenis (smooth scroll)
· Canvas (metasurface visual). Fonts: Space Grotesk / IBM Plex Sans / IBM Plex Mono.

## Develop
```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```
Add `?static=1` to any URL to preview the reduced-motion / no-scroll-hijack view;
`?debug=1` exposes the Home hero timeline on `window.__bqTL`.

## Routes
Home · /about · /metasurface-diagnostics · /metacard · /omega-pro · /udos ·
/how-it-works · /measurement-methods · /quality-validation · /test-roadmap ·
/ip-engineering · /sustainability · /impact · /partners · /careers · /insights ·
/faq · /media · /contact · /legal/development-stage · /privacy /terms /cookies
/accessibility · /404 · /search. Old Rev2 routes 307-redirect (see `next.config.mjs`).

## Deployment (pick one — set before launch)
- **A · Hostinger Node.js (default, recommended).** SSR + the `/api/contact` route.
  Set env vars in hPanel. No config change needed.
- **B · Static export.** In `next.config.mjs` set `output: 'export'`, remove
  `app/api/contact`, and repoint `ContactForm` at a third-party form service
  (e.g. Formspree). `next.config` redirects don't apply to static export —
  reproduce them at the host.
- **C · VPS.** `output: 'standalone'` + Node/PM2/Nginx/Certbot.

## Env (`.env.local`, not committed — see `.env.local.example`)
- `CONTACT_DELIVERY_WEBHOOK` — where `/api/contact` forwards messages. **Until set,
  the form returns an honest "inbox not live yet" message and never fakes success.**

## Compliance (master §1 + Appendix A) — do not violate
Research/prototype/engineering-development only · no clinical/regulatory/sales
claims · no invented scale · "patent filed" is never "granted" · terminology
discipline (metasurface vs micro-optical element) · no confidential engineering ·
contact form must never collect patient data or offer "book a test" · no emoji.
Shared copy + stage furniture live in `lib/copy.ts`; the stage pill, footer badges
and development-stage disclaimer render on every page.

## Before launch — `TODO(verify)` (master Appendix C)
Legal name + CIN · founder titles/bios · official contact email · office address ·
any patent/DPIIT/grant/award statement · counsel review of privacy/terms/cookies and
the development-stage disclaimer.

## Assets to supply
- Images: generate per `IMAGE_BRIEF.md`, drop in `public/images/`; then wired into
  `lib/images.ts` + the `<ImageSlot>`s.
- Scroll "assemble" motion (optional): see `MOTION_BRIEF.md`.
