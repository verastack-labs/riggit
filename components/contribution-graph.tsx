import type { CSSProperties } from "react";

const WEEKS = 26;
const DAYS = 7;

/**
 * Deterministic pseudo-random, seeded by cell position.
 *
 * Not `Math.random`: this renders during a static export and again on the
 * client, and a mismatch between the two is a hydration error. Same input,
 * same output, every time.
 */
function noise(week: number, day: number): number {
  const n = Math.sin(week * 12.9898 + day * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * How busy a given day looks before Riggit touches it.
 *
 * Weekends are quieter and there are two deliberate dead stretches, because a
 * graph with realistic gaps is the whole argument. A uniformly random one
 * would look like noise rather than like someone's year.
 */
function restingLevel(week: number, day: number): number {
  const isWeekend = day === 0 || day === 6;

  // The gaps the pitch is about: a fortnight offline, and a fortnight where
  // the work happened but never got committed.
  const inDeadZone = (week >= 6 && week <= 10) || (week >= 16 && week <= 19);
  if (inDeadZone) return noise(week, day) > 0.88 ? 1 : 0;

  const roll = noise(week, day);
  if (isWeekend) return roll > 0.72 ? 1 : 0;
  if (roll > 0.82) return 4;
  if (roll > 0.62) return 3;
  if (roll > 0.38) return 2;
  if (roll > 0.18) return 1;
  return 0;
}

const LEVEL_FILL = [
  "var(--color-panel)",
  "var(--color-accent-dim)",
  "#1e5c41",
  "#2aa06c",
  "var(--color-accent)",
];

/**
 * The hero: a contribution graph filling in its own gaps.
 *
 * The empty squares are the point, so they animate last and loudest. Cells
 * that were already green stay put; only the gaps light up, which is exactly
 * what the product does and reads without a caption.
 *
 * The per-cell delay goes out as a custom property rather than as
 * `animation-delay` directly, because it has to time two animations: the fill,
 * and the slow pulse that starts where the fill ends. Passing the raw number
 * lets the stylesheet do that arithmetic instead of duplicating it here.
 */
export function ContributionGraph() {
  const cells = [];

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      const level = restingLevel(week, day);
      const isGap = level === 0;

      // Filled left to right so it reads as time passing rather than as a
      // random sparkle.
      const delay = 900 + week * 78 + noise(day, week) * 260;

      cells.push(
        <rect
          key={`${week}-${day}`}
          x={week * 22}
          y={day * 22}
          width={17}
          height={17}
          rx={5}
          fill={isGap ? LEVEL_FILL[0] : LEVEL_FILL[level]}
          className={isGap ? "riggit-gap" : undefined}
          style={
            isGap
              ? ({ "--gap-delay": `${Math.round(delay)}ms` } as CSSProperties)
              : undefined
          }
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${WEEKS * 22 - 5} ${DAYS * 22 - 5}`}
      className="w-full"
      role="img"
      aria-label="A GitHub contribution graph with gaps in it, filling in until the year is unbroken"
    >
      {cells}
    </svg>
  );
}
