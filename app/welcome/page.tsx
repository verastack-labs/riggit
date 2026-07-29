import type { Metadata } from "next";
import Link from "next/link";
import { DocLayout, DocSection, Steps } from "@/components/doc-layout";
import { OrderReference } from "@/components/order-reference";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Your subscription is active. Here is how to get started.",
  // Not a page anyone should arrive at from a search result. It only makes
  // sense immediately after a purchase, and indexing it would put a
  // confirmation page in front of people who have not bought anything.
  robots: { index: false, follow: false },
};

/**
 * Where checkout sends people once payment succeeds.
 *
 * It cannot show the licence key. This is a static export with no server, so
 * there is nothing here that could ask the payment provider who just bought
 * what. That turns out not to matter: the key arrives by email either way, and
 * a page that tried to display it would be a page that fails when the request
 * does.
 *
 * What it can do is the thing an email is bad at, which is telling someone in
 * order what to do next while they still have the momentum of having just
 * paid.
 */
export default function Welcome() {
  return (
    <DocLayout
      eyebrow="You are in"
      title="Thank you. Here is what happens next."
      lead="Your subscription is active. Your licence key is on its way to the email address you paid with, and it usually arrives within a minute."
    >
      <DocSection id="getting-started" heading="Getting started">
        <Steps
          items={[
            "Check your email for the licence key. If it is not there in a few minutes, look in spam before assuming something went wrong.",
            "Download Riggit for your platform and install it. The first open needs one extra step on macOS and Windows, which the download page walks through.",
            "Open the app, paste your key, and activate. That is the last time you will be asked for it on this machine.",
          ]}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/download"
            className="rounded-field bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Download Riggit
          </Link>
          <Link
            href="/docs"
            className="rounded-field border border-edge px-6 py-3 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Read the docs
          </Link>
        </div>
      </DocSection>

      <DocSection id="your-seat" heading="What your seat covers">
        <p>
          One device at a time. Activating claims the seat, and releasing it
          from Settings frees it for another machine. There is no limit on how
          often you move it and no waiting period, so a new laptop is not a
          support ticket.
        </p>
        <p>
          The rate you joined at is yours for as long as the subscription runs
          without a break. It does not go up underneath you when the early
          tiers close.
        </p>
      </DocSection>

      <DocSection id="billing" heading="Billing and receipts">
        <p>
          Your receipt comes from Polar, who handle the payment, the invoice and
          the tax as merchant of record. The same email carries a link to their
          billing portal, which is where you change a card, download an invoice
          or cancel. Cancelling leaves the app working until the period you have
          paid for ends.
        </p>
      </DocSection>

      <DocSection id="help" heading="If something is wrong">
        <p>
          If the key has not arrived, or it will not activate, email{" "}
          <a
            href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
              `${brand.productName} activation`,
            )}`}
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            support
          </a>
          . Quoting the order reference below, if you can see one, saves a round
          trip.
        </p>
        <OrderReference />
      </DocSection>
    </DocLayout>
  );
}
