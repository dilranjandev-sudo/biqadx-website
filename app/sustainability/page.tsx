import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { SplitFigure } from "@/components/ui/SplitFigure";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Sustainability & Responsible Consumables",
  description:
    "BIQADX is exploring responsible cartridge, medical-material and waste-aware design while maintaining safety, sterility, performance and regulatory priorities.",
};

const PRINCIPLES = [
  {
    t: "Reusable precision, disposable contact path",
    d: "Keep expensive optics and electronics in the serviceable analyzer; limit the disposable to sample-contact and assay functions.",
  },
  {
    t: "Material efficiency",
    d: "Reduce unnecessary polymer mass, excess packaging and redundant components where safety allows.",
  },
  {
    t: "Design for containment",
    d: "Keep used sample and reagents sealed after testing; support safe disposal.",
  },
  {
    t: "Manufacturing yield",
    d: "Improve process capability and inspection so defects are caught early.",
  },
  {
    t: "Responsible material research",
    d: "Evaluate medical-grade, bio-based or degradable directions through real testing.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        kicker="Sustainability"
        title="Access, without ignoring the waste."
        image="sustainability-film"
      >
        Disposables create waste. That is a design constraint.
      </PageHero>

      <ContentSection
        no="01 / 03"
        title="Platform-level principles"
        divider={false}
      >
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.t} delay={(i % 2) * 0.06}>
              <div className="h-full border-t border-ink/15 pt-4">
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                  {p.d}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* A figure between the principles and the materials research: the split
          the page argues for — a small disposable contact path against a
          serviceable instrument that is kept. Placeholder until the image is
          supplied. */}
      <SplitFigure
        id="sustainability-split"
        kicker="The split"
        lead="Keep the expensive half; make only the contact path disposable."
        body="Optics and electronics stay in the analyzer, serviced and reused. The card carries only what has to touch the sample — which is the smallest thing that can be thrown away."
        alt="A thin card-format disposable resting beside the closed reusable analyzer on a dark bench — the small part against the kept one."
        caption="Illustrative — reusable analyzer, disposable card"
      />

      <ContentSection no="02 / 03" title="Eco-Labware research direction">
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            Sustainable consumable concepts based on polymer blends and
            redesign. Biodegradability, compostability, recyclability, bio-based
            content and reduced material use are distinct — none is claimed
            without standardized testing and certification.
          </p>
        </ScrollReveal>
      </ContentSection>

      <ContentSection
        no="03 / 03"
        title="Safety remains first"
        intro="A lower-impact material has to clear the same bar as any other."
      >
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            It is not acceptable if it compromises sample integrity, reagent
            stability, sterility, barrier, mechanical strength, optical quality,
            electrical isolation or safe disposal.
          </p>
        </ScrollReveal>
      </ContentSection>

    </>
  );
}
