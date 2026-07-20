# Image placeholders — what still needs generating

Every image on the site goes through `<ImageSlot id="…">`. If `lib/images.ts` has
that id, the photograph renders; if not, a labelled placeholder renders in its
place, so nothing breaks and the layout is already final.

**Current state:** all wired, no placeholders rendering. **Four hero images are
still to generate** — see the next section; those four pages currently open on a
plain dark band instead.

To wire one: drop the PNG in `public/images/`, add a line to `lib/images.ts`, then
pass the id to that page's `<PageHero image="…">`.

```ts
"<id>": { src: "/images/<file>.png", alt: "…", caption: "Illustrative — …" },
```

---

## `footer-signoff` — the closing band on every page

The last thing on every route: a full-bleed band under the sitemap and the legal
bar, carrying the wordmark, the positioning line and the location.

**It renders only once the id exists.** `Footer.tsx` looks up `footer-signoff` and
skips the whole band if the manifest has no entry — so there is no placeholder
sitting on 25 pages while this is outstanding. Add the line to `lib/images.ts` and
the band appears everywhere at once.

This one carries more weight than any other image on the site: it is the last
impression on every page, and it is the only image a visitor will see repeatedly.
So it should be the calmest thing in the set — an object at rest, not an action.

### Composition — read this before the subject

- **Very wide.** The band is roughly 21:9 on a desktop, so generate at
  **2400×1030** and expect the top and bottom to be cropped further.
- **The subject belongs in the right half.** The wordmark, the positioning line
  and the location all sit at the **lower left**, over roughly the left third.
- **Keep that lower-left third empty and unlit** — falling to near-black. Two
  scrims sit under the copy, but they work best over something already dark.
- **Nothing in motion, nobody in frame.** No hands, no pipette, no beam, no door
  open. The page has just finished; this is the sign-off, not another step.

```
[HOUSE STYLE] [CARTRIDGE]

A single blank cartridge resting alone on a dark steel surface in a large unlit
space, lit by one narrow grazing light from the upper right that catches the
micro-texture across its face and raises a narrow cyan-to-violet sheen along one
edge only. The card sits in the right half of a very wide frame, small against
the emptiness around it. Everything to the left falls away into unbroken
near-black with nothing in it. Deep, still, quiet — a closing frame. No hands, no
instrument, no other objects, no second card.

[NEGATIVE PROMPT]
```

**Check before accepting:** the sheen must be a narrow cyan→violet band, not a
full spectrum; the card must carry the chamfered corner and the circular cutout
used everywhere else; the left third must be dark and empty enough that white
type sits on it cleanly.

To wire it:

```ts
"footer-signoff": { src: "/images/footer-signoff.png", alt: "" },
```

Alt is deliberately empty — the band is decorative and the wordmark beside it
carries the meaning, so it is marked `aria-hidden` in the markup.

---

## Four page heroes still to make

`/faq`, `/insights`, `/media` and `/contact` have no image that genuinely belongs
to them. Rather than reuse an unrelated one, they open on a plain band until these
exist.

### Composition rules for heroes — these matter more than the subject

A hero is **not** shown whole. The image is cover-cropped into a band roughly
2.5:1, so about **40% of the height is cut**, and the headline sits over the
**lower-left**. So:

- **Keep the subject centred vertically.** Anything near the top or bottom edge is
  lost.
- **Leave the lower-left third quiet** — dark, empty, out of focus. The kicker,
  headline and lead sit there. A busy or bright lower-left will fight the copy
  even through the scrims.
- Generate **3:2 at 2400×1600**, same as the rest of the set.

Prepend the house style and append the negative prompt from
[IMAGE_PROMPTS_HOME.md](IMAGE_PROMPTS_HOME.md) §1; paste the DEVICE and CARTRIDGE
blocks from §2 wherever hardware appears.

### `faq-plain` — `/faq`

The FAQ exists to say plainly what the platform is and is not. So: the objects
themselves, unstaged, nothing happening.

```
[HOUSE STYLE] [DEVICE] [CARTRIDGE]

The closed instrument and a single blank cartridge resting on a dark steel bench,
side by side, at rest. Nothing is being operated — no hands, no light beam, no
door open, no indicator lit. Shot square-on from a low angle, quiet and plain,
like a record photograph rather than a product hero. The right two-thirds carry
the objects; the lower-left falls into empty unlit bench.

[NEGATIVE PROMPT]
```

### `insights-desk` — `/insights`

Editorial and research writing — the thinking, not the running.

```
[HOUSE STYLE] [CARTRIDGE]

A researcher's desk at the end of a bench: an open unlined notebook with a pencil
resting on it, a jeweller's loupe, and a single blank cartridge set to one side.
Cool light from one direction. No screens anywhere, no printed charts, no plots,
no handwriting legible. Shallow depth of field — the loupe and cartridge sharp,
the far desk dissolving. The lower-left is empty desk surface in shadow.

[NEGATIVE PROMPT]
```

### `media-portrait` — `/media`

A press page supplies the official description; the image should be the official
portrait of the platform.

```
[HOUSE STYLE] [DEVICE] [CARTRIDGE]

Studio portrait of the platform: the closed instrument three-quarter to camera
with a single blank cartridge lying on the bench in front of it, deliberately
composed and evenly lit against a deep charcoal seamless background. Panels shut,
screen dark. Formal, neutral, unglamorous — the shot a press kit would carry.
Objects sit right of centre; the lower-left is unbroken dark background.

[NEGATIVE PROMPT]
```

