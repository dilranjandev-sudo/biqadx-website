# Hero images — one per page

The single, current source for every page's hero photograph (home is handled
separately by its slider). Ignore the older `IMAGE_PLACEHOLDERS.md` /
`IMAGE_PROMPTS_HOME.md`; this file is self-contained.

Each hero should feel **relatable and real** — a person, a hand, a bench, a place,
not just a floating object — and be **a little brighter** than a moody studio
shot, while still leaving the lower-left dark for the copy.

---

## How to use

1. Generate **3:2 at 2400×1600** (heroes are cover-cropped to a wide band).
2. Every prompt = `[HOUSE STYLE]` + the blocks it names (`[DEVICE]`, `[CARTRIDGE]`)
   + `[HERO COMPOSITION]` + the scene line + `[NEGATIVE]`. All shared blocks are
   right below — paste them in.
3. Name the file after the **id** (e.g. `metacard-hero.png`), drop it in
   `public/images/`, and add one line to `lib/images.ts`:
   `"<id>": { src: "/images/<id>.png", alt: "…" },`
   The page already points at that id, so it appears immediately.
4. The site lifts every hero `brightness(1.15)` and drifts it on scroll — so keep
   the source natural; it will read a touch brighter than it looks flat.

**Legal pages stay plain on purpose** — `/privacy`, `/terms`, `/cookies`,
`/accessibility`, `/legal/development-stage`. No hero image.

---

## Shared blocks — paste into every prompt

### `[HOUSE STYLE]`
```
Photographed, not rendered. Professional, warm-neutral photography for a deep-tech
healthcare company. Full-frame camera, 50–85mm, f/2.8–5.6. A soft key light plus a
gentle fill, one narrow grazing kicker to separate edges — brighter and cleaner
than a dark studio, but never flat or clinical. Deep charcoal surroundings that lift
to soft grey where the light lands. Natural sensor grain, true depth-of-field
falloff, faint dust, honest reflections. Real and human, not glossy.
```

### `[HERO COMPOSITION]`
```
Very wide cinematic frame, 3:2. The subject sits in the right two-thirds and is the
bright, in-focus point of interest. The LOWER-LEFT THIRD is quiet and dark — soft
shadow, nothing in it — because the headline and button sit there. One clear light
direction; the left falls off naturally. Calm, spacious, room to breathe.
```

### `[DEVICE]` — the analyzer (same machine every time)
```
A substantial off-white benchtop laboratory instrument, the scale of a semiconductor
inspection tool. Off-white sheet-metal panels with softly radiused corners over a
brushed stainless frame; a rounded-rectangular front access door outlined by a soft
teal gasket seal — the one colour accent; a red mushroom emergency-stop beside it; a
dark, switched-off touchscreen on a short pivoting arm; dark levelling feet; a fine
row of vents along the top edge. Closed, screen dark, in every frame.
```

### `[CARTRIDGE]` — METACARD
```
A thin rigid card, credit-card format, ~2mm thick, one chamfered corner and a small
circular registration cutout near a short edge. Neutral silver-grey matte metal with
fine directional micro-texture. Iridescence is subtle and directional — a narrow
cyan-to-violet sheen only where light grazes, fading to matte grey elsewhere. Blank,
no markings. No full rainbow, no spectrum sweep.
```

### `[NEGATIVE]`
```
No text, words, letters, numbers, logos, branding, labels, serial plates, barcodes,
QR codes, watermarks. No screen content, UI, readouts, graphs or measurement values;
all screens dark. No full rainbow, no oversaturated colour, no neon glow, no lens
flare. No real logos on clothing or walls. Not a 3D render, not CGI, not illustration.
```

For people: also append `no identifiable faces in sharp focus, generic and
respectful, no jewellery, no writing on gloves or coats`.

---

## Platform

