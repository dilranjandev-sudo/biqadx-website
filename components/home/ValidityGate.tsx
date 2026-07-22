import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxFrame } from "@/components/motion/Parallax";
import { ValidityGateDiagram } from "@/components/diagrams/ValidityGateDiagram";

/**
 * The validity gate on Home.
 *
 * No card. It used to sit inside a bordered, tinted panel, which boxed the one
 * idea on this page that should feel structural into something that looked like
 * a component. Set open on the page, the headline carries it and the drawing
 * below is the evidence — the same way the rest of Home works.
 *
 * The photograph is the card's own on-card reference patches, which is literally
 * one of the four things the gate checks, so it illustrates the section rather
 * than decorating it. It carries no reading, no state, no result.
 *
 * Deliberately no pass/fail styling anywhere: no green, no "PASS". This
 * describes the structure of the gate, not the outcome of a run (CLAUDE.md — no
 * result readouts, no invented data).
 */
export function ValidityGate() {
  return (
    <section aria-label="Validity gate">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* The physical references — one of the things the gate checks. */}
        <ScrollReveal
          variant="wipe"
          className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-5 lg:aspect-[5/6]"
        >
          {/* A scan wipe uncovers the frame as it enters — the section's own
              idea, since the instrument reads the card by scanning light across
              it — then the picture drifts and de-zooms inside the held frame as
              the section scrolls past. Both are transform/clip only, so a frame
              that never animates is simply a still photograph. */}
          <ParallaxFrame className="absolute inset-0" amount={7} from={1.14} to={1.02}>
            <Image
              src="/images/scope-references.png"
              alt="Macro of the card's engineered on-card reference patches — a graded step wedge and tinted squares used to check the measurement against known values."
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
          </ParallaxFrame>
          <span
            className="absolute bottom-5 left-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal"
            style={{ textShadow: "0 1px 3px rgba(11,14,20,0.9)" }}
          >
            On-card references
          </span>
        </ScrollReveal>

        <div className="lg:col-span-7">
          <ScrollReveal>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
              The validity gate
            </p>
          </ScrollReveal>

          <h3 className="mt-5 max-w-lg font-display text-2xl font-bold leading-[1.12] tracking-tightest text-signal sm:text-[2.5rem]">
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
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-signal/75">
              If any one check fails, no result is issued — a designed outcome,
              not a fault.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* The four conditions, drawn. The headline says the rule; this shows the
          shape of it — that they run in series, and that a failure ends the run
          rather than producing a second kind of answer. */}
      <div className="mt-14 sm:mt-20">
        <ValidityGateDiagram tone="signal" />
      </div>
    </section>
  );
}
