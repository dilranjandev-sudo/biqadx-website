// Recommends the `brightness` value for each hero image in lib/images.ts.
// Run from the repo root after adding or replacing a hero photograph:
//
//   node scripts/hero-exposure.mjs
//
// These photographs arrive at wildly different exposures (mean level 24 to 109),
// so PageHero cannot use one shared multiplier — it would leave the dark frames
// dark and flatten a third of the bright ones to white. "best B" is the largest
// lift a frame takes before more than ~6% of its pixels clip; copy it into that
// image's manifest entry, capping it at whatever brings the frame to a normal
// mid-level (roughly 80/mean) so bright images are not pushed further.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// Every hero: PageHero image="…" on plain pages, heroImage={{ id: "…" }} on the
// PlatformPage-driven ones.
const man = fs.readFileSync("lib/images.ts", "utf8");
const srcOf = (id) => {
  const m = man.match(new RegExp(`"${id}"\\s*:\\s*\\{[^}]*?src:\\s*"([^"]+)"`, "s"));
  return m ? m[1] : null;
};

const heroes = [];
for (const dir of fs.readdirSync("app", { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const f = path.join("app", dir.name, "page.tsx");
  if (!fs.existsSync(f)) continue;
  const s = fs.readFileSync(f, "utf8");
  let id = null;
  const hero = s.match(/<PageHero[\s\S]*?(?:\/>|>)/);
  if (hero) id = hero[0].match(/image="([^"]+)"/)?.[1] ?? null;
  if (!id) id = s.match(/heroImage=\{\{\s*id:\s*"([^"]+)"/)?.[1] ?? null;
  if (id) heroes.push({ page: dir.name, id, src: srcOf(id) });
}

// CSS filter chain as PageHero applies it
const hot = (px, B) => [0, 1, 2].some((k) => (px[k] * B - 127.5) * 1.06 + 127.5 >= 254.5);

const CLIP_BUDGET = 0.06; // specular highlights may blow; broad areas may not

console.log("page                     image                     mean  best B   clip@B   clip@1.42");
for (const h of heroes) {
  if (!h.src) { console.log(`${h.page.padEnd(24)} ${h.id.padEnd(25)} (not in manifest)`); continue; }
  const file = path.join("public", h.src.replace(/^\//, ""));
  if (!fs.existsSync(file)) { console.log(`${h.page.padEnd(24)} ${h.id.padEnd(25)} (file missing)`); continue; }
  const { data } = await sharp(file).resize(320, 320, { fit: "inside" })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });

  const px = [];
  let sum = 0;
  for (let i = 0; i < data.length; i += 3) { px.push([data[i], data[i + 1], data[i + 2]]); sum += (data[i] + data[i + 1] + data[i + 2]) / 3; }
  const mean = sum / px.length;
  const clipAt = (B) => px.filter((p) => hot(p, B)).length / px.length;

  let best = 1.0;
  for (let B = 1.0; B <= 2.0001; B += 0.02) if (clipAt(B) <= CLIP_BUDGET) best = B;
  best = Math.round(best * 100) / 100;

  console.log(
    `${h.page.padEnd(24)} ${h.id.padEnd(25)} ${mean.toFixed(0).padStart(4)}  ` +
    `${best.toFixed(2)}   ${(clipAt(best) * 100).toFixed(1)}%     ${(clipAt(1.42) * 100).toFixed(1)}%`
  );
}
