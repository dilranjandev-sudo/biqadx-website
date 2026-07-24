import { Diagram, DgLabel, DgPath } from "./Diagram";

// The card fills its sheet. It used to sit in an 800×330 frame occupying about
// two thirds of the height, which left a band of empty drafting grid under it and
// made the drawing look like it was floating rather than printed — most obvious
// in the pinned scene, where this is the only thing on screen.
const CARD_X = 84;
const CARD_Y = 30;
const CARD_W = 632;
const CARD_H = 200;
const FRAME_H = 280;

/**
 * The fluid path, in plan view: in at the port, metered, through the reaction
 * and optical zones, then sealed into waste.
 *
 * Held as points rather than as a `d` string so the drawing can say where along
 * the route each zone sits. Those fractions drive the scrubbed fill, and deriving
 * them from the same geometry the channel is drawn from means a change to the
 * route cannot leave them quietly pointing at the wrong place.
 *
 * It stops at the waste chamber's edge, not inside it: running on into the box
 * put the channel across its label and made the seal look open.
 */
/** The sample port, and where the channel therefore has to begin. */
const PORT_CX = 145;
const PORT_R = 17;

/**
 * A circle as a path, centred where it says it is.
 *
 * Two half-turns between the top and the bottom of the circle, written as
 * absolute arcs. The compact idiom — two relative arcs whose chord is the full
 * diameter — is degenerate: with the chord equal to 2r both possible arcs are the
 * same semicircle, the large-arc flag means nothing, and some renderers draw
 * nothing at all. That is not theoretical; it silently erased the port here, and
 * the drawing still looked plausible without it.
 */
function ring(cx: number, cy: number, r: number) {
  return (
    `M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} ` +
    `A${r} ${r} 0 1 0 ${cx} ${cy - r} Z`
  );
}

const POINTS: [number, number][] = [
  [PORT_CX + PORT_R, 78],
  [226, 78],
  [226, 118],
  [304, 118], // metering ends here
  [304, 78],
  [386, 78],
  [386, 142],
  [478, 142], // reaction ends here
  [478, 90],
  [566, 90], // the structured zone ends here
  [566, 182],
  [600, 182],
];

const PATH = POINTS.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

/** Cumulative length at each point, and the total. */
const CUML = POINTS.reduce<number[]>((acc, p, i) => {
  if (i === 0) return [0];
  const [px, py] = POINTS[i - 1];
  return [...acc, acc[i - 1] + Math.hypot(p[0] - px, p[1] - py)];
}, []);
const TOTAL = CUML[CUML.length - 1];

/** How far along the route each stage is complete, as a fraction. */
const at = (pointIndex: number) => CUML[pointIndex] / TOTAL;

/**
 * The four things that happen to the sample on its way through, and where along
 * the route each one is finished. A stage is marked when the fluid has passed it,
 * not when it reaches it — "metered" is only true once the metering section has
 * filled.
 */
