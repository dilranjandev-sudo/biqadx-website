import { Diagram, DgLabel, DgPath } from "./Diagram";

/**
 * Why one analyzer can run many kinds of measurement.
 *
 * The page lists a multi-detector architecture in prose; this shows it. Light
 * collected from the card fans to several detection channels, and the cartridge's
 * control profile selects which one is live for a given method. It is the
 * argument for a cooperative pair: the card decides what is measured, the analyzer
 * holds every channel needed to measure it.
 *
 * Probe a channel to see the physics it carries. No channel is drawn as a result;
 * these are detection paths, not readings.
 */

const NODE_X = 200;
const NODE_Y = 150;
const BOX_L = 556;
const BOX_W = 150;

const CHANNELS = [
  { short: "Spectrometric", full: "Absorbance, turbidity, Raman", y: 46 },
  { short: "Imaging", full: "Lens-free, computational", y: 98 },
  { short: "Fluorescence", full: "Intensity and lifetime", y: 150 },
  { short: "Time-resolved", full: "Gated, kinetic", y: 202 },
  { short: "Electrochemical", full: "Potentiostat, impedance", y: 254 },
];

export function OmegaDetectors({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  return (
    <Diagram
      tone={tone}
      height={300}
      interactive
      label="Figure — one path, many detectors"
      title="One collected path, several detection channels"
      description="Light collected from the seated card enters a collection node at the left. From it, five branches fan out to the right, each ending in a labelled detector channel: spectrometric, imaging, fluorescence, time-resolved and electrochemical. A note states that the cartridge control profile selects which channel is live for a given method. Each channel is a detection path, not a reading."
      caption="The analyzer holds several detection channels — spectrometric, imaging, fluorescence, time-resolved and electrochemical. The cartridge's control profile selects which one is used, so one instrument serves many measurement methods."
    >
      {/* Collected light in — label above the arrow, clear of the node */}
      <DgPath d={`M56 ${NODE_Y} L${NODE_X - 26} ${NODE_Y}`} width={1.5} delay={0.1} />
      <DgPath d={`M${NODE_X - 36} ${NODE_Y - 5} L${NODE_X - 26} ${NODE_Y} L${NODE_X - 36} ${NODE_Y + 5}`} width={1.5} delay={0.1} />
      <DgLabel x={112} y={NODE_Y - 40} delay={0.12} dim>
        COLLECTED LIGHT
      </DgLabel>

      {/* Collection node */}
      <DgPath
        d={`M${NODE_X - 26} ${NODE_Y - 30} L${NODE_X + 26} ${NODE_Y - 30} L${NODE_X + 26} ${NODE_Y + 30} L${NODE_X - 26} ${NODE_Y + 30} Z`}
        width={1.6}
        fill={0.1}
        delay={0.15}
      />
      <DgLabel x={NODE_X} y={NODE_Y + 5} delay={0.2}>
        COLLECT
      </DgLabel>

      {CHANNELS.map((c, i) => {
        const d = 0.3 + i * 0.1;
        const cy = c.y + 20;
        return (
          <g key={c.short} className="dg-probe">
            <g className="dg-detail">
              <DgLabel x={BOX_L + BOX_W / 2} y={c.y - 6} delay={0}>
                {c.full}
              </DgLabel>
            </g>
            {/* fan line from node to this channel */}
            <DgPath d={`M${NODE_X + 26} ${NODE_Y} L${BOX_L} ${cy}`} width={1.2} opacity={0.6} delay={d} />
            <DgPath d={`M${BOX_L - 10} ${cy - 4} L${BOX_L} ${cy} L${BOX_L - 10} ${cy + 4}`} width={1.2} opacity={0.6} delay={d} />
            {/* channel box */}
            <DgPath
              d={`M${BOX_L} ${c.y} L${BOX_L + BOX_W} ${c.y} L${BOX_L + BOX_W} ${c.y + 40} L${BOX_L} ${c.y + 40} Z`}
              width={1.3}
              fill={0.06}
              delay={d}
            />
            <DgLabel x={BOX_L + BOX_W / 2} y={cy + 5} delay={d + 0.04}>
              {c.short.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}

      <DgLabel x={400} y={292} delay={0.9} dim>
        CARTRIDGE SELECTS THE LIVE CHANNEL
      </DgLabel>
    </Diagram>
  );
}
