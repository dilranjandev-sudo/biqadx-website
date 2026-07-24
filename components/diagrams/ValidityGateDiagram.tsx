"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath, DgRunner } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// The same four conditions the site names everywhere else. They are listed in
// components/home/ValidityGate.tsx; if that list changes, this drawing is wrong.
// One word each. The full phrasing — "cartridge identity", "references
// in-limit" — is on the page beside the drawing; repeating it here turned four
// gates into eight lines of type and buried the shape.
const CONDITIONS = ["Identity", "Seating", "References", "Controls"];
// The full phrasing, revealed on hover. The drawing rests on one word each so the
// shape stays legible; probing a gate spells out what it actually checks.
const CONDITIONS_FULL = [
  "Cartridge identity",
  "Seating & safety",
  "References in-limit",
  "Internal controls",
];

const X = [176, 306, 436, 566];
const SPINE = 122;
const BOX = 36;

/**
 * Why an invalid run produces nothing at all.
 *
 * This is the hardest idea on the site to carry in prose and the easiest to
 * draw: a measurement runs, four conditions are checked in series, and the
 * output is released only if every one of them holds. If any fails, the branch
 * goes nowhere — deliberately drawn as a stop, not as a second kind of answer.
 *
 * The compliance point is structural, not decorative. A failed run must never
 * look like a result, so the lower branch terminates in "no result" and the
 * drawing contains no value, no reading, and nothing resembling one.
 */
