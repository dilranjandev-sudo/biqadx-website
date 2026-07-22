# BIQADX website — what to improve next

Written 22 July 2026, against the site as it stands at commit `14fef2d`.

This is an opinionated list, ordered by what actually costs the company something
today rather than by what is most fun to build. Every item says what it is, why
it matters here specifically, and roughly what it costs. Where something would
break the compliance rules in `CLAUDE.md`, that is called out rather than left
for someone to discover later.

---

## 0. Read this first — three things are currently broken

These are not enhancements. They are grounded in the current code and each one
loses the company something real. Nothing below section 0 is worth doing before
these are done.

### 0.1 The contact form does not deliver anything · **critical**

`app/api/contact/route.ts:49` reads `CONTACT_DELIVERY_WEBHOOK` from the
environment. It is not set, so every submission logs
`"Message NOT delivered"` and returns 503. The form is linked from the footer of
all 24 pages, from `/partners`, and from `/careers`.

Every partner, investor, researcher and candidate inquiry submitted so far has
been dropped. For a company whose entire site is a call to collaborate, this is
the single most expensive defect on it.

**Fix:** set the env var to a delivery endpoint, or replace the webhook with a
direct email send. Then submit a real test inquiry and confirm it arrives.
**Cost:** under an hour. **Do this first.**

### 0.2 No social preview image · **high**

`app/layout.tsx` sets `metadataBase` and an `openGraph` block, but there is no
`opengraph-image` file. Every link shared on WhatsApp, LinkedIn, X or Slack —
which is how a deep-tech company actually gets read — renders as a bare grey
box.

**Fix:** add `app/opengraph-image.tsx` (Next generates the PNG at build time) or
a static 1200×630 image. Use an existing vetted photograph plus the wordmark.
Same compliance rules apply: no device screen showing a result, no claims.
**Cost:** an hour or two.

### 0.3 Search does not search

`/search` ignores its `q` parameter entirely and renders the nav as a sitemap —
which its own comment is honest about. A visitor who types a query gets a list of
every page, unfiltered. That is worse than no search box, because it looks like
it answered.

**Fix:** either filter the page list by the query (an hour — build a small static
index of title + description + headings at build time), or remove the search
entry point until it works. See §6.1 for the ambitious version.

### 0.4 Also outstanding, already known

- `lib/copy.ts:12` — legal name and CIN are `TODO(verify)`. Two sources disagree.
  This is on public pages; confirm with counsel.
- Legal pages are marked *"Draft — pending counsel review"*. Do not launch on those.
- `insights-desk` and `media-portrait` hero photographs still to be delivered
  (prompts in `HERO_IMAGES.md`).
- There is no analytics of any kind. Nothing below can be evaluated without it —
  see §5.4.

---

## 1. Motion and animation

The site already has a strong motion vocabulary: Lenis smooth scroll, GSAP
ScrollTrigger for the home "See it work" rail, Framer Motion reveals and
count-ups, `ParallaxFrame` on hero photographs, the how-it-works timeline that
fills node by node. The gaps are not "add more motion" — they are places where
motion is *absent and would carry meaning*.

### 1.1 Page transitions · **high value, low cost**

Every navigation is currently a hard cut. On a site whose whole argument is that
eight platform pages are one connected system, the cut works against the story.

Use the **View Transitions API**. In Next 14 it is a few lines, it degrades to
today's hard cut in browsers that lack it, and it is disabled automatically under
`prefers-reduced-motion`. The high-value version is a *shared-element* transition:
clicking METACARD on the home page morphs the card photograph into the
`/metacard` hero rather than replacing it.

**Cost:** half a day for the basic cross-fade, two days for shared elements.

### 1.2 Replace some JS scroll work with CSS scroll-driven animations

`ScrollReveal` runs an IntersectionObserver per element, and the hero parallax
runs a Framer spring per hero. Both can now be expressed in pure CSS with
`animation-timeline: view()`, which runs on the compositor rather than the main
thread — smoother on mid-range Android, which matters for an India-first product.

Keep the existing components as the fallback: `@supports (animation-timeline: view())`.
Do **not** rip out `ScrollReveal` — its "visible unless JS explicitly hides it"
design is deliberate and has already prevented one invisible-content bug.

**Cost:** a day. **Priority:** medium — a refinement, not a fix.

### 1.3 A number that counts what is real

The home page has count-ups. Consider one honest, specific figure presented as a
research metric — *fourteen measurement-physics families*, *eight controlled
steps*, *four validity conditions*. These are architecture facts, not performance
claims, so they are safe. Avoid anything that reads as scale or traction.

### 1.4 Cursor-reactive metasurface

