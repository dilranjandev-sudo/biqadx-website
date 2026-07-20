import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const PARTS = [
  {
    name: "METACARD",
    tag: "The cartridge",
    desc: "A card-format disposable that combines microfluidics, structured optical zones, electrochemical interfaces, on-card references and machine-readable identity — so the cartridge performs part of the measurement, not just carries the sample.",
    href: "/metacard",
    img: "/images/metacard-split.png",
    alt: "Concept render of the METACARD cartridge and a macro of its nanostructured surface.",
    w: 1448,
    h: 1086,
  },
  {
    name: "OMEGA-PRO",
    tag: "The analyzer",
    desc: "A reusable analyzer that supplies controlled illumination, detection, thermal conditioning, electrical interrogation, motion and safety — reading the cartridge through a fixed, calibrated geometry.",
    href: "/omega-pro",
    img: "/images/omega-split.png",
    alt: "Concept render of the OMEGA-PRO analyzer and its internal optical path.",
    w: 1448,
    h: 1086,
  },
  {
    name: "UDOS",
    tag: "The software",
    desc: "A manifest-driven control layer that verifies the cartridge, runs the authorized method deterministically, preserves the raw data, and releases a result only when predefined validity conditions are met.",
    href: "/udos",
    img: "/images/about-workspace.png",
    alt: "A research bench with optics, a microfluidic chip and a control screen.",
    w: 1672,
    h: 941,
  },
];

/** Platform overview as three image-led rows (alternating). */
export function PlatformShowcase() {
  return (
    <section className="bg-void">
      <Container className="py-20 sm:py-28">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal/45">
          The platform
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
          One platform. Three cooperating parts.
        </h2>
        <p className="mt-4 max-w-xl font-body leading-relaxed text-signal/60">
          The analyzer observes, the cartridge performs, and the software decides
          when a result is valid — designed together as one measurement system.
        </p>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {PARTS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={p.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <Image
                    src={p.img}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="w-full rounded-xl border border-[var(--border-dark)]"
                  />
                </Reveal>
                <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                  <div>
                    <span className="font-mono text-[0.7rem] tracking-[0.16em] text-signal/40">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-signal/50">
                      {p.tag}
                    </p>
                    <p className="mt-5 max-w-md font-body leading-relaxed text-signal/70">
                      {p.desc}
                    </p>
                    <Link
                      href={p.href}
                      className="mt-6 inline-block font-body text-sm text-signal/80 underline decoration-signal/30 underline-offset-4 transition-colors hover:text-signal"
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
