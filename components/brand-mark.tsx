import { cn } from "@/lib/cn";

/**
 * The Riggit mark, identical in geometry to the app's icon and splash.
 *
 * Kept byte-compatible with `riggit-app/src/components/brand-mark.tsx` on
 * purpose: someone who has the app installed should recognise this instantly,
 * and a mark that drifts between site and product undoes that.
 *
 * Animated, the hand rewinds anticlockwise and each contribution cell lights
 * as it passes. `sweep` is the order the hand reaches each cell; deriving it
 * from array position instead leaves the wave most of a cycle out of phase
 * with the hand.
 */
const CELLS = [
  { x: 226, y: 61, sweep: 5, rest: 0.22 },
  { x: 109.3, y: 109.3, sweep: 6, rest: 0.45 },
  { x: 61, y: 226, sweep: 7, rest: 0.72 },
  { x: 109.3, y: 342.7, sweep: 0, rest: 1 },
  { x: 226, y: 391, sweep: 1, rest: 0.12 },
  { x: 342.7, y: 342.7, sweep: 2, rest: 0 },
  { x: 391, y: 226, sweep: 3, rest: 0 },
  { x: 342.7, y: 109.3, sweep: 4, rest: 0 },
];

const CYCLE_SECONDS = 2.8;
const SWEEP_OFFSET_SECONDS = 0.1;
const FRESHEST_CELL = 3;

export function BrandMark({
  size = 96,
  animated = false,
  className,
  id = "mark",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
  /** Gradients need unique ids when more than one mark is on a page. */
  id?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="Riggit"
      className={className}
    >
      <defs>
        <linearGradient id={`riggit-tile-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171D1A" />
          <stop offset="1" stopColor="#0A0B0A" />
        </linearGradient>
      </defs>

      <rect width="512" height="512" rx="115" fill={`url(#riggit-tile-${id})`} />
      <rect
        x="1.5"
        y="1.5"
        width="509"
        height="509"
        rx="113.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity=".07"
        strokeWidth="3"
      />

      {CELLS.map((cell) => (
        <rect
          key={`dim-${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width="60"
          height="60"
          rx="16"
          fill="#173324"
        />
      ))}

      {CELLS.map((cell, index) => (
        <rect
          key={`lit-${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width="60"
          height="60"
          rx="16"
          fill={index === FRESHEST_CELL ? "#3FD992" : "#35D08C"}
          className={cn(animated && "riggit-mark-cell")}
          style={
            animated
              ? {
                  animationDelay: `${(
                    SWEEP_OFFSET_SECONDS +
                    (cell.sweep * CYCLE_SECONDS) / CELLS.length
                  ).toFixed(2)}s`,
                }
              : { opacity: cell.rest }
          }
        />
      ))}

      <g
        className={cn(animated && "riggit-mark-hand")}
        style={{ transformOrigin: "256px 256px", transformBox: "view-box" }}
      >
        <path
          d="M256 256 L154 322"
          fill="none"
          stroke="#0A0B0A"
          strokeWidth="70"
          strokeLinecap="round"
        />
        <path
          d="M256 256 L162 316"
          fill="none"
          stroke="#3FD992"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>

      <circle cx="256" cy="256" r="32" fill="#0A0B0A" />
      <circle cx="256" cy="256" r="22" fill="#3FD992" />
    </svg>
  );
}
