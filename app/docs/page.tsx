import type { Metadata } from "next";
import Link from "next/link";
import { DocLayout, DocSection, Steps } from "@/components/doc-layout";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Installing Riggit, making your first commit, how identity is resolved, managing your licence across devices, and what to do when something goes wrong.",
};

export default function Docs() {
  return (
    <DocLayout
      eyebrow="Documentation"
      title="Everything you need, and not much of it."
      lead="Riggit has one screen and one button, so this is short. Installing, a first commit, how your name and email get chosen, moving your licence between machines, and what the error messages mean."
    >
      <DocSection id="install" heading="Installing">
        <p>
          Download the build for your platform from{" "}
          <Link
            href="/download"
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            the download page
          </Link>{" "}
          and open it. There is nothing to configure afterwards.
        </p>
        <p>
          Riggit needs Git already installed, because it drives yours rather
          than bundling its own. That is what keeps your SSH keys, credential
          helpers, hooks and remotes working untouched. If{" "}
          <code className="rounded bg-input px-1.5 py-0.5 font-mono text-[13.5px] text-ink">
            git --version
          </code>{" "}
          answers in your terminal, you are ready.
        </p>
        <p>
          The current builds are not code signed, so both macOS and Windows will
          question them on first open. The download page walks through each,
          and it is a one time step per machine.
        </p>
      </DocSection>

      <DocSection id="first-commit" heading="Your first commit">
        <Steps
          items={[
            "Add a repository. Use the plus button in the sidebar and pick the folder, or drag it onto the window. Pick the folder the repository lives in, not a folder inside it.",
            "Write a message. The same message you would have written at the time.",
            "Choose the date and the time. Both, not just the date. A backfilled week reads as a worked week because the commits land at plausible hours.",
            "Decide about staging. Stage all picks up everything that has changed. Leave it off and Riggit commits exactly what you have already staged yourself.",
            "Decide about pushing. Off by default. A commit is local until you say otherwise, and you can always push later from your terminal.",
            "Commit. The repository state above the button refreshes, and the commit is a completely ordinary Git commit from that moment on.",
          ]}
        />
        <p>
          Your first three commits are free and need no account. After that the
          app asks for a licence key.
        </p>
      </DocSection>

      <DocSection id="identity" heading="Name and email">
        <p>
          Commits carry an author, and Riggit works out yours rather than asking
          you to type it again. It looks in order: the repository&#39;s own Git
          config, then your global config, then the author of the last commit in
          that repository. It asks only when all three come up empty.
        </p>
        <p>
          Whatever it settles on is shown in Settings, per repository, so you
          can see what a commit will be attributed to before you make one. If
          you change it there you choose whether that applies to the one
          repository or to every repository on the machine, which is the same
          local and global distinction Git itself uses.
        </p>
        <p>
          Use the same email your Git host knows about. That is the one thing
          worth checking, because a commit authored under an address your host
          does not recognise will not be attributed to you, no matter what date
          it carries.
        </p>
      </DocSection>

      <DocSection id="licence" heading="Licence and devices">
        <p>
          One seat covers one device at a time. Activating on a machine claims
          the seat; releasing it from Settings frees it for another. There is no
          limit on how often you move, and no waiting period.
        </p>
        <p>
          Riggit checks the licence at launch and then leaves you alone. If it
          cannot reach the licence server it keeps working for seven days on the
          last successful check, so a bad connection or a flight does not lock
          you out of your own repositories.
        </p>
        <p>
          Cancelling stops the renewal. The app keeps working until the period
          you have paid for ends, then drops back to the free trial. Nothing is
          removed and no commit is affected: every commit Riggit has made is a
          normal Git commit and belongs to your repository, not to us.
        </p>
      </DocSection>

      <DocSection id="troubleshooting" heading="Troubleshooting">
        <p>
          <strong className="font-medium text-ink">
            That folder is not a Git repository.
          </strong>{" "}
          Riggit works on folders that Git already tracks. Run{" "}
          <code className="rounded bg-input px-1.5 py-0.5 font-mono text-[13.5px] text-ink">
            git init
          </code>{" "}
          in the folder, or pick the folder that contains the repository rather
          than one beside it.
        </p>
        <p>
          <strong className="font-medium text-ink">
            Another Git process seems to be running.
          </strong>{" "}
          Something else has the repository open, often an editor mid operation.
          Wait for it to finish and try again.
        </p>
        <p>
          <strong className="font-medium text-ink">
            Git refuses the repository as unsafe.
          </strong>{" "}
          Git will not operate on a repository owned by a different user
          account. This usually means the folder was copied from another machine
          or sits on an external drive. Git&#39;s own message names the command
          that fixes it.
        </p>
        <p>
          <strong className="font-medium text-ink">
            The commit worked but the push did not.
          </strong>{" "}
          That is a complete success followed by a separate failure, and Riggit
          says so rather than reporting the whole thing as broken. Your commit
          exists. Push it whenever you are back online, from Riggit or from your
          terminal.
        </p>
        <p>
          <strong className="font-medium text-ink">
            The commit is not showing on my profile.
          </strong>{" "}
          Two usual causes. The commit has not been pushed yet. Or its author
          email is not one your Git host has associated with your account, which
          you can check in your host&#39;s email settings.
        </p>
      </DocSection>

      <DocSection id="privacy" heading="What leaves your machine">
        <p>
          Your code does not. Riggit talks to exactly one server, the one that
          checks your licence, and that server is told nothing about which
          repositories you have opened or what is in them.
        </p>
        <p>
          The only other thing that goes anywhere is the push you explicitly
          asked for, to the remote you already had, over the connection Git was
          already using. The{" "}
          <Link
            href="/privacy"
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            privacy policy
          </Link>{" "}
          says the same thing at greater length.
        </p>
      </DocSection>

      <DocSection id="contact" heading="Still stuck">
        <p>
          Email{" "}
          <a
            href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
              `${brand.productName} support`,
            )}`}
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            support
          </a>{" "}
          with what you did, what you expected and what happened instead. If
          Riggit showed you an error, quoting it verbatim saves a round trip.
        </p>
      </DocSection>
    </DocLayout>
  );
}
