// Rasterise a diagram straight from the served page so it can actually be looked
// at:
//
//   node scripts/render-diagram.mjs http://localhost:3001/metasurface-diagnostics out.png signal
//
// A line drawing is exactly the kind of thing where geometry errors — a beam
// that misses its target, two labels colliding, a leader pointing at nothing —
// are invisible to DOM inspection, and screenshots are not always available.
//
// The rasteriser is librsvg, which is stricter than a browser: it has no CSS
// custom properties, no Tailwind classes, and no `currentColor` inheritance from
// an HTML ancestor, so those are substituted here. Treat its output as a check
// on geometry and composition, not as a pixel-accurate preview.
import sharp from "sharp";
import fs from "node:fs";

const url = process.argv[2];
const out = process.argv[3] ?? "_diagram.png";
const tone = process.argv[4] ?? "ink";

const html = await (await fetch(url)).text();
const m = html.match(/<svg[^>]*role="img"[\s\S]*?<\/svg>/);
if (!m) {
  console.error("no diagram svg found on " + url);
  process.exit(1);
}

const fg = tone === "signal" ? "#E8ECEF" : "#0B0E14";
const bg = tone === "signal" ? "#0B0E14" : "#F5F3EE";

const svg = m[0]
  // the page paints these from CSS custom properties and a Tailwind text colour;
  // neither exists in a bare rasteriser
  .replace(/var\(--prism-1\)/g, "#6EE7F0")
  .replace(/var\(--prism-2\)/g, "#A78BFA")
  .replace(/var\(--prism-3\)/g, "#F2C879")
  .replace(/currentColor/g, fg)
  .replace(/class="font-mono"/g, 'font-family="IBM Plex Mono, DejaVu Sans Mono, monospace"')
  // the served tag already carries a style attribute (min-width), and a second
  // one is a parse error rather than a merge
  .replace(/\sstyle="[^"]*"/, "")
  .replace(/<svg /, `<svg width="1600" height="600" `);

fs.writeFileSync("_diagram.svg", svg);
await sharp(Buffer.from(svg), { density: 144 })
  .flatten({ background: bg })
  .png()
  .toFile(out);
console.log(`${out} written (${(fs.statSync(out).size / 1024).toFixed(0)}KB)`);
