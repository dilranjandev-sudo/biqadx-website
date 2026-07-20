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
  {
    kind: "band",
    id: "methods-mid",
    alt: "Macro of a nanostructured surface showing structural colour across the texture.",
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
      title="One platform architecture, multiple measurement physics."
      lead="Not every assay is forced into one signal type. Shared mechanics, different physics."
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
