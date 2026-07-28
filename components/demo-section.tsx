import { BEATS, GRID } from "@/lib/patterns";

const CELL = 11;
const PITCH = 15;
const SIZE = GRID * PITCH - (PITCH - CELL);

const FILL = [
  "var(--color-panel)",
  "var(--color-accent-dim)",
  "#1e5c41",
  "#2aa06c",
  "var(--color-accent)",
];

/**
 * The demo: copy scrolls one side while the contribution grid holds the other
 * and rearranges into patterns as you pass.
 *
 * This is the page's one indulgent moment, and it is the argument rather than
 * decoration. Every other way of showing what Riggit does describes it; this
 * performs it, because the grid is the product's own canvas and the page makes
 * a contribution graph say something.
 *
 * Driven entirely by CSS scroll-driven animation. No scroll listeners, no
 * smooth-scroll library, no JavaScript at all: `animation-timeline` links each
 * layer's opacity to scroll position natively, off the main thread, and
 * reduced motion is handled by the media query rather than by branching.
 *
 * Without support for scroll timelines the last beat shows statically and the
 * copy reads as an ordinary column. The section must never depend on the
 * effect to make sense.
 */
export function DemoSection() {
  return (
    <section
      aria-labelledby="demo-heading"
      className="riggit-demo mx-auto mt-28 max-w-[1080px] px-6 sm:mt-36"
    >
      <h2 id="demo-heading" className="sr-only">
        How Riggit works
      </h2>

      <div className="relative flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
        {/* Copy column. Each beat dims as it leaves the middle of the
            viewport, so attention sits where the grid is currently pointing. */}
        <ol className="lg:w-[46%]">
          {BEATS.map((beat, index) => (
            <li
              key={beat.key}
              className="riggit-demo-beat flex min-h-[64vh] flex-col justify-center lg:min-h-[78vh]"
            >
              <span className="font-mono text-[11.5px] text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 max-w-[18ch] text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-ink">
                {beat.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.65] text-ink-secondary">
                {beat.body}
              </p>
            </li>
          ))}
        </ol>

        {/* Grid column. Sticky, so it holds while the copy moves past it. */}
        <div className="pointer-events-none sticky top-[18vh] hidden h-fit lg:block lg:w-[54%]">
          <div className="rounded-card border border-edge bg-panel p-8">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full"
              role="img"
              aria-label="A contribution grid forming an arrow, then a clock, then a filled year"
            >
              {BEATS.map((beat, layer) => (
                <g
                  key={beat.key}
                  className="riggit-demo-layer"
                  style={{ ["--layer" as string]: layer }}
                >
                  {beat.cells.map((level, i) => (
                    <rect
                      key={i}
                      x={(i % GRID) * PITCH}
                      y={Math.floor(i / GRID) * PITCH}
                      width={CELL}
                      height={CELL}
                      rx={3}
                      fill={FILL[level]}
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
