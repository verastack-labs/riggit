import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * The social card, laid out for 1200x630 rather than scaled from the 16:9 cut.
 *
 * 1.91:1 is what Open Graph asks for and what WhatsApp, Slack and Facebook
 * crop to. Feeding them a 16:9 image means they take a slice out of it, and
 * the slice is never the part you chose.
 */
const OUT = process.argv[2];
const W = 1200;
const H = 630;

const noise = (x, y) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

const LEVELS = ["#171a15", "#173324", "#1e5c41", "#2aa06c", "#35d08c"];

const MARK = (x, y, size) => {
  const s = size / 512;
  const t = (v) => (v * s).toFixed(2);
  const dial = [
    [226, 61, "#1E4630"],
    [109.3, 109.3, "#248055"],
    [61, 226, "#2FAF77"],
    [109.3, 342.7, "#3FD992"],
    [226, 391, "#1A3A29"],
    [342.7, 342.7, "#173324"],
    [391, 226, "#173324"],
    [342.7, 109.3, "#173324"],
  ]
    .map(
      ([cx, cy, fill]) =>
        `<rect x="${t(cx)}" y="${t(cy)}" width="${t(60)}" height="${t(60)}" rx="${t(16)}" fill="${fill}"/>`,
    )
    .join("");

  return `<g transform="translate(${x} ${y})">
    <rect width="${size}" height="${size}" rx="${t(115)}" fill="#12140f"/>
    <rect x="${t(1.5)}" y="${t(1.5)}" width="${t(509)}" height="${t(509)}" rx="${t(113.5)}" fill="none" stroke="#ffffff" stroke-opacity=".07" stroke-width="${t(3)}"/>
    ${dial}
    <path d="M${t(256)} ${t(256)} L${t(154)} ${t(322)}" fill="none" stroke="#0A0B0A" stroke-width="${t(70)}" stroke-linecap="round"/>
    <path d="M${t(256)} ${t(256)} L${t(162)} ${t(316)}" fill="none" stroke="#3FD992" stroke-width="${t(40)}" stroke-linecap="round"/>
    <circle cx="${t(256)}" cy="${t(256)}" r="${t(32)}" fill="#0A0B0A"/>
    <circle cx="${t(256)}" cy="${t(256)}" r="${t(22)}" fill="#3FD992"/>
  </g>`;
};

const cell = 28;
const pitch = 35;
const cols = 18;
const rows = 7;
const gw = cols * pitch - (pitch - cell);
const gh = rows * pitch - (pitch - cell);
const x0 = W - gw - 95;
const y0 = (H - gh) / 2;

const squares = [];
for (let c = 0; c < cols; c++) {
  for (let r = 0; r < rows; r++) {
    const roll = noise(c, r);
    // Sparse on the left, dense by the right edge: the claim, in the layout.
    const density = c / (cols - 1);
    let level;
    if (roll < 0.5 - density * 0.42) {
      level = 0;
    } else {
      const lift = roll + density * 0.55;
      level = lift > 1.05 ? 4 : lift > 0.85 ? 3 : lift > 0.68 ? 2 : 1;
    }
    squares.push(
      `<rect x="${x0 + c * pitch}" y="${y0 + r * pitch}" width="${cell}" height="${cell}" rx="${Math.round(cell * 0.27)}" fill="${LEVELS[level]}"/>`,
    );
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#101410"/>
      <stop offset="1" stop-color="#0A0B0A"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="50%" r="54%">
      <stop offset="0" stop-color="#35d08c" stop-opacity="0.22"/>
      <stop offset="0.6" stop-color="#35d08c" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#35d08c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${MARK(95, (H - 160) / 2, 160)}
  ${squares.join("")}
</svg>`;

// Both names, same picture. Next reads `opengraph-image` and `twitter-image`
// as separate file conventions, and a missing twitter-image means Twitter
// falls back to the og tag with no guarantee about how it crops.
const buffer = await sharp(Buffer.from(svg))
  // Social scrapers fetch this on every share, and several will refuse to
  // render a large card at all above a size threshold.
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

for (const name of ["opengraph-image.png", "twitter-image.png"]) {
  const file = path.join(OUT, name);
  await writeFile(file, buffer);
  console.log(`  ${name}`);
}

const meta = await sharp(buffer).metadata();
console.log(
  `${meta.width}x${meta.height}, ${(buffer.length / 1024).toFixed(0)}KB`,
);
