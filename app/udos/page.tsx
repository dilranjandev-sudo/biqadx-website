import type { Metadata } from "next";
import {
  PlatformPage,
  type PlatformBlock,
} from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "UDOS Software & Data Integrity",
  description:
    "UDOS is BIQADX's research-stage diagnostic operating-system concept for cartridge identity, deterministic execution, calibration, QC, audit trails and governed analytics.",
};

const BLOCKS: PlatformBlock[] = [
  {
    kind: "grid",
    title: "Core software responsibilities",
    cols: 3,
    items: [
      {
        t: "Cartridge manifest",
        d: "Load the authorized family, method, illumination, detector, motion, thermal and QC configuration.",
      },
      {
        t: "Instrument readiness",
        d: "Verify sensors, interlocks, calibration, references, storage and subsystem health.",
      },
      {
        t: "Deterministic execution",
        d: "Run the method through version-controlled states with bounded timing and actuation.",
      },
      {
        t: "Raw-data preservation",
        d: "Store spectra, images, electrical traces, references, environment and acquisition metadata.",
      },
      {
        t: "Quality & result state",
        d: "Apply predefined rules to release, flag, repeat or invalidate the output.",
      },
      {
        t: "Auditability",
        d: "Record software version, identity, calibration, corrections, operator actions and errors.",
      },
      {
        t: "Security & config control",
        d: "Prevent unauthorized methods, altered manifests and untracked parameter changes.",
      },
    ],
  },
  {
    kind: "note",
    title: "The role of AI and machine learning",
    body: "ML may support reconstruction, deconvolution, anomaly detection or workflow assistance — but must not bypass safety interlocks, calibration, internal controls, validity or human governance. Any AI function is trained, tested, locked, monitored and validated for its defined purpose.",
  },
  // The whole run, and the one thing the page most needs to show rather than
  // assert: machine learning is a governed helper, wired into calibration and
  // held short of the validity gate.
  {
    kind: "diagram",
    title: "The pipeline, and where ML sits",
    intro:
      "A run is acquired, corrected, checked and released only through the validity gate. Machine learning assists calibration — it never gates a result.",
    diagram: "udos-pipeline",
  },
  // The hardest idea on this page to carry in prose, and the easiest to draw:
  // four conditions in series, and a failure that stops the run rather than
  // producing a different answer.
  {
    kind: "diagram",
    title: "The validity gate",
    intro:
      "Four conditions are checked in series. A result is released only when every one of them holds.",
    diagram: "validity-gate",
  },
  // The software has a physical home — the edge-compute and control electronics
  // inside the analyzer. A figure grounds an otherwise abstract page.
  {
    kind: "figure",
    title: "Software with a physical home",
    body: "UDOS is not a cloud service bolted on afterwards — it runs on the control electronics inside the analyzer, deterministically, close to the measurement it governs.",
    id: "udos-bench",
    alt: "Control electronics on a dark bench — a bare board, ribbon cables and a probe under a work lamp.",
    caption: "Illustrative — control-system research",
  },
  {
    kind: "list",
    title: "Data principles",
    items: [
      "No patient-data collection through public website forms.",
      "Minimum necessary data and purpose limitation for future product systems.",
      "Traceable link between raw signal, processing version, calibration and output.",
      "Offline-capable core measurement where deployment requires it.",
      "Controlled synchronization and cybersecurity for connected functions.",
      "No hidden replacement of raw data with untraceable AI-generated values.",
    ],
  },
];

export default function UdosPage() {
  return (
    <PlatformPage
      kicker="UDOS Software & Data Integrity"
      title="Control before interpretation."
      lead="Never let an invalid measurement look valid."
      heroImage={{
        id: "udos-control",
        alt: "A close macro of the analyzer's embedded control electronics and edge-compute board under soft light.",
        caption: "Illustrative — control-system research",
      }}
      blocks={BLOCKS}
      primary={{
        label: "Explore quality and validation",
        href: "/quality-validation",
      }}
      secondary={{ label: "Discuss software collaboration", href: "/partners" }}
    />
  );
}
