# Image placeholders — what still needs generating

Every image on the site goes through `<ImageSlot id="…">`. If `lib/images.ts` has
that id, the photograph renders; if not, a labelled placeholder renders in its
place, so nothing breaks and the layout is already final.

**Current state:** 17 slots in use — **17 wired, 0 placeholders.** The five page
signature bands below were delivered and are live; their prompts are kept as the
reference for anything generated next.

To wire one: drop the PNG in `public/images/`, add a line to `lib/images.ts`, rebuild.

```ts
"<id>": { src: "/images/<file>.png", alt: "…", caption: "Illustrative — …" },
```

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
