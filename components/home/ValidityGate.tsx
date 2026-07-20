import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * The validity gate, set as a statement with its conditions listed against it.
 *
 * The previous version made the four conditions the subject and left the actual
 * claim — that nothing is released outside the authorized state — as a small
 * mono line underneath. That is backwards: the restraint *is* the point of the
 * section, and the four conditions are what support it. So the statement leads at
 * display size and the conditions sit beside it as a ledger.
 *
 * It also drops the four separate rails that read as unconnected dashes rather
 * than as one chain. A single divider between the claim and its conditions does
 * the same job honestly.
 *
 * Deliberately no pass/fail state anywhere: no ticks, no green, no "PASS". This
 * describes the structure of the gate, not the result of a run. Showing an
 * outcome here would be the same fabricated-result problem that got imagery
 * rejected (CLAUDE.md — no result readouts, no invented data).
 */

const CONDITIONS = [
  "Cartridge identity",
  "Seating & safety",
  "References in-limit",
  "Internal controls",
];

export function ValidityGate() {
  return (
    <section
      aria-label="Validity gate"
      className="overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite/20"
    >
      <div className="grid lg:grid-cols-12">
        {/* The claim */}
        <div className="p-6 sm:p-10 lg:col-span-6 lg:py-12">
          <ScrollReveal>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
              The validity gate
            </p>
          </ScrollReveal>

          <h3 className="mt-6 max-w-md font-display text-xl font-bold leading-[1.2] tracking-tightest text-signal sm:text-2xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal as="span" variant="mask" className="block">
                Output released only in the
              </ScrollReveal>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal as="span" variant="mask" delay={0.08} className="block">
                authorized validity state
              </ScrollReveal>
            </span>
          </h3>
        </div>

        {/* The conditions it depends on */}
        <div className="border-t border-[var(--border-dark)] px-6 pb-6 sm:px-10 sm:pb-10 lg:col-span-6 lg:border-l lg:border-t-0 lg:py-12 lg:pb-12">
          <ScrollReveal>
            <p className="pt-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60 lg:pt-0">
              Conditions
            </p>
          </ScrollReveal>

          <ul className="mt-4">
            {CONDITIONS.map((c, i) => (
              <li key={c}>
                <ScrollReveal delay={0.06 * i}>
                  <div className="flex items-baseline gap-5 border-b border-[var(--border-dark)] py-3.5 last:border-b-0">
                    <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm text-signal">{c}</span>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
