"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// Two routes, drawn on one shared time axis so their lengths can be compared.
// The segments carry no durations: the page claims no numbers, and inventing
// plausible ones would be fabricating evidence.
const REFERRAL = [
  { w: 66, label: "Collect", wait: false },
  { w: 150, label: "Transport", wait: true },
  { w: 138, label: "Queue", wait: true },
  { w: 78, label: "Measure", wait: false },
  { w: 150, label: "Return", wait: true },
  { w: 66, label: "Act", wait: false },
];

const NEAR = [
  { w: 66, label: "Collect", wait: false },
  { w: 78, label: "Measure", wait: false },
  { w: 66, label: "Act", wait: false },
];

const X0 = 78;
const ROW_A = 118;
const ROW_B = 236;
const H = 34;

/**
 * Where the time actually goes.
 *
 * The measurement is not the slow step. On a referral route the sample travels,
 * waits in a queue, and the result travels back — and each of those is longer
 * than the measurement itself. Drawing both routes against one axis makes that
 * visible in a way a paragraph cannot, because the argument is about relative
 * length and nothing else.
 *
 * No durations appear anywhere. This page explicitly claims no completed
 * outcomes, and a diagram carrying invented hours would be exactly the kind of
 * fabricated evidence the site is built to avoid. The segments are proportioned
 * to tell the structural story — travel and waiting dominate — not to assert a
 * measured figure.
 */
const referralEnd = X0 + REFERRAL.reduce((t, s) => t + s.w + 6, -6);
const nearEnd = X0 + NEAR.reduce((t, s) => t + s.w + 6, -6);

export function DelayChain({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // Two markers set off together and travel their own routes at the same rate,
  // because the axis is shared. The near-patient one arrives and then simply
  // sits there while the referral one is still in transit — which is the entire
  // argument of this page, and the one thing two static bars cannot say.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const a = el.querySelector("[data-dc-a]");
      const b = el.querySelector("[data-dc-b]");
      if (!a || !b) return;
      // one shared clock: distance travelled is the same k for both
      const far = referralEnd - X0;
      a.setAttribute("cx", String(X0 + far * k));
      b.setAttribute("cx", String(Math.min(X0 + far * k, nearEnd)));
      // the near-patient marker stops being "in motion" once it has arrived
      b.setAttribute("opacity", X0 + far * k >= nearEnd ? "0.45" : "1");
    },
    { duration: 5200, delay: 1600, alternate: false },
  );

  const row = (segs: typeof REFERRAL, y: number, delay0: number) => {
    let x = X0;
    return segs.map((s, i) => {
      const at = x;
      x += s.w + 6;
      return (
        <g key={`${y}-${s.label}-${i}`}>
          <DgPath
            d={`M${at} ${y} L${at + s.w} ${y} L${at + s.w} ${y + H} L${at} ${y + H} Z`}
            width={1.4}
            // The waiting segments are hatched rather than tinted: they are time
            // in which nothing is being done, and a solid block reads as work.
            fill={s.wait ? undefined : 0.1}
            dash={s.wait ? "5 4" : undefined}
            opacity={s.wait ? 0.6 : 1}
            delay={delay0 + i * 0.09}
          />
          <DgLabel
            x={at + s.w / 2}
            y={y + 22}
            delay={delay0 + i * 0.09}
            dim={s.wait}
          >
            {s.label.toUpperCase()}
          </DgLabel>
        </g>
      );
    });
  };

  return (
    <Diagram
      tone={tone}
      height={330}
      label="Figure — where the time goes"
      title="A referral route and a near-patient route on one time axis"
      description="Two routes drawn one above the other against a shared time axis running left to right. The upper route is a referral pathway: collect, then a long transport segment, then a long queue segment, then a short measure segment, then a long return segment, then act. The transport, queue and return segments are drawn dashed to mark them as waiting rather than work, and together they are far longer than the measurement itself. The lower route is testing near the patient: collect, measure, act, with no waiting segments, ending much earlier on the same axis. A bracket marks the difference between the two end points as the delay the platform is intended to address."
      caption="The measurement is not the slow step — the travelling and the waiting around it are. This is the delay the platform is intended to address; it is a description of the problem, not a claim about performance achieved."
    >
      <g ref={root}>
      {/* Shared axis */}
      <DgPath d={`M${X0} 88 L740 88`} width={1} opacity={0.35} />
      <DgLabel x={X0} y={78} anchor="start" dim>
        TIME
      </DgLabel>
      <DgPath d="M732 82 L740 88 L732 94" width={1} opacity={0.35} />

      {/* Referral route */}
      <DgLabel x={X0} y={ROW_A - 12} anchor="start">
        SENT AWAY
      </DgLabel>
      {row(REFERRAL, ROW_A, 0.1)}

      {/* Near-patient route */}
      <DgLabel x={X0} y={ROW_B - 12} anchor="start">
        NEAR THE PATIENT
      </DgLabel>
      {row(NEAR, ROW_B, 0.6)}

      {/* The gap between the two end points is the whole argument */}
      <DgPath
        d={`M${nearEnd} ${ROW_B + H + 14} L${nearEnd} ${ROW_B + H + 28} L${referralEnd} ${ROW_B + H + 28} L${referralEnd} ${ROW_A + H} `}
        width={1.2}
        opacity={0.5}
        dash="5 4"
      />
      <DgLabel
        x={(nearEnd + referralEnd) / 2}
        y={ROW_B + H + 48}
        delay={1.0}
      >
        THE DELAY
      </DgLabel>

      {/* The two markers. They render at the start of both routes, so a reader
          with no JS sees two samples about to set off rather than nothing. */}
      <circle
        data-dc-a
        cx={X0}
        cy={ROW_A + H / 2}
        r={5}
        fill="currentColor"
        stroke="none"
      />
      <circle
        data-dc-b
        cx={X0}
        cy={ROW_B + H / 2}
        r={5}
        fill="currentColor"
        stroke="none"
      />
      </g>
    </Diagram>
  );
}
