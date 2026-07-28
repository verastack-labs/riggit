import { cn } from "@/lib/cn";

const BLOCKS = 7;
const CYCLE_SECONDS = 1.4;

/**
 * Contribution blocks lighting right to left.
 *
 * The reversed direction is the point rather than a flourish: the product
 * moves backwards through time, so a progress indicator that runs backwards
 * is the argument restated at the smallest possible scale. It is the same
 * idea as the mark's anticlockwise sweep, flattened out.
 *
 * Used for inline waits, where the circular mark would be too much: a button
 * mid-action, or the navigation progress bar.
 */
export function LinearLoader({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {Array.from({ length: BLOCKS }, (_, index) => (
        <span
          key={index}
          className="riggit-linear-block size-[7px] rounded-[2px] bg-accent-dim"
          style={{
            // Rightmost lights first, so the wave travels leftward.
            animationDelay: `${(
              ((BLOCKS - 1 - index) * CYCLE_SECONDS) /
              BLOCKS
            ).toFixed(2)}s`,
          }}
        />
      ))}
    </span>
  );
}
