// scripts/make-og-image.mjs
//
// Renders the 1200x630 social preview card into src/assets/profile/og-home.jpg.
// Run with `npm run og`. Committed rather than generated at build time: the
// output changes only when the headline or portrait does, and a build-time
// dependency on system font rendering would be a poor trade for that.
//
// Colours are read from the dark theme's design tokens so the card cannot
// drift away from the site it represents.
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const out = fileURLToPath(new URL("src/assets/profile/og-home.jpg", root));
const portraitPath = fileURLToPath(
  new URL("src/assets/profile/carlos_natanauan.png", root),
);

// ── oklch -> hex, so the card can quote global.css rather than hardcode ──
function oklchToHex(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  return (
    "#" +
    lin
      .map((v) => {
        const s = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.max(v, 0) ** (1 / 2.4) - 0.055;
        return Math.round(Math.min(1, Math.max(0, s)) * 255)
          .toString(16)
          .padStart(2, "0");
      })
      .join("")
  );
}

const css = readFileSync(fileURLToPath(new URL("src/styles/global.css", root)), "utf8");
// Anchor on the rule itself: ":root.dark" also appears in the comment above it.
const darkBlock = css.match(/:root\.dark\s*\{([\s\S]*?)\}/);
if (!darkBlock) throw new Error("could not find the :root.dark rule in global.css");
const dark = darkBlock[1];
const token = (name) => {
  // Plain parse rather than a regex: the values are always
  // "--tk-<name>: oklch(L C H);" on their own line.
  const line = dark
    .split("\n")
    .find((l) => l.trim().startsWith(`--tk-${name}:`));
  if (!line) throw new Error(`token --tk-${name} not found in :root.dark`);
  const inner = line.slice(line.indexOf("oklch(") + 6, line.indexOf(")"));
  const [L, C, H] = inner.trim().split(" ").filter(Boolean).map(Number);
  return oklchToHex(L, C, H);
};

const BG = token("bg");
const CARD = token("card");
const FG = token("fg");
const MUTED = token("muted");
const ACCENT = token("accent");

const W = 1200;
const H = 630;
const PORTRAIT = 300;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="55%" stop-color="${ACCENT}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="round"><circle cx="${W - 210}" cy="${H / 2}" r="${PORTRAIT / 2}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${ACCENT}"/>

  <circle cx="${W - 210}" cy="${H / 2}" r="${PORTRAIT / 2 + 12}" fill="${CARD}"/>
  <circle cx="${W - 210}" cy="${H / 2}" r="${PORTRAIT / 2 + 12}" fill="none"
          stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="2"/>

  <text x="90" y="196" font-family="${FONT}" font-size="24" font-weight="700"
        letter-spacing="5" fill="${ACCENT}">${esc(process.env.OG_EYEBROW || "KUYA CARLOS")}</text>

  <text x="90" y="286" font-family="${FONT}" font-size="72" font-weight="800"
        letter-spacing="-2" fill="${FG}">${esc(process.env.OG_NAME || "Carlos Natanauan")}</text>

  <text x="90" y="348" font-family="${FONT}" font-size="34" font-weight="500"
        fill="${MUTED}">${esc(process.env.OG_ROLE || "Software Developer — Mobile & Web")}</text>

  <text x="90" y="428" font-family="${FONT}" font-size="26" font-weight="600"
        fill="${FG}" fill-opacity="0.85">${esc(process.env.OG_STACK || "Flutter · Astro · Express · PostgreSQL")}</text>

  <text x="90" y="524" font-family="${FONT}" font-size="24" font-weight="500"
        fill="${MUTED}" fill-opacity="0.8">kuyacarlos.is-a.dev</text>
</svg>`;

const portrait = await sharp(portraitPath)
  .resize(PORTRAIT, PORTRAIT, { fit: "cover" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${PORTRAIT}" height="${PORTRAIT}"><circle cx="${PORTRAIT / 2}" cy="${PORTRAIT / 2}" r="${PORTRAIT / 2}" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: portrait, left: W - 210 - PORTRAIT / 2, top: (H - PORTRAIT) / 2 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`wrote ${out}`);
console.log(`  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
console.log(`  tokens: bg ${BG}  card ${CARD}  fg ${FG}  muted ${MUTED}  accent ${ACCENT}`);