`components/visuals/Metasurface.tsx` already exists. A subtle iridescence that
shifts with pointer position — on the home hero or the brand moment — is
*literally* what the product does: a surface whose optical response depends on
angle. It is the rare decorative effect that is also an explanation.

Guard it behind `prefers-reduced-motion` and `(pointer: fine)`.
**Cost:** a day.

### 1.5 Motion that is missing where it would help most · **done**

- **The footer CTA** had no motion at all — the last headline on every page was
  the only one on the site that arrived already finished. It now rises in as two
  masked lines, matching the section headlines above it, with the buttons
  following.
- **Form feedback** — sending now shows a spinning arc beside the label, and the
  success panel rises in with its prism rule drawing itself out, instead of the
  form being replaced by a hard cut. The label still carries the state for screen
  readers and under reduced motion; the arc is decorative.
- **Number/stat sections** on the Platform pages turned out to be already
  staggered — `PlatformPage` wraps every grid item in a `ScrollReveal` with a
  per-column delay. Nothing to do.

### 1.6 What NOT to add

- No scroll-jacking beyond the one existing GSAP scrub. Two competing pinned
  sections make a page feel broken.
- No loading/preloader screen. It delays content to show a logo.
- No autoplaying background video with sound, ever.

---

## 2. Images — where they are missing

The photography is now consistent and compliance-checked, and heroes are
individually exposed (`lib/images.ts` → `brightness`). What is missing is a
*different kind* of image, not more of the same.

### 2.1 The site has no diagrams · **highest-value visual gap**

Every visual on the site is a photograph. But the thing being explained —
a metasurface changing a transfer function, a card and reader forming one optical
path, a validity gate with four conditions — is **structural**, and a photograph
of a bench cannot show structure.

Add a small set of **line diagrams**, drawn as inline SVG in the site's own
tokens (Signal on Void, prism gradient for the light path only):

| Diagram | Page | Shows |
|---|---|---|
| Light path: source → metasurface → sample → detector | `/metasurface-diagnostics` | Why the surface is *in* the measurement |
| Card cross-section, layer by layer | `/metacard` | Microfluidics / optical zone / electrode / reference stack |
| Card + reader as one calibrated geometry | `/omega-pro` | Why the pair is cooperative |
| The four validity conditions as a gate | `/udos`, home | Why an invalid run yields no number |
| The fourteen method families as a grid | `/measurement-methods` | Breadth without claiming validation |

Inline SVG animates on scroll (stroke-dashoffset draw-on), costs a few KB, stays
crisp, and is readable by screen readers if labelled. This would do more for
comprehension than any further photography.

**Cost:** two to four days for the set. **Highest recommendation in this document.**

### 2.2 Scroll-scrubbed video for the assembly sequence

`MOTION_BRIEF.md` already specifies this. `components/home/ScrollVideo.tsx` was
written for it and has since been deleted as dead code (§5.1) — restore it from
git rather than rewriting it. A short scrubbed sequence of the card seating into
the analyzer would be the single most impressive moment on the site.

**Caution:** it is also the heaviest thing you could add, and the compliance rules
are stricter for video than stills — no lit result screen at any frame.

### 2.3 Real photographs still worth commissioning

- `insights-desk`, `media-portrait` — already specified, still pending.
- **Macro detail set** — three or four very tight shots of the structured surface
  at different angles, to be used small and repeatedly as texture. Cheap to shoot,
  and they reinforce the one idea the brand rests on.
- **The intended setting** — `/impact` has one clinic photograph. A second and
  third, of genuinely different settings, would stop that page reading as a single
  stock image.

### 2.4 Housekeeping

Images are committed directly to the repo — roughly 80 MB now, and 40 MB was
added in one commit. That is workable but it will not stay workable. Before the
next large batch, decide: Git LFS, or an image CDN. Also convert the PNGs to
AVIF/WebP — most are photographs stored as PNG, which is roughly 3–5× larger than
it needs to be.

---

## 3. Sections and pages worth adding

### 3.1 On existing pages

| Page | Add | Why |
|---|---|---|
| `/metasurface-diagnostics` | "What a metasurface is not" | The term is heavily hyped; distinguishing yourself from the hype *is* the credibility argument |
| `/quality-validation` | A validation-stage ladder — where each claim currently sits | Turns the compliance hedging into a visible discipline instead of a disclaimer |
| `/test-roadmap` | Explicit "what has to happen before any of this is a product" | Same: honesty as differentiation |
| `/about` | The problem statement, told once, properly | Currently the mission is stated abstractly |
| `/partners` | What a first conversation actually looks like | Reduces the friction of the ask |
| `/careers` | How the team works day to day | The page asks for people but does not show the work |

### 3.2 New pages

- **`/glossary`** — metasurface, transfer function, validity gating, cooperative
  analyzer, assay family. The site's vocabulary is genuinely specialised, and a
  glossary is both useful and excellent SEO. **Low cost, high return.**
