"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// The same fourteen families the page lists below the drawing, shortened only
// where the full name will not fit a cell. Full names live in
// app/measurement-methods/page.tsx.
const FAMILIES = [
  "Absorbance & endpoint",
  "Kinetic photometry",
  "Turbidimetry",
  "Fluorescence",
  "Time-resolved fluor.",
  "Chemiluminescence",
  "Raman & SERS",
  "LSPR & plasmonic",
  "Lens-free holographic",
  "Computational imaging",
  "Lateral-flow reflect.",
  "Optical coagulation",
  "Electrochemistry",
  "Photoelectrochemistry",
];

const SHARED = ["Card format", "Reader interface", "Control layer"];

// Two columns of seven, not seven of two. Fourteen names across an 800-unit
// drawing gives each about 100 units — half what the shortest of them needs, so
// every label ran into its neighbour. Down the page there is room.
const ROWS = 7;
const ROW_H = 30;
const ROW_GAP = 4;
const GRID_Y = 136;
const COL = [
  { x: 60, w: 352 },
  { x: 420, w: 352 },
];

/**
 * One platform, fourteen physics.
 *
 * "Fourteen" is this page's headline and also its easiest thing to misread: it
 * counts measurement-physics families the architecture is built around, not
 * tests that can be run. Drawing the shared stack above and the fourteen below
 * shows what the number is counting, so it reads as an architecture rather than
 * as a menu.
 *
 * The limit is written into the drawing as well as the caption, because a
 * diagram is exactly the kind of thing that gets screenshotted without one.
 */
export function MethodFamilies({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // A highlight walks the fourteen, one at a time.
  //
  // Fourteen boxes with names in them is a list; a list invites the reading that
  // these are things you can order. Watching the shared stack light one family
  // after another says the other thing — that the platform is what they have in
  // common, and each is a separate body of work reached in its own turn.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const pos = k * (FAMILIES.length - 1);
      el.querySelectorAll<SVGElement>("[data-mf]").forEach((g) => {
        const i = Number(g.dataset.mf);
        const near = Math.max(0, 1 - Math.abs(i - pos) / 1.2);
        g.setAttribute("opacity", (0.45 + near * 0.55).toFixed(3));
      });
    },
    { duration: 9000, delay: 2000, alternate: true },
  );

  const rowY = (i: number) => GRID_Y + (i % ROWS) * (ROW_H + ROW_GAP);
  const col = (i: number) => COL[Math.floor(i / ROWS)];

  return (
    <Diagram
      tone={tone}
      height={410}
      label="Figure — platform and families"
      title="One shared platform, fourteen measurement-physics families"
      description="Across the top, three bars name what every method shares: the card format, the reader interface and the control layer. A bracket gathers them as one platform and an arrow leads down from it. Below, fourteen cells are laid out in two columns of seven, each numbered and named: absorbance and endpoint photometry, kinetic photometry, turbidimetry, fluorescence, time-resolved fluorescence, chemiluminescence, Raman and SERS, LSPR and plasmonic sensing, lens-free holographic imaging, computational imaging, lateral-flow reflectance imaging, optical coagulation, electrochemistry, and photoelectrochemistry. A line at the foot states that this is a count of physics, not of validated methods."
      caption="The architecture is engineered around fourteen families of measurement physics, all sharing one card format, one reader interface and one control layer. That is a count of physics the platform is designed to support — not a count of methods that have been validated, and not a menu of available tests."
    >
      <g ref={root}>
      <DgLabel x={416} y={26} delay={0.05}>
        ONE PLATFORM
      </DgLabel>

      {/* What every family shares */}
      {SHARED.map((s, i) => {
        const x = 60 + i * 240;
        return (
          <g key={s}>
            <DgPath d={`M${x} 38 L${x + 232} 38 L${x + 232} 72 L${x} 72 Z`} fill={0.08} delay={0.1 + i * 0.1} />
            <DgLabel x={x + 116} y={60} delay={0.1 + i * 0.1}>
              {s.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}

      {/* Gathered, then handed down to all fourteen */}
      <DgPath d="M60 84 L60 90 L772 90 L772 84" width={1} opacity={0.45} delay={0.4} />
      <DgPath d="M416 90 L416 110" width={1.2} opacity={0.6} delay={0.45} />
      <DgPath d="M410 104 L416 110 L422 104" width={1.2} opacity={0.6} delay={0.45} />

      <DgLabel x={416} y={126} delay={0.5} dim>
        FOURTEEN FAMILIES
      </DgLabel>

      {FAMILIES.map((f, i) => {
        const c = col(i);
        const y = rowY(i);
        const d = 0.55 + i * 0.04;
        return (
          <g key={f} data-mf={i}>
            <DgPath
              d={`M${c.x} ${y} L${c.x + c.w} ${y} L${c.x + c.w} ${y + ROW_H} L${c.x} ${y + ROW_H} Z`}
              width={1.2}
              fill={0.05}
              opacity={0.85}
              delay={d}
            />
            <DgLabel x={c.x + 16} y={y + 20} anchor="start" delay={d} dim>
              {String(i + 1).padStart(2, "0")}
            </DgLabel>
            <DgLabel x={c.x + 54} y={y + 20} anchor="start" delay={d}>
              {f.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}
      </g>
    </Diagram>
  );
}
