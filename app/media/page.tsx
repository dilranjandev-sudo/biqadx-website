import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
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
  "Clinically proven", "Approved", "Launched", "Available for hospitals",
  "Market-ready", "Laboratory replacement", "Guaranteed accuracy",
  "Instant diagnosis", "AI doctor", "Mass-produced", "Fully biodegradable",
];

const BOILERPLATE =
  "BIQADX Private Limited is a founder-led deep-technology healthcare company based in India. Its primary R&D program combines the METACARD metasurface-integrated multi-modal cartridge, the OMEGA-PRO cooperative analyzer and the UDOS software-control architecture. The platform is being engineered to support multiple optical, electrochemical and computational measurement methods through assay-specific cartridge families, built-in references, deterministic quality controls and auditable data handling. BIQADX is currently in research, prototype and engineering-development stages and does not claim clinical validation, regulatory approval or commercial availability for the platform.";

export default function MediaPage() {
  return (
    <>
      <PageHero kicker="Media & Public Information" title="BIQADX media and public information." />

      <PaperSection>
        <div className="space-y-8">
          <Reveal>
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/45">Approved one-line description</p>
              <p className="mt-3 max-w-3xl font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                {messaging.oneLine}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="border-t border-ink/15 pt-8">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/45">Approved boilerplate</p>
              <p className="mt-3 max-w-3xl font-body leading-relaxed text-ink/75">{BOILERPLATE}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="border-t border-ink/15 pt-8">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/45">Founders</p>
              <p className="mt-3 font-body text-ink/80">Arun Kumar — Founder &amp; CEO · Dilranjan Kumar Patel — Co-Founder &amp; CTO.</p>
              {/* TODO(verify): confirm founder titles/bios before publication or quotation. */}
              <p className="mt-1 font-body text-sm text-ink/50">Titles and biographies must be confirmed before publication or external quotation.</p>
            </div>
          </Reveal>
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Approved terms</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {APPROVED.map((t) => (
                  <li key={t} className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink/65">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Do not use without evidence</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AVOID.map((t) => (
                  <li key={t} className="rounded-full border border-dashed border-ink/25 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink/45 line-through decoration-ink/30">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <p className="mt-10 max-w-3xl font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.12em] text-ink/45">
          Contact BIQADX for approved wording before associating the company with
          clinical performance, approval, launch, deployment, grant, investment,
          patent grant or manufacturing-readiness claims.
        </p>
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">Send a media inquiry</Link>
          <Link href="/about" className="btn-outline">View company background</Link>
        </div>
      </VoidBand>
    </>
  );
}
