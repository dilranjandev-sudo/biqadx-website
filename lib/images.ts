// Image manifest. Populated in build step 5 once an image-generation MCP
// (Replicate/Flux or OpenAI gpt-image) is authorized and the shot list is
// generated + compliance-checked. Until then, <ImageSlot> renders an
// accessible placeholder using each slot's alt text.
//
// Compliance (brief §7): images are illustrative only. Anything depicting the
// card/device must stay conceptual and carry an "Illustrative — in development"
// caption. No fabricated clinical scenes/data presented as real evidence.

export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  /**
   * Per-image exposure for hero use, applied by PageHero as a CSS
   * `brightness()`. It has to be per-image: these photographs range from a
   * mean level of 24 to 109, so one shared multiplier either leaves the dark
   * frames dark or blows a third of the bright ones to flat white.
   *
   * Each value is the smaller of (a) the lift that brings the frame to a common
   * mid-level and (b) the most it can take before more than ~6% of pixels clip.
   * Recompute if the file is replaced.
   */
  brightness?: number;
};

export const images: Record<string, ImageAsset> = {
  "home-scope": {
    src: "/images/home-scope.png",
    alt: "Several iridescent card-format cartridges arranged on a dark laboratory bench with precision optics in the background.",
  },

  // Platform mid-page bands (reused vetted imagery for immediate visual richness).
  "metasurface-fab": { src: "/images/ip-nanofab.png", alt: "A nanoimprint tool pressing onto an iridescent nanostructured wafer under instrument light.", caption: "Illustrative — nanofabrication research" },
  "metacard-use": { src: "/images/seq-2-seat.png", alt: "A gloved hand seating a thin iridescent card into the analyzer's slot.", caption: "Illustrative — research workflow" },
  "omega-interrogate": { src: "/images/seq-3-interrogate.png", alt: "The seated card inside the analyzer, a blade of light grazing its surface beneath the optics.", caption: "Illustrative — interrogation research" },
  "howitworks-sequence": { src: "/images/howitworks-sequence.png", alt: "A gloved hand sliding a blank card into the analyzer's teal-outlined front port in a daylit lab, its touchscreen dark.", caption: "Illustrative — research workflow" },
  "howitworks-mid": { src: "/images/seq-4-validate.png", alt: "An inspection objective over the card's geometric alignment features during a self-check.", caption: "Illustrative — validation research" },
  "methods-mid": { src: "/images/surface-macro-4.png", alt: "Extreme macro at a steep viewing angle, the micro-texture running away from the camera with a narrow band of cyan-violet sheen held in focus and the rest falling soft.", caption: "Illustrative — structured optical surface" },
  "quality-validate": { src: "/images/why-validate.png", alt: "A card held in a precision fixture as a light probe scans its reference edge during a self-check.", caption: "Illustrative — metrology research" },
  "udos-bench": { src: "/images/about-workspace.png", alt: "A research bench with optics, a microfluidic chip and control electronics under soft light.", caption: "Illustrative — control-system research" },
  "roadmap-mid": { src: "/images/seq-5-result.png", alt: "A card resting in the analyzer with a single neutral status light after a run.", caption: "Illustrative — research workflow" },

  // Page signature bands.
  "methods-optics": {
    src: "/images/methods-optics.png",
    alt: "A dark optical bench: a narrow beam passing between filters and lenses held in their mounts along a rail, the far components falling out of focus.",
    caption: "Illustrative — measurement research",
    brightness: 2,
  },
  "quality-metrology": {
    src: "/images/quality-metrology.png",
    alt: "An inspection objective lowered over a blank card clamped flat on a precision stage, a tight pool of cool light beneath it and micrometer adjusters at the edge of frame.",
    caption: "Illustrative — metrology research",
    brightness: 2,
  },
  "roadmap-families": {
    src: "/images/roadmap-families.png",
    alt: "Five blank cards laid out in a staggered row on a brushed steel bench, each catching the grazing light differently — some showing a narrow cyan-to-violet sheen, others reading as plain silver-grey.",
    caption: "Illustrative — cartridge-family research",
  },
  "udos-control": {
    src: "/images/udos-control.png",
    alt: "Close macro along a densely populated control board — a finned heatsink, a seated ribbon connector and rows of surface-mount components receding into shallow focus.",
    caption: "Illustrative — control-system research",
    brightness: 1.58,
  },
  "about-clinic-first": {
    src: "/images/about-clinic-first.png",
    alt: "A health worker seated at a plain table in a modest community health room, daylight from a window beside her, a small dark instrument on the table with its screen off.",
    caption: "Illustrative — intended setting",
    brightness: 1.11,
  },

  // Company-page bands.
  "sustainability-film": {
    src: "/images/sustainability-film.png",
    alt: "A small stack of blank cards on a steel bench beside a curl of translucent film, a narrow cyan-to-violet sheen along the top card's edge.",
    caption: "Illustrative — materials research",
  },
  "ip-nanofab": {
    src: "/images/ip-nanofab.png",
    alt: "A gloved hand guiding a nanostructured wafer on a precision stage beneath a nanoimprint tool, the wafer catching an iridescent sheen.",
    caption: "Illustrative — nanofabrication research",
    brightness: 1.36,
  },
  "careers-craft": {
    src: "/images/careers-craft.png",
    alt: "A researcher's hands at an optical breadboard, holding a jeweller's loupe over a blank card clamped on a precision stage under focused light.",
    caption: "Illustrative — engineering work",
    brightness: 1.96,
  },
  "partners-bench": {
    src: "/images/partners-bench.png",
    alt: "Two pairs of hands working together over a shared optical breadboard, a blank card between them.",
    caption: "Illustrative — engineering collaboration",
    brightness: 1.68,
  },
  "about-bench": {
    src: "/images/about-bench.png",
    alt: "Two researchers in lab coats working over an optical breadboard by a window, seen from behind, a laptop beside them with its screen off.",
    caption: "Illustrative — research bench",
    brightness: 1.38,
  },

  // Platform signature bands that already have vetted imagery.
  "metasurface-hero": {
    src: "/images/metasurface-hero.png",
    alt: "A blank card held to the light against a dark ground, a narrow cyan-to-violet sheen running across its micro-textured face.",
    caption: "Illustrative — structured optical surface",
    brightness: 1.14,
  },
  "metacard-hero": {
    src: "/images/metacard-hero.png",
    alt: "A gloved hand holding the blank METACARD cartridge up to the light, a narrow cyan-to-violet sheen across its micro-textured face.",
    caption: "Illustrative — cartridge research",
    brightness: 1.8,
  },
  "omega-hero": {
    src: "/images/omega-hero.png",
    alt: "The closed OMEGA-PRO analyzer at rest on a light bench in a daylit lab — off-white housing, a teal-outlined access door, an emergency-stop button and a dark touchscreen — with a blank card lying in front of it.",
    caption: "Illustrative — prototype hardware in development",
  },

  // FAQ and Contact share one purpose-made hero — the closed analyzer at rest on
  // a dark bench with a blank cartridge in front, subject right / lower-left dark.
  // The two pages' prompts converged on the same "objects at rest" shot, so one
  // frame serves both; swap contact-hero for a distinct file if wanted later.
  "faq-hero": {
    src: "/images/faq-hero.png",
    alt: "The closed OMEGA-PRO analyzer at rest on a dark bench with a blank METACARD cartridge in front of it.",
  },
  "contact-hero": {
    src: "/images/hero-bench.png",
    alt: "The OMEGA-PRO analyzer at rest on a clean bench in a calm, daylit room — an open, waiting workspace.",
  },
  "insights-desk": {
    src: "/images/insights-desk.png",
    alt: "A researcher's desk in low evening light: an open blank notebook with a pencil across it, a jeweller's loupe, and a blank card catching a soft cyan-to-violet sheen.",
    brightness: 1.14,
  },
  "media-portrait": {
    src: "/images/media-portrait.png",
    alt: "A quiet corner of a research building — two empty chairs angled toward each other across a round table, a band of daylight on the wall, a blank card on the table.",
    brightness: 1.55,
  },

  // The structured surface at four angles. Shot as a set on purpose: the first
  // two are the same material photographed differently, and putting them side by
  // side is the only way to *show* the claim the whole platform rests on — that
  // the optical response depends on the angle it is read at.
  "surface-macro-1": {
    src: "/images/surface-macro-1.png",
    alt: "Extreme macro of the engineered surface at a grazing angle: fine directional micro-texture running diagonally, a narrow cyan-to-violet sheen lifting along the ridges on the right and fading to matte grey on the left.",
  },
  "surface-macro-2": {
    src: "/images/surface-macro-2.png",
    alt: "The same engineered surface photographed face-on under flat light: plain neutral grey matte metal with fine directional micro-texture, and almost no colour at all.",
  },
  "surface-macro-3": {
    src: "/images/surface-macro-3.png",
    alt: "Extreme macro of the card's chamfered corner: the textured top face carries a cyan-to-violet sheen, the smooth chamfer and edge stay plain grey.",
  },
  "surface-macro-4": {
    src: "/images/surface-macro-4.png",
    alt: "Extreme macro at a steep viewing angle, the micro-texture running away from the camera with a narrow band of cyan-violet sheen held in focus and the rest falling soft.",
  },
};

export function getImage(id: string): ImageAsset | undefined {
  return images[id];
}
