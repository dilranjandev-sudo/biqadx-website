# Home page — image prompt pack

> **Rewritten against the real hardware.** The owner supplied reference photographs
> of the actual BIQADX instrument. Those photographs are **not** to be published —
> several of them expose the full internal architecture (optical column position,
> motion gantry, cable routing, PCB stack). They are reference only. Everything
> below generates *new* imagery that matches the real machine's design language, so
> the site looks like the thing that exists without giving away how it is built.
>
> **The old device description in this file was wrong** — it called for a "compact
> matte-black instrument the size of a desktop printer". The real machine is a large
> off-white industrial precision instrument. Any image generated against the old
> description must be regenerated.

> **Delivered and live:** `scope-methods.png`, `scope-assays.png`,
> `scope-references.png` — the three research-scope plates in section 2. All 3:2,
> wired in `components/home/ResearchScope.tsx`. They define the cartridge and the
> surface treatment; match them.

## Status — what is left to make

| Priority | File | Why | Prompt |
|---|---|---|---|
| **1 — blocking** | `impact-reach.png` | Live on the home page with invented Hindi programme branding on coat and bag, plus a lit UI screen | §5 |
| **1 — new** | `omega-exterior.png` | The shot the site does not have and most needs: the real machine, panels closed | §4 |
| **2** | `seq-1` … `seq-5` (5 files) | Scroll sequence shows three different analyzers, none of them the real one | §3 |
| **2** | `metasurface-macro.png` | Full-spectrum rainbow; used twice (hero slide 2 + Journey ch. 01) | §5 |
| **2** | `howitworks-seat.png` | Hero slide 1, 4:3 in a 16:9 hero so it crops badly; wrong device | §4 |
| 3 | `metacard-split.png`, `omega-split.png` | Glossy renders, wrong device | §4 |
| 3 | `about-workspace.png` | Lit monitor showing a visualisation — screens should be off/dark | §4 |
| optional | `home-platform.png` | Only if it goes back into the hero; the hero works on three slides | §4 |

**No longer needed:** `home-scope.png` — section 2 was rebuilt as the plate sheet.

`footer-cta.png` was checked and is fine. Leave it.

---

## 1. House style — prepend this to EVERY prompt

```
Photographed, not rendered. Professional industrial product photography for a
scientific instrument company. Full-frame camera, 85mm lens, f/5.6. Large soft key
light from upper left, a second softbox filling from the right, one narrow grazing
kicker to separate the housing edge. Deep charcoal seamless background falling to
near-black — the instrument is light, the room is dark. Natural sensor grain, true
depth-of-field falloff, faint dust, fine handling marks on the panels, honest
imperfect reflections in the brushed metal. Restrained and serious, not glamorous.
```

**Why dark backgrounds when the real photos are on light grey:** the site is a dark
"Void" palette. An off-white instrument against deep charcoal is a standard lab-
instrument product-photography look, and it sits in the page instead of punching a
bright hole in it.

### Negative prompt — append to EVERY prompt

```
No text, no words, no letters, no numbers, no logos, no branding, no wordmarks, no
labels, no serial plates, no barcodes, no QR codes, no watermarks. No screen content,
no user interface, no icons, no readouts, no graphs, no wafer maps, no 3D surface
plots, no measurement values. All screens and monitors are dark and switched off. No
rainbow gradient, no full spectrum, no oversaturated colour, no neon glow, no lens
flare. Not a 3D render, not CGI, not illustration.
```

---

## 2. The two continuity blocks — paste these verbatim

### DEVICE — the analyzer

Taken from the real machine. Use this in every prompt that shows the instrument.

```
The analyzer is a substantial benchtop laboratory instrument — the scale and
seriousness of a semiconductor inspection tool, roughly 700mm wide, not a desktop
appliance. Off-white sheet-metal housing panels with softly radiused corners, fitted
over a brushed stainless structural frame whose members are visible at the panel
joins. A rounded-rectangular access door on the front face, outlined by a soft teal
gasket seal — the one colour accent on the machine. A red mushroom emergency-stop
button set into the panel beside the door. A touchscreen on a short pivoting arm
above the front panel, angled toward the operator, screen completely dark and
switched off. Dark adjustable levelling feet under the frame. A fine row of
perforated vents along the upper edge. Same instrument, same proportions, same
off-white-and-teal palette in every frame.
```

