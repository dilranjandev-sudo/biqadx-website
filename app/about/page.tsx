import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FigureBand } from "@/components/ui/FigureBand";
import { ContentSection } from "@/components/ui/ContentSection";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <PageHero
        kicker="About BIQADX"
        title="Building diagnostic intelligence around the real constraints of care."
      >
        A founder-led Indian deep-tech healthcare company working across diagnostic
        cartridges, nanophotonics, microfluidics, sensing, analyzer engineering,
        embedded control, software quality systems and sustainable medical innovation.
      </PageHero>

      <FigureBand
        id="about-bench"
        alt="A deep-tech research bench: optics, a microfluidic chip and control electronics under soft light."
        caption="Illustrative — research bench"
        label="Figure 01"
        priority
      />

      <ContentSection no="01 / 05" title="Our mission" divider={false}>
        <Reveal>
          <p className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.75rem]">
            Make reliable diagnostic capability more accessible to clinics, community
            facilities and decentralized care — while preserving the evidence, quality
            controls and regulatory discipline healthcare requires.
          </p>
        </Reveal>
      </ContentSection>

      <ContentSection no="02 / 05" title="Our operating thesis">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {THESIS.map((t, i) => (
            <ScrollReveal key={t.title} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{t.line}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <FigureBand
        id="about-clinic-first"
        alt="A health worker seated at a plain table in a modest community health room, daylight from a window beside her, a small dark instrument on the table with its screen off."
        caption="Illustrative — intended setting"
        label="Figure 02"
      />

      <ContentSection no="03 / 05" title="Founders" divider={false}>
        <div className="grid gap-8 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <ScrollReveal key={f.name} delay={i * 0.06}>
              <div className="border-t border-ink/15 pt-4">
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">
                  {f.name}
                </h3>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
                  {f.role}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/75">{f.line}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        no="04 / 05"
        title="What BIQADX is today"
        intro="Research, prototype and engineering-development stage."
      >
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            The company is building controlled design baselines, cartridge and reader
            prototypes, manufacturing plans, validation strategies, software
            architecture, quality logic and partner networks. It is not presenting the
            METACARD–OMEGA-PRO platform as a clinically validated or commercially
            available product.
          </p>
        </Reveal>
      </ContentSection>

      <ContentSection no="05 / 05" title="Long-term direction">
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            A portfolio of validated cartridge families that share common analyzer
            infrastructure while using assay-specific fluidics, reagents, sensing zones
            and control profiles — intended to support chemistry, immunoassay,
            electrolyte, coagulation, imaging, molecular and advanced optical
            measurements, without pretending every method fits one identical consumable.
          </p>
        </Reveal>
      </ContentSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <DevNotice />
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
