import type { Metadata } from "next";
import { DocLayout, DocSection } from "@/components/doc-layout";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Riggit collects, what it does not, and who else is involved. Your repositories and their contents never leave your machine.",
};

/**
 * A draft, and needs a lawyer's read before the site goes live.
 *
 * It is written from the architecture rather than from a template, which is
 * the only reason it can be this specific: the app talks to one endpoint, the
 * licence check, and the site is a static export with no analytics and no
 * server to log anything. A generic policy would have to hedge all of that
 * into meaninglessness, and hedging is precisely what a tool with write access
 * to someone's Git history cannot afford here.
 */
export default function Privacy() {
  return (
    <DocLayout
      eyebrow="Legal"
      title="Your repositories never leave your machine."
      lead="This is the short version and it is also the true version. Riggit is a desktop app that runs locally. The only thing it sends anywhere is a licence key, to check that it is valid."
      updated="29 July 2026"
    >
      <DocSection id="what-stays" heading="What never leaves your machine">
        <p>
          Your code. Your commit messages. The names and paths of your
          repositories. Your branches, remotes, history and diffs. Your Git
          name and email. None of it is transmitted, uploaded, logged or
          inspected, and none of it is stored anywhere except on your own disk
          where Git already keeps it.
        </p>
        <p>
          There is no telemetry, no analytics inside the app, no crash
          reporting service and no usage tracking. The list of repositories you
          have added is stored locally so the app can show it again next time,
          and it goes no further.
        </p>
      </DocSection>

      <DocSection id="what-is-sent" heading="What is sent, and where">
        <p>
          One thing: a licence check. When you activate Riggit, and once at each
          launch afterwards, it sends your licence key and an identifier for the
          device to our licensing provider so they can confirm the subscription
          is active and that the seat is not in use elsewhere.
        </p>
        <p>
          The device identifier is derived from your machine and exists only to
          count devices against a seat. It is not a name, an address or an
          account, and it cannot be used to identify you personally.
        </p>
        <p>
          If that check cannot be reached, Riggit continues working for seven
          days on the last successful result before asking again. It does not
          queue anything to send later.
        </p>
      </DocSection>

      <DocSection id="pushing" heading="Pushing">
        <p>
          When you turn on push, Riggit runs Git&#39;s own push against the
          remote your repository already has, using the credentials Git already
          uses. That traffic goes to your Git host, not to us, and it is the
          same traffic that pushing from your terminal produces. We never see
          it, and we are never told that it happened.
        </p>
      </DocSection>

      <DocSection id="payment" heading="Payment">
        <p>
          Payments are handled by Polar as merchant of record. They collect what
          they need to take the payment and issue an invoice, which typically
          means your email address, your billing country and your card details.
          Those card details go to their payment processor and are never seen by
          us.
        </p>
        <p>
          We receive from them only what is needed to support a subscription:
          that a licence exists, whether it is active, and the email address it
          belongs to.
        </p>
      </DocSection>

      <DocSection id="website" heading="This website">
        <p>
          These pages are static files served by GitHub Pages. There are no
          cookies, no analytics, no tracking pixels, no embedded third party
          scripts and no fonts fetched from anyone else&#39;s server. Nothing
          here follows you and there is no consent banner because there is
          nothing to consent to.
        </p>
        <p>
          GitHub serves the files and, like any web host, records the requests
          it receives. That is their logging, under their terms, and it happens
          for every site hosted there.
        </p>
      </DocSection>

      <DocSection id="rights" heading="Your data, and getting rid of it">
        <p>
          The only personal data connected to Riggit is what your payment
          carries: an email address and a billing record. You can ask for a copy
          of it, ask for it to be corrected, or ask for it to be deleted.
          Deleting it ends the subscription, since a licence with no owner
          cannot be supported.
        </p>
        <p>
          Nothing on your machine needs our involvement to remove. Uninstalling
          the app removes it, and every commit it made is an ordinary Git commit
          that belongs to your repository.
        </p>
        <p>
          Write to{" "}
          <a
            href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
              "Privacy request",
            )}`}
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            our privacy address
          </a>{" "}
          for any of the above.
        </p>
      </DocSection>

      <DocSection id="changes" heading="Changes">
        <p>
          If this policy changes in a way that affects what is collected, the
          date at the top changes with it. The commitment that your repositories
          stay on your machine is architectural rather than a policy choice, and
          it is not something a future version of this page will quietly
          reverse.
        </p>
      </DocSection>
    </DocLayout>
  );
}
