import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Quality, Calibration & Validation",
  description:
    "BIQADX uses evidence layers, on-card references, deterministic QC and staged validation to separate scientific promise from validated diagnostic performance.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Four evidence layers",
    cols: 4,
    numbered: true,
    items: [
      {
        t: "Physics evidence",
        d: "Models and principle experiments show whether a mechanism can create the intended transfer function.",
      },
      {
        t: "Fabricated-component evidence",
        d: "Metrology confirms the geometry, material stack and optical or electrical response were produced.",
      },
      {
        t: "Integrated-cartridge evidence",
        d: "Testing shows the function survives bonding, reagents, storage, wetting, matrix and reader geometry.",
      },
      {
        t: "Assay & system evidence",
        d: "Predefined analytical and clinical studies determine performance for the intended use.",
      },
    ],
  },
  // Placed straight after the four layers are named, because the drawing is what
  // turns them from a list into a rule: a claim may only stand as high as the
  // evidence under it, and the top two layers are studies not yet done.
  {
    kind: "diagram",
    title: "How high a claim is allowed to stand",
    intro:
      "The four layers are a ladder, and what may be said climbs with them — never above them.",
    diagram: "evidence-ladder",
  },
  // The on-card references placed where they live on the card, each probeable —
  // the on-card half of quality, paired with the evidence ladder above.
  {
    kind: "diagram",
    title: "The references the card carries",
    intro:
      "The card brings its own known values, so a single run can check itself. Probe a zone to see what it guards against.",
    diagram: "on-card-references",
  },
  {
    kind: "grid",
    title: "On-card reference strategy",
    cols: 3,
    items: [
      {
        t: "Intensity reference",
        d: "Detects and, within limits, corrects illumination or throughput drift.",
      },
      {
        t: "Wavelength reference",
        d: "Verifies wavelength registration and flags unacceptable drift.",
      },
      {
        t: "Geometric fiducials",
        d: "Support position, focus and registration checks.",
      },
      {
        t: "Electrical references",
        d: "Open, short, known-impedance or dry-interface checks.",
      },
      {
        t: "Internal assay controls",
        d: "Positive, negative or procedural controls, independent of instrument references.",
      },
    ],
  },
  // A figure between the reference grid and the gating list: evidence starts at
  // the surface itself, measured, before anything is claimed of it.
  {
    kind: "figure",
    title: "Evidence starts at the surface",
    body: "Before any performance claim, the structure itself is measured — how uniform it is, how it returns light. The ladder above begins on real metrology, not on a result.",
    id: "quality-surface",
    alt: "Extreme macro of the card's structured corner, a narrow band of cyan-to-violet sheen across its fine texture on a near-black ground.",
    caption: "Illustrative — structured optical surface",
  },
  {
    kind: "list",
    title: "Quality-gated result logic",
    items: [
      "Cartridge family and identity valid",
      "Seat, contact, closure and safety conditions valid",
      "Temperature, humidity and condensation margins acceptable",
      "Dark, intensity, wavelength and detector references within limits",
      "Fluid fill, bubble, leakage and reaction progression acceptable",
      "Calibration current and configuration controlled",
      "Internal assay controls valid",
      "Output released only in the authorized validity state",
    ],
  },
];

export default function QualityValidationPage() {
  return (
    <PlatformPage
      kicker="Quality, Calibration & Validation"
      title="The claim follows the evidence."
      lead="Knowing when to trust a signal is the work."
      heroImage={{
        id: "quality-metrology",
        alt: "An optical inspection microscope over an iridescent card on a precision stage, verifying geometry under controlled light.",
        caption: "Illustrative — metrology research",
      }}
      blocks={BLOCKS}
      primary={{
        label: "Read the development-stage statement",
        href: "/legal/development-stage",
      }}
      secondary={{
        label: "Discuss validation collaboration",
        href: "/partners",
      }}
    />
  );
}
