import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { SplitFigure } from "@/components/ui/SplitFigure";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Intellectual Property & Engineering",
  description:
    "How BIQADX protects its metasurface, cartridge, analyzer, software and sustainable-technology research while maintaining evidence and confidentiality boundaries.",
};

const DISCIPLINES = [
  {
    t: "Nanophotonic design",
    d: "Electromagnetic modeling, optical constants, tolerance, resonance and throughput.",
  },
  {
    t: "Microfabrication & replication",
    d: "Mastering, nanoimprint, molding, thin-film deposition, etching and printing.",
  },
  {
    t: "Microfluidics & surface chemistry",
    d: "Wetting, capillary transport, valves, reagent deposition and immobilization.",
  },
  {
    t: "Analyzer systems engineering",
    d: "Optics, mechanics, electronics, thermal, safety, motion, metrology, serviceability.",
  },
  {
    t: "Software & quality engineering",
    d: "Configuration control, traceability, calibration, audit logs and cybersecurity.",
  },
  {
    t: "Manufacturing transfer",
    d: "Drawings, tolerances, BOM/AVL control, process FMEA, IQ/OQ/PQ and lot release.",
  },
];

const PUBLIC = [
  "Mission & high-level architecture",
  "Stage & general science",
  "Broad measurement methods",
  "Partnership needs",
  "Validation philosophy",
];
const CONTROLLED = [
  "Detailed drawings & zone layouts",
  "Algorithms & thresholds",
  "Assay formulations",
  "Supplier files & cost models",
  "Risk analyses",
  "Patent-sensitive embodiments",
];

export default function IpEngineeringPage() {
  return (
    <>
      <PageHero
        kicker="IP & Engineering"
        title="Protecting the architecture."
        image="ip-nanofab"
      >
        Patent work is part of R&amp;D — not a substitute for evidence.
      </PageHero>

      <ContentSection no="01 / 04" title="Public IP position" divider={false}>
        <ScrollReveal>
          {/* TODO(verify): specific application numbers, dates, inventors and legal
              status published only after official-record and patent-agent
              verification. */}
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            Active Indian patent and patent-development work spans biodegradable
            consumables, modular analyzers, adaptive sample processing,
            multi-fluid interfaces, multimodal analytical systems, immune-state
            sensing and metasurface-integrated cartridge–reader architectures.
          </p>
        </ScrollReveal>
      </ContentSection>

      <ContentSection
        no="02 / 04"
        title={"What “patent filed” means"}
        intro="An application has been submitted to an IP office. That is all it means."
      >
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            It does not mean the patent is granted, the claims are valid over
            prior art, the technology has been manufactured, the assay works
            clinically, the device is approved, or a product is available.
          </p>
        </ScrollReveal>
      </ContentSection>

      <ContentSection no="03 / 04" title="Engineering disciplines">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {DISCIPLINES.map((d, i) => (
            <ScrollReveal key={d.t} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {d.t}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {d.d}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* A figure between the disciplines and the disclosure boundary: what the
          patent work protects is the ability to reproduce a structure like this
          faithfully, at volume. */}
      <SplitFigure
        id="ip-surface"
        flip
        kicker="What is protected"
        lead="The value is in reproducing the structure, faithfully and at volume."
        body="A metasurface only works if the pattern is made to tolerance every time. The engineering and the IP are about that reproducibility — not a single good part."
        alt="A card-format part floating on near-black, its fine surface texture catching a narrow cyan-to-violet sheen."
        caption="Illustrative — replicated structure"
      />

      <ContentSection
        no="04 / 04"
        title="What we publish, and what we hold back"
        intro="The boundary is deliberate: enough to be assessed, not enough to be copied."
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            { label: "Public", items: PUBLIC },
            { label: "Controlled disclosure", items: CONTROLLED },
          ].map((col, ci) => (
            <ScrollReveal key={col.label} delay={ci * 0.06}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
                {col.label}
              </p>
              <ul className="mt-4">
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="border-t border-ink/12 py-2.5 font-body text-sm leading-relaxed text-ink/75"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
