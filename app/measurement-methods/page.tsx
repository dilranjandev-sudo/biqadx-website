import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Measurement Methods",
  description:
    "The fourteen core optical, electrochemical and computational measurement methods being evaluated for METACARD and OMEGA-PRO.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Fourteen core measurement methods",
    cols: 3,
    numbered: true,
    items: [
      {
        t: "Absorbance & endpoint photometry",
        d: "Wavelength-dependent light loss for colored reactions.",
      },
      {
        t: "Kinetic photometry",
        d: "Rate of optical change for enzyme and reaction kinetics.",
      },
      {
        t: "Turbidimetry & nephelometry",
        d: "Transmitted-light loss or scatter from particles and complexes.",
      },
      {
        t: "Fluorescence",
        d: "Excite a fluorophore; detect spectrally separated emission.",
      },
      {
        t: "Time-resolved fluorescence",
        d: "Delayed acquisition separates long-lifetime emission from background.",
      },
      {
        t: "Chemiluminescence",
        d: "Light from a chemical reaction, without external excitation.",
      },
      {
        t: "Raman & SERS",
        d: "Molecular vibrational signatures, enhanced near engineered nanostructures.",
      },
      {
        t: "LSPR & plasmonic sensing",
        d: "Resonance shifts from refractive-index or surface-binding changes.",
      },
      {
        t: "Lens-free holographic imaging",
        d: "Interference patterns reconstructed computationally.",
      },
      {
        t: "Computational imaging",
        d: "Coded, multi-angle measurements improve recoverable image information.",
      },
      {
        t: "Lateral-flow reflectance imaging",
        d: "Digital control/test regions in strip-format immunoassays.",
      },
      {
        t: "Optical coagulation",
        d: "Transmission, scatter or speckle changes during clot formation.",
      },
      {
        t: "Electrochemistry & ion-selective",
        d: "Current, voltage, impedance or ion-dependent membrane potential.",
      },
      {
        t: "Photoelectrochemistry",
        d: "Light excitation coupled with an electrochemical response.",
      },
    ],
  },
  // Placed after the list of fourteen rather than before it: the drawing is the
  // answer to "so what holds those together?", and it only lands once the reader
  // has scrolled the list and felt how varied it is.
  {
    kind: "diagram",
    title: "One platform, several physics",
    intro:
      "Every family shares the card format, the reader interface and the control layer. What differs is the physics used to make the measurement.",
    diagram: "method-families",
  },
  // The physics differ; the surface they are all read from does not. Placed
  // after the drawing so the abstraction lands first and the material second.
  {
    kind: "band",
    id: "surface-macro-4",
    alt: "Extreme macro at a steep viewing angle, the micro-texture running away from the camera with a narrow band of cyan-violet sheen held in focus and the rest falling soft.",
    caption: "Illustrative — the structured surface, in macro",
  },
  {
    kind: "chips",
    title: "Research extensions",
    intro:
      "Not presented as production-ready until system advantage, manufacturing repeatability and assay relevance are established.",
    items: [
      "Molecular amplification + fluorescence",
      "Polarization & birefringence imaging",
      "Fano / quasi-BIC resonances",
      "Chiral & conformational sensing",
    ],
  },
];

export default function MeasurementMethodsPage() {
  return (
    <PlatformPage
      kicker="Measurement Methods"
      title="One platform, several physics."
      lead="Shared mechanics. Different measurement."
      heroImage={{
        id: "methods-optics",
        alt: "A spectrometer, fluorescence and imaging optics on a dark bench, thin beams of coloured light passing through.",
        caption: "Illustrative — measurement research",
      }}
      blocks={BLOCKS}
      primary={{ label: "Explore the assay roadmap", href: "/test-roadmap" }}
      secondary={{ label: "Discuss method development", href: "/partners" }}
    />
  );
}
