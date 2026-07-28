/**
 * Rasterises the site icons from `app/icon.svg`.
 *
 * Run with `pnpm icons`. The outputs are committed, so this is not part of the
 * build: a static export should not depend on a native module resolving in CI,
 * and these change roughly never.
 *
 * `app/icon.svg` is the app's `brand/riggit-icon.svg`, unaltered. It is
 * copied rather than referenced because that file lives in a different, private
 * repository, and a script that only runs when both happen to be checked out
 * side by side is a script that breaks for everyone else. When the mark
 * changes, replace the SVG and run this again.
 *
 * The mark was checked at tab size before being used unaltered. A simplified
 * cut was drawn first, on the assumption that eight cells at sixteen pixels
 * would turn to mush, and the assumption was wrong: at that size the cells hold
 * as distinct blocks and the dial still reads. Simplifying would have cost
 * recognition for nothing.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "app", "icon.svg");

/**
 * 16 is the tab, 32 the retina tab and the Windows taskbar, 48 the desktop
 * shortcut a pinned site produces. Anything larger is served by icon.svg.
 */
const ICO_SIZES = [16, 32, 48];

/** What iOS asks for when a page is added to the home screen. */
const APPLE_SIZE = 180;

const svg = await readFile(source, "utf8");

/**
 * Rendering at the SVG's own 512 and downsampling gives cleaner small sizes
 * than rasterising straight to 16, where the hand's diagonal aliases.
 */
const render = (markup, size) =>
  sharp(Buffer.from(markup))
    .resize(size, size, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();

/**
 * Packs PNGs into an ICO container. Windows has read PNG-encoded ICO entries
 * since Vista and every current browser does too, so there is no reason to
 * emit the older BMP form.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 is an icon, 2 would be a cursor
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach(({ size, data }, index) => {
    const at = index * 16;
    // A single byte holds the dimension, so 256 is written as 0.
    directory.writeUInt8(size === 256 ? 0 : size, at);
    directory.writeUInt8(size === 256 ? 0 : size, at + 1);
    directory.writeUInt8(0, at + 2); // no palette
    directory.writeUInt8(0, at + 3); // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(data.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...images.map(({ data }) => data)]);
}

const entries = await Promise.all(
  ICO_SIZES.map(async (size) => ({ size, data: await render(svg, size) })),
);

await writeFile(path.join(root, "app", "favicon.ico"), ico(entries));

/**
 * iOS applies its own mask to a touch icon, so the tile ships square here.
 * Left rounded it would be rounded twice and end up with dark slivers in the
 * corners of the home screen icon.
 *
 * The hairline border goes with it. It exists to hold the tile's edge against
 * an unknown desktop background, and inside a mask that clips past it, it stops
 * reading as an edge and starts reading as a stray outline drawn within one.
 */
const EDITS = [
  // The tile's corner radius.
  [/(<rect width="512" height="512" )rx="115"/, '$1rx="0"'],
  // The hairline border, on its own line.
  [/\n\s*<rect x="1\.5"[^>]*stroke-width="3"\/>/, ""],
];

const squared = EDITS.reduce((markup, [pattern, replacement]) => {
  if (!pattern.test(markup)) {
    throw new Error(
      `app/icon.svg no longer matches ${pattern}, so the touch icon would be cut wrong. ` +
        "Update the edits in this script to match the mark.",
    );
  }
  return markup.replace(pattern, replacement);
}, svg);

await writeFile(
  path.join(root, "app", "apple-icon.png"),
  await render(squared, APPLE_SIZE),
);

console.log(
  `favicon.ico (${ICO_SIZES.join(", ")}) and apple-icon.png (${APPLE_SIZE}) written from app/icon.svg`,
);
