import { ContributionGraph } from "@/components/contribution-graph";
import { brand } from "@/lib/brand";

/**
 * The hero puts the graph centre stage rather than the app UI, per the brief.
 * The graph is the outcome people care about; the app is only how they get it.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-[1080px] px-6 py-20 sm:py-28">
      <section className="flex flex-col items-center text-center">
        <span className="mb-6 rounded-pill border border-edge bg-panel px-3 py-1.5 text-[11.5px] tracking-[0.04em] text-ink-secondary uppercase">
          For developers who did the work
        </span>

        <h1 className="max-w-[680px] text-[clamp(2.1rem,5.5vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-ink">
          {brand.tagline}
        </h1>

        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-ink-secondary text-pretty">
          Commit at any date and time. Backfill the week you worked offline,
          the project you imported late, the day you forgot to push.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={brand.downloadUrl}
            className="rounded-field bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright"
          >
            Download for free
          </a>
          <a
            href="#pricing"
            className="rounded-field border border-edge px-6 py-3 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink"
          >
            See pricing
          </a>
        </div>

        <p className="mt-4 text-[12px] text-ink-muted">
          Three commits free. No account needed.
        </p>
      </section>

      <section
        aria-labelledby="graph-heading"
        className="mt-16 rounded-card border border-edge bg-panel p-6 sm:mt-20 sm:p-9"
      >
        <h2 id="graph-heading" className="sr-only">
          A contribution graph filling in its gaps
        </h2>
        <ContributionGraph />
        <p className="mt-6 text-center text-[12.5px] text-ink-muted">
          The same year, with the work you actually did put back where it
          happened.
        </p>
      </section>
    </main>
  );
}
