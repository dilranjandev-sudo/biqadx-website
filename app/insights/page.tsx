import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research-stage perspectives on metasurface diagnostics, cartridge engineering, measurement quality, decentralized healthcare and responsible deep-tech development.",
};

const PILLARS = [
  { t: "Metasurface science", d: "Wavefront engineering, spectral filtering, plasmonics, SERS, computational optics, references." },
  { t: "Cartridge engineering", d: "Microfluidics, materials, bonding, surface chemistry, reagent integration, metrology." },
  { t: "Analyzer systems", d: "Illumination, detection, thermal control, seating, motion, electronics, safety." },
  { t: "Quality & validation", d: "Evidence layers, repeatability, controls, uncertainty, analytical validation." },
  { t: "Diagnostic access", d: "Clinic-first workflows, decentralized testing, India-specific infrastructure." },
  { t: "Responsible innovation", d: "AI governance, sustainability, patent honesty and public claims." },
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
      <PageHero kicker="Insights & Research" title="Metasurface diagnostics, explained with engineering discipline.">
        Perspectives for partners, researchers and engineers — separating
        established science, BIQADX engineering targets, unresolved risks and the
        evidence still required.
      </PageHero>

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Editorial pillars</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-xl border border-[var(--border-light)] p-5">
                <h3 className="font-display text-base font-bold tracking-tight text-ink">{p.t}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Planned articles</h2>
          <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink/70">
            Each begins with a stage statement and identifies which claims are
            background, engineering targets or validated company data. This section
            goes live as articles are published.
          </p>
        </Reveal>
        <ol className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {ARTICLES.map((a, i) => (
            <Reveal key={a} delay={(i % 4) * 0.03}>
              <li className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-[0.7rem] text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg leading-snug text-ink/85">{a}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </PaperSection>

      <VoidBand>
        <Link href="/contact" className="btn-primary">Propose a joint technical article</Link>
      </VoidBand>
    </>
  );
}
