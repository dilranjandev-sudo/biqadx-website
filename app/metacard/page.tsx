import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "METACARD Cartridge",
  description:
    "METACARD is BIQADX's research-stage multi-modal cartridge architecture combining microfluidics, optical surfaces, electrodes, controls and machine-readable identity.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Public architecture",
    cols: 3,
    items: [
      {
        t: "Optical substrate & surfaces",
        d: "Local coupling, filtering, wavefront, resonance and reference functions.",
      },
      {
        t: "Microfluidic network",
        d: "Channels, vents, stops, chambers and waste containment route sample and reagents.",
      },
      {
        t: "Analytical interfaces",
        d: "Reaction wells, dried reagents, electrode arrays and ion-selective regions.",
      },
      {
        t: "Calibration & QC regions",
        d: "On-card intensity, wavelength, optical and electrical references.",
      },
      {
        t: "Identity & control profile",
        d: "Machine-readable identity binds family, lot, method and quality limits to the card.",
      },
      {
        t: "Sealing & containment",
        d: "Bonded layers isolate fluid paths and contain used sample.",
      },
    ],
  },
  {
    kind: "chips",
    title: "Functional zone concepts",
    intro:
      "The engineering baseline organizes the card into roughly twenty-one optical, sensing, calibration and identity zone concepts — an architecture, not a claim that every cartridge contains every zone.",
    items: [
      "Antireflection coupling",
      "Diffraction",
      "Cavity",
      "Collection",
      "Fluorescence filtering",
      "Time-resolved fluorescence",
      "Plasmonic sensing",
      "Computational imaging",
      "Electrochemical",
      "Ion-selective",
      "Raman enhancement",
      "Calibration references",
      "Physical authentication",
    ],
  },
  // The page's whole claim is that the card performs part of the measurement,
  // and that is a claim about what is stacked inside it. A photograph shows a
  // rectangle; this takes the card apart while the reader scrolls, one plate at
  // a time, which is the one thing a still drawing of it could not do.
  {
    kind: "assembly",
    title: "What is inside the card",
    intro:
      "Six functions in one disposable — routing, structured optics, an electrochemical interface, references and identity, stacked into a few millimetres. Keep scrolling to take it apart.",
  },
  {
    kind: "grid",
    title: "Cartridge families — not a false universal card",
    intro:
      "Different assays need different anticoagulants, chemistries and interfaces. A controlled family architecture shares a reader interface while using assay-specific cartridges.",
    cols: 3,
    items: [
      { t: "METACARD-H", d: "Heparin workflows." },
      { t: "METACARD-E", d: "EDTA workflows." },
      { t: "METACARD-C", d: "Citrate workflows." },
    ],
  },
  // The family made visual: three distinct cards converging on one shared reader
  // interface — the page's answer to the unsafe "one universal card" idea.
  {
    kind: "diagram",
    title: "One interface, a family of cards",
    intro:
      "The cards differ by chemistry; the reader interface stays constant. Probe a family to see the workflow it is built for.",
    diagram: "cartridge-families",
  },
  {
    kind: "list",
    title: "Prototype engineering targets",
    items: [
      "Card-format mechanical interface for automated identity, seating and controlled interrogation.",
      "Small-volume sample handling appropriate to method-specific cartridge families.",
      "Fourteen core measurement methods, with additional research extensions.",
      "Built-in references and cartridge-encoded control to reduce configuration errors.",
      "Manufacturing under study: precision polymer replication, nanoimprint, thin-film deposition, printing, lamination, insert placement and inline metrology.",
    ],
  },
  // The assembly scene shows the card as six stacked layers; this is what one of
  // those layers looks like at the edge, in life. Text beside the image, not a
  // full-bleed band: only the textured face carries the sheen, the chamfer and
  // edge stay plain — the same point the drawing makes about the structured zone
  // being a *zone*.
  {
    kind: "figure",
    title: "The structured zone is a zone",
    body: "Only the textured face carries the sheen; the chamfer and edge stay plain. The optics live in one region of the card, not across all of it — which is what lets the rest do other work.",
    id: "surface-macro-3",
    alt: "Extreme macro of the card's chamfered corner: the textured top face carries a cyan-to-violet sheen while the smooth chamfer and edge stay plain grey.",
    caption: "Illustrative — the card's edge, in macro",
  },
  {
    kind: "note",
    title: "Why the card and reader must be co-designed",
    body: "A cartridge optical zone cannot be specified independently of source wavelength, angle, polarization, numerical aperture, detector response, thermal state, fluid refractive index and surface chemistry. METACARD and OMEGA-PRO are designed as a cooperative measurement system with explicit interface controls.",
  },
];

export default function MetacardPage() {
  return (
    <PlatformPage
      kicker="METACARD Cartridge"
      title="The cartridge is part of the measurement."
      lead="Not packaging — part of the instrument."
      heroImage={{
        id: "metacard-hero",
        alt: "Concept render of the METACARD cartridge and a macro of its nanostructured surface.",
        caption: "Illustrative — concept render",
      }}
      blocks={BLOCKS}
      primary={{ label: "Explore OMEGA-PRO", href: "/omega-pro" }}
      secondary={{ label: "Discuss cartridge development", href: "/partners" }}
    />
  );
}
