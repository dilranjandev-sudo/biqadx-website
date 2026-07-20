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
  "howitworks-sequence": { src: "/images/seq-1-sample.png", alt: "A gloved hand releasing a clear droplet onto the iridescent surface of a card.", caption: "Illustrative — research workflow" },
  "howitworks-mid": { src: "/images/seq-4-validate.png", alt: "An inspection objective over the card's geometric alignment features during a self-check.", caption: "Illustrative — validation research" },
  "methods-mid": { src: "/images/metasurface-macro.png", alt: "Macro of a nanostructured surface showing structural colour across the texture.", caption: "Illustrative — structured optical surface" },
  "quality-validate": { src: "/images/why-validate.png", alt: "A card held in a precision fixture as a light probe scans its reference edge during a self-check.", caption: "Illustrative — metrology research" },
  "udos-bench": { src: "/images/about-workspace.png", alt: "A research bench with optics, a microfluidic chip and control electronics under soft light.", caption: "Illustrative — control-system research" },
  "roadmap-mid": { src: "/images/seq-5-result.png", alt: "A card resting in the analyzer with a single neutral status light after a run.", caption: "Illustrative — research workflow" },

  // Platform signature bands that already have vetted imagery.
  "metasurface-hero": {
    src: "/images/metasurface-macro.png",
    alt: "Macro of a nanostructured metasurface showing structural colour — cyan, violet and amber shifting across the texture.",
    caption: "Illustrative — structured optical surface",
  },
  "metacard-hero": {
    src: "/images/metacard-split.png",
    alt: "Concept render of the METACARD cartridge and a macro of its nanostructured surface.",
    caption: "Illustrative — concept render",
  },
  "omega-hero": {
    src: "/images/omega-split.png",
    alt: "Concept render of the OMEGA-PRO analyzer and its internal optical path.",
    caption: "Illustrative — concept render",
  },
};

export function getImage(id: string): ImageAsset | undefined {
  return images[id];
}
