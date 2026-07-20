import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "How the Platform Works",
  description:
    "The research-stage workflow from cartridge identity and sample routing to multi-modal interrogation, calibration, QC and validity-gated output.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "From sample entry to a validity state",
    cols: 2,
    numbered: true,
    items: [
      {
        t: "Cartridge identity is read",
        d: "Family, lot and authorized profile are identified; incompatible or expired cards are rejected.",
      },
      {
        t: "The cartridge is seated to datums",
        d: "Mechanical references establish the optical, thermal and electrical relationship.",
      },
      {
        t: "Sample enters a fluidic path",
        d: "Validated transport delivers sample and reagents to defined chambers.",
      },
      {
        t: "Assay chemistry or interaction occurs",
        d: "Absorption, fluorescence, binding, coagulation, electrochemistry or imaging.",
      },
      {
        t: "The zone transforms the signal",
        d: "A structured surface, cavity, electrode or aperture produces the measurable response.",
      },
      {
        t: "OMEGA-PRO interrogates the zone",
        d: "The authorized illumination, motion, thermal or electrical profile acquires the raw signal.",
      },
      {
        t: "References and controls are evaluated",
        d: "Intensity, wavelength, dark, electrical and assay controls are checked; corrections are bounded and recorded.",
      },
      {
        t: "A validity state is assigned",
        d: "The output is released, flagged, repeated or invalidated — with raw data preserved for audit.",
      },
    ],
  },
  {
    kind: "band",
    id: "howitworks-mid",
    alt: "An inspection objective over the card's alignment features during a self-check.",
  },
  {
    kind: "note",
    title: "Why validity gating matters",
    body: "A number should not be shown merely because a detector produced a signal. Technical validity depends on identity, seating, references, detector state, fluid completion, calibration and configuration integrity. This is the basis of BIQADX's validity-gated output philosophy.",
  },
];

export default function HowItWorksPage() {
  return (
    <PlatformPage
      kicker="How the Platform Works"
      title="From sample entry to a quality-gated measurement."
      lead="A controlled chain. Every link has to hold before an output means anything."
      heroImage={{
        id: "howitworks-sequence",
        alt: "A gloved hand applying a sample to the iridescent card, then seating it into the analyzer.",
        caption: "Illustrative — research workflow",
      }}
      blocks={BLOCKS}
      primary={{
        label: "Explore quality & validation",
        href: "/quality-validation",
      }}
      secondary={{
        label: "Explore measurement methods",
        href: "/measurement-methods",
      }}
    />
  );
}
