import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Test & Assay Roadmap",
  description:
    "Candidate chemistry, electrolyte, immunoassay, coagulation, imaging and molecular assay families being considered for future METACARD development.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Candidate assay families",
    cols: 3,
    items: [
      {
        t: "Clinical chemistry",
        d: "Glucose, proteins, bilirubin, lipids, enzymes, renal and liver analytes.",
      },
      {
        t: "Electrolytes & acid–base",
        d: "Sodium, potassium, chloride, calcium and pH candidates.",
      },
      {
        t: "Inflammation & immunoassay",
        d: "CRP, ferritin and protein markers via fluorescence, TRF, chemiluminescence or plasmonic formats.",
      },
      {
        t: "Coagulation",
        d: "PT/INR and related feasibility workflows via optical clot monitoring.",
      },
      {
        t: "Molecular testing",
        d: "Limited pathogen or target panels via amplification and fluorescence.",
      },
      {
        t: "Imaging & cellular research",
        d: "Lens-free or computational imaging for cells and morphology.",
      },
      {
        t: "Advanced surface sensing",
        d: "SERS, LSPR and photoelectrochemical research for selected targets.",
      },
    ],
  },
  {
    kind: "list",
    title: "How assays enter the roadmap",
    items: [
      "Clinical need & intended-use definition",
      "Sample type & pre-analytical workflow",
      "Measurement physics & comparator method",
      "Assay chemistry, fluidics & surface compatibility",
      "Range, precision, interference & stability studies",
      "Cartridge manufacturability & reproducibility",
      "Reader configuration & calibration controls",
      "Regulatory & clinical validation strategy",
    ],
  },
  // Sits between the eight gates and the paragraph explaining the number, so the
  // qualifier arrives with the figure rather than after it.
  {
    kind: "diagram",
    title: "What the candidate count actually counts",
    intro:
      "Every candidate has to pass all eight gates. Nothing has been through them yet.",
    diagram: "roadmap-funnel",
  },
  {
    kind: "note",
    title: "What “approximately 200 tests” means",
    body: "A long-term candidate-menu architecture — not a statement that two hundred assays have been developed, validated, approved or made available. The number may change as feasibility, value, economics, regulation and partner strategy are evaluated.",
  },
];

export default function TestRoadmapPage() {
  return (
    <PlatformPage
      kicker="Test & Assay Roadmap"
      title="One validated method at a time."
      lead="Roughly 200 candidate assays — none validated yet."
      heroImage={{
        id: "roadmap-families",
        alt: "An array of different card-format cartridges laid out on a dark bench, each catching an iridescent sheen.",
        caption: "Illustrative — cartridge-family research",
      }}
      blocks={BLOCKS}
      primary={{ label: "Discuss assay co-development", href: "/partners" }}
      secondary={{
        label: "Explore measurement methods",
        href: "/measurement-methods",
      }}
    />
  );
}
