# CLAUDE.md — BIQADX website

Guidance for any Claude session working in this repo. Read this first.

## What this is
Marketing/informational website for **BIQADX** — an India-based, research/prototype-stage
deep-tech healthcare company building a **metasurface-integrated diagnostic platform**:
- **METACARD** — a card-format diagnostic cartridge (the disposable "does part of the measurement").
- **OMEGA-PRO** — the reusable cooperative analyzer that reads the card.
- **UDOS** — the deterministic software/control layer (validity-gated output).

Positioning line: *"Metasurface-Integrated Diagnostics for Decentralized Healthcare."*
Design intent: **image-led, visual, minimal text, scroll animation** — professional, real (not AI-looking).

## Commands
```bash
npm install
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build (must stay green)
npm run start -- -p 3001   # serve the production build
npm run lint
```

## Verifying changes (important gotchas)
Screenshots and scroll animations **do not play in the automation/preview browser** — it pauses
`requestAnimationFrame` and `IntersectionObserver`. So:
- Verify by **reading the DOM** (`javascript_tool`) and checking content/structure + `read_console_messages`, not by watching motion. Count-ups/reveals run fine for real visitors.
- Always **verify against a production build**: `npm run build` then serve on port **3001**.
- **Restart the prod server after every rebuild** (kill port 3001 first). Reusing an old server against fresh chunks causes a `ChunkLoadError` (stale — not a real bug).

## Tech stack
Next.js 14 (App Router, TS) · Tailwind (tokens only) · Framer Motion (reveals, `whileInView`,
count-ups) · GSAP + ScrollTrigger (home "See it work" scrub, dynamically imported) · Lenis
(smooth scroll) · `next/image` + `sharp`.

## Where things live
- `app/` — one folder per route (`page.tsx`). Home = `app/page.tsx`.
- `components/layout/` — `Nav`, `Footer`, `StagePill`, `StageBadges`, `LegalBlock` (compliance furniture).
- `components/home/` — home sections: `HeroSlider`, `PlatformShowcase`, `HowItWorksScroll`, `Journey`, `ValidityGate`, `ResearchScope`.
- `components/diagrams/` — the site's line drawings (`Diagram` frame + one file per drawing) and `DiagramPlate`, the dark band they sit on.
- `components/platform/PlatformPage.tsx` — **shared template for all 8 Platform pages** (data-driven).
- `components/ui/` — `PageHero`, `PaperSection`/`VoidBand`, `ContentSection`, `FigureBand`, `ImageSlot`, `Container`.
- `components/motion/` — `LenisProvider`, `Reveal`.
- `lib/copy.ts` — **all site copy** (brand, messaging, stage/disclaimer, nav, footer, CTAs, contact, JSON-LD). Edit content here.
- `lib/images.ts` — **image manifest** (`id → {src, alt, caption}`). Wiring an image = one entry here.
- `lib/tokens.ts`, `lib/motion.ts` — design tokens, `motionDisabled()`.
- `public/images/` — image assets.

## Design system
Colors (CSS vars, `app/globals.css`): Void `#0B0E14` (dark bg), Graphite `#1A1F2B`, Paper
`#F5F3EE` (light subpage bg), Signal `#E8ECEF` (text on dark), Ink `#0B0E14` (text on paper),
Prism gradient `#6EE7F0→#A78BFA→#F2C879` (light-refraction accents ONLY, never a flat fill/button).
Fonts: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels/mono).
Layout: **Home = dark/Void cinematic. Subpages = light "Paper" content with dark cinematic image bands** (decided with the client). Nav header is a solid dark bar (`rgba(11,14,20,0.92)` inline — do NOT use `bg-void/xx`, the alpha modifier renders transparent for the `void` token).

## ⚠️ Compliance — non-negotiable (from the master doc, §1 + Appendix A)
This is a research-stage medical company. **Never** add, and always remove:
- Clinical / regulatory / sales claims. No accuracy, sensitivity, specificity, "approved",
  "available now", "buy/order", CDSCO/CE/FDA/ISO, deployed sites, revenue, team size.
- Fabricated clinical data or results.
- Present everything as research / prototype / engineering-development / future-validation.
- "Patent filed" is never "granted".
- No emoji/pictographs.
- The stage label, four stage badges, short disclaimer, and a link to `/legal/development-stage`
  appear on **every** page (via the shared Nav/Footer).
- **Images**: no text/words/numbers/logos/UI in the image; **no device screen showing a result**
  (a fake "Negative"/checkmark screen got two images rejected — see manifest); people are generic
  and respectful (never a real founder portrait); screens are off/dark.

## Content source of truth
`BIQADX_METASURFACE_FOCUSED_WEBSITE_CONTENT_MASTER.docx` (in the owner's Downloads, v1.0) — 20 pages.
When redesigning a page, reconcile its copy against this doc. Extract text with:
`unzip -o <docx> word/document.xml` then parse `<w:t>` runs (see prior sessions).

## Image workflow (placeholders → real images)
Pages use `<ImageSlot id="…" alt="…" ratio="16/9" />`. If `lib/images.ts` has that `id`, the real
image renders; otherwise a labelled placeholder shows. **To wire an owner-supplied image:**
1. Copy the PNG into `public/images/`.
2. Add one line to `lib/images.ts`: `"<id>": { src: "/images/<file>.png", alt: "…", caption: "…" }`.
3. If it is a **hero** image, set its `brightness` too — run `node scripts/hero-exposure.mjs`
   and copy the recommended value. Hero photos arrive anywhere from mean level 24 to 109, so
   `PageHero` exposes each one individually; one shared multiplier either leaves the dark frames
   dark or blows the bright ones to white. Re-check hero text contrast after changing it.
4. Rebuild + restart the prod server.
`IMAGE_MANIFEST.md` = the list of images still to generate, each with a compliant, paste-ready prompt.
The owner generates images and hands them back by filename.

## Platform pages
All 8 (`metasurface-diagnostics`, `metacard`, `omega-pro`, `how-it-works`, `measurement-methods`,
`quality-validation`, `udos`, `test-roadmap`) share **one flow** via `PlatformPage`:
`hero → signature image band → visual blocks (grid | chips | list | note | band) → R&D notice → CTA`.
Each page is just a `BLOCKS` data array + props. Change the template once → all 8 update.

## Status & tracking
- `REDESIGN_PROGRESS.md` — per-page redesign status (Home + Platform menu done; Company/Partners/
  FAQ/Contact/Insights/Media/Legal pending).
- `IMAGE_MANIFEST.md` — images to generate (pending placeholders + prompts).
- Other docs: `README.md`, `IMAGE_BRIEF.md`, `MOTION_BRIEF.md`, `REBUILD_PLAN.md`.

## Flags before launch (do not silently ship)
- Legal pages marked "Draft — pending counsel review".
- Contact email / entity CIN are `TODO(verify)` placeholders in `lib/copy.ts`.
- Deployment path is agnostic (defaults to Next.js `/api/contact`; env `CONTACT_DELIVERY_WEBHOOK`).
- Some placeholder images still pending (see `IMAGE_MANIFEST.md`).
