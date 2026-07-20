import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

export const metadata: Metadata = {
  title: "Intellectual Property & Engineering",
  description:
    "How BIQADX protects its metasurface, cartridge, analyzer, software and sustainable-technology research while maintaining evidence and confidentiality boundaries.",
};

const DISCIPLINES = [
  { t: "Nanophotonic design", d: "Electromagnetic modeling, optical constants, tolerance, resonance and throughput." },
  { t: "Microfabrication & replication", d: "Mastering, nanoimprint, molding, thin-film deposition, etching and printing." },
  { t: "Microfluidics & surface chemistry", d: "Wetting, capillary transport, valves, reagent deposition and immobilization." },
  { t: "Analyzer systems engineering", d: "Optics, mechanics, electronics, thermal, safety, motion, metrology, serviceability." },
  { t: "Software & quality engineering", d: "Configuration control, traceability, calibration, audit logs and cybersecurity." },
  { t: "Manufacturing transfer", d: "Drawings, tolerances, BOM/AVL control, process FMEA, IQ/OQ/PQ and lot release." },
];

const PUBLIC = ["Mission & high-level architecture", "Stage & general science", "Broad measurement methods", "Partnership needs", "Validation philosophy"];
const CONTROLLED = ["Detailed drawings & zone layouts", "Algorithms & thresholds", "Assay formulations", "Supplier files & cost models", "Risk analyses", "Patent-sensitive embodiments"];

export default function IpEngineeringPage() {
  return (
    <>
      <PageHero kicker="IP & Engineering" title="Protecting the architecture while proving the engineering.">
        Patent development is one part of the R&amp;D process — not a substitute for
        experimental evidence, regulatory review or product validation.
      </PageHero>

      <MediaBand
        src="/images/ip-nanofab.png"
        alt="Nanoimprint concept: a precision tool pressing a fine micro-pattern into an iridescent wafer."
        width={1672}
        height={941}
        caption="Illustrative — nanoimprint concept"
      />

      <PaperSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Public IP position</h2>
              <p className="mt-4 font-body leading-relaxed text-ink/70">
                {/* TODO(verify): specific application numbers, dates, inventors and
                    legal status published only after official-record and
                    patent-agent verification. */}
                Active Indian patent and patent-development work spans biodegradable
                consumables, modular analyzers, adaptive sample processing,
                multi-fluid interfaces, multimodal analytical systems, immune-state
                sensing and metasurface-integrated cartridge–reader architectures.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-ink/20 bg-white/50 p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">What &ldquo;patent filed&rdquo; means</h2>
              <p className="mt-3 font-body leading-relaxed text-ink/70">
                An application has been submitted to an IP office. It does not mean
                the patent is granted, the claims are valid over prior art, the
                technology has been manufactured, the assay works clinically, the
                device is approved, or a product is available.
              </p>
            </div>
          </Reveal>
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Engineering disciplines</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.t} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-xl border border-[var(--border-light)] p-5">
                <h3 className="font-display text-base font-bold tracking-tight text-ink">{d.t}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{d.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-[var(--border-light)] p-6">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/50">Public</p>
              <ul className="mt-4 space-y-2 font-body text-sm text-ink/75">
                {PUBLIC.map((p) => <li key={p} className="border-t border-ink/10 pt-2">{p}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-[var(--border-light)] p-6">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink/50">Controlled disclosure</p>
              <ul className="mt-4 space-y-2 font-body text-sm text-ink/75">
                {CONTROLLED.map((c) => <li key={c} className="border-t border-ink/10 pt-2">{c}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
        <DevNotice className="mt-10" />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">Discuss an NDA-based technical review</Link>
          <Link href="/metasurface-diagnostics" className="btn-outline">Explore the metasurface science</Link>
        </div>
      </VoidBand>
    </>
  );
}
