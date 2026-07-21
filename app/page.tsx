import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { HowItWorksScroll } from "@/components/home/HowItWorksScroll";
import { Journey } from "@/components/home/Journey";
import { ResearchScope } from "@/components/home/ResearchScope";

export const metadata: Metadata = {
  title: { absolute: "BIQADX | Metasurface-Integrated Diagnostic Platforms" },
  description:
    "BIQADX is developing METACARD and OMEGA-PRO: a research-stage metasurface-integrated cartridge and cooperative analyzer platform for future decentralized diagnostics.",
};

const HERO = {
  eyebrow: "METACARD™ · OMEGA-PRO · UDOS",
  headline: "Engineering the diagnostic surface.",
  description: "Metasurface diagnostics, built for decentralized care.",
  // Purpose-made hero set that tells one story across four frames — the card in
  // hand, seated, read, then at rest in its setting. All compliance-checked: no
  // text/logo/lit readout, narrow cyan→violet only, the real off-white-and-teal
  // instrument and the chamfered-corner card, subject in the right half with the
  // lower-left kept dark for the copy. Prompts: IMAGE_PLACEHOLDERS.md → "Home hero".
  images: [
    {
      src: "/images/hero-inhand.png",
      alt: "A gloved hand holding the METACARD cartridge up to the light, a narrow cyan-to-violet sheen across its micro-textured face.",
    },
    {
      src: "/images/hero-seat.png",
      alt: "A gloved hand sliding the cartridge into the analyzer's teal-outlined loading port.",
    },
    {
      src: "/images/hero-interrogate.png",
      alt: "An optical objective ringed by an illuminated collar over the seated cartridge, a thin cyan-violet line raised where the light grazes it.",
    },
    {
      src: "/images/hero-bench.png",
      alt: "The OMEGA-PRO analyzer at rest on a clean bench in a calm, daylit room.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSlider
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        description={HERO.description}
        slides={HERO.images}
        primary={{ label: "Explore the platform", href: "/metasurface-diagnostics" }}
      />

      {/* Positioning — pinned headline against a travelling sheet of plates */}
      <ResearchScope />

      {/* Platform — three image-led parts on the rail */}
      <PlatformShowcase />

      {/* See it work — real-photo scroll sequence */}
      <HowItWorksScroll />

      {/* One connected journey: science → trust → mission */}
      <Journey />

      {/* No separate R&D notice here any more — it duplicated the footer's
          required development-stage disclaimer, which sits right below it. The
          footer now carries the single, canonical version (stage badges +
          disclaimer + link), so the home page states it once. */}
    </>
  );
}
