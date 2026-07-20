import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";

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
      <PageHero kicker="Careers & Talent" title="Build the measurement system, not just the prototype.">
        A multidisciplinary R&amp;D culture for difficult healthcare engineering —
        for people who document assumptions, test failure modes and distinguish a
        promising concept from verified evidence.
      </PageHero>

      <MediaBand
        src="/images/careers-craft.png"
        alt="Extreme macro: a droplet of fluid meeting the iridescent nanostructured surface of a thin card."
        width={1536}
        height={1024}
        caption="Illustrative"
      />

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Talent areas</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {TALENT.map((t) => (
              <li key={t} className="rounded-full border border-[var(--border-light)] px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-ink/65">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">How we work</h2>
            </Reveal>
            <ul className="mt-6 space-y-2.5">
              {HOW.map((h, i) => (
                <Reveal key={h} delay={i * 0.04}>
                  <li className="flex gap-3 border-t border-ink/15 pt-2.5 font-body text-sm text-ink/75">
                    <span aria-hidden="true" className="font-mono text-ink/35">·</span>
                    {h}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-[var(--border-light)] bg-white/50 p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Talent interest</h2>
              <p className="mt-3 font-body leading-relaxed text-ink/70">
                Specific openings are published only when formally approved. General
                inquiries should include your area of interest, background, portfolio
                or publications, location, availability, and the problem you are best
                equipped to solve.
              </p>
              <Link href="/contact" className="btn-ink mt-6">
                Submit a talent-interest inquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </PaperSection>

      <VoidBand>
        <Link href="/about" className="btn-outline">Learn about BIQADX</Link>
      </VoidBand>
    </>
  );
}
