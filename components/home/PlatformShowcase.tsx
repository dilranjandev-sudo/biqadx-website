import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxFrame } from "@/components/motion/Parallax";

// One image per part, each drifting inside its frame as the page scrolls past.
// Every image here is the current, consistent photography: the cartridge shots
// share one card design (chamfered corner, circular cutout) and the analyzer is
// shown enclosed. The older metacard-split and omega-split renders are not used —
// they show a different card and a different machine entirely.
const PARTS = [
  {
    name: "METACARD",
    tag: "The cartridge",
    desc: "A card-format disposable that combines microfluidics, structured optical zones, electrochemical interfaces, on-card references and machine-readable identity — so the cartridge performs part of the measurement, not just carries the sample.",
    href: "/metacard",
    img: "/images/metacard-2.png",
    alt: "The METACARD cartridge at an angle against black, a narrow cyan-to-violet sheen crossing its micro-textured face.",
  },
  {
    name: "OMEGA-PRO",
    tag: "The analyzer",
    desc: "A reusable analyzer that supplies controlled illumination, detection, thermal conditioning, electrical interrogation, motion and safety — reading the cartridge through a fixed, calibrated geometry.",
    href: "/omega-pro",
    img: "/images/omega-exterior.png",
    alt: "The OMEGA-PRO analyzer on a dark bench — an enclosed off-white benchtop instrument with a brushed stainless frame, a teal-outlined access door, an emergency-stop button and a dark touchscreen on a pivoting arm.",
  },
  {
    name: "UDOS",
    tag: "The software",
    desc: "A manifest-driven control layer that verifies the cartridge, runs the authorized method deterministically, preserves the raw data, and releases a result only when predefined validity conditions are met.",
    href: "/udos",
    img: "/images/udos-2.png",
    alt: "An optical breadboard carrying mounted lenses on posts, a clear microfluidic chip on a translation stage and black instrument enclosures, lit from one side.",
  },
];

/** Platform overview as three image-led rows (alternating). */
export function PlatformShowcase() {
  return (
    <section className="bg-void">
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
          The platform
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
          One platform. Three cooperating parts.
        </h2>
        <p className="mt-4 max-w-xl font-body leading-relaxed text-signal/75">
          The analyzer observes, the cartridge performs, and the software decides
          when a result is valid — designed together as one measurement system.
        </p>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {PARTS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={p.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <Reveal className={flip ? "lg:order-2" : ""} y={26}>
                  <ParallaxFrame
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border-dark)]"
                    amount={6}
                    from={1.14}
                    to={1.02}
                  >
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                  </ParallaxFrame>
                </Reveal>
                <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                  <div>
                    <span className="font-mono text-[0.66rem] tracking-[0.2em] text-signal/60">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
                      {p.tag}
                    </p>
                    <p className="mt-5 max-w-md font-body leading-relaxed text-signal/75">
                      {p.desc}
                    </p>
                    <Link
                      href={p.href}
                      className="mt-6 inline-block font-body text-sm text-signal/75 underline decoration-signal/30 underline-offset-4 transition-colors hover:text-signal"
                    >
                      Explore {p.name}
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
