import type { Metadata } from "next";
import Link from "next/link";
import { DocLayout, DocSection } from "@/components/doc-layout";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms covering your use of Riggit: what the licence allows, what it does not, and what happens when a subscription ends.",
};

/**
 * A draft, and needs a lawyer's read before the site goes live.
 *
 * Deliberately readable rather than defensive. The product's whole position is
 * that it is honest about what it does to your Git history, and terms written
 * to be skipped would undercut that on the one page where a careful buyer
 * actually looks.
 */
export default function Terms() {
  return (
    <DocLayout
      eyebrow="Legal"
      title="The terms, in language you can actually read."
      lead="By downloading or using Riggit you agree to what follows. It is short, and it is meant to be read rather than scrolled past."
      updated="29 July 2026"
    >
      <DocSection id="licence" heading="What your subscription gives you">
        <p>
          A subscription grants one person a personal, non-exclusive,
          non-transferable licence to use Riggit on one device at a time, for as
          long as the subscription is active. You may move that licence between
          your own machines as often as you like by releasing the current device
          from Settings.
        </p>
        <p>
          One seat is for one person. Sharing a licence key with someone else is
          the one use we would ask you not to make of it. If you need several,{" "}
          <Link
            href="/pricing"
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            seats in bulk
          </Link>{" "}
          exist for exactly that.
        </p>
        <p>
          You may not resell Riggit, rent it out, or take it apart to build a
          competing product from its parts.
        </p>
      </DocSection>

      <DocSection id="trial" heading="The free trial">
        <p>
          Three commits, no account, no card. It is there so you can point
          Riggit at a real repository and watch a real commit land before
          deciding. It is not time limited, and it does not expire.
        </p>
      </DocSection>

      <DocSection id="use" heading="What you use it for is yours">
        <p>
          Riggit sets the date on commits you make yourself, in repositories you
          control. It never alters a commit that already exists, never touches
          anyone else&#39;s history, and never acts on a repository you have not
          opened in the app.
        </p>
        <p>
          What you record in your own repository is your business, and we
          neither monitor it nor could if we wanted to. What we would ask is
          that you do not use it to misrepresent your work to someone who is
          relying on the record being accurate: an employer, a client, a court,
          an academic body. That is a matter between you and them, and nothing
          in this tool changes your obligations to anyone.
        </p>
        <p>
          You are responsible for having the right to commit to whatever
          repository you point Riggit at.
        </p>
      </DocSection>

      <DocSection id="billing" heading="Billing, renewal and cancellation">
        <p>
          Subscriptions are monthly and renew automatically until cancelled.
          Polar acts as merchant of record: they take the payment, issue the
          invoice and handle the tax.
        </p>
        <p>
          Cancel whenever you like, from the billing portal linked in your
          receipt. The app keeps working until the period you have paid for
          ends, then returns to the free trial. We do not pro-rate a part-used
          month.
        </p>
        <p>
          The rate you subscribe at stays yours for as long as the subscription
          runs without a break. Cancelling and rejoining later means rejoining
          at whatever the rate is then.
        </p>
        <p>
          If Riggit does not work for you, write to us within fourteen days of
          paying and you will get your money back. You do not need to explain
          why.
        </p>
      </DocSection>

      <DocSection id="warranty" heading="What we do not promise">
        <p>
          Riggit is provided as it is. We have tested it, we use it ourselves,
          and we still cannot promise it will be free of defects or available
          without interruption.
        </p>
        <p>
          To the extent the law allows, we are not liable for lost work, lost
          profits, or indirect or consequential damages, and any liability we do
          have is limited to what you paid us in the twelve months before the
          claim.
        </p>
        <p>
          Nothing here removes rights you have under consumer law where you
          live. Where this page and those rights conflict, those rights win.
        </p>
        <p>
          Riggit operates on your Git repositories. Keep backups and use
          remotes, as you would with any tool that writes to your work.
        </p>
      </DocSection>

      <DocSection id="ending" heading="Ending it">
        <p>
          You can stop using Riggit at any time by cancelling and uninstalling.
          We may end a licence if it is being shared against these terms or used
          to attack the licensing service, and we would refund the unused part
          if we did.
        </p>
        <p>
          Commits you have already made are unaffected either way. They are
          ordinary Git commits in your repository and they do not depend on us
          in any respect.
        </p>
      </DocSection>

      <DocSection id="changes" heading="Changes, and getting in touch">
        <p>
          These terms may change. The date at the top moves when they do, and a
          change that materially affects an active subscription will be sent to
          the email on it rather than quietly published here.
        </p>
        <p>
          Questions go to{" "}
          <a
            href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
              "Terms enquiry",
            )}`}
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            our address
          </a>
          . {brand.productName} is made by Verastack Labs.
        </p>
      </DocSection>
    </DocLayout>
  );
}
