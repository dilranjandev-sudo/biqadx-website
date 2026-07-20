# BIQADX — Scroll "expand & assemble" motion brief

Goal: a visual that explodes/assembles as the user scrolls (like the hero card).
There are two ways to do it with generated assets. Pick one; I wire it in.

Compliance (same as images): no text/numbers/logos in the asset; illustrative;
device stays conceptual (gets an "Illustrative — in development" caption).

---

## OPTION A — Scroll-scrubbed VIDEO (easiest to make look real) ✅ recommended for realism

You generate a short clip of the card assembling; I map scroll → video time so it
expands/assembles under the user's scroll (the Apple product-page technique).

### Prompt (for a video generator — Runway Gen-3 / Kling / Luma / Veo / Sora)
> A single thin ID-1 diagnostic card, exploded into four flat stacked layers
> floating slightly apart in a dark studio, slowly and precisely assembling into
> one solid card; a soft beam of cyan-violet-amber light passes through the gaps
> as they close. Locked-off camera, macro, cinematic, shallow depth of field,
> deep near-black background, subtle iridescent edge sheen. Smooth and seamless,
> no text, no logos, ~5 seconds.

Tip: also generate the **reverse** (assembled → exploded) or just reverse it in code.

### Deliver
- `card-assemble.mp4` (H.264, 1080p, 4–6s), square or 4:3.
- One poster frame `card-assemble-poster.jpg` (the assembled card).
- Drop into `public/videos/`.

### Steps I do
1. Re-encode with dense keyframes (`ffmpeg -g 1`) so scrubbing is smooth.
2. Pinned section + inline `<video muted playsinline preload="auto">`; ScrollTrigger
   scrub maps scroll progress → `video.currentTime`.
3. Reduced-motion / mobile → show the poster image, no scrub.

---

## OPTION B — Exploded LAYERS as transparent PNGs (crispest, lightest, reuses the hero code)

You generate each card layer as its own transparent-background render; I stack and
animate them apart/together on scroll with GSAP — exactly the hero motion, but with
your real renders instead of the current SVG slabs.

### Global style (prepend to each)
> Isometric product render of a single thin ID-1 card layer, floating on a fully
> transparent background, soft studio light, subtle iridescent cyan-violet-amber
> edge sheen, ultra sharp, no text, no logos. IMPORTANT: identical camera angle,
> identical framing, and the card in the exact same position in every image, so the
> layers stack in perfect registration.

### The four layers (one image each)
1. `layer-structural.png` — a thin structural substrate layer, matte deep-charcoal with a faint microtexture.
2. `layer-optical.png` — a thin optical layer, glassy and translucent with iridescent structural-colour shimmer.
3. `layer-sensing.png` — a thin sensing layer, matte with a faint patterned micro-grid.
4. `layer-base.png` — a thin solid base layer, deep-charcoal.

### Deliver
- 4 PNGs, **transparent background**, identical pixel dimensions (e.g. 1600×1000),
  card in the same spot in each. Drop into `public/images/card-layers/`.

### Steps I do
1. Absolutely stack the four PNGs in registration.
2. GSAP ScrollTrigger scrub: layers translate apart (explode) + a Prism beam travels
   the gaps + labels reveal → then re-assemble — the hero choreography, upgraded.
3. Reduced-motion / mobile → assembled static image.

---

## Which to choose
- Want it to look like a **rendered product film** → Option A (video).
- Want **crisp, tiny, frame-perfect scrub** that matches the current hero and has a
  clean reduced-motion fallback → Option B (layers).

You can also apply the same technique to: roll-to-roll film assembling into cards,
or the reader + card coming together into "one system".
