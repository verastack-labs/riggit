import type { ReactNode } from "react";

/**
 * The pool of light every page opens in.
 *
 * Two layers, because one is a blob and two are weather. The near one
 * brightens and dims; the far one drifts on a longer, deliberately unrelated
 * period, so the pair does not visibly repeat. Twelve against twenty three
 * seconds does not come back into phase for nearly five minutes.
 *
 * Shared rather than tuned per page. A house style that changes rhythm between
 * routes reads as three different sites, and the light is the one thing every
 * page opens with.
 *
 * `overflow-x-clip` is load-bearing, not tidiness. The layers are full width
 * and animate `transform`, so scaling or translating them pushes past the
 * viewport and raises a horizontal scrollbar that comes and goes on the
 * animation's own cycle. Clip rather than hidden, so the vertical axis stays
 * visible instead of becoming a scroll container.
 *
 * `isolate` keeps the negative z-index inside this subtree, well clear of the
 * sticky header.
 */
export function HeroWash({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-x-clip">
      <div
        aria-hidden="true"
        className="riggit-hero-lift pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] sm:h-[880px]"
      />
      <div
        aria-hidden="true"
        className="riggit-hero-drift pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] sm:h-[880px]"
      />
      {children}
    </div>
  );
}
