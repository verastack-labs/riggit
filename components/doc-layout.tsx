import type { CSSProperties, ReactNode } from "react";
import { HeroWash } from "@/components/hero-wash";

/**
 * The shell every reading page uses: docs, terms, privacy.
 *
 * These pages are read rather than looked at, so they get a single measured
 * column and none of the full-width composition the marketing pages use. The
 * hero light stays, because a page that opens differently from the rest of the
 * site reads as belonging to a different one, and the legal pages are exactly
 * where that impression is least affordable.
 */
export function DocLayout({
  eyebrow,
  title,
  lead,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  /** Absolute, never "recently". A relative date rots the moment it is read. */
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main>
      <HeroWash>
        <section className="mx-auto max-w-[1080px] px-6 pt-14 pb-4 sm:pt-20">
          <span
            className="riggit-enter text-[10.5px] font-semibold tracking-[0.11em] text-ink-muted uppercase"
            style={{ "--enter-delay": "40ms" } as CSSProperties}
          >
            {eyebrow}
          </span>

          <h1
            className="riggit-enter mt-6 max-w-[18ch] text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-ink"
            style={{ "--enter-delay": "110ms" } as CSSProperties}
          >
            {title}
          </h1>

          <p
            className="riggit-enter mt-6 max-w-[58ch] text-[16.5px] leading-[1.6] text-ink-secondary text-pretty"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            {lead}
          </p>

          {updated ? (
            <p
              className="riggit-enter mt-6 font-mono text-[12px] text-ink-muted"
              style={{ "--enter-delay": "270ms" } as CSSProperties}
            >
              Last updated {updated}
            </p>
          ) : null}
        </section>
      </HeroWash>

      <div className="mx-auto max-w-[1080px] px-6 pb-8">{children}</div>
    </main>
  );
}

/**
 * One section of a reading page.
 *
 * The id is required rather than optional. Every section here is something
 * someone will want to link a colleague straight to, and an anchor that exists
 * only where somebody remembered to add one is worse than none at all: the
 * footer already links to `/docs#troubleshooting`.
 */
export function DocSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      /* Offsets the anchor from under the sticky header, which would otherwise
       * cover the heading of whatever section was just jumped to. */
      className="riggit-reveal scroll-mt-24 border-t border-edge pt-14 pb-4 sm:pt-16"
    >
      <h2
        id={id}
        className="text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink"
      >
        {heading}
      </h2>
      <div className="mt-6 flex max-w-[68ch] flex-col gap-4 text-[15.5px] leading-[1.7] text-ink-secondary">
        {children}
      </div>
    </section>
  );
}

/** A numbered walkthrough. Numbered because the order genuinely matters. */
export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-4">
          <span className="mt-[3px] shrink-0 font-mono text-[12px] text-ink-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ol>
  );
}
