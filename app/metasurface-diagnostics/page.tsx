import type { Metadata } from "next";
import { PlatformPage, type PlatformBlock } from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Metasurface Diagnostics",
  description:
    "How BIQADX uses engineered optical surfaces for coupling, focusing, filtering, resonance, calibration, computational imaging and cartridge authentication.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "What a metasurface can control",
    cols: 3,
    items: [
      { t: "Amplitude", d: "How much light is transmitted, reflected, absorbed or scattered." },
      { t: "Phase", d: "How the wavefront is delayed or advanced to focus or reshape light." },
      { t: "Direction", d: "How light is diffracted, steered or coupled into a measurement path." },
      { t: "Spectrum", d: "Which wavelengths are passed, rejected, enhanced or separated." },
      { t: "Polarization", d: "How the electric-field orientation is selected, rotated or analyzed." },
      { t: "Local field", d: "How nanoscale resonances intensify fields near a sensing surface." },
      { t: "Spatial encoding", d: "How a pattern creates a coded or computational measurement." },
    ],
  },
  {
    kind: "grid",
    title: "Four legitimate roles in the platform",
    cols: 4,
    items: [
      { t: "Signal creation", d: "Generate a new measurable channel — an enhanced Raman spectrum or resonance shift." },
      { t: "Signal enhancement", d: "Improve photon coupling and signal-to-noise without changing the chemistry." },
      { t: "Signal correction", d: "Provide characterized references for bounded drift correction." },
      { t: "Authentication", d: "Encode a structure that supports identity and process traceability." },
    ],
  },
  { kind: "band", id: "metasurface-fab", alt: "A nanoimprint tool pressing onto an iridescent nanostructured wafer." },
  {
    kind: "chips",
    title: "Public-safe zone families",
    intro:
      "A molded microlens, a diffraction grating, a thin-film filter and a subwavelength metasurface are related — but not interchangeable. We use the correct description for each zone.",
    items: [
      "Light-coupling surfaces",
      "Wavefront & collection zones",
      "Spectral zones",
      "Resonant sensing zones",
      "Raman enhancement zones",
      "Computational optical zones",
      "Reference zones",
      "Physical identity zones",
    ],
  },
  {
    kind: "grid",
    title: "The complete measurement chain",
    intro:
      "A high-Q resonance or large simulated field enhancement is only useful when its measurable change exceeds drift, angular sensitivity, manufacturing variation, contamination, nonspecific binding and detector noise.",
    cols: 3,
    numbered: true,
    items: [
      { t: "Illumination" },
      { t: "Patterned zone" },
      { t: "Sample perturbation" },
      { t: "Optical / electrical readout" },
      { t: "Reference correction" },
      { t: "Quality decision" },
    ],
  },
];

export default function MetasurfacePage() {
  return (
    <PlatformPage
      kicker="Metasurface Diagnostics"
      title="Engineering light at the surface of the diagnostic cartridge."
      lead="The value is not the visual pattern — it is a repeatable transfer function the reader can illuminate, measure and verify under real manufacturing and wet-sample conditions."
      heroImage={{ id: "metasurface-hero", alt: "Macro of a nanostructured metasurface showing structural colour.", caption: "Illustrative — structured optical surface" }}
      blocks={BLOCKS}
      primary={{ label: "Explore METACARD", href: "/metacard" }}
      secondary={{ label: "Discuss nanophotonic collaboration", href: "/partners" }}
    />
  );
}
