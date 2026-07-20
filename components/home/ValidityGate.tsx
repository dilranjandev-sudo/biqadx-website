import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * The validity gate, set as a threshold: four conditions in a row, a rule across
 * the page, and the statement of what happens on the other side of it.
 *
 * The previous version put the claim and the conditions in two columns side by
 * side, which read as two lists of equal weight and lost the thing that makes
 * this section worth having — that the conditions come *before* the output, and
 * that all of them gate it. Laying them across and then drawing a line under
 * them puts the sequence back: four gates, then the line, then what passes.
 *
 * Each condition now carries a clause saying what it actually checks. Four bare
 * labels told a reader what the gate is called, not what it does.
 *
 * The prism accent appears here as a light mark on each condition — the one
 * legitimate use for it (refraction), never as a fill.
 *
 * Deliberately no pass/fail state anywhere: no ticks, no green, no "PASS". This
 * describes the structure of the gate, not the result of a run. Showing an
 * outcome here would be the same fabricated-result problem that got imagery
 * rejected (CLAUDE.md — no result readouts, no invented data).
 */

const CONDITIONS = [
  {
    t: "Cartridge identity",
    d: "The analyzer confirms which card it is holding, and the method bound to it.",
  },
  {
    t: "Seating & safety",
    d: "Position, closure and interlocks are confirmed before energy is applied.",
  },
  {
    t: "References in-limit",
    d: "On-card references must read within their expected bounds.",
  },
  {
    t: "Internal controls",
    d: "Process controls must behave as specified for a run to count.",
  },
];

export function ValidityGate() {
  return (
    <section aria-label="Validity gate">
      <ScrollReveal>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
            The validity gate
          </p>
          {/* /60, not /45 — the dimmer tone measured 3.99:1 on Void and AA
              needs 4.5 for type this size. */}
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
            All four required
          </p>
        </div>
      </ScrollReveal>

      {/* The four gates, across. */}
      <ol className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {CONDITIONS.map((c, i) => (
          <li key={c.t}>
            <ScrollReveal delay={0.06 * i}>
              <div className="relative border-t border-signal/20 pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--prism-gradient)" }}
                />
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-display text-base font-bold leading-tight tracking-tight text-signal">
                  {c.t}
                </h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-signal/70">
                  {c.d}
                </p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>

      {/* The threshold itself, then what is on the other side of it. */}
      <div className="mt-12 border-t border-signal/20 pt-10 sm:mt-16 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <h3 className="font-display text-2xl font-bold leading-[1.12] tracking-tightest text-signal sm:text-[2.25rem] lg:col-span-7">
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal as="span" variant="mask" className="block">
                Output released only in the
              </ScrollReveal>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal
                as="span"
                variant="mask"
                delay={0.08}
                className="block"
              >
                authorized validity state.
              </ScrollReveal>
            </span>
          </h3>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.16}>
              <p className="max-w-sm font-body text-sm leading-relaxed text-signal/70 lg:mt-2">
                If any one of the four is not met, no result is issued. The
                measurement is repeated, flagged or rejected — withholding an
                answer is a designed outcome, not a failure of the instrument.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