**Reveal limit — this is the important part.** Keep the machine **closed** unless the
shot specifically calls for the measurement station. Never generate a wide view with
the side panels off. Do not show: the shelf/tray rack, the motion gantry, cable drag
chains, PCB stacks, the power supply, or the overall internal layout. When an interior
is needed, frame it **tight** on the objective and the cartridge only, with everything
behind it thrown out of focus.

### CARTRIDGE — METACARD

Already established by the three delivered plates. Do not redesign it.

```
The cartridge is a thin rigid card, credit-card format, about 2mm thick, with one
chamfered corner and a small circular registration cutout near a short edge. Neutral
silver-grey matte metal with a fine directional micro-texture. Iridescence is subtle
and directional — a narrow shift through cool cyan into soft violet only, confined to
where light grazes at an angle, fading to plain matte silver-grey elsewhere. Blank —
no printing, no markings of any kind. No full rainbow, no spectrum sweep.
```

---

## 3. The "See it work" sequence — 5 images, 16:9

**These five must read as one continuous shoot.** Same instrument, same bench, same
lighting, same gloves, same camera height — only the action changes. Generate them in
one session; reuse the same seed and change only the action sentence.

Shared preamble for all five:

```
[HOUSE STYLE] [DEVICE] [CARTRIDGE]
Same instrument, same dark bench, same lighting and same camera height as the rest of
this series. Hands wear plain dark navy nitrile gloves, no writing on them.
```

| File | Action sentence to append |
|---|---|
| `seq-1-sample.png` | `Close on the blank cartridge lying flat on a dark steel bench. A gloved hand holds a clear pipette just above it, releasing a single clear droplet onto the micro-textured zone, mid-fall, catching one small cyan highlight. The instrument's off-white housing is a soft out-of-focus mass behind. Camera low, near bench level.` |
| `seq-2-seat.png` | `A gloved hand slides the cartridge into the instrument's front loading port, card two-thirds in. The teal-outlined access door stands open just enough to admit it. Front three-quarter view of the closed machine. The touchscreen above is dark.` |
| `seq-3-interrogate.png` | `Tight interior frame — nothing but the measurement station. A black anodised optical objective ringed by an illuminated white light collar hovers directly above the seated cartridge on a pale nest. A narrow blade of cool light grazes the card's textured surface, raising a thin cyan-violet line where it strikes. Everything beyond the objective falls into deep shadow and blur. No hands. No visible mechanism, frame, or wiring.` |
| `seq-4-validate.png` | `Same tight interior framing. The objective has stepped across to the cartridge's chamfered corner and registration cutout, inspecting the reference patch row. A tight pool of cool focused light under the objective, everything else black. Metrology-lab stillness. No hands, no surrounding mechanism.` |
| `seq-5-result.png` | `Pull back to the closed machine, front three-quarter. The access door is shut, the touchscreen dark, the housing calm and finished. A gloved hand is withdrawing at the left edge of frame, slightly motion-blurred. Nothing is being displayed or reported.` |

---

## 4. The instrument shots

### `omega-exterior.png` — 16:9 — **make this one first**

The site has no photograph of the real machine closed. This is the single most
valuable image in the list and it reveals nothing.

```
[HOUSE STYLE] [DEVICE]

Hero three-quarter view of the complete instrument, all panels closed and flush, on a
dark polished bench against a deep charcoal seamless background. Lit so the off-white
housing separates cleanly from the dark room — a long soft highlight down the near
edge, the far side falling into shadow. The teal-outlined access door and the red
emergency-stop read as small precise details, not focal points. The touchscreen on its
arm is dark. Slight elevation, lens at instrument mid-height. Generous dark space
above and to one side for text overlay. Nothing else in frame.

[NEGATIVE PROMPT]
```

### `howitworks-seat.png` — 16:9 (hero slide 1)

```
[HOUSE STYLE] [DEVICE] [CARTRIDGE]

Wide cinematic framing. A bare hand guides the blank cartridge into the instrument's
front loading port from the left, card halfway in. Cyan-to-violet iridescence catches
only along the card's leading edge; the rest is neutral silver-grey. The machine is
closed, the touchscreen dark. A large area of clean shadow fills the left of the frame
for text overlay. Shallow depth of field — the card and port sharp, the housing
softening away.

[NEGATIVE PROMPT]
```

### `omega-split.png` — 4:3 (platform row 02)

```
[HOUSE STYLE] [DEVICE]

The closed instrument alone, three-quarter view, filling the frame on a dark bench.
Panels shut, screen dark, no cartridge present. Lit to read as serious laboratory
hardware — brushed frame members catching a cool highlight, off-white panels holding
soft gradient, deep shadow behind. Centred, generous negative space.

[NEGATIVE PROMPT]
```

