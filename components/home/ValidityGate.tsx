import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxFrame } from "@/components/motion/Parallax";

/**
 * The validity gate, set as one clean image-led statement — the way the sections
 * above it read. An earlier version listed all four conditions with a sentence
 * of explanation each, which turned the section into a wall of text; here the
 * conditions are named only, and the point is carried by the headline.
 *
 * The image is the card's own on-card reference patches — the literal subject of
 * one of the conditions, so it illustrates the section rather than decorating it.
 * It carries no reading, no state, no result.
 *
 * Deliberately no pass/fail state anywhere: no ticks, no green, no "PASS". This
 * describes the structure of the gate, not the result of a run (CLAUDE.md — no
 * result readouts, no invented data).
 */

const CONDITIONS = [
  "Cartridge identity",
  "Seating & safety",
  "References in-limit",
  "Internal controls",
];

export function ValidityGate() {
  return (
    <section aria-label="Validity gate">
      <div className="overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite/20">
        <div className="grid lg:grid-cols-12">
          {/* The physical references — one of the things the gate checks. */}
          <ScrollReveal
            variant="wipe"
            className="relative min-h-[240px] lg:col-span-5 lg:min-h-full"
          >
            {/* A scan wipe uncovers the frame as it enters — the section's own
                idea, since the instrument reads the card by scanning light across
                it — then the picture drifts and de-zooms inside the held frame as
                the section scrolls past. Both are transform/clip only, so a frame
                that never animates is simply a still photograph. */}
            <ParallaxFrame className="absolute inset-0" amount={7} from={1.16} to={1.02}>
              <Image
                src="/images/scope-references.png"
                alt="Macro of the card's engineered on-card reference patches — a graded step wedge and tinted squares used to check the measurement against known values."
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </ParallaxFrame>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(11,14,20,0) 0%, rgba(11,14,20,0) 62%, rgba(11,14,20,0.5) 100%)",
              }}
            />
            <span
              className="absolute bottom-5 left-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal"
              style={{ textShadow: "0 1px 3px rgba(11,14,20,0.9)" }}
            >
              On-card references
            </span>
          </ScrollReveal>

          {/* The statement, then the four gates named. */}
          <div className="p-7 sm:p-12 lg:col-span-7">
            <ScrollReveal>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
                The validity gate
              </p>
            </ScrollReveal>

            <h3 className="mt-5 max-w-lg font-display text-2xl font-bold leading-[1.12] tracking-tightest text-signal sm:text-[2rem]">
              <span className="block overflow-hidden pb-[0.08em]">
                <ScrollReveal as="span" variant="mask" className="block">
                  Output released only in the
                </ScrollReveal>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <ScrollReveal as="span" variant="mask" delay={0.08} className="block">
                  authorized validity state.
                </ScrollReveal>
              </span>
            </h3>

            <ScrollReveal delay={0.12}>
              <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-signal/70">
                If any one check fails, no result is issued — a designed outcome,
                not a fault.
              </p>
            </ScrollReveal>

            {/* Four gates, named only. */}
            <div className="mt-8 border-t border-[var(--border-dark)] pt-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
                All four must hold
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {CONDITIONS.map((c, i) => (
                  <li key={c}>
                    <ScrollReveal delay={0.06 * i}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm font-medium text-signal">
                          {c}
                        </span>
                      </div>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