- **`/faq` for partners specifically** — the current FAQ answers "what is this".
  Serious collaborators ask different questions: IP position, exclusivity,
  NDA process, what stage a partnership can start at.
- **Insights articles** — `/insights` currently says the section goes live when
  articles are published. Nothing is published. Either publish two or three, or
  remove the page until there is something on it. An empty "Insights" reads worse
  than no Insights.

### 3.3 One structural idea

Consider a **"Where we actually are"** page: a single, honest, dated status page
covering what exists, what is simulated, what is built, what is measured, what is
not started. For a research-stage company asking to be trusted, publishing your
own limitations is the strongest possible credibility move — and it costs nothing
but candour. It also gives the site a reason to be updated, which nothing on it
currently has.

---

## 4. AI features

**Read this boundary before building anything in this section.**

BIQADX is a research-stage medical company. The FAQ already states that AI does
not diagnose patients and cannot bypass calibration, controls or validity rules.
Anything shipped on this website must not contradict that. Concretely:

- ❌ No chatbot that answers health, symptom or diagnostic questions.
- ❌ No AI that interprets, predicts or comments on any measurement or result.
- ❌ No "ask our AI about your test" of any form.
- ❌ No generated content published as company statement without human review —
  every word on this site is compliance-reviewed, and that cannot be delegated.

What is left is still genuinely useful.

### 4.1 Semantic site search · **best AI fit for this site**

Replace the non-functional `/search` with embedding-based search over the site's
own already-approved copy. Because it retrieves and links to existing pages
rather than generating prose, it cannot invent a claim — which is exactly the
property this site needs.

Build-time: embed each page's headings and paragraphs, ship the vectors as a
static JSON (this site is small — a few hundred KB). Runtime: embed the query,
cosine-match, link to sections. No server, no per-query cost.

**If you want a generative layer on top**, it must: answer *only* from retrieved
site text, quote and cite the page it came from, refuse anything outside the
site's scope, and never answer a medical question. Log every question — what
people ask is the most valuable market research this company could get for free.

### 4.2 A compliance linter · **highest internal value**

The rules in `CLAUDE.md` §Compliance are precise and mechanical: no accuracy or
sensitivity claims, no "approved" / "available now" / "buy", no CDSCO/CE/FDA/ISO,
no emoji, "patent filed" never "granted". Right now they are enforced by whoever
happens to be reviewing.

Write a check that scans `lib/copy.ts` and every page for the banned patterns and
fails the build. Use an LLM for the judgement calls a regex cannot make — "does
this sentence imply clinical performance?" — as a warning, not a hard failure.

This is the highest-value AI application for this project, because the risk it
reduces is regulatory, not cosmetic. **Cost:** a day for the regex layer, two more
for the LLM reviewer.

### 4.3 Indian-language versions

An India-first product whose site is English-only. Hindi first, then Tamil,
Bengali, Marathi. Machine translation gets you 90% of the way; the remaining 10%
is the compliance-sensitive 10%, so **every translated page needs human review
before publishing** — a mistranslated hedge is a claim.

### 4.4 Inquiry triage

Once `/contact` delivers (§0.1), classify incoming inquiries — partner, investor,
candidate, press, procurement (which must be declined) — and route them. Small,
private, no public-facing risk.

### 4.5 Alt-text drafting — assist only

Alt text can be *drafted* by a model but not shipped by one. The image rules here
are unusually specific and a model will not reliably respect them. Draft, then
review.

---

## 5. Craft, performance and correctness

### 5.1 Delete the dead components · **done**

Thirteen abandoned drafts — 1,329 lines — were in the repo and imported by
nothing. They cost nothing at runtime, since Next tree-shakes them, but they cost
every future reader real time: there is no way to tell an abandoned draft from a
component that is merely between uses.

Deleted: `home/CardExplode`, `home/CardScrollScene`, `home/CinematicHero`,
`home/HomeSystem`, `home/ImmersiveHero`, `home/MeasurementChain`,
`home/MetasurfaceSplit`, `home/ScopeStats`, `home/ScrollVideo`,
`home/ValidityShot`, `layout/AnnouncementBar`, `ui/DevNotice`, `ui/MediaBand`.

Two notes for whoever comes back to this:

- **`ScrollVideo` is gone but §2.2 still wants it.** If the scroll-scrubbed
  assembly sequence gets made, restore it rather than rewriting:
  `git checkout <commit>^ -- components/home/ScrollVideo.tsx`.
- **`components/visuals/Metasurface.tsx` is also dead.** An earlier draft of this
  document said it was in use; that was wrong — nothing imports it. It is still in
  the repo, so either delete it too or wire it into §1.4.

