import { Diagram, DgLabel, DgPath, DgRunner } from "./Diagram";

const CARD_X = 92;
const CARD_Y = 60;
const CARD_W = 616;
const CARD_H = 210;

// The fluid path, in plan view: in at the port, metered, through the reaction
// and optical zones, then sealed into waste. One continuous stroke, so it draws
// on as one movement.
const PATH =
  // Stops at the waste chamber's edge, not inside it: running on into the box
  // put the channel across its label and made the seal look open.
  "M170 108 L236 108 L236 152 L318 152 L318 108 L404 108 L404 176 L500 176 L500 120 L590 120 L590 214 L612 214";

/**
 * Where the sample actually goes.
 *
 * The eight steps beside this drawing are a sequence in time; this is the same
 * run in space. A reader who has seen the route understands why seating,
 * metering and containment are separate concerns rather than one vague
 * "processing" step — and why the optical zone sits partway along a path rather
 * than at the end of it.
 */
export function SamplePath({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  return (
    <Diagram
      tone={tone}
      height={330}
      label="Figure — the sample's route"
      title="The sample's route through the cartridge, in plan"
      description="A plan view of the cartridge as a rounded rectangle. A sample port sits at the upper left. From it a single continuous channel runs right, stepping up and down through a metering section, then a reaction zone, then across the structured optical zone which is marked with a run of sub-wavelength features, and finally down into a sealed waste chamber at the lower right. Reference patches sit on the card away from the channel, and an identity mark sits at the lower left. Vents are marked above the channel."
      caption="One route, in one direction, ending sealed. The sample is metered before it reaches the zone that is measured, and it is contained afterwards — the card is not reopened."
    >
      {/* The card, in plan */}
      <DgPath
        d={`M${CARD_X + 18} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + 18} Z`}
        width={1.6}
        fill={0.05}
      />
      <DgLabel x={CARD_X + CARD_W} y={CARD_Y + CARD_H + 26} anchor="end" delay={1.0} dim>
        METACARD
      </DgLabel>

      {/* Port */}
      <DgPath d="M152 108 a18 18 0 1 0 0.01 0" width={1.5} fill={0.12} delay={0.05} />
      <DgLabel x={152} y={82} delay={0.1}>
        PORT
      </DgLabel>

      {/* The channel — one continuous stroke, so it draws as one movement */}
      <DgPath d={PATH} width={2} delay={0.2} />

      {/* Metering */}
      <DgPath d="M236 152 L318 152" width={4} opacity={0.35} delay={0.45} />
      <DgLabel x={277} y={176} delay={0.5} dim>
        METERED
      </DgLabel>

      {/* Reaction */}
      <DgPath d="M404 176 L500 176" width={4} opacity={0.35} delay={0.55} />
      <DgLabel x={452} y={200} delay={0.6} dim>
        REACTION
      </DgLabel>

      {/* The structured zone the light actually reads */}
      <DgPath
        d={Array.from({ length: 8 }, (_, i) => {
          const x = 506 + i * 11;
          return `M${x} 112 L${x} 128`;
        }).join(" ")}
        width={1.5}
        delay={0.65}
      />
      <DgPath d="M500 104 L590 104" width={1} opacity={0.45} delay={0.65} />
      <DgLabel x={545} y={94} delay={0.7}>
        STRUCTURED ZONE
      </DgLabel>

      {/* Vents */}
      <DgPath d="M340 96 L340 78 M356 96 L356 78" width={1} opacity={0.55} delay={0.4} />
      <DgLabel x={348} y={70} delay={0.45} dim>
        VENT
      </DgLabel>

      {/* Sealed waste */}
      <DgPath d="M614 190 L688 190 L688 244 L614 244 Z" width={1.5} fill={0.1} delay={0.8} />
      <DgLabel x={651} y={216} delay={0.85} dim>
        SEALED
      </DgLabel>

      {/* The sample itself, travelling the route once the card has been drawn.
          On this drawing the highlight is the subject, not an accent. */}
      <DgRunner d={PATH} delay={1.05} length={0.12} />

      {/* On-card references, off the fluid path on purpose */}
      <DgPath
        d={Array.from({ length: 4 }, (_, i) => {
          const x = 180 + i * 26;
          return `M${x} 214 L${x + 18} 214 L${x + 18} 234 L${x} 234 Z`;
        }).join(" ")}
        width={1.1}
        opacity={0.7}
        delay={0.9}
      />
      <DgLabel x={180} y={252} anchor="start" delay={0.95} dim>
        REFERENCES
      </DgLabel>

      {/* Identity */}
      <DgPath d="M320 216 L320 236 M328 216 L328 236 M340 216 L340 236 M346 216 L346 236" width={2.4} opacity={0.75} delay={0.95} />
      <DgLabel x={333} y={252} delay={1.0} dim>
        IDENTITY
      </DgLabel>
    </Diagram>
  );
}
