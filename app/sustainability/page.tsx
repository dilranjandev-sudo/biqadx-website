import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaBand } from "@/components/ui/MediaBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

export const metadata: Metadata = {
  title: "Sustainability & Responsible Consumables",
  description:
    "BIQADX is exploring responsible cartridge, medical-material and waste-aware design while maintaining safety, sterility, performance and regulatory priorities.",
};

const PRINCIPLES = [
  { t: "Reusable precision, disposable contact path", d: "Keep expensive optics and electronics in the serviceable analyzer; limit the disposable to sample-contact and assay functions." },
  { t: "Material efficiency", d: "Reduce unnecessary polymer mass, excess packaging and redundant components where safety allows." },
  { t: "Design for containment", d: "Keep used sample and reagents sealed after testing; support safe disposal." },
  { t: "Manufacturing yield", d: "Improve process capability and inspection so defects are caught early." },
  { t: "Responsible material research", d: "Evaluate medical-grade, bio-based or degradable directions through real testing." },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero kicker="Sustainability" title="Diagnostic access should not ignore material responsibility.">
        Point-of-care testing reduces travel and lab burden, but disposables create
        waste. We consider lifecycle responsibility alongside analytical performance
        and patient safety.
      </PageHero>

      <MediaBand
        src="/images/sustainability-film.png"
        alt="Roll-to-roll manufacturing: a thin flexible film with a light-diffracting micro-pattern moving over rollers."
        width={1672}
        height={941}
        caption="Illustrative — roll-to-roll film"
      />

      <PaperSection>
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Platform-level principles</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.05}>
              <div className="border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold tracking-tight text-ink">{p.t}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PaperSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-[var(--border-light)] p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Eco-Labware research direction</h2>
              <p className="mt-3 font-body leading-relaxed text-ink/70">
                Sustainable consumable concepts based on polymer blends and redesign.
                Biodegradability, compostability, recyclability, bio-based content and
                reduced material use are distinct — none is claimed without
                standardized testing and certification.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-ink/20 bg-white/50 p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Safety remains first</h2>
              <p className="mt-3 font-body leading-relaxed text-ink/70">
                A lower-impact material is not acceptable if it compromises sample
                integrity, reagent stability, sterility, barrier, mechanical
                strength, optical quality, electrical isolation or safe disposal.
              </p>
            </div>
          </Reveal>
        </div>
        <DevNotice className="mt-10" />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">Discuss materials collaboration</Link>
          <Link href="/legal/development-stage" className="btn-outline">Read the development-stage statement</Link>
        </div>
      </VoidBand>
    </>
  );
}
