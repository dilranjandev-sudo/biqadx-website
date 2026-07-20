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
      <PageHero
        kicker="Sustainability"
        title="Diagnostic access should not ignore material responsibility."
      >
        Point-of-care testing reduces travel and lab burden, but disposables create
        waste. We consider lifecycle responsibility alongside analytical performance
        and patient safety.
      </PageHero>

      <FigureBand
        id="sustainability-film"
        alt="Roll-to-roll manufacturing: a thin flexible film with a light-diffracting micro-pattern moving over rollers."
        caption="Illustrative — roll-to-roll film"
        label="Figure 01"
        priority
      />

      <ContentSection no="01 / 03" title="Platform-level principles" divider={false}>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.t} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <ContentSection no="02 / 03" title="Eco-Labware research direction">
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            Sustainable consumable concepts based on polymer blends and redesign.
            Biodegradability, compostability, recyclability, bio-based content and
            reduced material use are distinct — none is claimed without standardized
            testing and certification.
          </p>
        </Reveal>
      </ContentSection>

      <ContentSection
        no="03 / 03"
        title="Safety remains first"
        intro="A lower-impact material has to clear the same bar as any other."
      >
        <Reveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            It is not acceptable if it compromises sample integrity, reagent
            stability, sterility, barrier, mechanical strength, optical quality,
            electrical isolation or safe disposal.
          </p>
        </Reveal>
      </ContentSection>

      <PaperSection className="border-t border-[var(--border-light)]">
        <DevNotice />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/partners" className="btn-primary">
            Discuss materials collaboration
          </Link>
          <Link href="/legal/development-stage" className="btn-outline">
            Read the development-stage statement
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
