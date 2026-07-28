import Link from "next/link";
import { GapStrip } from "@/components/gap-strip";

const SCENARIOS = [
  {
    title: "You worked offline for a week",
    body: "A train, a flight, a place with no signal. The work happened. The graph says it did not.",
    gapStart: 4,
    gapLength: 4,
    seed: 3,
  },
  {
    title: "You imported an old project late",
    body: "Months of work landed in one commit on the day you finally initialised the repository.",
    gapStart: 2,
    gapLength: 7,
    seed: 7,
  },
  {
    title: "You forgot to push",
    body: "Committed locally, meant to push, did not. The day looks empty to anyone reading your profile.",
    gapStart: 9,
    gapLength: 2,
    seed: 11,
  },
];

/**
 * The problem, shown rather than listed.
 *
 * Each scenario carries a strip of contribution cells with a hole in it, which
 * is the shape of the problem in the product's own vocabulary. An icon beside
 * each row would have been decoration; this is evidence, and it keeps the
 * signature element present without repeating the hero at full size.
 */
export function ProblemSection() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-32 sm:pt-44"
    >
      <div>
        <h2
          id="problem-heading"
          className="max-w-[16ch] text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-ink"
        >
          Your GitHub does not tell the real story.
        </h2>
      </div>

      <ul className="mt-16 flex flex-col">
        {SCENARIOS.map((scenario) => (
          <li
            key={scenario.title}
            className="flex flex-col gap-5 border-t border-edge py-11 sm:flex-row sm:items-baseline sm:gap-12"
          >
            <GapStrip
              gapStart={scenario.gapStart}
              gapLength={scenario.gapLength}
              seed={scenario.seed}
            />
            <div className="sm:flex-1">
              <h3 className="text-[19px] font-medium tracking-[-0.015em] text-ink">
                {scenario.title}
              </h3>
              <p className="mt-2.5 max-w-[54ch] text-[15.5px] leading-[1.65] text-ink-secondary text-pretty">
                {scenario.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[15.5px] text-ink-secondary">
        <Link
          href="/product"
          className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
        >
          See exactly what Riggit does about it
        </Link>
      </p>
    </section>
  );
}

/**
 * Pricing on home is a teaser, not the ladder. The full tiers live on
 * `/pricing`; repeating them here would mean maintaining them twice, and the
 * tiers are precisely the sort of thing that changes.
 */
export function PricingTeaser() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <div className="rounded-card border border-edge bg-panel px-6 py-12 sm:px-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[38ch]">
            <h2
              id="pricing-heading"
              className="text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-ink"
            >
              Starts at{" "}
              <span className="text-accent-bright">&#36;1.99</span> a month.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-ink-secondary">
              The price you join at is the price you keep, permanently. The
              first 300 subscribers pay less than everyone who comes after, and
              they go on paying less.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/pricing"
              className="rounded-field bg-accent px-6 py-3 text-center text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See the tiers
            </Link>
            <Link
              href="/download"
              className="rounded-field border border-edge px-6 py-3 text-center text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Try three commits free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUESTIONS = [
  {
    q: "Is this allowed?",
    a: "Riggit sets the date on commits you make yourself, in repositories you already control. It never alters commits that already exist, never touches anyone else's history, and does nothing to a repository you have not opened in the app.",
  },
  {
    q: "Does it work with private repositories?",
    a: "Yes. Riggit uses the Git setup already on your machine, including your SSH keys, credential helpers, hooks and existing remotes. If you can push to a repository today, you can use Riggit with it.",
  },
  {
    q: "Do I have to give it access to my GitHub account?",
    a: "No. Riggit never asks for your account password and never signs in on your behalf. It talks to one server, the one that checks your licence, and nothing else. Your code never leaves your machine.",
  },
];

/**
 * Three questions only, and only the ones people hesitate over. The rest live
 * on `/docs`, billing questions on `/pricing`.
 *
 * Native `details` elements: keyboard accessible, findable by in-page search,
 * and functional before any JavaScript runs.
 */
export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <h2
        id="faq-heading"
        className="text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink"
      >
        Before you ask.
      </h2>

      <div className="mt-12 flex flex-col">
        {QUESTIONS.map((item) => (
          <details
            key={item.q}
            className="group border-t border-edge py-6 last:border-b"
          >
            <summary className="flex list-none items-center justify-between gap-6 text-[16px] font-medium text-ink marker:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="text-[18px] leading-none text-ink-muted transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.65] text-ink-secondary">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-[15.5px] text-ink-secondary">
        <Link
          href="/docs"
          className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
        >
          Read the documentation
        </Link>
      </p>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36">
      <div className="flex flex-col items-center border-t border-edge py-20 text-center">
        <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.03] font-medium tracking-[-0.03em] text-balance text-ink">
          Put the work back where it happened.
        </h2>
        <Link
          href="/download"
          className="mt-9 rounded-field bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download for free
        </Link>
        <p className="mt-4 text-[12.5px] text-ink-muted">
          Three commits free. No account needed.
        </p>
      </div>
    </section>
  );
}
