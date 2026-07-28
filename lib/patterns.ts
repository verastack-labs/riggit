export const GRID = 9;

/**
 * Patterns the contribution grid forms as you scroll past it.
 *
 * Drawn as text so they can be read and edited as pictures rather than as
 * coordinate arrays. `#` is a lit cell, `.` is left at the grid's resting
 * dimness.
 *
 * Nine by nine, deliberately coarse. The mark itself is eight cells around a
 * dial, and these should read as the same vocabulary: chunky blocks
 * suggesting a shape, not pixel art rendering one. A finer grid makes the
 * cells stop looking like contribution squares, which is the one thing they
 * have to keep looking like.
 */
function bitmap(
  rows: string[],
  /**
   * How bright each lit cell is, given its position. Without it every `#`
   * comes out at full strength, and a shape of uniformly maxed cells stops
   * looking like contribution squares and starts looking like a stencil laid
   * over them. The shading is where these read as a graph rather than a logo.
   */
  shade: (x: number, y: number) => number = () => 4,
): number[] {
  if (rows.length !== GRID) {
    throw new Error(`pattern needs ${GRID} rows, got ${rows.length}`);
  }

  return rows.flatMap((row, y) => {
    if (row.length !== GRID) {
      throw new Error(`row ${y} needs ${GRID} columns, got ${row.length}`);
    }
    return [...row].map((cell, x) => (cell === "#" ? shade(x, y) : 0));
  });
}

/**
 * How bright a cell of a given level is drawn. Shared, because both demos
 * render the same patterns and had drifted onto slightly different ramps.
 *
 * The floor sits well above zero. Level 1 is a quiet day, not an absent one,
 * and the difference between the two is already carried by whether the cell is
 * drawn at all.
 */
export function levelOpacity(level: number): number {
  return 0.52 + level * 0.12;
}

/** Deterministic, so the server render and the client render agree. */
function noise(index: number, seed: number): number {
  const n = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * A year with holes in it: the graph someone arrives with.
 *
 * The lit cells run the full range rather than topping out partway. What makes
 * this read as the neglected year is how few of them there are, not how dim
 * they are, and dimming them as well only made the beat hard to see next to
 * the three that follow it. Roughly half the grid stays dark, which is the
 * part actually carrying the meaning.
 */
function scattered(): number[] {
  return Array.from({ length: GRID * GRID }, (_, i) => {
    const roll = noise(i, 3);
    if (roll > 0.86) return 4;
    if (roll > 0.7) return 3;
    if (roll > 0.55) return 2;
    return 0;
  });
}

/** The same year, filled in: the graph someone leaves with. */
function dense(): number[] {
  return Array.from({ length: GRID * GRID }, (_, i) => {
    const roll = noise(i, 9);
    if (roll > 0.62) return 4;
    if (roll > 0.34) return 3;
    if (roll > 0.12) return 2;
    return 1;
  });
}

/**
 * Brightest at the head, falling away down the shaft, so the arrow carries its
 * own direction in the shading rather than only in its outline. It points left
 * because the beat it belongs to is about going backwards.
 */
const ARROW = bitmap(
  [
    ".........",
    ".........",
    "...#.....",
    "..##.....",
    ".########",
    "..##.....",
    "...#.....",
    ".........",
    ".........",
  ],
  (x) => 4 - Math.floor((x - 1) / 3),
);

/**
 * The ring brightens the way the brand mark's does, sweeping anticlockwise,
 * which is the direction the product works in. The hands and the pivot stay at
 * full strength: they are the reading, and the ring is the trail behind it.
 *
 * The seam, where brightest meets dimmest, is parked at six o'clock. A ramp
 * around a circle has to break somewhere, and at the bottom it reads as the
 * end of a sweep, where at the top it reads as a mistake.
 */
const CLOCK = bitmap(
  [
    "..#####..",
    ".#.....#.",
    "#...#...#",
    "#...#...#",
    "#...####.",
    "#.......#",
    "#.......#",
    ".#.....#.",
    "..#####..",
  ],
  (x, y) => {
    const dx = x - 4;
    const dy = y - 4;
    if (Math.hypot(dx, dy) < 3.5) return 4;

    // Anticlockwise, as a fraction of a turn, measured from six o'clock.
    const fromTwelve = Math.atan2(dx, -dy) / (Math.PI * 2);
    const turns = (((0.5 - fromTwelve) % 1) + 1) % 1;

    // Floored at 2 so the circle stays continuous. Dropping to level 1 broke
    // the ring visibly at the exact point the eye follows it round.
    return 2 + Math.round(turns * 2);
  },
);

/**
 * The four beats, in scroll order. The copy beside each one is in
 * `demo-section.tsx` and has to stay in step with this list.
 */
export const BEATS = [
  {
    key: "scattered",
    cells: scattered(),
    title: "This is the year you actually had.",
    body: "Weeks where you shipped constantly. Weeks that look empty because you were on a train, or between machines, or simply forgot to push.",
  },
  {
    key: "arrow",
    cells: ARROW,
    title: "Riggit goes backwards.",
    body: "Pick any date. Yesterday, last month, the Tuesday in March when you rewrote the parser and never committed it.",
  },
  {
    key: "clock",
    cells: CLOCK,
    title: "Down to the minute.",
    body: "Not just the day. The commit carries the time you choose, so a backfilled week looks like a worked week rather than a bulk import.",
  },
  {
    key: "dense",
    cells: dense(),
    title: "And the graph tells the truth.",
    body: "The same year, with the work put back where it happened. Nothing invented, nothing rewritten, nothing that was not yours.",
  },
] as const;