export const SAMPLE_STAGES = [
  { name: "Metered", at: at(3) },
  { name: "Reaction", at: at(7) },
  { name: "Structured zone", at: at(9) },
  { name: "Sealed", at: 1 },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * The route's real length, and the dash pattern that reveals it up to `t`.
 *
 * Deliberately in user units rather than normalised with `pathLength=1`. The
 * normalised form is tidier and is what the rest of these drawings use for their
 * draw-on, but it is only honoured by renderers that implement `pathLength` —
 * librsvg does not, and `stroke-dasharray="1 1"` there means a one-unit dash and
 * a one-unit gap, so the channel rasterises as a dotted line. Since rasterising
 * the drawing is how geometry errors get caught here, a form that renders
 * differently in the checking tool than in the browser is worth avoiding.
 */
export const SAMPLE_LENGTH = TOTAL;

export function sampleFillOffset(t: number) {
  return TOTAL * (1 - clamp01(t));
}

/** A stage arrives as the fluid finishes it, over a short ramp so four labels do
 *  not snap on. */
export function sampleStageOpacity(i: number, t: number) {
  return clamp01((t - SAMPLE_STAGES[i].at + 0.06) / 0.06);
}

/** Which stages are complete, for a readout. */
export function sampleStagesDone(t: number) {
  return SAMPLE_STAGES.filter((s) => t >= s.at).length;
}

/**
 * Where the sample actually goes.
 *
 * The eight steps beside this drawing are a sequence in time; this is the same
 * run in space. A reader who has seen the route understands why seating,
 * metering and containment are separate concerns rather than one vague
 * "processing" step — and why the optical zone sits partway along a path rather
 * than at the end of it.
 *
 * A pure drawing: `t` in, no animation of its own. It used to carry a looping
 * highlight, which is the wrong thing here — a loop plays at its own pace, and
 * the point of a route is that the reader follows it. SamplePathScene owns the
 * motion now.
 */
export function SamplePath({
  tone = "ink",
  /** 0 = nothing has entered the card, 1 = the route is full and sealed. */
  t = 1,
}: {
  tone?: "ink" | "signal";
  t?: number;
}) {
  return (
    <Diagram
      tone={tone}
      height={FRAME_H}
      label="Figure — the sample's route"
      title="The sample's route through the cartridge, in plan"
      description="A plan view of the cartridge as a rounded rectangle. A sample port sits at the upper left. From it a single continuous channel runs right, stepping up and down through a metering section, then a reaction zone, then across the structured optical zone which is marked with a run of sub-wavelength features, and finally down into a sealed waste chamber at the lower right. Reference patches sit on the card away from the channel, and an identity mark sits at the lower left. Vents are marked above the channel."
      caption="One route, in one direction, ending sealed. The sample is metered before it reaches the zone that is measured, and it is contained afterwards — the card is not reopened."
    >
      <g>
        {/* The card, in plan */}
        <DgPath
          d={`M${CARD_X + 18} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + 18} Z`}
          width={1.6}
          fill={0.05}
        />
        <DgLabel x={CARD_X + CARD_W} y={CARD_Y + CARD_H + 24} delay={1.0} anchor="end" dim>
          METACARD
        </DgLabel>

        {/* Port. Written from an explicit centre and radius rather than as an
            arc that closes on itself, because that form does not put the centre
            where it reads as being — and the channel has to start exactly on the
            port's edge or the sample appears to begin in mid-card. Its right edge
            is PORT_R from the centre, which is where POINTS begins. */}
        <DgPath d={ring(PORT_CX, 78, PORT_R)} width={1.5} fill={0.12} delay={0.05} />
        <DgLabel x={PORT_CX} y={78 - PORT_R - 11} delay={0.1}>
          PORT
        </DgLabel>

        {/* The channel, empty — one continuous stroke, so it draws as one
            movement when the drawing first arrives. */}
        <DgPath d={PATH} width={2} opacity={0.35} delay={0.2} />

        {/* The same channel, filling. Drawn over the empty one rather than
            replacing it, so the route the sample has *not* reached yet is still
            visible ahead of it — which is what makes it read as a route being
            travelled rather than a line being drawn. */}
        <path
          data-sp-fill
          d={PATH}
          strokeDasharray={`${TOTAL.toFixed(2)} ${TOTAL.toFixed(2)}`}
          strokeDashoffset={sampleFillOffset(t).toFixed(2)}
          stroke="currentColor"
          strokeWidth={2 * 1.55}
          strokeLinecap="butt"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Vents */}
        <DgPath d="M330 70 L330 54 M346 70 L346 54" width={1} opacity={0.55} delay={0.4} />
        <DgLabel x={338} y={46} delay={0.45} dim>
          VENT
        </DgLabel>

        {/* Each named section is called out with a bracket spanning it, the way a
            drawing marks a dimension — not by thickening the channel itself.
            A heavier, softer stroke laid over the route reads as a halo around
            the line rather than as a measurement of it, and it muddies the one
            thing the eye is meant to follow: the advancing edge of the fill. */}

        {/* Metering */}
        <g data-sp-stage={0} opacity={sampleStageOpacity(0, t)}>
          <DgPath d="M226 128 L226 134 L304 134 L304 128" width={1} opacity={0.55} delay={0.45} />
          <DgLabel x={265} y={152} delay={0.5} dim>
            METERED
          </DgLabel>
        </g>

        {/* Reaction */}
        <g data-sp-stage={1} opacity={sampleStageOpacity(1, t)}>
          <DgPath d="M386 152 L386 158 L478 158 L478 152" width={1} opacity={0.55} delay={0.55} />
          <DgLabel x={432} y={176} delay={0.6} dim>
            REACTION
          </DgLabel>
        </g>

        {/* The structured zone the light actually reads. Its bracket sits above,
            because the route is near the top of the card here — the bracket goes
            wherever there is room, the label always just outside it. */}
        <g data-sp-stage={2} opacity={sampleStageOpacity(2, t)}>
          <DgPath
            d={Array.from({ length: 8 }, (_, i) => {
              const x = 486 + i * 11;
              return `M${x} 82 L${x} 98`;
            }).join(" ")}
            width={1.5}
            delay={0.65}
          />
          <DgPath d="M478 80 L478 74 L566 74 L566 80" width={1} opacity={0.55} delay={0.65} />
          <DgLabel x={522} y={62} delay={0.7}>
            STRUCTURED ZONE
          </DgLabel>
        </g>

        {/* Sealed waste */}
        <g data-sp-stage={3} opacity={sampleStageOpacity(3, t)}>
          <DgPath d="M606 156 L690 156 L690 208 L606 208 Z" width={1.5} fill={0.1} delay={0.8} />
          <DgLabel x={648} y={186} delay={0.85} dim>
            SEALED
          </DgLabel>
        </g>

        {/* On-card references and identity, off the fluid path on purpose. They
            sit in the strip the route leaves clear along the bottom of the card,
            spread rather than bunched into one corner — the card should read as
            laid out, not as a route with two marks left over. */}
        <DgPath
          d={Array.from({ length: 4 }, (_, i) => {
            const x = 132 + i * 30;
            return `M${x} 172 L${x + 22} 172 L${x + 22} 196 L${x} 196 Z`;
          }).join(" ")}
          width={1.1}
          opacity={0.7}
          delay={0.9}
        />
        <DgLabel x={132} y={214} anchor="start" delay={0.95} dim>
          REFERENCES
        </DgLabel>

        {/* Identity */}
        <DgPath
          d="M300 172 L300 196 M309 172 L309 196 M321 172 L321 196 M328 172 L328 196"
          width={2.4}
          opacity={0.75}
          delay={0.95}
        />
        <DgLabel x={314} y={214} delay={1.0} dim>
          IDENTITY
        </DgLabel>
      </g>
    </Diagram>
  );
}
