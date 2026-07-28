"use client";

import { useRef } from "react";
import { BEATS, GRID, levelOpacity } from "@/lib/patterns";
import { slotFor, useStep } from "@/lib/use-step";

const CELL = 26;
const PITCH = 34;
const SIZE = GRID * PITCH - (PITCH - CELL);

/** Resting dimness of the base grid, varied so it reads as a real
 * contribution field rather than a blank lattice. */
const REST = ["#12170f", "#16241a", "#173324"];

function restFill(i: number): string {
  const n = Math.sin(i * 19.13 + 7.7) * 9371.3;
  return REST[Math.floor((n - Math.floor(n)) * REST.length)];
}

/**
 * The demo: copy holds fixed positions on one side while the contribution
 * grid lights patterns on the other.
 *
 * The section is only ever in one of its defined states. Scroll picks the
 * state; CSS transitions move between them on their own timing. Scroll-driven
 * animation was tried first and is the wrong tool here by construction: it
 * maps scroll straight onto progress, so pausing mid-scroll strands everything
 * mid-transition.
 *
 * The base grid is drawn once and never hidden. Each pattern paints only its
 * lit cells over the top, so the field stays visible underneath instead of
 * being replaced by a shape on a blank background.
 */
export function DemoSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const step = useStep(trackRef, BEATS.length);

  return (
    <section
      aria-labelledby="demo-heading"
      className="riggit-demo mx-auto mt-28 max-w-[1080px] px-6 sm:mt-36"
    >
      <h2 id="demo-heading" className="sr-only">
        How Riggit works
      </h2>

      <div ref={trackRef} className="riggit-demo-track">
        <div className="riggit-demo-stage flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-20">
          <ol className="riggit-demo-slots relative w-full lg:w-[46%]">
            {BEATS.map((beat, index) => (
              <li
                key={beat.key}
                data-slot={slotFor(index, step)}
                className="riggit-demo-beat absolute inset-x-0 top-1/2"
              >
                <span className="font-mono text-[11.5px] text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3.2vw,2.15rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-ink">
                  {beat.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-ink-secondary text-pretty">
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
                aria-label="A contribution grid lighting up to form an arrow, then a clock"
              >
                {/* Drawn once and never covered. */}
                {Array.from({ length: GRID * GRID }, (_, i) => (
                  <rect
                    key={i}
                    x={(i % GRID) * PITCH}
                    y={Math.floor(i / GRID) * PITCH}
                    width={CELL}
                    height={CELL}
                    rx={7}
                    fill={restFill(i)}
                  />
                ))}

                {BEATS.map((beat, index) => (
                  <g
                    key={beat.key}
                    data-active={index === step}
                    className="riggit-demo-layer"
                  >
                    {beat.cells.map((level, i) =>
                      level === 0 ? null : (
                        <rect
                          key={i}
                          x={(i % GRID) * PITCH}
                          y={Math.floor(i / GRID) * PITCH}
                          width={CELL}
                          height={CELL}
                          rx={7}
                          fill="var(--color-accent)"
                          opacity={levelOpacity(level)}
                        />
                      ),
                    )}
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
