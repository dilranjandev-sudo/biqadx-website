import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research-stage perspectives on metasurface diagnostics, cartridge engineering, measurement quality, decentralized healthcare and responsible deep-tech development.",
};

const PILLARS = [
  {
    t: "Metasurface science",
    d: "Wavefront engineering, spectral filtering, plasmonics, SERS, computational optics, references.",
  },
  {
    t: "Cartridge engineering",
    d: "Microfluidics, materials, bonding, surface chemistry, reagent integration, metrology.",
  },
  {
    t: "Analyzer systems",
    d: "Illumination, detection, thermal control, seating, motion, electronics, safety.",
  },
  {
    t: "Quality & validation",
    d: "Evidence layers, repeatability, controls, uncertainty, analytical validation.",
  },
  {
    t: "Diagnostic access",
    d: "Clinic-first workflows, decentralized testing, India-specific infrastructure.",
  },
  {
    t: "Responsible innovation",
    d: "AI governance, sustainability, patent honesty and public claims.",
  },
];

const ARTICLES = [
  "What is a diagnostic metasurface — and what is it not?",
  "Why a strong optical resonance is not automatically a good diagnostic test",
  "Moving optical functions from the analyzer into the cartridge",
  "How METACARD and OMEGA-PRO form a cooperative measurement system",
  "The four evidence layers from simulation to clinical validation",
  "Why intensity and wavelength references belong on the cartridge",
  "SERS, LSPR and fluorescence: different physics, different validation questions",
  "Manufacturing metasurfaces in polymer: from master to replicated cartridge",
  "Why one universal cartridge cannot safely replace assay-specific families",
  "The role of AI after calibration, controls and data integrity",
  "Designing diagnostic technology for small clinics and rural care",
  "Sustainable medical consumables: claims that require real testing",
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        kicker="Insights & Research"
        title="Metasurface diagnostics, explained with engineering discipline."
      >
        Separating established science, our engineering targets, and the
        evidence still required.
      </PageHero>

      <ContentSection no="01 / 02" title="Editorial pillars" divider={false}>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.t} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {p.d}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        no="02 / 02"
        title="Planned articles"
        intro="Each begins with a stage statement and identifies which claims are background, engineering targets or validated company data. This section goes live as articles are published."
      >
        <ol>
          {ARTICLES.map((a, i) => (
            <li key={a}>
              <ScrollReveal delay={Math.min(i, 5) * 0.04}>
                <div className="flex gap-5 border-b border-ink/12 py-4 first:pt-0">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-ink/75">
                    {a}
                  </span>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </ContentSection>

      <VoidBand>
        <Link href="/contact" className="btn-primary">
          Propose a joint technical article
        </Link>
      </VoidBand>
    </>
  );
}
