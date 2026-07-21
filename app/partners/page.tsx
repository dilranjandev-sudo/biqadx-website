import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Partners & Collaboration",
  description:
    "BIQADX seeks research, engineering, manufacturing, assay, clinical, regulatory and funding partners for its metasurface-integrated diagnostic platform.",
};

const AREAS = [
  {
    title: "Nanofabrication & nanoimprint",
    line: "Master fabrication, replication, optical metrology, polymer tooling and yield.",
  },
  {
    title: "Optical coatings & micro-optics",
    line: "Thin-film filters, gratings, microlenses and laser-compatible materials.",
  },
  {
    title: "Microfluidics & manufacturing",
    line: "Molding, lamination, reagent deposition, electrode printing and inspection.",
  },
  {
    title: "Assay development",
    line: "Clinical chemistry, immunoassay, electrolyte, coagulation, molecular, advanced sensing.",
  },
  {
    title: "Analyzer engineering",
    line: "Optomechanics, spectrometers, imaging, low-noise electronics, thermal, safety, EMC.",
  },
  {
    title: "Software & data systems",
    line: "Embedded control, reconstruction, quality logic, cybersecurity, regulated lifecycle.",
  },
  {
    title: "Clinical & regulatory",
    line: "Intended-use, protocols, comparators, risk, QMS, biocompatibility, submissions.",
  },
  {
    title: "Funding & incubation",
    line: "Non-dilutive grants, deep-tech incubation, strategic and milestone-based investment.",
  },
  {
    title: "Public-health implementation",
    line: "Workflow studies for primary care and decentralized diagnostic networks.",
  },
];

const INCLUDE = [
  "Organization and location",
  "Relevant technical or commercial capability",
  "Specific collaboration category",
  "Proposed scope, timeline and contribution",
  "Whether an NDA-level discussion is requested",
  "Evidence of comparable work, where relevant",
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        kicker="Partners & Collaboration"
        title="Build this with us."
        image="partners-bench"
      >
        No one discipline builds this alone.
      </PageHero>

      <ContentSection
        no="01 / 03"
        title="Priority collaboration areas"
        divider={false}
      >
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {AREAS.map((a, i) => (
            <ScrollReveal key={a.title} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {a.line}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <ContentSection no="02 / 03" title="What a useful inquiry includes">
        <ul>
          {INCLUDE.map((it, i) => (
            <li key={it}>
              <ScrollReveal delay={i * 0.05}>
                <div className="flex gap-5 border-b border-ink/12 py-4 first:pt-0">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-ink/75">
                    {it}
                  </span>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        no="03 / 03"
        title="Partnership-focused"
        intro="This is not a sales channel."
      >
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            We do not invite clinical procurement, patient sample submission or
            routine product demonstrations. Public discussion covers mission,
            stage, high-level architecture and validation philosophy; detailed
            engineering requires confidentiality agreements.
          </p>
          <Link href="/contact" className="btn-ink mt-8">
            Start a collaboration inquiry
          </Link>
        </Reveal>
      </ContentSection>

      <VoidBand>
        <p className="mx-auto max-w-3xl font-display text-2xl leading-snug tracking-tight text-signal sm:text-4xl">
          Engineering the diagnostic surface — with partners who build evidence,
          not hype.
        </p>
      </VoidBand>
    </>
  );
}
