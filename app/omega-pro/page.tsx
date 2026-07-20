import type { Metadata } from "next";
import { PlatformPage, type PlatformBlock } from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "OMEGA-PRO Analyzer",
  description:
    "OMEGA-PRO is BIQADX's research-stage reusable analyzer for controlled optical, electrochemical, thermal and computational interrogation of METACARD cartridges.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Core responsibilities",
    cols: 2,
    numbered: true,
    items: [
      { t: "Cartridge identity & handling", d: "Recognize family and lot, verify compatibility, position and retain the card." },
      { t: "Precision seating", d: "A repeatable mechanical datum aligns optical, thermal and electrical interfaces." },
      { t: "Controlled illumination", d: "Wavelength, bandwidth, angle, polarization and exposure per method." },
      { t: "Optical collection & detection", d: "Spectra, intensity, lifetime or images through method-specific detectors." },
      { t: "Electrochemical interrogation", d: "Potentiostat, impedance, voltammetry and ion-selective measurement." },
      { t: "Thermal control", d: "Condition the cartridge and support kinetic or molecular workflows." },
      { t: "Motion & focus", d: "Move the optical head or card while controlling position and focus." },
      { t: "Safety & interlocks", d: "Prevent unsafe laser, UV, high-voltage, thermal or motion operation." },
    ],
  },
  { kind: "band", id: "omega-interrogate", alt: "The seated card inside the analyzer, a blade of light grazing its surface beneath the optics." },
  {
    kind: "note",
    title: "Thermally and optically controlled measurement",
    body:
      "Repeatable diagnostics require more than a bright source and a camera. OMEGA-PRO is being engineered around stabilized optical datums, thermal monitoring, dark and reference measurements, wavelength verification, intensity normalization, detector health checks and defined acquisition states.",
  },
  {
    kind: "grid",
    title: "How the architecture stays honest",
    cols: 2,
    items: [
      { t: "Multi-detector architecture", d: "Spectrometric, imaging, fluorescence, time-resolved and electrochemical channels — selected by the cartridge control profile. The final configuration is reduced to what validation, cost and safety justify." },
      { t: "Not an autonomous AI doctor", d: "The architecture prioritizes deterministic operation, raw-data preservation, calibration, quality checks and audit trails. Machine learning assists only within a validated, governed method." },
    ],
  },
];

export default function OmegaProPage() {
  return (
    <PlatformPage
      kicker="OMEGA-PRO Analyzer"
      title="A cooperative analyzer built around cartridge-defined measurement."
      lead="The reusable instrument paired with METACARD — supplying the controlled energy, geometry, sensing, actuation and safety the disposable cannot provide reliably on its own."
      heroImage={{ id: "omega-hero", alt: "Concept render of the OMEGA-PRO analyzer and its internal optical path.", caption: "Illustrative — concept render" }}
      blocks={BLOCKS}
      primary={{ label: "See how the platform works", href: "/how-it-works" }}
      secondary={{ label: "Discuss analyzer engineering", href: "/partners" }}
    />
  );
}
