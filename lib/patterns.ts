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
function bitmap(rows: string[]): number[] {
  if (rows.length !== GRID) {
    throw new Error(`pattern needs ${GRID} rows, got ${rows.length}`);
  }

  return rows.flatMap((row, y) => {
    if (row.length !== GRID) {
      throw new Error(`row ${y} needs ${GRID} columns, got ${row.length}`);
    }
    return [...row].map((cell) => (cell === "#" ? 4 : 0));
  });
}

/** Deterministic, so the server render and the client render agree. */
function noise(index: number, seed: number): number {
  const n = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/** A year with holes in it: the graph someone arrives with. */
function scattered(): number[] {
  return Array.from({ length: GRID * GRID }, (_, i) => {
    const roll = noise(i, 3);
    if (roll > 0.86) return 3;
    if (roll > 0.72) return 2;
    if (roll > 0.55) return 1;
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

const ARROW = bitmap([
  ".........",
  ".........",
  "...#.....",
  "..##.....",
  ".########",
  "..##.....",
  "...#.....",
  ".........",
  ".........",
]);

const CLOCK = bitmap([
  "..#####..",
  ".#.....#.",
  "#...#...#",
  "#...#...#",
  "#...####.",
  "#.......#",
  "#.......#",
  ".#.....#.",
  "..#####..",
]);

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
