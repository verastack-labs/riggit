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
  "var(--color-empty-cell)",
  "var(--color-accent-dim)",
  "#1e5c41",
  "#2aa06c",
  "var(--color-accent)",
];

/**
 * The hero: a contribution graph filling in its own gaps.
 *
 * The empty squares are the point, so they are the only ones that move. Cells
 * that were already green stay put; only the gaps light up, which is exactly
 * what the product does and reads without a caption.
 *
 * It runs on a loop rather than once, so the argument is still being made to
 * someone who arrives ten seconds late, and so the before state is something
 * they see rather than something they have to imagine. The timing lives in the
 * stylesheet; what this file owns is the sweep order.
 */
export function ContributionGraph() {
  const cells = [];

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      const level = restingLevel(week, day);
      const isGap = level === 0;

      // Filled left to right so it reads as time passing rather than as a
      // random sparkle.
      //
      // The spread across the whole grid is what bounds the loop's timing: the
      // graph is only wholly empty for the part of the empty hold that the
      // sweep is not still eating into. At 78ms a week the spread swallowed
      // the entire hold and the drained state never actually appeared, so the
      // step is tighter now and the jitter smaller with it.
      //
      // The 500ms head start is deliberate: on arrival the graph is briefly
      // broken, and only then repairs itself, which is the order the argument
      // is in. It also sets the phase of the light behind the hero, so if it
      // changes here it has to change on `.riggit-hero-lift` too.
      const delay = 500 + week * 46 + noise(day, week) * 180;

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
      aria-label="A GitHub contribution graph of the last six months, its empty days filling in until the run is unbroken"
    >
      {cells}
    </svg>
  );
}
