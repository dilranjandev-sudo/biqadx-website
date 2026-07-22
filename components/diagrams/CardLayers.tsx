"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

const X0 = 96;
const X1 = 470;
const TOP = 52;
const GAP = 52;
const H = 26;

// Each layer sits on its own plane, exploded upward the way an assembly drawing
// separates parts that are actually in contact. Named from the top down, in the
// order a sample meets them.
const LAYERS = [
  "Sample entry",
  "Microfluidics",
  "Structured optics",
  "Electrodes",
  "References",
  "Identity",
];

const y = (i: number) => TOP + i * GAP;

/** The outline of one layer, as a plain slab. */
const slab = (i: number) =>
  `M${X0} ${y(i)} L${X1} ${y(i)} L${X1} ${y(i) + H} L${X0} ${y(i) + H} Z`;

/**
 * What is actually inside the cartridge.
 *
 * The claim this page makes is that the card performs part of the measurement
 * rather than carrying the sample to it — and that claim is entirely about what
 * is stacked inside a three-millimetre slab. A photograph of a card shows a
 * rectangle; only a section shows the six layers.
 *
 * Each layer carries a small feature of its own — a port, a channel, a run of
 * sub-wavelength features, interdigitated fingers, reference patches, a coded
 * mark — because six identical rectangles with six labels would be a list, not a
 * drawing. They draw on from the top down, in the order a sample meets them.
 */
export function CardLayers({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // A highlight descends the stack, one layer at a time.
  //
  // The layers are drawn in the order a sample meets them, and that order is the
  // only thing the exploded view cannot show — six parallel slabs read as a
  // parts list. Lighting them in sequence turns the same drawing into a route
  // through the card.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const pos = k * (LAYERS.length - 1);
      el.querySelectorAll<SVGElement>("[data-cl]").forEach((g) => {
        const i = Number(g.dataset.cl);
        // a soft falloff either side, so it reads as a pass rather than a blink
        const near = Math.max(0, 1 - Math.abs(i - pos) / 1.4);
        g.setAttribute("opacity", (0.5 + near * 0.5).toFixed(3));
      });
    },
    { duration: 5000, delay: 2000, alternate: true },
  );

  return (
    <Diagram
      tone={tone}
      height={380}
      label="Figure — cartridge section"
      title="The cartridge in section, layer by layer"
      description="An exploded cross-section of the cartridge, drawn as six stacked slabs separated vertically, each labelled at the right. From the top: a sample entry layer with a port and a vent; a microfluidics layer carrying a routed channel; a structured optics layer whose upper face carries a run of sub-wavelength features; an electrode layer drawn as interdigitated fingers; a reference layer drawn as a row of graded patches; and an identity layer drawn as a coded mark. A bracket down the left groups all six as one cartridge."
      caption="Six functions in one disposable. The card is not a container that arrives at the instrument — several parts of the measurement are already built into it."
    >
      <g ref={root}>
      {/* The whole stack is one part */}
      <DgPath
        d={`M70 ${TOP} L58 ${TOP} L58 ${y(5) + H} L70 ${y(5) + H}`}
        width={1}
        opacity={0.45}
      />
      <DgLabel x={44} y={(TOP + y(5) + H) / 2} anchor="middle" delay={0.9} dim>
        METACARD
      </DgLabel>

      {LAYERS.map((name, i) => {
        const t = y(i);
        const d = i * 0.16;
        return (
          <g key={name} data-cl={i}>
            <DgPath d={slab(i)} fill={0.06} delay={d} />

            {/* Leader out to the label */}
            <DgPath
              d={`M${X1} ${t + H / 2} L${X1 + 40} ${t + H / 2}`}
              width={1}
              opacity={0.4}
              delay={d}
            />
            <DgLabel x={X1 + 50} y={t + H / 2 + 5} anchor="start" delay={d}>
              {name.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}

      <g data-cl={0}>
      {/* 0 — sample entry: a port and a vent through the layer */}
      <DgPath d={`M170 ${y(0)} L170 ${y(0) + H} M186 ${y(0)} L186 ${y(0) + H}`} width={1} delay={0.05} />
      <DgPath d={`M330 ${y(0)} L330 ${y(0) + H} M342 ${y(0)} L342 ${y(0) + H}`} width={1} opacity={0.6} delay={0.05} />
      </g>

      <g data-cl={1}>
      {/* 1 — microfluidics: a routed channel inside the layer */}
      <DgPath
        d={`M178 ${y(1) + 17} L240 ${y(1) + 17} L240 ${y(1) + 8} L300 ${y(1) + 8} L300 ${y(1) + 17} L392 ${y(1) + 17}`}
        width={1.3}
        delay={0.2}
      />
      </g>

      <g data-cl={2}>
      {/* 2 — structured optics: the sub-wavelength run, on the upper face */}
      <DgPath
        d={Array.from({ length: 14 }, (_, k) => {
          const x = 246 + k * 12;
          return `M${x} ${y(2)} L${x} ${y(2) - 9}`;
        }).join(" ")}
        width={1.4}
        delay={0.36}
      />
      </g>

      <g data-cl={3}>
      {/* 3 — electrodes: interdigitated fingers */}
      <DgPath
        d={Array.from({ length: 7 }, (_, k) => {
          const x = 250 + k * 20;
          return `M${x} ${y(3) + 4} L${x} ${y(3) + 17}`;
        }).join(" ")}
        width={1.2}
        delay={0.52}
      />
      <DgPath
        d={Array.from({ length: 7 }, (_, k) => {
          const x = 260 + k * 20;
          return `M${x} ${y(3) + 9} L${x} ${y(3) + 22}`;
        }).join(" ")}
        width={1.2}
        opacity={0.65}
        delay={0.52}
      />
      </g>

      <g data-cl={4}>
      {/* 4 — references: a row of graded patches */}
      <DgPath
        d={Array.from({ length: 5 }, (_, k) => {
          const x = 250 + k * 30;
          return `M${x} ${y(4) + 6} L${x + 20} ${y(4) + 6} L${x + 20} ${y(4) + 20} L${x} ${y(4) + 20} Z`;
        }).join(" ")}
        width={1}
        opacity={0.75}
        delay={0.68}
      />
      </g>

      <g data-cl={5}>
      {/* 5 — identity: a coded mark, deliberately abstract */}
      <DgPath
        d={[2, 1, 3, 1, 2, 4, 1, 2]
          .map((w, k, arr) => {
            const x = 250 + arr.slice(0, k).reduce((s, v) => s + v * 4 + 6, 0);
            return `M${x} ${y(5) + 6} L${x} ${y(5) + 20}`;
          })
          .join(" ")}
        width={2.2}
        opacity={0.8}
        delay={0.84}
      />
      </g>

            </g>
    </Diagram>
  );
}
