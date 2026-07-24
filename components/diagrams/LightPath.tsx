"use client";

import { useRef } from "react";
import { Diagram, DgLabel, DgPath, DgRunner } from "./Diagram";
import { useDiagramLoop } from "./useDiagramLoop";

// The structured face, drawn edge-on as a short run of sub-wavelength features.
// Deliberately a *zone* rather than the whole card face: a run spanning the
// entire slab put every feature under the incoming beam, so the beam read as
// cutting through the structure instead of landing on it.
const PILLARS = Array.from({ length: 8 }, (_, i) => {
  const x = 356 + i * 14;
  return `M${x} 196 L${x} 186`;
}).join(" ");

// Wavefront ticks: short strokes drawn across a beam, at right angles to it.
// Same spacing going in, redistributed coming out — the drawing's whole point.
function ticks(
  from: [number, number],
  to: [number, number],
  distances: number[],
  half = 9,
) {
  const [x0, y0] = from;
  const len = Math.hypot(to[0] - x0, to[1] - y0);
  const ux = (to[0] - x0) / len;
  const uy = (to[1] - y0) / len;
  // perpendicular
  const px = -uy;
  const py = ux;
  return distances
    .map((d) => {
      const cx = x0 + ux * d;
      const cy = y0 + uy * d;
      return `M${(cx - px * half).toFixed(1)} ${(cy - py * half).toFixed(1)} L${(cx + px * half).toFixed(1)} ${(cy + py * half).toFixed(1)}`;
    })
    .join(" ");
}

const SOURCE: [number, number] = [140, 62];
const HIT: [number, number] = [392, 196];
const DETECTOR: [number, number] = [638, 62];

const OUT_TICKS = [52, 74, 100, 132];

/**
 * How light is changed at the surface — the one idea the whole platform rests on.
 *
 * Drawn as an optical schematic in section: source at the left, the cartridge
 * edge-on in the middle with its structured zone and the sample sitting on it,
 * detector at the right. The incident beam is a plain stroke and the returning
 * beam carries the prism gradient, so the drawing says in colour what the caption
 * says in words — the light leaving is not the light that arrived.
 *
 * ## The loop
 *
 * The geometry never moves and the incident beam never changes. What breathes is
 * the *sample*, and with it the spacing of the outgoing wavefront — the whole
 * measurement principle in one gesture: hold everything constant, change what is
 * on the surface, and what reaches the detector changes.
 *
 * Sweeping the incident angle instead would have been the obvious animation, and
 * would have contradicted the drawing on /omega-pro, which exists to say that the
 * angle is held fixed on every run.
 *
 * It is an enhancement, not the drawing. The server render is the rest state, the
 * animation attaches afterwards, and `motionDisabled()` — reduced motion, or
 * `?static=1` — skips it entirely. It also pauses while off screen rather than
 * running an animation-frame loop nobody is looking at.
 */