### `contact-bench` — `/contact`

Collaboration inquiries. An open, waiting workspace — not people, not a meeting.

```
[HOUSE STYLE]

An empty research bench early in the day: an optical breadboard with a few unused
mounts on it, a stool pushed slightly back, tools laid out in order, soft daylight
entering from one side. Nobody in frame. Calm and unoccupied — a workspace ready
for someone rather than mid-experiment. The lower-left is empty bench in shadow.

[NEGATIVE PROMPT]
```

**Legal pages stay plain deliberately** — `/privacy`, `/terms`, `/cookies`,
`/accessibility` and `/legal/development-stage`. A cinematic image over a privacy
policy reads as marketing over a legal document.

---

## The 5 signature bands — delivered ✅

All five are **page signature bands, now full-bleed at 21:9** — they are the first
image a visitor sees on that page, so they carry the most weight. Generate at
**2400×1030 or wider, 21:9**.

Prepend the house style and append the negative prompt from
[IMAGE_PROMPTS_HOME.md](IMAGE_PROMPTS_HOME.md) §1, and paste the DEVICE and
CARTRIDGE continuity blocks from §2 wherever hardware appears. Those blocks are
what keep every image showing the same machine and the same card.

### 1. `methods-optics` — `/measurement-methods`

```
[HOUSE STYLE]

A dark optical bench carrying a spectrometer body, fluorescence filters in their
mounts and imaging optics on posts, arranged along a rail. Thin beams of cool
light pass between the elements, catching only where they strike glass. Shot low
and along the rail so the components recede into shallow focus. Everything else
falls into black. No card, no analyzer — this is the measurement physics itself.

[NEGATIVE PROMPT]
```

### 2. `quality-metrology` — `/quality-validation`

```
[HOUSE STYLE] [CARTRIDGE]

An optical inspection microscope on a granite base, its objective lowered over a
blank card held flat on a precision stage with machined clamps. A tight pool of
cool light under the objective; micrometer adjusters catching a highlight at the
edge of frame. Metrology-lab stillness. No hands. No monitor in shot.

[NEGATIVE PROMPT]
```

### 3. `roadmap-families` — `/test-roadmap`

```
[HOUSE STYLE] [CARTRIDGE]

Several blank cards laid out in a loose grid on a dark steel bench, angled so each
catches the grazing light differently — a few showing a narrow cyan-to-violet
sheen, most reading as plain silver-grey. Shot from above at a slight tilt, wide
and panoramic. The variation between cards is the subject; they are otherwise
identical and unmarked.

[NEGATIVE PROMPT]
```

### 4. `udos-control` — `/udos`

```
[HOUSE STYLE]

Close macro along a densely populated control board — an edge-compute module with
its heatsink, ribbon connectors seated in their sockets, fine surface-mount
components receding into shallow focus. Cool light rakes across the board from one
side. No screens, no indicator LEDs lit, no printed markings legible.

[NEGATIVE PROMPT]
```

### 5. `about-clinic-first` — `/about`

```
[HOUSE STYLE — override the lighting: warm natural daylight, indoors]

A modest community health room: a health worker seated at a plain table with a
small dark instrument beside them, screen off and not in use. Daylight from a
window to one side. Calm, ordinary, unstaged. Nobody is being tested, no sample
is visible, no procedure is under way. Faces are relaxed and dignified.
Documentary photography, 35mm, f/2.8. No printed text, logo, badge or emblem
anywhere on clothing, equipment or walls.

[NEGATIVE PROMPT]
```

---

## Still to replace (wired, but flagged)

These have assets, so no placeholder shows — but they should not ship as they are.
Prompts are in [IMAGE_PROMPTS_HOME.md](IMAGE_PROMPTS_HOME.md).

| File | Problem |
|---|---|
| `impact-reach.png` | Invented Hindi programme wordmark on coat **and** bag, plus a lit UI screen. Implies a government affiliation and a deployment that does not exist. **Highest priority.** |
| `seq-5-result.png` | Full interface with a green tick, "PASS" and an invented inspection summary. Not wired — step 5 currently stands in with `omega-exterior.png`. |
| `metasurface-macro.png` | Full-spectrum rainbow; reads as generated. Used twice on Home. |
| `howitworks-seat.png` | 4:3 in a 16:9 hero, so it crops badly. Wrong (older) device. |
| `metacard-split.png` | Different card design — notched edge and a chip, not the chamfered corner and circular cutout the rest of the site uses. Still wired to `/metacard`'s signature band. |
| `about-workspace.png` | Lit monitor showing a visualisation; screens should be dark. |
| `omega-split.png` | Wrong machine entirely (small black cube + glowing lens stack). No longer used on Home; check before reuse. |

---

## Delivery

- PNG, sRGB. Bands **2400×1030 (21:9)**; figures **1600×1200 (4:3)**.
- Name each file after its id, e.g. `methods-optics.png`.
- Hand them back and they drop into `public/images/` + one line each in
  `lib/images.ts`.

Before accepting any image:

- [ ] No text, letters, numbers, logos or labels anywhere — including clothing
- [ ] No lit screen, no UI, no readout, no result, no invented data
- [ ] No full-spectrum rainbow — narrow cyan→violet only
- [ ] Same off-white-and-teal instrument and same blank card as every other image
- [ ] Machine closed, or framed tight on the objective — no internal architecture
- [ ] Nothing implies a real deployment, partner, programme or approval
