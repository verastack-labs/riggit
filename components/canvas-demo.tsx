import { BEATS, GRID } from "@/lib/patterns";

/**
 * The variation: the grid stops being a panel and becomes the page.
 *
 * A full-bleed field of cells runs edge to edge and is cut off by the
 * viewport, so it reads as a surface continuing past the frame rather than an
 * illustration sitting on one. Copy floats over it. The patterns form in the
 * middle of that field, out of the same cells, which is the whole idea: the
 * page itself is the contribution graph, and the graph is being written on.
 *
 * The resting field is deliberately close to the page colour. It has to
 * survive text sitting directly on top of it, so it works as texture until a
 * pattern lights and pulls the eye to the centre.
 */

/** Wide enough to overflow any reasonable viewport, so the field is always
 * cut off rather than fitting neatly inside it. */
const COLUMNS = 44;
const ROWS = 26;
const CELL = 11;
const PITCH = 15;

const OFFSET_X = Math.floor((COLUMNS - GRID) / 2);
const OFFSET_Y = Math.floor((ROWS - GRID) / 2);

const STEP = 100 / (BEATS.length - 1);

function windowFor(index: number) {
  return {
    ["--from" as string]: `${((index - 2) * STEP).toFixed(3)}%`,
    ["--to" as string]: `${((index + 2) * STEP).toFixed(3)}%`,
  };
}

function noise(index: number): number {
  const n = Math.sin(index * 27.17 + 5.31) * 31871.77;
  return n - Math.floor(n);
}

export function CanvasDemo() {
  const field = Array.from({ length: COLUMNS * ROWS }, (_, i) => noise(i));

  return (
    <section className="riggit-canvas relative">
      <div className="riggit-canvas-track">
        <div className="riggit-canvas-stage">
          {/* The field. Fixed within the stage so it stays put while the copy
              steps through, and overflow-hidden clips it at the edges. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width={COLUMNS * PITCH}
              height={ROWS * PITCH}
            >
              {/* Resting texture, barely above the page colour. */}
              {field.map((roll, i) => (
                <rect
                  key={i}
                  x={(i % COLUMNS) * PITCH}
                  y={Math.floor(i / COLUMNS) * PITCH}
                  width={CELL}
                  height={CELL}
                  rx={3}
                  fill={roll > 0.82 ? "#12170f" : "#0f1210"}
                />
              ))}

              {/* The patterns, drawn from the same cells in the middle of the
                  field so they read as the page lighting up rather than as a
                  graphic placed on it. */}
              {BEATS.map((beat, index) => (
                <g
                  key={beat.key}
                  className="riggit-canvas-layer"
                  style={windowFor(index)}
                >
                  {beat.cells.map((level, i) =>
                    level === 0 ? null : (
                      <rect
                        key={i}
                        x={((i % GRID) + OFFSET_X) * PITCH}
                        y={(Math.floor(i / GRID) + OFFSET_Y) * PITCH}
                        width={CELL}
                        height={CELL}
                        rx={3}
                        fill="var(--color-accent)"
                        opacity={0.18 + level * 0.2}
                      />
                    ),
                  )}
                </g>
              ))}
            </svg>

            {/* Falls off at the edges so the field has no hard boundary and
                genuinely reads as continuing past the frame. */}
            <div className="riggit-canvas-vignette absolute inset-0" />
          </div>

          {/* Copy, floating over the field. */}
          <div className="relative mx-auto flex h-full max-w-[1080px] items-center px-6">
            <ol className="relative w-full">
              {BEATS.map((beat, index) => (
                <li
                  key={beat.key}
                  className="riggit-canvas-beat absolute inset-x-0 top-1/2 text-center"
                  style={windowFor(index)}
                >
                  <h3 className="mx-auto max-w-[20ch] text-[clamp(1.9rem,5vw,3.2rem)] leading-[1.04] font-medium tracking-[-0.035em] text-balance text-ink">
                    {beat.title}
                  </h3>
                  <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-secondary">
                    {beat.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
