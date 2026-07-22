"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// The page's own four evidence layers, in its own order and wording.
// app/quality-validation/page.tsx is the source; if that list changes, so must
// this drawing.
const RUNGS = [
  { name: "Physics", note: "Models and principle experiments" },
  { name: "Component", note: "Metrology on what was fabricated" },
  { name: "Cartridge", note: "Survives bonding, reagents, storage" },
  { name: "Assay & system", note: "Analytical and clinical studies" },
];

const X0 = 84;
const STEP_W = 158;
const BASE = 300;
const RISE = 44;
const TREAD = 26;

const stepX = (i: number) => X0 + i * STEP_W;
const stepY = (i: number) => BASE - (i + 1) * RISE;

/**
 * Where a claim is allowed to stand.
 *
 * This page's discipline is that a statement may only be made at the level its
 * evidence actually reaches, and that the upper layers are studies which have
 * not been done. Prose says that and it reads as a hedge. Drawn as a staircase
 * with a ceiling that steps up alongside it, it reads as a rule — which is what
 * it is.
 *
 * The drawing deliberately marks no "you are here". The site's stage language
 * covers research, prototype, engineering-development and validation-planning,
 * and pinning the programme to one rung in a picture would be a firmer claim
 * than the words support. What it does mark is which rungs are engineering work
 * and which are the studies that must come before any performance claim.
 */
export function EvidenceLadder({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // A marker rides the ceiling, climbing only as the evidence under it climbs.
  //
  // It travels the whole staircase, including the two steps that are studies not
  // yet done — because the drawing states a rule, not a position. Stopping the
  // marker partway would put a "you are here" into the picture, which is a
  // firmer claim than the site's own stage language supports.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const m = el.querySelector<SVGElement>("[data-el-marker]");
      if (!m) return;
      const span = STEP_W * RUNGS.length;
      const x = X0 + span * k;
      const step = Math.min(RUNGS.length - 1, Math.floor((x - X0) / STEP_W));
      m.setAttribute("cx", x.toFixed(1));
      m.setAttribute("cy", String(stepY(step) - 18));
    },
    { duration: 6000, delay: 2200, alternate: true },
  );

  return (
    <Diagram
      tone={tone}
      height={360}
      label="Figure — evidence and claims"
      title="Four evidence layers, and the ceiling on what may be claimed"
      description="A staircase of four ascending steps, read left to right: physics evidence from models and principle experiments; component evidence from metrology on what was fabricated; cartridge evidence that the function survives bonding, reagents and storage; and assay and system evidence from analytical and clinical studies. A dashed ceiling line steps up in parallel with the staircase, labelled as the limit of what may be claimed — a claim can never sit above the evidence beneath it. A bracket under the first two steps marks them as engineering evidence; a bracket under the last two marks them as the studies required before any performance claim."
      caption="A statement is only allowed as high as the evidence under it. The upper two layers are studies that have not been carried out, which is why no performance, accuracy or clinical claim appears anywhere on this site."
    >
      <g ref={root}>
      {RUNGS.map((r, i) => {
        const x = stepX(i);
        const y = stepY(i);
        const d = i * 0.18;
        return (
          <g key={r.name}>
            {/* The tread and the riser up to it */}
            <DgPath
              d={`M${x} ${BASE} L${x} ${y} L${x + STEP_W} ${y} L${x + STEP_W} ${BASE}`}
              width={1.6}
              fill={0.06}
              delay={d}
            />
            {/* Name only. The four descriptions run 25–35 characters and a step
                is 158 units wide, so setting them inside pushed each one across
                the step to its right. They are already on the page, in the block
                this drawing follows. */}
            <DgLabel x={x + 16} y={y + TREAD} anchor="start" delay={d} dim>
              {String(i + 1).padStart(2, "0")}
            </DgLabel>
            <DgLabel x={x + 48} y={y + TREAD} anchor="start" delay={d}>
              {r.name.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}

      {/* The ceiling: what may be claimed, stepping up with the evidence and
          never above it. Drawn as a construction line, because that is what it
          is — a limit, not a path. */}
      <DgPath
        d={RUNGS.map((_, i) => {
          const x = stepX(i);
          const y = stepY(i) - 18;
          return `${i === 0 ? "M" : "L"}${x} ${y} L${x + STEP_W} ${y}${
            i < RUNGS.length - 1 ? ` L${x + STEP_W} ${stepY(i + 1) - 18}` : ""
          }`;
        }).join(" ")}
        width={1.2}
        opacity={0.55}
        dash="6 5"
      />
      {/* Called out over the highest step, the only place above the staircase
          that is clear of it. */}
      <DgLabel x={stepX(3) + STEP_W} y={stepY(3) - 30} anchor="end" delay={0.9} dim>
        WHAT MAY BE CLAIMED
      </DgLabel>

      {/* Ground */}
      <DgPath d={`M60 ${BASE} L${stepX(4)} ${BASE}`} width={1} opacity={0.4} />

      {/* What the two halves are */}
      <DgPath
        d={`M${X0} ${BASE + 16} L${X0} ${BASE + 24} L${stepX(2)} ${BASE + 24} L${stepX(2)} ${BASE + 16}`}
        width={1}
        opacity={0.45}
        delay={0.95}
      />
      <DgLabel x={X0 + STEP_W} y={BASE + 44} delay={1.0}>
        ENGINEERING EVIDENCE
      </DgLabel>

      <DgPath
        d={`M${stepX(2)} ${BASE + 16} L${stepX(2)} ${BASE + 24} L${stepX(4)} ${BASE + 24} L${stepX(4)} ${BASE + 16}`}
        width={1}
        opacity={0.45}
        delay={1.0}
      />
      <DgLabel x={stepX(3)} y={BASE + 44} delay={1.05}>
        STUDIES REQUIRED
      </DgLabel>

      {/* Rides the ceiling. Rendered at the first step so the drawing without JS
          shows the rule starting where the evidence does. */}
      <circle
        data-el-marker
        cx={X0}
        cy={stepY(0) - 18}
        r={5}
        fill="currentColor"
        stroke="none"
      />
      </g>
    </Diagram>
  );
}