export function ValidityGateDiagram({
  tone = "ink",
}: {
  tone?: "ink" | "signal";
}) {
  const root = useRef<SVGGElement>(null);

  // The loop runs one condition failing and the run stopping, then resets.
  //
  // This is the only thing on the drawing that a still cannot say. Four ticks in
  // a row look like a description of a good outcome; watching the third one give
  // way, the line to RESULT go dark and the failure rail light up shows that the
  // gate is a mechanism, not a promise. It is also precisely what the page says
  // in words — a failed check is a designed outcome, not a fault.
  //
  // Nothing here resembles a measurement: no value, no reading, no pass/fail
  // styling on a *result*. What fails is a technical validity condition.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      // 0 → 0.45 all holding · 0.45 → 0.62 the third gives way · then stopped
      const failing = k > 0.45;
      const FAIL = 2;

      el.querySelectorAll<SVGElement>("[data-vg-tick]").forEach((tick) => {
        const i = Number(tick.dataset.vgTick);
        tick.setAttribute("opacity", failing && i === FAIL ? "0" : "1");
      });
      el.querySelectorAll<SVGElement>("[data-vg-cross]").forEach((cross) => {
        cross.setAttribute("opacity", failing ? "1" : "0");
      });
      // Everything downstream of the failed gate loses the run, and the failure
      // rail becomes the live path instead.
      //
      // These are all set as `opacity` on wrapping groups rather than
      // `stroke-opacity`: the strokes inside carry their own stroke-opacity, so
      // an inherited one would simply be overridden. Group opacity composites
      // the whole group and cannot be.
      el.querySelectorAll<SVGElement>("[data-vg-after]").forEach((seg) => {
        seg.setAttribute("opacity", failing ? "0.18" : "1");
      });
      el.querySelectorAll<SVGElement>("[data-vg-fail]").forEach((f) => {
        f.setAttribute("opacity", failing ? "1" : "0.55");
      });
    },
    { duration: 4200, delay: 2000, alternate: true },
  );

  return (
    <Diagram
      tone={tone}
      height={220}
      interactive
      label="Figure — validity gate"
      title="The validity gate: four conditions in series"
      description="A flow drawn left to right. A run enters at the left and passes through four checks in series, each drawn as a small square: cartridge identity, seating and safety, references in-limit, and internal controls. Each square has a branch dropping away below it. If all four hold, the line continues to the right and a result is released. If any one of them fails, the branch leads instead to a terminated line marked no result — a stop, not an alternative answer."
      caption="Every condition has to hold. When one does not, the run yields no result at all — not a different result. A number is only shown when the measurement that produced it can be trusted."
    >
      <g ref={root}>
      {/* Run enters */}
      <DgPath
        d={`M60 ${SPINE - 18} L118 ${SPINE - 18} L118 ${SPINE + 18} L60 ${SPINE + 18} Z`}
        fill={0.06}
      />
      <DgLabel x={89} y={SPINE + 44} dim>
        RUN
      </DgLabel>

      {CONDITIONS.map((c, i) => {
        const x = X[i];
        const d = 0.18 + i * 0.18;
        const prev = i === 0 ? 118 : X[i - 1] + BOX / 2;
        return (
          <g key={c} className="dg-probe">
            {/* Revealed on hover: what this gate actually checks. */}
            <g className="dg-detail">
              <DgLabel x={x} y={SPINE - 52}>
                {CONDITIONS_FULL[i]}
              </DgLabel>
            </g>
            {/* Segment of the spine into this condition */}
            <DgPath d={`M${prev} ${SPINE} L${x - BOX / 2} ${SPINE}`} width={1.5} delay={d} />

            {/* The check itself */}
            <DgPath
              d={`M${x - BOX / 2} ${SPINE - BOX / 2} L${x + BOX / 2} ${SPINE - BOX / 2} L${x + BOX / 2} ${SPINE + BOX / 2} L${x - BOX / 2} ${SPINE + BOX / 2} Z`}
              width={1.6}
              fill={0.09}
              delay={d}
            />
            {/* A tick inside — this is the condition holding. It is the state the
                drawing rests in, so it renders without JS. */}
            <g data-vg-tick={i}>
              <DgPath
                d={`M${x - 9} ${SPINE + 1} L${x - 3} ${SPINE + 8} L${x + 9} ${SPINE - 7}`}
                width={1.7}
                delay={d + 0.12}
              />
            </g>
            {/* …and the cross that replaces it while the loop runs. Hidden by a
                presentation attribute, which only the loop overrides. */}
            {i === 2 && (
              <path
                data-vg-cross
                opacity={0}
                d={`M${x - 8} ${SPINE - 8} L${x + 8} ${SPINE + 8} M${x + 8} ${SPINE - 8} L${x - 8} ${SPINE + 8}`}
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                fill="none"
              />
            )}

            <DgLabel x={x} y={SPINE - 30} delay={d}>
              {c.toUpperCase()}
            </DgLabel>

            {/* The branch that is taken when this one does not hold. All four are
                drawn identically and stay that way — the cross marks which gate
                gave way, and the rail below shows what it cost. Singling one
                branch out here would have left the no-JS drawing showing four
                branches that were not alike for no stated reason. */}
            <DgPath
              d={`M${x} ${SPINE + BOX / 2} L${x} ${SPINE + 54}`}
              width={1}
              opacity={0.45}
              dash="4 5"
            />
            <DgPath d={`M${x} ${SPINE + 54} L${x} ${SPINE + 62}`} width={1} opacity={0.45} dash="4 5" />
          </g>
        );
      })}

      {/* All four held — the line continues and the output is released. Grouped
          so the loop can dim the whole downstream half in one move. */}
      <g data-vg-after>
        <DgPath d={`M${X[3] + BOX / 2} ${SPINE} L648 ${SPINE}`} width={1.5} delay={0.92} />
        <DgPath d={`M636 ${SPINE - 6} L648 ${SPINE} L636 ${SPINE + 6}`} width={1.5} delay={0.92} />
        <DgPath
          d={`M656 ${SPINE - 20} L764 ${SPINE - 20} L764 ${SPINE + 20} L656 ${SPINE + 20} Z`}
          width={1.8}
          fill={0.12}
          delay={0.98}
        />
        <DgLabel x={710} y={SPINE + 5} delay={1.0}>
          RESULT
        </DgLabel>
      </g>

      {/* The common failure rail — one stop, shared by all four branches. It
          terminates short of the result box: the rail running the full width and
          the label starting beyond it pushed the text off the drawing. */}
      <g data-vg-fail="rail" opacity={0.55}>
        <DgPath d={`M${X[0]} ${SPINE + 62} L596 ${SPINE + 62}`} width={1} opacity={0.45} dash="4 5" />
        {/* Terminated deliberately: a bar, not an arrow into another answer */}
        <DgPath d={`M596 ${SPINE + 48} L596 ${SPINE + 76}`} width={2} opacity={0.7} />
        <DgLabel x={612} y={SPINE + 67} anchor="start" delay={1.05}>
          NO RESULT
        </DgLabel>
      </g>

      {/* Once every gate has been drawn, a highlight runs the whole spine — the
          run travelling through the four checks it has to clear, in the order it
          clears them. It carries the meaning the static drawing cannot: that
          this is a sequence, not four boxes that happen to be in a row. */}
      <DgRunner d={`M118 ${SPINE} L648 ${SPINE}`} delay={1.15} />
      </g>
    </Diagram>
  );
}
