"use client";

import { useRef } from "react";
import { BEATS, GRID } from "@/lib/patterns";
import { useStep } from "@/lib/use-step";

/** Chunky, so the field reads as contribution squares at arm's length rather
 * than as a texture. Matches the pitch the panel demo uses. */
const CELL = 26;
const PITCH = 34;

/**
 * The variation: the grid stops being a panel and becomes the page.
 *
 * The resting field is a tiled CSS background rather than a fixed number of
 * cells, so it covers any viewport at any size and is always cut off by the
 * edges. That is the whole point: a surface continuing past the frame, not an
 * illustration sitting inside one.
 *
 * The lit cells are a small SVG centred on top, so the shapes stay in the
 * middle while the field runs to the edges. The page itself becomes the
 * contribution graph, and the graph is being written on.
 */
export function CanvasDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const step = useStep(trackRef, BEATS.length);
  const size = GRID * PITCH - (PITCH - CELL);

  return (
    <section className="riggit-canvas relative">
      <div ref={trackRef} className="riggit-canvas-track">
        <div className="riggit-canvas-stage">
          {/* Field only. The lit shape moved out of here and into the flow
              below, so nothing bright sits behind the words. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Tiles infinitely: no viewport is too wide for it. */}
            <div className="riggit-canvas-field absolute inset-0" />
            {/* Removes the hard edge so the field has no visible boundary. */}
            <div className="riggit-canvas-vignette absolute inset-0" />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1080px] flex-col items-center justify-center gap-10 px-6">
            <svg
              aria-hidden="true"
              className="riggit-canvas-shape shrink-0"
              width={size}
              height={size}
            >
              {BEATS.map((beat, index) => (
                <g
                  key={beat.key}
                  data-active={index === step}
                  className="riggit-canvas-layer"
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
                        opacity={0.4 + level * 0.15}
                      />
                    ),
                  )}
                </g>
              ))}
            </svg>

            <ol className="relative h-[13rem] w-full shrink-0">
              {BEATS.map((beat, index) => (
                <li
                  key={beat.key}
                  data-active={index === step}
                  className="riggit-canvas-beat absolute inset-x-0 top-0 text-center"
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
