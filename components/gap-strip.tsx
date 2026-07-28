const WEEKS = 14;

function noise(week: number, seed: number): number {
  const n = Math.sin(week * 41.31 + seed * 17.77) * 21323.113;
  return n - Math.floor(n);
}

const FILL = [
  "var(--color-panel)",
  "var(--color-accent-dim)",
  "#1e5c41",
  "#2aa06c",
  "var(--color-accent)",
];

/**
 * A short run of contribution cells with a hole punched in it.
 *
 * Used beside each scenario in the problem section instead of an icon. An
 * icon would be decoration; this is the actual shape of the problem being
 * described, at a glance and in the product's own vocabulary. It also keeps
 * the signature element present without repeating the hero.
 */
export function GapStrip({
  gapStart,
  gapLength,
  seed = 1,
}: {
  gapStart: number;
  gapLength: number;
  seed?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${WEEKS * 13 - 3} 10`}
      className="h-[10px] w-auto shrink-0"
      aria-hidden="true"
    >
      {Array.from({ length: WEEKS }, (_, week) => {
        const inGap = week >= gapStart && week < gapStart + gapLength;
        const roll = noise(week, seed);
        const level = inGap ? 0 : roll > 0.72 ? 4 : roll > 0.45 ? 3 : roll > 0.2 ? 2 : 1;

        return (
          <rect
            key={week}
            x={week * 13}
            y={0}
            width={10}
            height={10}
            rx={2.5}
            fill={FILL[level]}
          />
        );
      })}
    </svg>
  );
}
