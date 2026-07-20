import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { messaging } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Media & Press",
  description:
    "Approved public descriptions, stage-safe terminology and press-contact guidance for BIQADX and its metasurface diagnostic platform.",
};

const APPROVED = [
  "Research-stage metasurface diagnostic platform",
  "Prototype-stage cartridge & cooperative analyzer",
  "Multi-modal optical-fluidic-electrochemical architecture",
  "Cartridge-encoded control & quality-gated measurement",
  "Future decentralized diagnostic pathway",
  "Patent & engineering development",
];

const AVOID = [
  "Clinically proven",
  "Approved",
  "Launched",
  "Available for hospitals",
  "Market-ready",
  "Laboratory replacement",
  "Guaranteed accuracy",
  "Instant diagnosis",
  "AI doctor",
  "Mass-produced",
  "Fully biodegradable",
];

const BOILERPLATE =
  "BIQADX Private Limited is a founder-led deep-technology healthcare company based in India. Its primary R&D program combines the METACARD metasurface-integrated multi-modal cartridge, the OMEGA-PRO cooperative analyzer and the UDOS software-control architecture. The platform is being engineered to support multiple optical, electrochemical and computational measurement methods through assay-specific cartridge families, built-in references, deterministic quality controls and auditable data handling. BIQADX is currently in research, prototype and engineering-development stages and does not claim clinical validation, regulatory approval or commercial availability for the platform.";

export default function MediaPage() {
  return (
    <>
      <PageHero
        kicker="Media & Public Information"
        title="BIQADX media and public information."
      />

      <ContentSection
        no="01 / 04"
        title="Approved one-line description"
        divider={false}
      >
        <Reveal>
          <p className="max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
            {messaging.oneLine}
          </p>
        </Reveal>
      </ContentSection>

      <ContentSection no="02 / 04" title="Approved boilerplate">
        <Reveal>
          <p className="max-w-2xl font-body leading-relaxed text-ink/75">
            {BOILERPLATE}
          </p>
        </Reveal>
      </ContentSection>

      <ContentSection
        no="03 / 04"
        title="Founders"
        intro="Titles and biographies must be confirmed before publication or external quotation."
      >
        {/* TODO(verify): confirm founder titles/bios before publication or quotation. */}
        <Reveal>
          <ul>
            {[
              { name: "Arun Kumar", role: "Founder & CEO" },
              { name: "Dilranjan Kumar Patel", role: "Co-Founder & CTO" },
            ].map((f) => (
              <li
                key={f.name}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-ink/12 py-4 first:pt-0"
              >
                <span className="font-display text-base font-bold tracking-tight text-ink">
                  {f.name}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
                  {f.role}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </ContentSection>

      <ContentSection
        no="04 / 04"
        title="Terminology"
        intro="Contact BIQADX for approved wording before associating the company with clinical performance, approval, launch, deployment, grant, investment, patent grant or manufacturing-readiness claims."
      >
        <div className="space-y-10">
          <ScrollReveal>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
              Approved terms
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {APPROVED.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65">
              Do not use without evidence
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {AVOID.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-dashed border-ink/25 px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/65 line-through decoration-ink/30"
                >
                  {t}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </ContentSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Send a media inquiry
          </Link>
          <Link href="/about" className="btn-outline">
            View company background
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