### `metasurface-hero` — /metasurface-diagnostics
The science, made tactile.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
A close macro of the card's engineered surface held at a shallow grazing angle so a
soft cyan-to-violet sheen runs across the micro-texture on the right, the surface
easing into shadow at the lower-left. Bright, crisp, jewel-like but real — a material,
not a graphic.
[NEGATIVE]
```

### `metacard-hero` — /metacard
The cartridge, relatable in the hand.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
A person's hand in a plain dark-navy nitrile glove holds the blank card up to soft
daylight, fingertips at the edges, the cyan-violet sheen catching along one edge. The
card and gloved fingers are sharp on the right; the forearm and background dissolve to
shadow at the lower-left. Warm, human, inviting.
[NEGATIVE + no identifiable faces, no writing on the glove]
```

### `omega-hero` — /omega-pro
The analyzer, calm and real.
```
[HOUSE STYLE] [DEVICE] [HERO COMPOSITION]
The closed analyzer at rest on a clean light bench in a softly daylit lab, front
three-quarter, occupying the right of the frame and catching the key light. A single
blank card lies on the bench in front of it. The bench to the lower-left falls into
soft shadow. Nothing operating, no hands.
[NEGATIVE]
```

### `howitworks-sequence` — /how-it-works
The moment of use.
```
[HOUSE STYLE] [DEVICE] [CARTRIDGE] [HERO COMPOSITION]
A gloved hand slides the blank card into the analyzer's teal-outlined front port,
card two-thirds in, in a bright, clean lab. Front three-quarter, machine on the right,
screen dark. The bench and air to the lower-left fall into soft shadow.
[NEGATIVE + no identifiable faces, no writing on the glove]
```

### `methods-optics` — /measurement-methods
The measurement physics.
```
[HOUSE STYLE] [HERO COMPOSITION]
A dark optical bench carrying a spectrometer body, filters in their mounts and imaging
optics on posts along a rail, thin beams of cool light catching only where they strike
glass on the right. Softly lit, precise. The rail recedes into shadow at the lower-left.
No card, no machine — the physics itself.
[NEGATIVE]
```

### `quality-metrology` — /quality-validation
Inspection and trust.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
An optical inspection microscope on a granite base, its objective lowered over a blank
card held flat on a precision stage with machined clamps, a tight pool of cool light
under the objective on the right. Micrometer adjusters catch a highlight. Metrology-lab
stillness, cleanly lit. The stage falls into shadow at the lower-left. No hands, no
monitor in shot.
[NEGATIVE]
```

### `udos-control` — /udos
The control layer, physical.
```
[HOUSE STYLE] [HERO COMPOSITION]
A close macro along a densely populated edge-compute control board — heatsink, seated
ribbon connectors, fine surface-mount components receding into shallow focus on the
right, cool light raking across it. No indicator LEDs lit, no legible markings. The
board eases into shadow at the lower-left.
[NEGATIVE]
```

### `roadmap-families` — /test-roadmap
The cartridge families.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
Several blank cards laid out in a loose row on a light steel bench, angled so each
catches the grazing light differently — a few showing a narrow cyan-to-violet sheen,
most reading as plain silver-grey — the group filling the right, brightly and evenly
lit. The bench to the lower-left is empty and in shadow. Identical, unmarked cards.
[NEGATIVE]
```

---

## Company

### `about-bench` — /about
The people and the craft.
```
[HOUSE STYLE] [HERO COMPOSITION]
A multidisciplinary research bench in daylight: two people in plain lab coats working
over an optical breadboard and a laptop (screen not legible), seen from behind and to
the side so no face is in sharp focus. Warm, collaborative, real. Occupies the right;
the near bench at the lower-left is empty and shadowed.
[NEGATIVE + no identifiable faces, no legible screen, no logos on coats]
```

### `about-clinic-first` — /impact
Intended point of care.
```
[HOUSE STYLE — override: warm natural daylight indoors] [HERO COMPOSITION]
A modest, tidy community health room in soft daylight: a health worker seated at a
plain table with a small dark instrument beside them (screen off), calm and unstaged,
seen three-quarter from behind so no face is sharp. Nobody being tested. Warm and
dignified. The worker and table sit right of centre; the room at the lower-left falls
into soft shadow.
[NEGATIVE + no identifiable faces, no signage, no legible screen]
```

