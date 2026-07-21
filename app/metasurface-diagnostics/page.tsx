import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Metasurface Diagnostics",
  description:
    "How BIQADX uses engineered optical surfaces for coupling, focusing, filtering, resonance, calibration, computational imaging and cartridge authentication.",
};

/**
 * The science pillar page, on the shared PlatformPage template like the other
 * seven.
 *
 * It previously ran dark end to end with its own section shell — the argument
 * being that a page about controlling light belongs on a dark ground. That made
 * it the one Platform page that looked like somewhere else, and it stopped
 * inheriting template changes. Being legible as part of the same set is worth
 * more than the register, so it is data now: same flow, same spine, same
 * figures, and a change to the template lands here too.
 */

const BLOCKS: PlatformBlock[] = [
  // The chain leads: every claim below is only worth what survives it.
  {
    kind: "grid",
    title: "The complete measurement chain",
    intro:
      "A high-Q resonance or large simulated field enhancement is only useful when its measurable change exceeds drift, angular sensitivity, manufacturing variation, contamination, nonspecific binding and detector noise.",
    cols: 3,
    numbered: true,
    items: [
      {
        t: "Illumination",
        d: "Controlled light enters the zone at a fixed geometry.",
      },
      {
        t: "Patterned zone",
        d: "The engineered surface acts on amplitude, phase, spectrum or field.",
      },
      {
        t: "Sample perturbation",
        d: "The sample changes what that surface does to the light.",
      },
      {
        t: "Readout",
        d: "The analyzer measures the optical or electrical consequence.",
      },
      {
        t: "Reference correction",
        d: "On-card references bound drift in the measured value.",
      },
      {
        t: "Quality decision",
        d: "The result is released only inside the authorized state.",
      },
    ],
  },
  {
    kind: "grid",
    title: "What a metasurface can control",
    intro: "Seven properties of light, and what each one governs.",
    cols: 3,
    items: [
      {
        t: "Amplitude",
        d: "How much light is transmitted, reflected, absorbed or scattered.",
      },
      {
        t: "Phase",
        d: "How the wavefront is delayed or advanced to focus or reshape light.",
      },
      {
        t: "Direction",
        d: "How light is diffracted, steered or coupled into a measurement path.",
      },
      {
        t: "Spectrum",
        d: "Which wavelengths are passed, rejected, enhanced or separated.",
      },
      {
        t: "Polarization",
        d: "How the electric-field orientation is selected, rotated or analyzed.",
      },
      {
        t: "Local field",
        d: "How nanoscale resonances intensify fields near a sensing surface.",
      },
      {
        t: "Spatial encoding",
        d: "How a pattern creates a coded or computational measurement.",
      },
    ],
  },
  {
    kind: "grid",
    title: "Four legitimate roles",
    intro:
      "What an engineered surface actually does in this platform — and, by omission, what it does not.",
    cols: 2,
    numbered: true,
    items: [
      {
        t: "Signal creation",
        d: "Generate a new measurable channel — an enhanced Raman spectrum or resonance shift.",
      },
      {
        t: "Signal enhancement",
        d: "Improve photon coupling and signal-to-noise without changing the chemistry.",
      },
      {
        t: "Signal correction",
        d: "Provide characterized references for bounded drift correction.",
      },
      {
        t: "Authentication",
        d: "Encode a structure that supports identity and process traceability.",
      },
    ],
  },
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
    kind: "note",
    title: "The pattern is not the product",
    body: "Structural colour is what a nanostructured surface looks like, not what it does. The engineering claim is a transfer function that survives manufacturing tolerance, wet-sample conditions and drift — and that can be measured the same way twice.",
  },
];

export default function MetasurfacePage() {
  return (
    <PlatformPage
      kicker="Metasurface Diagnostics"
      title="Engineering light at the surface."
      lead="Not the pattern — the transfer function behind it."
      heroImage={{
        id: "metasurface-hero",
        alt: "A macro of an engineered optical surface under controlled light.",
        caption: "Illustrative — nanophotonics research",
      }}
      blocks={BLOCKS}
      primary={{ label: "Explore METACARD", href: "/metacard" }}
      secondary={{
        label: "Discuss nanophotonic collaboration",
        href: "/partners",
      }}
    />
  );
}
