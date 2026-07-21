import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Express interest in future BIQADX roles across metasurfaces, microfluidics, diagnostics, electronics, software, quality and manufacturing.",
};

const TALENT = [
  "Metasurface & optical-system engineering",
  "Microfluidics & cartridge design",
  "Assay development & molecular diagnostics",
  "Electrochemistry & biointerfaces",
  "Precision mechanical, thermal & reliability",
  "Analog, digital & safety electronics",
  "Firmware, signal processing & governed ML",
  "Quality, risk, verification & regulatory",
  "Manufacturing engineering & metrology",
  "Healthcare partnerships & grants",
];

const HOW = [
  "Scientific honesty before presentation quality.",
  "Clear design inputs, calculations and test evidence.",
  "Respect for patient safety, confidentiality and regulatory boundaries.",
  "Cross-disciplinary communication without hiding uncertainty.",
  "Structured iteration: define, model, build, measure, correct, document.",
  "Long-term commitment to accessible, India-relevant healthcare.",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers & Talent"
        title="Build the system, not the demo."
        image="careers-craft"
      >
        For people who test their own assumptions.
      </PageHero>

      <ContentSection no="01 / 03" title="Talent areas" divider={false}>
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {TALENT.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/75"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </ContentSection>

      <ContentSection no="02 / 03" title="How we work">
        <ul>
          {HOW.map((h, i) => (
            <li key={h}>
              <ScrollReveal delay={i * 0.05}>
                <div className="flex gap-5 border-b border-ink/12 py-4 first:pt-0">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-ink/75">
                    {h}
                  </span>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        no="03 / 03"
        title="Talent interest"
        intro="Specific openings are published only when formally approved."
      >
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            General inquiries should include your area of interest, background,
            portfolio or publications, location, availability, and the problem
            you are best equipped to solve.
          </p>
          <Link href="/contact" className="btn-ink mt-8">
            Submit a talent-interest inquiry
          </Link>
        </Reveal>
      </ContentSection>

      <VoidBand>
        <Link href="/about" className="btn-outline">
          Learn about BIQADX
        </Link>
      </VoidBand>
    </>
  );
}
