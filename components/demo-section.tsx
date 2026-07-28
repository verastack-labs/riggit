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

/** Each beat owns a fifth of the timeline, and every element's window is
 * derived from its index rather than hand-written per layer. */
const STEP = 100 / (BEATS.length + 1);

/**
 * The demo: copy steps through fixed positions on one side while the
 * contribution grid holds the other and rearranges into patterns.
 *
 * The copy does not scroll freely. Three slots exist at any moment, above,
 * centre and below, and items hold still in them for most of the scroll then
 * move quickly between. That is why it reads as a mechanism advancing rather
 * than as text drifting past.
 *
 * The centre slot sits on the same horizontal line as the middle of the grid,
 * because both are centred in a row exactly one viewport tall minus the
 * header.
 *
 * Driven entirely by CSS scroll-driven animation: `animation-range` gives each
 * element its own window on a shared timeline. There are no scroll listeners
 * and no smooth-scroll library.
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

      {/* Tall enough to give every beat room to hold. The sticky row inside
          stays put while this scrolls past. */}
      <div className="riggit-demo-track">
        <div className="riggit-demo-stage flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-20">
          {/* Copy. Slots are absolute so items can occupy the same three
              positions rather than stacking in flow. */}
          <ol className="riggit-demo-slots relative w-full lg:w-[46%]">
            {BEATS.map((beat, index) => (
              <li
                key={beat.key}
                className="riggit-demo-beat absolute inset-x-0 top-1/2"
                style={{
                  ["--from" as string]: `${index * STEP}%`,
                  ["--to" as string]: `${index * STEP + STEP * 2}%`,
                }}
              >
                <span className="font-mono text-[11.5px] text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3.2vw,2.15rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-ink">
                  {beat.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-ink-secondary">
                  {beat.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="w-full max-w-[420px] lg:w-[54%] lg:max-w-none">
            <div className="rounded-card border border-edge bg-panel p-6 sm:p-8">
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="w-full"
                role="img"
                aria-label="A contribution grid forming an arrow, then a clock, then a filled year"
              >
                {BEATS.map((beat, index) => (
                  <g
                    key={beat.key}
                    className="riggit-demo-layer"
                    style={{
                      ["--from" as string]: `${index * STEP}%`,
                      ["--to" as string]: `${index * STEP + STEP * 2}%`,
                    }}
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
      </div>
    </section>
  );
}
