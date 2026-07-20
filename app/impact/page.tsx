import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

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
  { t: "Time", d: "Reduce avoidable delays between sample collection and an actionable, quality-controlled report." },
  { t: "Workflow", d: "Consolidate measurement families around shared cartridge handling and software control." },
  { t: "Access", d: "Support deployment models that operate outside large centralized laboratories." },
  { t: "Traceability", d: "Link identity, calibration, raw data, QC and output state in one auditable workflow." },
  { t: "Manufacturability", d: "Develop an India-relevant path for cartridge fabrication and analyzer assembly." },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero kicker="Intended Healthcare Impact" title="Designed for the places where diagnostic delay matters most.">
        Many patients can reach a clinic, but the clinic may not have timely access
        to a broad laboratory. Samples travel, results return late, and care
        decisions are delayed.
      </PageHero>

      <MediaBand
        src="/images/impact-reach.png"
        alt="A community health worker with a family in a rural Indian setting at sunset, holding a small portable device."
        width={1122}
        height={1402}
        max="max-w-lg"
        caption="Illustrative — intended future setting"
      />

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Intended future settings</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {SETTINGS.map((s) => (
              <li key={s} className="rounded-full border border-[var(--border-light)] px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-ink/65">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">What the platform is trying to improve</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {IMPROVE.map((m, i) => (
            <Reveal key={m.t} delay={(i % 3) * 0.05}>
              <div className="border-t border-ink/15 pt-4">
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">{m.t}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-xl border border-ink/20 bg-white/50 p-6">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">Impact is conditional</h2>
            <p className="mt-3 max-w-3xl font-body leading-relaxed text-ink/70">
              It depends on successful engineering, assay development, analytical and
              clinical validation, regulatory authorization, manufacturing scale-up,
              service models and affordability. We are building toward this impact —
              not claiming completed outcomes.
            </p>
          </div>
        </Reveal>
        <DevNotice className="mt-8" />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">Partner on healthcare access</Link>
          <Link href="/metasurface-diagnostics" className="btn-outline">Explore the platform</Link>
        </div>
      </VoidBand>
    </>
  );
}
