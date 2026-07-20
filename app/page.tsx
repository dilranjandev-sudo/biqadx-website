import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { HowItWorksScroll } from "@/components/home/HowItWorksScroll";
import { Journey } from "@/components/home/Journey";
import { ScopeStats } from "@/components/home/ScopeStats";
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
  images: [
    {
      src: "/images/home-platform.png",
      alt: "The METACARD cartridge beside the OMEGA-PRO analyzer, the card catching an iridescent sheen.",
    },
    {
      src: "/images/metasurface-macro.png",
      alt: "A nanostructured surface showing structural colour — cyan, violet and amber.",
    },
    {
      src: "/images/howitworks-seat.png",
      alt: "A thin iridescent card being inserted into the analyzer.",
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

      {/* Positioning band — primary headline, stage label and research scope */}
      <section className="bg-void">
        <Container className="pt-14 text-center sm:pt-20">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-signal/50">
            India-based deep-tech healthcare R&amp;D · Research · Prototype · Engineering Development
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-3xl font-bold leading-[1.12] tracking-tightest text-signal sm:text-5xl">
            Metasurface-Integrated Diagnostics for Decentralized Healthcare
          </h1>
          <ScopeStats />
        </Container>
      </section>

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
