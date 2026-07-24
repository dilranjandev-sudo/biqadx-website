import { Diagram, DgLabel, DgPath, DgRunner } from "./Diagram";

/**
 * What UDOS does with a measurement, start to finish — and where machine learning
 * is allowed to sit.
 *
 * The page states in prose that ML "must not bypass safety, calibration, controls
 * or validity". That is the hardest sentence on the page to trust and the easiest
 * to draw: a run flows acquire → calibrate → quality checks → validity gate →
 * release, and the ML box is drawn as a bounded, governed helper wired into
 * calibration only — it never touches the gate, and the gate's failing branch
 * ends in "no result", not a different answer. Drawn, the boundary is a fact
 * rather than a promise.
 *
 * Compliance: nothing here is a value or a reading. The gate releases or withholds
 * a *validity state*, and the withheld branch terminates in a stop.
 */

const CX = [110, 250, 390, 530, 670];
const SPINE = 82;
const BW = 108;
const BH = 52;

// Short label on the box, full phrasing revealed on hover.
const STAGES = [
  { short: "Acquire", full: "Raw spectra, images, traces" },
  { short: "Calibrate", full: "References & corrections applied" },
  { short: "Quality", full: "Controls, drift, completeness" },
  { short: "Validity gate", full: "Every condition must hold" },
  { short: "Release", full: "Output released" },
];

const box = (cx: number) =>
  `M${cx - BW / 2} ${SPINE - BH / 2} L${cx + BW / 2} ${SPINE - BH / 2} ` +
  `L${cx + BW / 2} ${SPINE + BH / 2} L${cx - BW / 2} ${SPINE + BH / 2} Z`;

export function UdosPipeline({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  return (
    <Diagram
      tone={tone}
      height={250}
      interactive
      label="Figure — the deterministic pipeline"
      title="How a measurement is run, checked and released"
      description="A left-to-right pipeline of five stages: acquire raw data; calibrate and correct it against references; run quality checks; a validity gate; and release. From the validity gate a branch drops away to a terminated line marked withheld — no result — a stop, not an alternative answer. Below the calibrate stage sits a separate dashed box marked governed machine learning, wired up into calibration only; it is drawn deliberately short of the validity gate, which it never reaches. A highlight travels the pipeline once it is drawn."
      caption="A measurement is acquired, corrected, checked, and released only through the validity gate. Machine learning is a governed helper wired into calibration — it never gates a result, and a failed gate yields no result at all, not a different one."
    >
      {STAGES.map((s, i) => {
        const cx = CX[i];
        const d = 0.15 + i * 0.12;
        const gate = i === 3;
        return (
          <g key={s.short} className="dg-probe">
            <g className="dg-detail">
              <DgLabel x={cx} y={SPINE - BH / 2 - 16}>
                {s.full}
              </DgLabel>
            </g>
            <DgPath d={box(cx)} width={gate ? 1.9 : 1.4} fill={gate ? 0.12 : 0.06} delay={d} />
            <DgLabel x={cx} y={SPINE + 5} delay={d + 0.05}>
              {s.short.toUpperCase()}
            </DgLabel>
            {/* spine arrow into the next stage */}
            {i < STAGES.length - 1 && (
              <>
                <DgPath
                  d={`M${cx + BW / 2} ${SPINE} L${CX[i + 1] - BW / 2} ${SPINE}`}
                  width={1.4}
                  delay={d + 0.08}
                />
                <DgPath
                  d={`M${CX[i + 1] - BW / 2 - 10} ${SPINE - 5} L${CX[i + 1] - BW / 2} ${SPINE} L${CX[i + 1] - BW / 2 - 10} ${SPINE + 5}`}
                  width={1.4}
                  delay={d + 0.08}
                />
              </>
            )}
          </g>
        );
      })}

      {/* The gate withholds: a branch down to a terminated stop, never a second
          answer. */}
      <g data-udos-withhold>
        <DgPath
          d={`M${CX[3]} ${SPINE + BH / 2} L${CX[3]} ${SPINE + 92}`}
          width={1}
          opacity={0.5}
          dash="4 5"
        />
        <DgPath d={`M${CX[3] - 14} ${SPINE + 92} L${CX[3] + 14} ${SPINE + 92}`} width={2} opacity={0.7} />
        <DgLabel x={CX[3]} y={SPINE + 116} dim>
          WITHHELD — NO RESULT
        </DgLabel>
      </g>

      {/* Governed ML: a bounded helper wired into calibration only, drawn short of
          the gate it must never reach. */}
      <g data-udos-ml>
        <DgPath
          d={`M${CX[1] - 90} ${SPINE + 96} L${CX[1] + 90} ${SPINE + 96} L${CX[1] + 90} ${SPINE + 138} L${CX[1] - 90} ${SPINE + 138} Z`}
          width={1.2}
          opacity={0.7}
          dash="5 4"
        />
        <DgLabel x={CX[1]} y={SPINE + 114}>
          GOVERNED ML
        </DgLabel>
        <DgLabel x={CX[1]} y={SPINE + 130} dim>
          Assists — never gates
        </DgLabel>
        {/* wired up into calibration only */}
        <DgPath d={`M${CX[1]} ${SPINE + 96} L${CX[1]} ${SPINE + BH / 2}`} width={1} opacity={0.45} dash="4 4" />
        <DgPath d={`M${CX[1] - 5} ${SPINE + BH / 2 + 10} L${CX[1]} ${SPINE + BH / 2} L${CX[1] + 5} ${SPINE + BH / 2 + 10}`} width={1} opacity={0.45} />
      </g>

      {/* A run travels the pipeline once it has drawn on. */}
      <DgRunner d={`M${CX[0] - BW / 2} ${SPINE} L${CX[4] + BW / 2} ${SPINE}`} delay={1.05} />
    </Diagram>
  );
}
