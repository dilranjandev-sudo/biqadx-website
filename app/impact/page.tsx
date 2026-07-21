import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Intended Healthcare Impact",
  description:
    "BIQADX is building toward clinic-first diagnostic systems for future use in decentralized, rural and resource-constrained healthcare after validation and approval.",
};

const SETTINGS = [
  "Small clinics & physician practices",
  "Primary & community health facilities",
  "Rural & semi-urban networks",
  "Mobile screening & outreach",
  "Emergency, triage & near-patient",
  "Research & public-health programs",
];

const IMPROVE = [
  {
    t: "Time",
    d: "Reduce avoidable delays between sample collection and an actionable, quality-controlled report.",
  },
  {
    t: "Workflow",
    d: "Consolidate measurement families around shared cartridge handling and software control.",
  },
  {
    t: "Access",
    d: "Support deployment models that operate outside large centralized laboratories.",
  },
  {
    t: "Traceability",
    d: "Link identity, calibration, raw data, QC and output state in one auditable workflow.",
  },
  {
    t: "Manufacturability",
    d: "Develop an India-relevant path for cartridge fabrication and analyzer assembly.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        kicker="Intended Healthcare Impact"
        title="Where diagnostic delay matters most."
        image="about-clinic-first"
      >
        A clinic is reachable. A laboratory often is not.
      </PageHero>

      <ContentSection
        no="01 / 03"
        title="Intended future settings"
        divider={false}
      >
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {SETTINGS.map((s) => (
              <li
                key={s}
                className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/75"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </ContentSection>

      <ContentSection
        no="02 / 03"
        title="What the platform is trying to improve"
      >
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {IMPROVE.map((m, i) => (
            <ScrollReveal key={m.t} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {m.t}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {m.d}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        no="03 / 03"
        title="Impact is conditional"
        intro="We are building toward this impact — not claiming completed outcomes."
      >
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            It depends on successful engineering, assay development, analytical
            and clinical validation, regulatory authorization, manufacturing
            scale-up, service models and affordability.
          </p>
        </Reveal>
      </ContentSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">
            Partner on healthcare access
          </Link>
          <Link href="/metasurface-diagnostics" className="btn-outline">
            Explore the platform
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