### `metacard-split.png` — 4:3 (platform row 01)

```
[HOUSE STYLE] [CARTRIDGE]

A single blank cartridge alone against deep charcoal, floating at a slight angle. A
narrow cyan-violet iridescent band sweeps across one corner of its textured face; the
rest stays neutral silver. The chamfered corner and circular registration cutout are
crisply visible. A thin rim highlight traces the card's edge profile. Studio product
photography, centred, generous negative space.

[NEGATIVE PROMPT]
```

### `about-workspace.png` — 4:3 (platform row 03, stands in for UDOS)

```
[HOUSE STYLE]

A research bench from a low angle: an optical breadboard with a few mounted lenses and
mirrors on posts, a small clear microfluidic chip on a stage, and a stack of unlabelled
control electronics whose front panels are dark and switched off. Cool instrument light
from the left, everything else falling into shadow. Cables run tidily. No people, no lit
screens, no printed labels anywhere.

[NEGATIVE PROMPT]
```

### `home-platform.png` — 16:9 — optional

Blocked previously for printed branding, a "SWIFT | SENSITIVE | SIMPLE" strapline and
a lit "READY" screen. Only regenerate if it goes back into the hero.

```
[HOUSE STYLE] [DEVICE] [CARTRIDGE]

Wide hero composition. The blank cartridge stands upright on a dark brushed-steel
bench in the left third, leaning slightly, catching a narrow cyan-to-violet sheen along
its upper edge. The closed instrument occupies the right two-thirds, angled about 30
degrees away from camera, panels flush, touchscreen dark. Generous empty shadow across
the upper left for text overlay.

[NEGATIVE PROMPT]
```

---

## 5. Non-device images

### `impact-reach.png` — 16:10 — **still live on the home page, replace before launch**

The existing file carries an invented Hindi health-programme wordmark
("स्वस्थ भारत / स्वस्थ गाँव") plus a logo on the health worker's coat *and* bag, and
the handheld device shows a lit UI full of icons. The invented programme branding
implies a government affiliation and a deployment that does not exist.

```
[HOUSE STYLE — override the lighting: warm natural golden-hour daylight, outdoors]

A community health worker in a plain unbranded white coat over everyday clothing sits
talking with a small group of villagers outside a simple rural Indian home at dusk. She
holds a small dark handheld device loosely in one hand, screen dark and switched off,
not being read. The mood is conversation and trust, not procedure — nobody is being
tested, no sample is visible. Faces calm and dignified, natural expressions, soft warm
backlight from the low sun. Documentary photography, 35mm, f/2.8. Absolutely no printed
text, logo, badge or emblem anywhere on clothing, bags or equipment — all fabric plain.

[NEGATIVE PROMPT]
```

### `metasurface-macro.png` — 16:9

The real reference for this is the SEM micrograph of the pillar array. Match its
honesty: greyscale, ordered, real.

```
[HOUSE STYLE]

Extreme macro of an engineered nanostructured surface, close enough that the regular
sub-wavelength pillar array resolves as an ordered field of tiny cylindrical posts
receding to a blurred horizon. Predominantly neutral silver-grey. A single narrow band
of cool cyan-to-violet structural colour runs diagonally where the grazing light
catches it; everything outside that band stays plain matte grey. Very shallow depth of
field — one row of pillars critically sharp, foreground and background dissolving.
Slight fabrication irregularity: a few malformed or missing posts. Scientific specimen
photography, not decorative.

[NEGATIVE PROMPT]
```

---

## 6. Delivery

- PNG, sRGB, long edge **2400px** minimum.
- Name each file **exactly** as the heading above.
- Hand them back; they drop into `public/images/`. Only `omega-exterior.png` needs a
  code change to place it.

Check every image before accepting:

- [ ] No text, letters, numbers or logos anywhere, including clothing and panels
- [ ] No lit screen, no UI, no icons, no readout, no wafer map, no plot
- [ ] No full-spectrum rainbow — narrow cyan→violet only
- [ ] Same off-white-and-teal instrument as every other image in the set
- [ ] **Machine closed, or framed tight on the objective — no internal architecture,
      no tray rack, no gantry, no cable chains, no PCBs**
- [ ] Cartridge blank
- [ ] Nothing implies a real deployment, partner, programme or approval