export function LightPath({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const root = useRef<SVGGElement>(null);
  const ink = tone === "signal" ? "" : "-ink";

  useDiagramLoop(root, (k) => {
    const el = root.current;
    if (!el) return;
    const fill = el.querySelector("[data-lp-sample]");
    const out = el.querySelector("[data-lp-outticks]");
    const beam = el.querySelector("[data-lp-outbeam]");
    if (!fill || !out || !beam) return;

    // more sample resting on the surface …
    fill.setAttribute("fill-opacity", (0.05 + k * 0.14).toFixed(3));
    // … and the returning wavefront spaces out in answer to it
    out.setAttribute(
      "d",
      ticks(
        HIT,
        DETECTOR,
        OUT_TICKS.map((d) => d * (0.9 + k * 0.26)),
      ),
    );
    beam.setAttribute("stroke-width", (2.79 + k * 0.5).toFixed(2));
  });

  return (
    <Diagram
      tone={tone}
      label="Figure — light path"
      title="Optical path through the structured surface"
      description="A schematic in cross-section. A source at the upper left emits a beam that travels down and to the right, marked with evenly spaced wavefront ticks. In the middle the cartridge is drawn edge-on as a slab; a short run of sub-wavelength features stands on its upper face, with a thin sample layer resting on them. The beam meets the surface there and leaves travelling up and to the right, reaching a detector at the upper right. The outgoing beam is drawn in the prism gradient and its wavefront ticks are spaced differently from the incoming ones, showing that the surface has changed the light rather than merely reflecting it. The amount of sample on the surface varies slowly, and the spacing of the outgoing wavefront varies with it."
      caption="The geometry and the incoming light are held constant. Change what is resting on the surface and what reaches the detector changes with it — which is why the cartridge is part of the measurement rather than a container for it."
    >
      <g ref={root}>
        <defs>
          {/* Laid along the beam in user space, not across a bounding box: the
              default object-bounding-box mapping put most of the run in the amber
              stop, which read as one orange line rather than as refracted light. */}
          <linearGradient
            id="lp-prism"
            gradientUnits="userSpaceOnUse"
            x1={HIT[0]}
            y1={HIT[1]}
            x2={DETECTOR[0]}
            y2={DETECTOR[1]}
          >
            {/* The prism stops are built for the dark surface; on Paper the cyan
                is 1.3:1 and the amber 1.4:1, so the returning beam — the whole
                subject of this drawing — would fade out along its length. The ink
                set is the same three hues darkened until each clears 4.5:1. */}
            <stop offset="0%" stopColor={`var(--prism${ink}-1)`} />
            <stop offset="48%" stopColor={`var(--prism${ink}-2)`} />
            <stop offset="100%" stopColor={`var(--prism${ink}-3)`} />
          </linearGradient>
        </defs>

        {/* Source */}
        <DgPath d="M60 40 L126 40 L126 84 L60 84 Z" fill={0.09} />
        <DgPath d="M126 50 L140 62 L126 74 Z" width={1} opacity={0.7} />
        <DgLabel x={93} y={106}>
          SOURCE
        </DgLabel>

        {/* Incident beam — plain, evenly ticked, and deliberately never animated:
            holding it constant is what makes the sample the variable. */}
        <DgPath d={`M${SOURCE[0]} ${SOURCE[1]} L${HIT[0]} ${HIT[1]}`} width={1.5} />
        <DgPath d={ticks(SOURCE, HIT, [90, 130])} width={1} opacity={0.5} />

        {/* The cartridge, edge-on */}
        <DgPath d="M250 196 L550 196 L550 226 L250 226 Z" fill={0.07} />
        <DgPath d={PILLARS} width={1.6} />

        {/* Structured zone, called out from the left where nothing else runs */}
        <DgPath d="M310 186 L352 186" width={1} opacity={0.5} />
        <DgLabel x={302} y={190} anchor="end">
          STRUCTURED ZONE
        </DgLabel>

        {/* The sample sitting on the structure. The boundary stays dashed and open
            at the bottom, where the structure is; the fill is what breathes. */}
        <path
          data-draw-fade
          data-lp-sample
          d="M344 174 L466 174 L466 188 L344 188 Z"
          fill="currentColor"
          fillOpacity={0.05}
          stroke="none"
        />
        <DgPath d="M344 174 L466 174" dash="5 5" opacity={0.55} />
        <DgPath d="M344 174 L344 186 M466 174 L466 186" dash="5 5" opacity={0.55} />
        <DgLabel x={405} y={166} dim>
          SAMPLE
        </DgLabel>

        {/* Returning light — prism gradient, ticked at a spacing that answers to
            the sample above. Written as raw paths rather than DgPath so the
            animation has something stable to hold on to. */}
        <path
          data-draw
          data-lp-outbeam
          pathLength={1}
          d={`M${HIT[0]} ${HIT[1]} L${DETECTOR[0]} ${DETECTOR[1]}`}
          stroke="url(#lp-prism)"
          strokeWidth={2.79}
          strokeLinecap="round"
          fill="none"
        />
        <path
          data-draw
          data-lp-outticks
          pathLength={1}
          d={ticks(HIT, DETECTOR, OUT_TICKS)}
          stroke="url(#lp-prism)"
          strokeWidth={1.55}
          strokeOpacity={0.75}
          strokeLinecap="round"
          fill="none"
        />

        {/* Light travelling the path once the schematic has settled. Here the
            highlight is not a metaphor — the drawing is of a beam, so a pulse
            running source to surface to detector is the thing itself. */}
        <DgRunner
          d={`M${SOURCE[0]} ${SOURCE[1]} L${HIT[0]} ${HIT[1]} L${DETECTOR[0]} ${DETECTOR[1]}`}
          stroke="url(#lp-prism)"
          delay={1.1}
          length={0.1}
        />

        {/* Detector */}
        <DgPath d="M652 40 L718 40 L718 84 L652 84 Z" fill={0.09} />
        <DgPath d="M652 50 L638 62 L652 74 Z" width={1} opacity={0.7} />
        <DgLabel x={685} y={106}>
          DETECTOR
        </DgLabel>

        {/* What the slab is */}
        <DgPath d="M250 240 L250 246 L550 246 L550 240" width={1} opacity={0.45} />
        <DgLabel x={400} y={268} dim>
          METACARD
        </DgLabel>
      </g>
    </Diagram>
  );
}
