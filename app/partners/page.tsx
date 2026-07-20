import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "BIQADX welcomes serious research, engineering, manufacturing, validation, regulatory, funding and public-health collaborations for its metasurface diagnostic platform.",
};

const AREAS = [
  { title: "Nanofabrication & nanoimprint", line: "Master fabrication, replication, optical metrology, polymer tooling and yield." },
  { title: "Optical coatings & micro-optics", line: "Thin-film filters, gratings, microlenses and laser-compatible materials." },
  { title: "Microfluidics & manufacturing", line: "Molding, lamination, reagent deposition, electrode printing and inspection." },
  { title: "Assay development", line: "Clinical chemistry, immunoassay, electrolyte, coagulation, molecular, advanced sensing." },
  { title: "Analyzer engineering", line: "Optomechanics, spectrometers, imaging, low-noise electronics, thermal, safety, EMC." },
  { title: "Software & data systems", line: "Embedded control, reconstruction, quality logic, cybersecurity, regulated lifecycle." },
  { title: "Clinical & regulatory", line: "Intended-use, protocols, comparators, risk, QMS, biocompatibility, submissions." },
  { title: "Funding & incubation", line: "Non-dilutive grants, deep-tech incubation, strategic and milestone-based investment." },
  { title: "Public-health implementation", line: "Workflow studies for primary care and decentralized diagnostic networks." },
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
      <PageHero kicker="Partners & Collaboration" title="Collaborate on responsible metasurface diagnostic innovation.">
        The platform requires coordinated expertise across nanofabrication,
        microfluidics, optics, assay science, electronics, software, manufacturing,
        quality, clinical validation and regulation.
      </PageHero>

      <MediaBand
        src="/images/partners-bench.png"
        alt="Engineering collaboration: hands with tweezers holding an optic and a microfluidic chip over technical drawings."
        width={1672}
        height={941}
        caption="Illustrative — engineering concept"
      />

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Priority collaboration areas
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04}>
              <div className="h-full rounded-xl border border-[var(--border-light)] p-5">
                <h3 className="font-display text-base font-bold tracking-tight text-ink">{a.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{a.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                What a useful inquiry includes
              </h2>
              <ul className="mt-6 space-y-3">
                {INCLUDE.map((it) => (
                  <li key={it} className="flex gap-3 border-t border-ink/15 pt-3 font-body text-sm text-ink/75">
                    <span aria-hidden="true" className="font-mono text-ink/35">·</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-[var(--border-light)] bg-white/50 p-6">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/50">
                Partnership-focused
              </p>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                This is not a sales channel. We do not invite clinical procurement,
                patient sample submission or routine product demonstrations. Public
                discussion covers mission, stage, high-level architecture and
                validation philosophy; detailed engineering requires confidentiality
                agreements.
              </p>
              <Link href="/contact" className="btn-ink mt-6">
                Start a collaboration inquiry
              </Link>
            </div>
          </Reveal>
        </div>
        <DevNotice className="mt-10" />
      </PaperSection>

      <VoidBand>
        <p className="mx-auto max-w-3xl font-display text-2xl leading-snug tracking-tight text-signal sm:text-4xl">
          Engineering the diagnostic surface — with partners who build evidence, not
          hype.
        </p>
      </VoidBand>
    </>
  );
}
