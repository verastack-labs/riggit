import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroWash } from "@/components/hero-wash";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Riggit is a subscription, one seat per person. Early access is limited and the price rises as it fills, but the price you join at is the price you keep.",
};

/** What every tier includes. Listed once, since no tier withholds a feature. */
const INCLUDED = [
  "Unlimited commits",
  "Any date and time, down to the minute",
  "macOS, Windows and Linux",
  "One device per seat",
  "Every update, for as long as you subscribe",
];

/** The price the early tiers are measured against. Not sold at yet. */
const STANDARD = "4.99";

function Included() {
  return (
    <ul className="mt-7 flex flex-col gap-2.5">
      {INCLUDED.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-[14px] leading-[1.5] text-ink-secondary"
        >
          <span aria-hidden="true" className="mt-[7px] shrink-0 text-accent">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4.2 3.5 6.7 9 1.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The struck reference price beside the live one.
 *
 * `<s>` rather than a line-through class: the standard rate is genuinely no
 * longer the applicable price, which is what the element means. A screen
 * reader announcing it as struck is the correct reading and not an accident.
 */
function Price({ amount, note }: { amount: string; note: string }) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline gap-2.5">
        <s className="text-[17px] text-ink-muted decoration-ink-muted/70">
          &#36;{STANDARD}
        </s>
        <span className="text-[2.6rem] leading-none font-medium tracking-[-0.04em] text-ink tabular-nums">
          &#36;{amount}
        </span>
        <span className="text-[13.5px] text-ink-secondary">a month</span>
      </div>
      <p className="mt-2.5 text-[13px] text-ink-muted">{note}</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <main>
      <HeroWash>
        <section className="mx-auto max-w-[1080px] px-6 pt-14 pb-4 sm:pt-20">
          <span
            className="riggit-enter text-[10.5px] font-semibold tracking-[0.11em] text-ink-muted uppercase"
            style={{ "--enter-delay": "40ms" } as CSSProperties}
          >
            Pricing
          </span>

          <h1
            className="riggit-enter mt-6 max-w-[16ch] text-[clamp(2.4rem,6vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance text-ink"
            style={{ "--enter-delay": "110ms" } as CSSProperties}
          >
            The price you join at is the price you{" "}
            <span className="riggit-gradient-text">keep</span>.
          </h1>

          <p
            className="riggit-enter mt-6 max-w-[54ch] text-[16.5px] leading-[1.6] text-ink-secondary text-pretty"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            One seat per person, one device per seat. Early access is limited
            and the rate steps up as it fills, but it never steps up underneath
            someone who already joined.
          </p>
        </section>
      </HeroWash>

      <section
        aria-labelledby="tiers-heading"
        className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-14"
      >
        <h2 id="tiers-heading" className="sr-only">
          Tiers
        </h2>

        <div className="grid items-start gap-5 lg:grid-cols-3">
          {/* The only card on the site with a lit border. It marks the tier
              that expires; used on all three it would mark nothing. */}
          <div className="riggit-glow-border">
            <div className="px-7 py-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-medium text-ink">
                  Early access
                </h3>
                <span className="rounded-pill bg-accent-dim px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] text-accent-bright">
                  First 300
                </span>
              </div>

              <Price amount="1.99" note="Available now, while places last." />

              <Link
                href="/download"
                className="mt-8 block rounded-field bg-accent px-5 py-3 text-center text-sm font-medium text-accent-ink shadow-[0_0_34px_-10px_var(--color-accent)] transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get early access
              </Link>

              <Included />
            </div>
          </div>

          <div className="rounded-card border border-edge bg-panel px-7 py-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-medium text-ink">
                Early access, next
              </h3>
              <span className="rounded-pill border border-edge px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] text-ink-muted">
                After 300
              </span>
            </div>

            <Price
              amount="2.99"
              note="Where the rate goes once the first 300 are taken."
            />

            {/* No button. This tier cannot be bought yet, and a disabled
                control that looks like the one above it invites a click that
                does nothing. A plain sentence is more honest and less to
                explain. */}
            <p className="mt-8 rounded-field border border-edge px-5 py-3 text-center text-[13.5px] text-ink-muted">
              Still early. Still below standard.
            </p>

            <Included />
          </div>

          <div className="rounded-card border border-edge bg-panel px-7 py-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-medium text-ink">
                Teams and institutions
              </h3>
            </div>

            <div className="mt-6">
              <span className="text-[2.6rem] leading-none font-medium tracking-[-0.04em] text-ink">
                Let&#39;s talk
              </span>
              <p className="mt-2.5 text-[13px] text-ink-muted">
                Seats in bulk, invoiced, for a department or a company.
              </p>
            </div>

            {/* The address is not shown as text. It is a reserved placeholder
                until the agency domain exists, and a visible
                name@example.invalid reads as a broken page in a way a button
                does not. */}
            <a
              href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
                `${brand.productName} for teams`,
              )}`}
              className={cn(
                "mt-8 block rounded-field border border-edge px-5 py-3 text-center text-sm font-medium text-ink-secondary",
                "transition-colors duration-150 hover:border-edge-strong hover:text-ink",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              )}
            >
              Email us
            </a>

            <Included />
          </div>
        </div>

        <p className="mt-8 max-w-[62ch] text-[14px] leading-[1.6] text-ink-secondary text-pretty">
          &#36;{STANDARD} a month is what Riggit will cost once early access
          closes. Nobody has paid it yet, and nobody who joins before it opens
          ever will.
        </p>
      </section>

      <BillingNotes />
    </main>
  );
}

const NOTES = [
  {
    q: "Can I try it first?",
    a: "Three commits, free, with no account and no card. That is enough to point Riggit at a real repository and see a real commit land where you asked for it.",
  },
  {
    q: "What happens if I cancel?",
    a: "The app keeps working until the period you have paid for ends, then drops back to the free trial. Every commit you have already made is a normal Git commit and stays exactly where it is.",
  },
  {
    q: "Can I move it to another machine?",
    a: "Yes. A seat covers one device at a time, and you can release the current one from Settings and activate somewhere else. There is no limit on how often.",
  },
  {
    q: "Who takes the payment?",
    a: "Polar, as merchant of record. They handle the card, the invoice and the tax, and prices are presented in your own currency where they support it.",
  },
  {
    q: "Is the early access price really permanent?",
    a: "For as long as the subscription runs without a break. If you cancel and come back later, you rejoin at whatever the rate is then.",
  },
];

function BillingNotes() {
  return (
    <section
      aria-labelledby="billing-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <h2
        id="billing-heading"
        className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] font-medium tracking-[-0.03em] text-ink"
      >
        The details.
      </h2>

      <dl className="mt-10 flex flex-col">
        {NOTES.map((note) => (
          <div
            key={note.q}
            className="flex flex-col gap-2 border-t border-edge py-7 sm:flex-row sm:gap-12"
          >
            <dt className="text-[15.5px] font-medium text-ink sm:w-[19rem] sm:shrink-0">
              {note.q}
            </dt>
            <dd className="max-w-[56ch] text-[15px] leading-[1.65] text-ink-secondary text-pretty">
              {note.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