### `ip-nanofab` — /ip-engineering
Where it is made.
```
[HOUSE STYLE] [HERO COMPOSITION]
A nanoimprint / cleanroom bench: a gloved hand guiding a nanostructured wafer or
imprint tool under instrument light, the wafer catching a soft iridescent sheen on the
right, precise and clean. The bench to the lower-left falls into shadow.
[NEGATIVE + no identifiable faces, no writing on the glove]
```

### `partners-bench` — /partners
Collaboration.
```
[HOUSE STYLE] [HERO COMPOSITION]
An open, well-lit workbench mid-collaboration: two pairs of hands (no faces) over a
shared optical breadboard, a blank card and a few mounts between them, daylight from
one side. Warm and purposeful, the work occupying the right. The near bench at the
lower-left is quiet and shadowed.
[NEGATIVE + no identifiable faces, no writing on gloves/coats]
```

### `sustainability-film` — /sustainability
Material responsibility.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
A macro of the card's thin polymer/metal layers at the chamfered edge, or a small
stack of blank cards beside a curl of translucent recyclable film on a light bench,
soft daylight, a faint cyan-violet sheen on the right. Clean, material, honest. The
bench to the lower-left is empty and in shadow.
[NEGATIVE]
```

### `careers-craft` — /careers
The work, up close.
```
[HOUSE STYLE] [HERO COMPOSITION]
A researcher's hands (no face) at a bench, adjusting an optical mount or holding a
jeweller's loupe over a blank card under focused light, sharp and absorbed on the
right, the far bench dissolving into shadow at the lower-left. Warm, human, serious.
[NEGATIVE + no identifiable faces]
```

---

## Connect

### `faq-hero` — /faq
Objects at rest (already delivered — keep or refresh).
```
[HOUSE STYLE] [DEVICE] [CARTRIDGE] [HERO COMPOSITION]
The closed analyzer and a single blank card resting side by side on a dark steel bench,
at rest — no hands, screen dark. A quiet record photograph, cleanly lit. Objects on the
right; the bench to the lower-left falls into near-black.
[NEGATIVE]
```

### `insights-desk` — /insights
Editorial and research — the thinking.
```
[HOUSE STYLE] [CARTRIDGE] [HERO COMPOSITION]
A researcher's desk in cool daylight: an open unlined notebook with a pencil, a
jeweller's loupe and a single blank card set to one side, sharp on the right, the far
desk dissolving. No screens, no legible writing. The desk surface at the lower-left is
empty and in shadow.
[NEGATIVE]
```
> Wire: /insights currently has a plain hero — add `image="insights-desk"` to its
> `<PageHero>` once the file exists.

### `media-portrait` — /media
The official portrait.
```
[HOUSE STYLE] [DEVICE] [CARTRIDGE] [HERO COMPOSITION]
Studio portrait of the platform: the closed analyzer three-quarter to camera with a
single blank card on the bench in front, deliberately composed and evenly, cleanly lit
against a deep charcoal seamless. Formal, neutral, press-kit calm. Objects right of
centre; the lower-left is unbroken dark.
[NEGATIVE]
```
> Wire: /media currently has a plain hero — add `image="media-portrait"`.

### `contact-hero` — /contact
An open, waiting workspace (contact currently has no hero — add one).
```
[HOUSE STYLE — override: soft natural daylight, warm and inviting] [DEVICE] [CARTRIDGE] [HERO COMPOSITION]
The closed analyzer at rest on a clean, uncluttered light workbench in a softly-lit
room, a blank card beside it and a plain empty stool pulled up as if waiting for
someone. Nobody in frame, screen dark. Open and inviting, the machine to the right in
the daylight; the bench at the lower-left falls into soft shadow.
[NEGATIVE + no people, no faces]
```
> Wire: /contact is currently imageless by choice — add `image="contact-hero"` to its
> `<PageHero>` if you want it back.

---

## Accept-before-use checklist
- [ ] Subject relatable and in the right two-thirds; **lower-left dark and empty**
- [ ] A little brighter / warmer than a moody studio shot, but not flat
- [ ] Same off-white-and-teal machine (closed, screen dark) and chamfered-corner card
- [ ] Narrow cyan→violet sheen only — no full rainbow
- [ ] No text, logo, lit screen, readout or fabricated result anywhere
- [ ] People generic and respectful — no identifiable faces, no writing on clothing