### 5.2 Images: format and weight · **tried, reverted — masters stay PNG**

The conversion was done and then rolled back at the owner's request. Recording
what it measured, so nobody has to redo the work to make the decision again:

- 45 photographs, PNG → AVIF q85: **80.5 MB → 4.9 MB**, a 94% cut.
- Quality cost, measured on the delivered image rather than the source — that is,
  after `next/image` re-encodes, and after the `brightness()` each hero is shown
  at, which is where artifacts surface. Extra error versus serving PNG masters:
  **+0.07 to +0.14 out of 255**, worst case `methods-optics` at ×2.0 brightness.
  Average PSNR across all 45 was 49.3 dB.

So the visual cost was negligible, but it was not zero, and the masters are worth
more than the megabytes. Two things remain true and are the reason to revisit
this if the repo becomes painful:

- It did **not** change what most visitors download. `next/image` already
  re-encodes to AVIF/WebP at request time; the saving was repo, clone and deploy
  weight.
- Switching to `output: 'export'` (Path B in next.config.mjs) removes the
  optimizer entirely, and 1.8 MB PNGs would then be served raw. If that path is
  ever taken, convert as part of the build rather than committing lossy masters.

### 5.3 Test the things that have already broken twice

There are no tests. Given the history in this repo, three would earn their keep:

1. **Contrast** — hero text over every hero photograph. This has been fixed three
   separate times and can regress silently when an image is swapped. The
   arithmetic already exists in `scripts/hero-exposure.mjs`; make it assert.
2. **Compliance** — §4.2, as a build failure.
3. **Every route returns 200 and has exactly one `<h1>`.** Cheap, catches a lot.

### 5.4 Analytics · **needed before judging any of this**

There is none. Nothing in this document can be evaluated without knowing whether
anyone reaches the platform pages, whether the FAQ is read, or where people leave.

The cookie policy already commits to first-party and privacy-preserving with no
third-party advertising cookies — so use something that honours that (Plausible,
Umami, or a self-hosted equivalent). Doing so is also what makes that page true.

### 5.5 Accessibility

Contrast is in good shape and has been measured properly. Two gaps remain:

- The site has never been navigated end to end with a **keyboard only**, or with a
  **screen reader**. The nav has hover-opening dropdowns and the FAQ has custom
  accordions — both are exactly where this goes wrong.
- `prefers-reduced-motion` is handled globally, which is good. Verify it actually
  neutralises the GSAP scrub, not just the CSS.

---

## 6. Newer web-platform features worth using

Ordered by value here, not by novelty.

| Feature | What it gives this site | Cost |
|---|---|---|
| **View Transitions API** | §1.1 — the site's strongest available upgrade | Low |
| **Speculation Rules** | Prefetch on hover; navigation between the eight platform pages becomes instant | Very low |
| **CSS scroll-driven animations** | §1.2 — compositor-thread motion | Medium |
| **`content-visibility: auto`** | Long pages (home, FAQ) skip rendering offscreen sections | Very low |
| **Partial Prerendering (Next)** | Static shell, dynamic where needed. Worth it *after* the site has traffic | Medium |
| **`<model>` / WebGPU** | An interactive 3-D card. Genuinely impressive, genuinely expensive, and easy to make look like a toy on a serious company's site | High |

Deliberately not recommended: dark/light theme switching (the dark/Paper split is
a deliberate design decision, not a preference), and a PWA/offline mode (this is a
marketing site; nobody installs one).

---

## 7. Suggested order

**This week — stop losing things**
1. Fix contact delivery (§0.1) and test it end to end
2. OG image (§0.2)
3. Fix or remove search (§0.3)
4. Add analytics (§5.4)

**This month — credibility**
5. Delete dead components (§5.1)
6. Diagrams (§2.1) — the biggest comprehension win available
7. Glossary page (§3.2)
8. Compliance linter (§4.2)
9. Verify the legal name and CIN; get the legal pages reviewed (§0.4)

**Next — polish and reach**
10. View Transitions (§1.1) and Speculation Rules (§6)
11. Semantic search (§4.1)
12. AVIF conversion (§5.2)
13. Insights articles, or remove the page (§3.2)
14. Hindi (§4.3)

**When there is appetite for it**
15. Scroll-scrubbed assembly video (§2.2)
16. Cursor-reactive metasurface (§1.4)
17. The "Where we actually are" status page (§3.3) — cheapest item here and
    possibly the most valuable

---

## One thing to hold on to

This site's real competitive advantage is not its animation. It is that it is a
deep-tech medical company that refuses to overclaim — every page says what stage
it is at and what it has not proven. That is rare, and serious partners notice it.

Every item above should be judged on whether it makes that honesty *more legible*,
not on whether it makes the site look more expensive.
