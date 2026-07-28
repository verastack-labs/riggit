import Link from "next/link";
import { ContributionGraph } from "@/components/contribution-graph";
import { CanvasDemo } from "@/components/canvas-demo";
import {
  ClosingSection,
  FaqSection,
  PricingTeaser,
  ProblemSection,
} from "@/components/home-sections";
import { brand } from "@/lib/brand";

/**
 * Home is a showcase. Every section is a summary that anchors through to the
 * page carrying the detail, so nothing is stated in full twice.
 *
 * The hero puts the graph centre stage rather than the app UI, per the brief:
 * the graph is the outcome people care about, the app is only how they get it.
 */
export default function Home() {
  return (
    <main>
      {/* The opening and its proof share one wrapper so they sit in the same
          pool of light. Split across two bare sections they read as two
          unrelated boxes, and the graph, which is the whole argument, ends up
          dressed exactly like the pricing panel further down.

          `isolate` keeps the light's negative z-index inside this subtree, well
          clear of the sticky header.

          `overflow-x-clip` is load-bearing, not tidiness. The layers below are
          full width and animate `transform`, so scaling or translating them
          pushes past the viewport and raises a horizontal scrollbar that comes
          and goes on the animation's own cycle. Clip rather than hidden, so
          the vertical axis stays visible instead of becoming a scroll
          container. */}
      <div className="relative isolate overflow-x-clip">
        <div
          aria-hidden="true"
          className="riggit-hero-lift pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] sm:h-[880px]"
        />
        <div
          aria-hidden="true"
          className="riggit-hero-drift pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] sm:h-[880px]"
        />

        {/* Tighter at the top than the rhythm below it. The header is already
            64px of empty space, so the section's own padding is the second
            gap the eye crosses, not the first. */}
        <section className="mx-auto max-w-[1080px] px-6 pt-14 pb-16 sm:pt-20">
          <div className="flex flex-col items-center text-center">
            <span className="mb-7 text-[10.5px] font-semibold tracking-[0.11em] text-ink-muted uppercase">
              For developers who did the work
            </span>

            <h1 className="max-w-[15ch] text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.035em] text-balance text-ink">
              {brand.tagline}
            </h1>

            <p className="mt-6 max-w-[46ch] text-[16.5px] leading-[1.6] text-ink-secondary text-pretty">
              Commit at any date and time. Backfill the week you worked offline,
              the project you imported late, the day you forgot to push.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/download"
                /* The only button on the site carrying a glow. It sits inside
                   the lit area, and an unlit control in a lit room reads as
                   pasted on. Everywhere else the same button stays flat. */
                className="rounded-field bg-accent px-6 py-3 text-sm font-medium text-accent-ink shadow-[0_0_34px_-10px_var(--color-accent)] transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Download for free
              </Link>
              <Link
                href="/pricing"
                className="rounded-field border border-edge px-6 py-3 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                See pricing
              </Link>
            </div>

            <p className="mt-4 text-[12.5px] text-ink-muted">
              Three commits free. No account needed.
            </p>
          </div>
        </section>

        {/* The one authored moment on the page. Everything else stays still so
            this reads as the proof rather than as another effect. */}
        <section
          aria-labelledby="graph-heading"
          className="mx-auto max-w-[1080px] px-6"
        >
          <h2 id="graph-heading" className="sr-only">
            A contribution graph filling in its gaps
          </h2>

          <figure className="rounded-card border border-edge bg-panel p-6 sm:p-10">
            <div className="mb-7 flex items-baseline justify-between gap-4">
              <span className="text-[10.5px] font-semibold tracking-[0.09em] text-ink-muted uppercase">
                Last 26 weeks
              </span>
              <span className="font-mono text-[11.5px] text-ink-muted">
                the gaps fill in
              </span>
            </div>

            <ContributionGraph />

            <figcaption className="mt-8 text-center text-[13px] leading-relaxed text-ink-secondary">
              The same six months, with the work you actually did put back where
              it happened.
            </figcaption>
          </figure>
        </section>
      </div>

      <ProblemSection />
      <CanvasDemo />
      <PricingTeaser />
      <FaqSection />
      <ClosingSection />
    </main>
  );
}
