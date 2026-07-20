import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

export const metadata: Metadata = {
  title: { absolute: "About BIQADX | Deep-Tech Diagnostic R&D" },
  description:
    "Learn about BIQADX Private Limited, its mission to decentralize diagnostic intelligence, its founders and its evidence-led engineering approach.",
};

const THESIS = [
  { title: "Clinic-first", line: "Design around limited space, power, maintenance capacity, operator time and follow-up windows." },
  { title: "Cartridge intelligence", line: "Move optical, fluidic, sensing, calibration and identity functions into the consumable where it creates a measurable advantage." },
  { title: "Reusable precision", line: "Keep controlled illumination, detection, motion, thermal management and safety in a serviceable analyzer." },
  { title: "Evidence before promotion", line: "Advance statements only to the level demonstrated by simulation, component, cartridge and analytical evidence." },
  { title: "Responsible scale-up", line: "Design for manufacturability, quality control, traceability and lifecycle impact from the beginning." },
];

const FOUNDERS = [
  {
    name: "Arun Kumar",
    role: "Founder & CEO",
    line: "Leads company vision, strategy, platform architecture, intellectual-property development, partnerships and the mission to expand diagnostic access.",
  },
  {
    name: "Dilranjan Kumar Patel",
    role: "Co-Founder & CTO",
    line: "Leads technical development, multidisciplinary engineering integration, prototyping and translation toward manufacturable systems.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About BIQADX" title="Building diagnostic intelligence around the real constraints of care.">
        A founder-led Indian deep-tech healthcare company working across diagnostic
        cartridges, nanophotonics, microfluidics, sensing, analyzer engineering,
        embedded control, software quality systems and sustainable medical innovation.
      </PageHero>

      <MediaBand
        src="/images/about-workspace.png"
        alt="A deep-tech research bench: optics, a microfluidic chip, electronics and an iridescent wafer under soft light."
        width={1672}
        height={941}
        caption="Illustrative — research concept"
      />

      <PaperSection>
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
              Our mission
            </p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              Make reliable diagnostic capability more accessible to clinics,
              community facilities and decentralized care — while preserving the
              evidence, quality controls and regulatory discipline healthcare requires.
            </p>
          </div>
        </Reveal>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Our operating thesis
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {THESIS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <div className="border-t border-ink/15 pt-4">
                <span className="font-mono text-[0.66rem] text-ink/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{t.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{t.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      {/* Relatable clinic-first band — placeholder until generated */}
      <section className="bg-void">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <ImageSlot
              id="about-clinic-first"
              alt="A community health setting where decentralized testing is intended to help — a health worker with a small portable device, generic and respectful, device screen off."
              ratio="16/9"
              caption="Illustrative — intended setting"
            />
          </Reveal>
        </div>
      </section>

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Founders
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-[var(--border-light)] p-6">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink">{f.name}</h3>
                <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/55">
                  {f.role}
                </p>
                <p className="mt-3 font-body leading-relaxed text-ink/70">{f.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
                What BIQADX is today
              </p>
              <p className="mt-4 font-body leading-relaxed text-ink/75">
                BIQADX is in the research, prototype and engineering-development stage.
                The company is building controlled design baselines, cartridge and reader
                prototypes, manufacturing plans, validation strategies, software
                architecture, quality logic and partner networks. It is not presenting the
                METACARD–OMEGA-PRO platform as a clinically validated or commercially
                available product.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
                Long-term direction
              </p>
              <p className="mt-4 font-body leading-relaxed text-ink/75">
                A portfolio of validated cartridge families that share common analyzer
                infrastructure while using assay-specific fluidics, reagents, sensing zones
                and control profiles — intended to support chemistry, immunoassay,
                electrolyte, coagulation, imaging, molecular and advanced optical
                measurements, without pretending every method fits one identical consumable.
              </p>
            </div>
          </Reveal>
        </div>
        <DevNotice className="mt-10" />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">
            Discuss a strategic partnership
          </Link>
          <Link href="/legal/development-stage" className="btn-outline">
            Read the development-stage statement
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
