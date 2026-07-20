import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { HowItWorksScroll } from "@/components/home/HowItWorksScroll";
import { Journey } from "@/components/home/Journey";
import { ResearchScope } from "@/components/home/ResearchScope";
import { DevNotice } from "@/components/ui/DevNotice";

export const metadata: Metadata = {
  title: { absolute: "BIQADX | Metasurface-Integrated Diagnostic Platforms" },
  description:
    "BIQADX is developing METACARD and OMEGA-PRO: a research-stage metasurface-integrated cartridge and cooperative analyzer platform for future decentralized diagnostics.",
};

const HERO = {
  eyebrow: "METACARD™ · OMEGA-PRO · UDOS",
  description:
    "A metasurface-integrated diagnostic platform — the cartridge participates in the measurement, engineered for decentralized healthcare.",
  // NOTE: home-platform.png is withheld from the hero — it carries branding text,
  // a "SWIFT | SENSITIVE | SIMPLE" strapline and a lit "READY" device screen, all
  // barred by the image rules in CLAUDE.md. Restore it here once a compliant
  // re-generation lands (prompt: IMAGE_PROMPTS_HOME.md → home-platform).
  images: [
    {
      src: "/images/howitworks-seat.png",
      alt: "A thin iridescent card being inserted into the analyzer.",
    },
    {
      src: "/images/metasurface-macro.png",
      alt: "A nanostructured surface showing structural colour — cyan, violet and amber.",
    },
    {
      src: "/images/seq-3-interrogate.png",
      alt: "The seated card inside the analyzer, a blade of light grazing its engineered surface.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSlider
        eyebrow={HERO.eyebrow}
        description={HERO.description}
        slides={HERO.images}
        primary={{ label: "Explore the platform", href: "/metasurface-diagnostics" }}
        secondary={{ label: "Contact", href: "/contact" }}
      />

      {/* Positioning — pinned headline against a travelling sheet of plates */}
      <ResearchScope />

      {/* Platform — three image-led parts on the rail */}
      <PlatformShowcase />

      {/* See it work — real-photo scroll sequence */}
      <HowItWorksScroll />

      {/* One connected journey: science → trust → mission */}
      <Journey />

      {/* R&D stage notice — kept at the bottom, above the footer's CTA band */}
      <section className="bg-void">
        <Container className="pb-20 pt-4 sm:pb-24">
          <DevNotice tone="void" className="mx-auto max-w-3xl" />
        </Container>
      </section>
    </>
  );
}
