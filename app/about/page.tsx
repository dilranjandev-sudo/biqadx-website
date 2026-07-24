import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SplitFigure } from "@/components/ui/SplitFigure";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: { absolute: "About BIQADX | Deep-Tech Diagnostic R&D" },
  description:
    "Learn about BIQADX Private Limited, its mission to decentralize diagnostic intelligence, its founders and its evidence-led engineering approach.",
};

const THESIS = [
  {
    title: "Clinic-first",
    line: "Design around limited space, power, maintenance capacity, operator time and follow-up windows.",
  },
  {
    title: "Cartridge intelligence",
    line: "Move optical, fluidic, sensing, calibration and identity functions into the consumable where it creates a measurable advantage.",
  },
  {
    title: "Reusable precision",
    line: "Keep controlled illumination, detection, motion, thermal management and safety in a serviceable analyzer.",
  },
  {
    title: "Evidence before promotion",
    line: "Advance statements only to the level demonstrated by simulation, component, cartridge and analytical evidence.",
  },
  {
    title: "Responsible scale-up",
    line: "Design for manufacturability, quality control, traceability and lifecycle impact from the beginning.",
  },
];

const FOUNDERS = [
  {
    name: "Arun Kumar",
    role: "Founder & CEO",
    photo: "founder-arun",
    line: "Leads company vision, strategy, platform architecture, intellectual-property development, partnerships and the mission to expand diagnostic access.",
  },
  {
    name: "Dilranjan Kumar Patel",
    role: "Co-Founder & CTO",
    photo: "founder-dilranjan",
    line: "Leads technical development, multidisciplinary engineering integration, prototyping and translation toward manufacturable systems.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About BIQADX"
        title="Built around the constraints of care."
        image="about-bench"
      >
        An India-based deep-tech healthcare R&amp;D company.
      </PageHero>

      <ContentSection no="01 / 05" title="Our mission" divider={false}>
        <ScrollReveal>
          <p className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.75rem]">
            Make reliable diagnostic capability more accessible to clinics,
            community facilities and decentralized care — while preserving the
            evidence, quality controls and regulatory discipline healthcare
            requires.
          </p>
        </ScrollReveal>
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
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {t.line}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* The mission made concrete: the setting the whole platform is built for —
          decentralized, clinic-first care. A generated image is fine here (generic
          people), unlike the founder portraits below. */}
      <SplitFigure
        id="about-care"
        flip
        kicker="Who it is for"
        lead="Built for the clinic, not the reference lab."
        body="The platform is engineered for community and primary-care settings outside large centralized laboratories — where a reliable result close to the patient changes what care is possible."
        alt="A community health worker in a modest primary-care setting in soft daylight, a small unbranded portable device at hand, its screen off."
        caption="Illustrative — decentralized care setting"
      />

      {/* Founders carry portraits, and those slots stay empty until real
          photographs of these two people are supplied.
          This is the one place on the site where an image may not be generated.
          Everywhere else the imagery is illustrative and the people in it are
          deliberately generic; here the names are real, so a generated face
          would not be an illustration of a founder — it would be an invented
          person presented as one. ImageSlot renders a labelled placeholder until
          `founder-arun` and `founder-dilranjan` exist in lib/images.ts, so the
          page is complete and honest in the meantime. */}
      <ContentSection no="03 / 05" title="Founders" divider={false}>
        <div className="grid gap-8 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <ScrollReveal key={f.name} delay={i * 0.06}>
              <div className="border-t border-ink/15 pt-4">
                <ImageSlot
                  id={f.photo}
                  alt={`Portrait of ${f.name}, ${f.role}, BIQADX.`}
                  ratio="4/5"
                  className="mb-5 max-w-[220px]"
                  sizes="(min-width: 640px) 220px, 60vw"
                />
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">
                  {f.name}
                </h3>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
                  {f.role}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/75">
                  {f.line}
                </p>
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
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            The company is building controlled design baselines, cartridge and
            reader prototypes, manufacturing plans, validation strategies,
            software architecture, quality logic and partner networks. It is not
            presenting the METACARD–OMEGA-PRO platform as a clinically validated
            or commercially available product.
          </p>
        </ScrollReveal>
      </ContentSection>

      <ContentSection no="05 / 05" title="Long-term direction">
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            A portfolio of validated cartridge families that share common
            analyzer infrastructure while using assay-specific fluidics,
            reagents, sensing zones and control profiles — intended to support
            chemistry, immunoassay, electrolyte, coagulation, imaging, molecular
            and advanced optical measurements, without pretending every method
            fits one identical consumable.
          </p>
        </ScrollReveal>
      </ContentSection>
    </>
  );
}
