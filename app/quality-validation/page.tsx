import type { Metadata } from "next";
import { PlatformPage, type PlatformBlock } from "@/components/platform/PlatformPage";

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
      { t: "Physics evidence", d: "Models and principle experiments show whether a mechanism can create the intended transfer function." },
      { t: "Fabricated-component evidence", d: "Metrology confirms the geometry, material stack and optical or electrical response were produced." },
      { t: "Integrated-cartridge evidence", d: "Testing shows the function survives bonding, reagents, storage, wetting, matrix and reader geometry." },
      { t: "Assay & system evidence", d: "Predefined analytical and clinical studies determine performance for the intended use." },
    ],
  },
  { kind: "band", id: "quality-validate", alt: "A card held in a precision fixture as a light probe scans its reference edge during a self-check." },
  {
    kind: "grid",
    title: "On-card reference strategy",
    cols: 3,
    items: [
      { t: "Intensity reference", d: "Detects and, within limits, corrects illumination or throughput drift." },
      { t: "Wavelength reference", d: "Verifies wavelength registration and flags unacceptable drift." },
      { t: "Geometric fiducials", d: "Support position, focus and registration checks." },
      { t: "Electrical references", d: "Open, short, known-impedance or dry-interface checks." },
      { t: "Internal assay controls", d: "Positive, negative or procedural controls, independent of instrument references." },
    ],
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
      title="A diagnostic claim must follow the evidence."
      lead="The objective is not merely to generate signals, but to know when a signal is technically trustworthy — and when it must be repeated, flagged or rejected."
      heroImage={{ id: "quality-metrology", alt: "An optical inspection microscope over an iridescent card on a precision stage, verifying geometry under controlled light.", caption: "Illustrative — metrology research" }}
      blocks={BLOCKS}
      primary={{ label: "Read the development-stage statement", href: "/legal/development-stage" }}
      secondary={{ label: "Discuss validation collaboration", href: "/partners" }}
    />
  );
}
