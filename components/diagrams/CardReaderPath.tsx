"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

const HIT: [number, number] = [400, 214];
const ILLUM: [number, number] = [242, 96];
const DETECT: [number, number] = [558, 96];

/**
 * Why the pair is cooperative rather than a reader plus a strip.
 *
 * The point of this page is that the analyzer holds a *fixed* geometry: the same
 * angles, the same stand-off, the same seating, every run. So the drawing leads
 * with the chassis and the datum marks and treats the beam as almost incidental
 * — the opposite emphasis to LightPath, which is about what happens at the
 * surface. Together they say: that surface only means anything because this
 * geometry does not move.
 */
export function CardReaderPath({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);

  // The card slides in and comes to rest against the stops, every time.
  //
  // This page's whole claim is that nothing about the geometry moves — so the
  // one thing that *does* move is the card, and the point is that it always
  // stops in the same place. Animating the chassis or the angle would have
  // undercut the drawing; animating the seating is the drawing's argument.
  useDiagramLoop(
    root,
    (k) => {
      const el = root.current;
      if (!el) return;
      const card = el.querySelector<SVGElement>("[data-cr-card]");
      if (!card) return;
      // in over the first third, then held at the datum for the rest
      const t = Math.min(1, k / 0.35);
      const eased = 1 - Math.pow(1 - t, 3);
      card.setAttribute("transform", `translate(${(-150 * (1 - eased)).toFixed(1)} 0)`);
      card.setAttribute("opacity", (0.35 + eased * 0.65).toFixed(3));
    },
    { duration: 4600, delay: 2000, alternate: false },
  );

  return (
    <Diagram
      tone={tone}
      height={320}
      label="Figure — fixed geometry"
      title="Card and analyzer as one fixed geometry"
      description="A schematic in cross-section. A rigid chassis, drawn as a bracket, carries an illumination arm on the left and a detection arm on the right, both aimed at the same point. Below them the cartridge is seated on a stage between two registration stops, with datum triangles marking the reference plane. The angle between the two arms is marked as fixed, and the stand-off between the optics and the card face is marked as a held dimension. A faint beam runs from the illumination arm to the card and on to the detection arm."
      caption="The analyzer holds the angles, the stand-off and the seating the same on every run. That repeatability is what makes a reading from one card comparable to a reading from another."
    >
      <g ref={root}>
      <defs>
        <linearGradient
          id="cr-prism"
          gradientUnits="userSpaceOnUse"
          x1={HIT[0]}
          y1={HIT[1]}
          x2={DETECT[0]}
          y2={DETECT[1]}
        >
          <stop offset="0%" stopColor="var(--prism-1)" />
          <stop offset="48%" stopColor="var(--prism-2)" />
          <stop offset="100%" stopColor="var(--prism-3)" />
        </linearGradient>
      </defs>

      {/* The chassis — drawn first and heaviest, because it is the argument */}
      {/* One continuous bracket, drawn as a single open path. Closing it with Z
          left the two sides asymmetric — the right had a full leg and the left
          only a stub. */}
      <DgPath
        d="M204 132 L150 132 L150 40 L650 40 L650 132 L596 132"
        width={1.6}
      />
      <DgLabel x={400} y={30} dim>
        RIGID CHASSIS
      </DgLabel>

      {/* Illumination arm */}
      <DgPath d="M204 56 L280 56 L280 110 L204 110 Z" fill={0.09} delay={0.15} />
      <DgPath d={`M242 110 L242 122`} width={1} opacity={0.7} delay={0.15} />
      <DgLabel x={242} y={82} delay={0.2}>
        ILLUM
      </DgLabel>

      {/* Detection arm */}
      <DgPath d="M520 56 L596 56 L596 110 L520 110 Z" fill={0.09} delay={0.15} />
      <DgPath d={`M558 110 L558 122`} width={1} opacity={0.7} delay={0.15} />
      <DgLabel x={558} y={82} delay={0.2}>
        DETECT
      </DgLabel>

      {/* The beam — thin and secondary here; the geometry is the subject */}
      <DgPath d={`M${ILLUM[0]} 122 L${HIT[0]} ${HIT[1]}`} width={1.2} opacity={0.8} delay={0.35} />
      <DgPath
        d={`M${HIT[0]} ${HIT[1]} L${DETECT[0]} 122`}
        width={1.4}
        stroke="url(#cr-prism)"
        delay={0.45}
      />

      {/* The held angle between the arms. The arc is kept small and close to the
          vertex so the label can sit clear above it — a wider arc ran straight
          through the text. At this height the two beams are still 200 units
          apart, so the label clears them too. */}
      <DgPath
        d={`M${HIT[0] - 34} ${HIT[1] - 24} A 40 40 0 0 1 ${HIT[0] + 34} ${HIT[1] - 24}`}
        width={1}
        opacity={0.5}
        dash="4 4"
      />
      <DgLabel x={400} y={HIT[1] - 58} delay={0.6} dim>
        FIXED ANGLE
      </DgLabel>

      {/* Stand-off, as a held dimension */}
      <DgPath d={`M672 122 L672 ${HIT[1]}`} width={1} opacity={0.5} delay={0.55} />
      <DgPath d="M666 122 L678 122 M666 214 L678 214" width={1} opacity={0.5} delay={0.55} />
      <DgLabel x={686} y={172} anchor="start" delay={0.6}>
        STAND-OFF
      </DgLabel>

      {/* The card, seated */}
      <g data-cr-card>
        <DgPath d="M268 214 L532 214 L532 240 L268 240 Z" width={1.4} fill={0.07} delay={0.7} />
      {/* Named inside its own outline: below the card is where the datum marks
          are, and the label collided with them. */}
        <DgLabel x={400} y={232} delay={0.8} dim>
          METACARD
        </DgLabel>
      </g>

      {/* Registration stops either side — what makes seating repeatable */}
      <DgPath d="M258 206 L268 206 L268 248 L258 248 Z" width={1.2} fill={0.16} delay={0.75} />
      <DgPath d="M542 206 L532 206 L532 248 L542 248 Z" width={1.2} fill={0.16} delay={0.75} />
      <DgLabel x={196} y={228} anchor="end" delay={0.85}>
        STOPS
      </DgLabel>
      <DgPath d="M204 224 L252 224" width={1} opacity={0.4} delay={0.85} />

      {/* Datum: the reference plane the whole stack is measured from */}
      <DgPath d="M268 270 L532 270" width={1} opacity={0.4} dash="6 5" />
      <DgPath d="M320 258 L332 270 L308 270 Z" width={1} opacity={0.6} delay={0.9} />
      <DgPath d="M480 258 L492 270 L468 270 Z" width={1} opacity={0.6} delay={0.9} />
      <DgLabel x={400} y={292} delay={0.95} dim>
        DATUM
      </DgLabel>
      </g>
    </Diagram>
  );
}
