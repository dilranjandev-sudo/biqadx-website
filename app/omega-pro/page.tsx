import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

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
      {
        t: "Cartridge identity & handling",
        d: "Recognize family and lot, verify compatibility, position and retain the card.",
      },
      {
        t: "Precision seating",
        d: "A repeatable mechanical datum aligns optical, thermal and electrical interfaces.",
      },
      {
        t: "Controlled illumination",
        d: "Wavelength, bandwidth, angle, polarization and exposure per method.",
      },
      {
        t: "Optical collection & detection",
        d: "Spectra, intensity, lifetime or images through method-specific detectors.",
      },
      {
        t: "Electrochemical interrogation",
        d: "Potentiostat, impedance, voltammetry and ion-selective measurement.",
      },
      {
        t: "Thermal control",
        d: "Condition the cartridge and support kinetic or molecular workflows.",
      },
      {
        t: "Motion & focus",
        d: "Move the optical head or card while controlling position and focus.",
      },
      {
        t: "Safety & interlocks",
        d: "Prevent unsafe laser, UV, high-voltage, thermal or motion operation.",
      },
    ],
  },
  // A figure after the responsibilities grid: the analyzer is the half that is
  // kept, serviced and re-calibrated — the argument for putting cost in the
  // instrument and keeping the card cheap.
  {
    kind: "figure",
    title: "The half that is kept",
    body: "One analyzer serves many cartridges over its life, so its precision and its calibration are amortised across every run — which a disposable card cannot do on its own.",
    id: "omega-analyzer",
    alt: "The OMEGA-PRO analyzer at rest on a dark bench, its screen off — a closed, serviceable instrument.",
    caption: "Illustrative — concept render",
  },
  {
    kind: "note",
    title: "Thermally and optically controlled measurement",
    body: "Repeatable diagnostics require more than a bright source and a camera. OMEGA-PRO is being engineered around stabilized optical datums, thermal monitoring, dark and reference measurements, wavelength verification, intensity normalization, detector health checks and defined acquisition states.",
  },
  // Why one analyzer can run many methods: it holds several detection channels,
  // and the cartridge selects which is live.
  {
    kind: "diagram",
    title: "One path, many detectors",
    intro:
      "Light collected from the card fans to several detection channels. The cartridge's control profile selects which one is used — so one instrument serves many methods.",
    diagram: "omega-detectors",
  },
  // Why the pair is cooperative rather than a reader and a strip: the analyzer
  // holds the same angles, stand-off and seating on every run, and that is what
  // makes one card's reading comparable to another's.
  //
  // Scrubbed rather than drawn still, because the claim is about repeatability
  // and repeatability is the one thing a still cannot show. The reader pushes
  // the card in themselves and it comes to rest against the same stops however
  // they scroll — then stops moving while the rest of the geometry is marked.
  {
    kind: "seating",
    title: "One geometry, held every run",
    intro:
      "The chassis fixes the angles between illumination and detection, the stand-off to the card face, and where the card comes to rest. Keep scrolling to seat the card.",
  },
  {
    kind: "grid",
    title: "How the architecture stays honest",
    cols: 2,
    items: [
      {
        t: "Multi-detector architecture",
        d: "Spectrometric, imaging, fluorescence, time-resolved and electrochemical channels — selected by the cartridge control profile. The final configuration is reduced to what validation, cost and safety justify.",
      },
      {
        t: "Not an autonomous AI doctor",
        d: "The architecture prioritizes deterministic operation, raw-data preservation, calibration, quality checks and audit trails. Machine learning assists only within a validated, governed method.",
      },
    ],
  },
];

export default function OmegaProPage() {
  return (
    <PlatformPage
      kicker="OMEGA-PRO Analyzer"
      title="The analyzer, built around the card."
      lead="The reusable half of the pair."
      heroImage={{
        id: "omega-hero",
        alt: "Concept render of the OMEGA-PRO analyzer and its internal optical path.",
        caption: "Illustrative — concept render",
      }}
      blocks={BLOCKS}
      primary={{ label: "See how the platform works", href: "/how-it-works" }}
      secondary={{ label: "Discuss analyzer engineering", href: "/partners" }}
    />
  );
}
