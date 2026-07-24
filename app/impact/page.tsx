import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DiagramPlate } from "@/components/diagrams/DiagramPlate";
import { DelayChain } from "@/components/diagrams/DelayChain";

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
        <ScrollReveal>
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
        </ScrollReveal>
      </ContentSection>

      {/* Five items in two columns leave the heading column empty for most of the
          section's height. The figure goes there — beside the list rather than
          behind it. It carries the two items a photograph actually can (time and
          access); manufacturability, workflow and traceability are not things a
          picture can honestly show. */}
      <ContentSection
        no="02 / 03"
        title="What the platform is trying to improve"
        aside={
          <ImageSlot
            id="impact-waiting"
            alt="A small rural health facility at first light, shutters still closed, a bench outside where people wait — the distance and the waiting that come before any measurement."
            ratio="4/5"
            caption="Illustrative — decentralized care setting"
            sizes="(min-width: 1024px) 380px, 100vw"
          />
        }
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

      {/* The argument of this page is about relative length — the measurement is
          not the slow step — and that is a thing to see, not to read. It sits
          before the conditional-impact section so the caveat lands last. */}
      <DiagramPlate
        title="Where the time actually goes"
        intro="On a referral route the sample travels, waits, and the result travels back. Each of those is longer than the measurement."
      >
        <DelayChain tone="ink" />
      </DiagramPlate>

      <ContentSection
        no="03 / 03"
        title="Impact is conditional"
        intro="We are building toward this impact — not claiming completed outcomes."
      >
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            It depends on successful engineering, assay development, analytical
            and clinical validation, regulatory authorization, manufacturing
            scale-up, service models and affordability.
          </p>
        </ScrollReveal>
      </ContentSection>
    </>
  );
}
