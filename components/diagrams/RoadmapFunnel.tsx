"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// The page's own eight entry criteria, shortened to fit a band. Full wording is
// in app/test-roadmap/page.tsx under "How assays enter the roadmap".
const GATES = [
  "Clinical need",
  "Sample workflow",
  "Physics & comparator",
  "Chemistry & fluidics",
  "Precision & stability",
  "Manufacturability",
  "Reader configuration",
  "Regulatory & clinical",
];

const CX = 246;
const TOP_W = 400;
const BOT_W = 96;
const Y0 = 92;
const BAND_H = 34;
const PITCH = 42;

const width = (i: number) => TOP_W - (i * (TOP_W - BOT_W)) / (GATES.length - 1);
const bandY = (i: number) => Y0 + i * PITCH;

/**
 * What "approximately 200 tests" actually means.
 *
 * The number is the most quotable thing on this page and the easiest to strip of
 * its qualifier. Drawn as a funnel with eight gates and an output that is
 * explicitly empty, the qualifier travels with the number: a candidate menu at
 * the top, a great deal of work in between, and nothing through it yet.
 *
 * Only two figures appear, and both are ones the site already states in words —
 * roughly two hundred candidates, and none validated. The bands carry no counts
 * of their own. Plausible intermediate numbers would be invented clinical
 * progress, which is the single thing this site must never do; the funnel
 * narrows to show that a gate removes candidates, not to quantify how many.
 */
export function RoadmapFunnel({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // A single candidate works its way down the gates.
  //
  // Deliberately one, and deliberately unlabelled. A stream of markers thinning
  // out would read as a rate — "this many enter, this many survive" — and the
  // whole point of this drawing is that no such figure is claimed. One thing
  // descending eight gates says how much work each gate is, and the output box
  // says what has come out so far, which is nothing.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const pos = k * (GATES.length - 1);
      el.querySelectorAll<SVGElement>("[data-rf]").forEach((g) => {
        const i = Number(g.dataset.rf);
        const near = Math.max(0, 1 - Math.abs(i - pos) / 1.1);
        g.setAttribute("opacity", (0.45 + near * 0.55).toFixed(3));
      });
    },
    { duration: 7200, delay: 2000, alternate: true },
  );

  const outY = bandY(GATES.length - 1) + BAND_H + 30;

  return (
    <Diagram
      tone={tone}
      height={outY + 64}
      label="Figure — the roadmap funnel"
      title="Eight gates between a candidate assay and a validated one"
      description="A funnel narrowing downward. At the top, roughly two hundred candidate assays enter. Below it, eight bands of decreasing width, each naming a gate an assay must pass: clinical need, sample workflow, measurement physics and comparator, assay chemistry and fluidics, precision and stability, manufacturability, reader configuration, and regulatory and clinical validation. At the foot of the funnel the output box states that none have been validated yet. The bands carry no counts of their own; only the candidate figure at the top and the empty output at the bottom are stated."
      caption="Roughly two hundred candidates enter this funnel. Nothing has come out of it yet. Each band is work that has to be done for one assay, on one cartridge family, in one reader configuration — which is why the candidate count is a menu architecture and not a product list."
    >
      <g ref={root}>
      {/* What goes in */}
      <DgLabel x={CX} y={40} delay={0.05}>
        ~200 CANDIDATES
      </DgLabel>
      <DgPath d={`M${CX} 66 L${CX} 82`} width={1.2} opacity={0.5} delay={0.1} />
      <DgPath d={`M${CX - 6} 76 L${CX} 82 L${CX + 6} 76`} width={1.2} opacity={0.5} delay={0.1} />

      {GATES.map((g, i) => {
        const w = width(i);
        const y = bandY(i);
        const d = 0.15 + i * 0.09;
        return (
          <g key={g} data-rf={i}>
            <DgPath
              d={`M${CX - w / 2} ${y} L${CX + w / 2} ${y} L${CX + w / 2} ${y + BAND_H} L${CX - w / 2} ${y + BAND_H} Z`}
              width={1.3}
              fill={0.06}
              delay={d}
            />
            <DgLabel x={CX} y={y + 22} delay={d} dim>
              {String(i + 1).padStart(2, "0")}
            </DgLabel>
            {/* Leader out to the name, clear of the funnel's changing width */}
            <DgPath
              d={`M${CX + w / 2} ${y + BAND_H / 2} L466 ${y + BAND_H / 2}`}
              width={1}
              opacity={0.35}
              delay={d}
            />
            <DgLabel x={478} y={y + BAND_H / 2 + 5} anchor="start" delay={d}>
              {g.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}

      {/* What comes out */}
      <DgPath
        d={`M${CX} ${bandY(GATES.length - 1) + BAND_H} L${CX} ${outY - 4}`}
        width={1.2}
        opacity={0.5}
        delay={1.0}
      />
      <DgPath
        d={`M${CX - 118} ${outY} L${CX + 118} ${outY} L${CX + 118} ${outY + 46} L${CX - 118} ${outY + 46} Z`}
        width={1.8}
        fill={0.1}
        delay={1.05}
      />
      <DgLabel x={CX} y={outY + 29} delay={1.1}>
        NONE VALIDATED YET
      </DgLabel>
      </g>
    </Diagram>
  );
}
