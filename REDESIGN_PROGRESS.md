# Redesign Progress — image-led + animated, checked against the master doc

**Approach:** each page's content is reconciled against `BIQADX_METASURFACE_FOCUSED_WEBSITE_CONTENT_MASTER`,
then made image-led + animated like the home page. New relatable images use `<ImageSlot id="…">`
(placeholder until generated); prompts live in `IMAGE_MANIFEST.md`; wiring = one line in `lib/images.ts`.

**Verification per page:** `npm run build` clean · content matches doc · compliance holds · no console errors.
(Scroll animations don't *play* in the preview browser — rAF/IntersectionObserver are paused there — so they're
verified by structure/content; they run for real visitors.)

| # | Page | Route | Status |
|---|------|-------|--------|
| 01 | Home | `/` | ✅ done |
| 02 | About | `/about` | ✅ redesigned (awaiting `about-clinic-first.png`) |
| 03 | Metasurface Diagnostics | `/metasurface-diagnostics` | ✅ redesigned (awaiting `metasurface-fab.png`) |
| 04 | METACARD Cartridge | `/metacard` | ✅ redesigned (awaiting `metacard-manufacturing.png`) |
| 05 | OMEGA-PRO Analyzer | `/omega-pro` | ✅ redesigned (awaiting `omega-engineering.png`) |
| 06 | How the Platform Works | `/how-it-works` | ✅ redesigned (awaiting `howitworks-sequence.png`) |
| 07 | Measurement Methods | `/measurement-methods` | ✅ redesigned (awaiting `methods-optics.png`) |
| 08 | Quality, Calibration & Validation | `/quality-validation` | ✅ redesigned (awaiting `quality-metrology.png`) |
| 09 | UDOS Software & Data Integrity | `/udos` | ✅ redesigned (awaiting `udos-control.png`) |
| 10 | Test & Assay Roadmap | `/test-roadmap` | ✅ redesigned (awaiting `roadmap-families.png`) |

**Platform menu (8 pages) complete + unified.** All 8 now share one consistent, image-led flow
via `components/platform/PlatformPage.tsx` (hero → signature image band → visual blocks → notice → CTA).
Header transparency bug fixed (Nav.tsx).

**Platform signature images:** metasurface / metacard / omega-pro use existing renders (registered in
`lib/images.ts`). Still pending (placeholders): `howitworks-sequence`, `methods-optics`,
`quality-metrology`, `udos-control`, `roadmap-families`. The `metasurface-fab` / `metacard-manufacturing`
/ `omega-engineering` prompts in the manifest are now OPTIONAL upgrades (swap the concept renders for real photos).
| 11 | IP & Engineering | `/ip-engineering` | ◻︎ |
| 12 | Sustainability | `/sustainability` | ◻︎ |
| 13 | Intended Healthcare Impact | `/impact` | ◻︎ |
| 14 | Partners & Collaboration | `/partners` | ◻︎ |
| 15 | Careers | `/careers` | ◻︎ |
| 16 | Insights | `/insights` | ◻︎ |
| 17 | FAQ | `/faq` | ◻︎ |
| 18 | Media | `/media` | ◻︎ |
| 19 | Contact | `/contact` | ◻︎ |
| 20 | Development Stage / Legal | `/legal/development-stage` | ◻︎ |
