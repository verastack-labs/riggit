import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroWash } from "@/components/hero-wash";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Riggit for macOS, Windows and Linux, with the install notes each platform needs. Three commits free, no account.",
};

/**
 * Whether builds exist to link to.
 *
 * A single flag rather than per platform, because the release pipeline cuts
 * all three from one tag: there is no state where macOS is published and
 * Windows is not, so three flags could only ever disagree by accident.
 *
 * When the first release lands this becomes true and the buttons link to
 * `brand.downloadUrl`. Until then they are inert, which is deliberate: a
 * button pointing at a releases page with nothing on it is worse than one that
 * says so plainly.
 */
const RELEASED = false;

const PLATFORMS = [
  {
    name: "macOS",
    detail: "Apple silicon and Intel, 11 Big Sur or later",
    file: ".dmg",
  },
  {
    name: "Windows",
    detail: "64 bit, Windows 10 or later",
    file: ".exe installer",
  },
  {
    name: "Linux",
    detail: "64 bit, WebKitGTK required",
    file: ".AppImage and .deb",
  },
];

export default function Download() {
  return (
    <main>
      <HeroWash>
        <section className="mx-auto max-w-[1080px] px-6 pt-14 pb-4 sm:pt-20">
          <span
            className="riggit-enter text-[10.5px] font-semibold tracking-[0.11em] text-ink-muted uppercase"
            style={{ "--enter-delay": "40ms" } as CSSProperties}
          >
            Download
          </span>

          <h1
            className="riggit-enter mt-6 max-w-[16ch] text-[clamp(2.4rem,6vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance text-ink"
            style={{ "--enter-delay": "110ms" } as CSSProperties}
          >
            Three commits{" "}
            <span className="riggit-gradient-text">free</span>. No account.
          </h1>

          <p
            className="riggit-enter mt-6 max-w-[54ch] text-[16.5px] leading-[1.6] text-ink-secondary text-pretty"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            Around four megabytes, installs in seconds, and needs nothing
            configured afterwards. Riggit uses the Git already on your machine.
          </p>
        </section>
      </HeroWash>

      <section
        aria-labelledby="platforms-heading"
        className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-14"
      >
        <h2 id="platforms-heading" className="sr-only">
          Builds
        </h2>

        {!RELEASED ? (
          /* Said once, at the top, rather than repeated on three cards. The
             cards below still show what is coming, because knowing your
             platform is covered is the thing most people came to check. */
          <p className="mb-6 rounded-card border border-edge bg-panel px-6 py-5 text-[15px] leading-[1.6] text-ink-secondary text-pretty">
            <strong className="font-medium text-ink">
              Not published yet.
            </strong>{" "}
            The first release is being cut. These are the builds it will
            include, and this page is where they will appear.
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col rounded-card border border-edge bg-panel px-6 py-7"
            >
              <h3 className="text-[16px] font-medium text-ink">
                {platform.name}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-ink-secondary">
                {platform.detail}
              </p>
              <p className="mt-1 font-mono text-[12px] text-ink-muted">
                {platform.file}
              </p>

              {/* Plain text, not a disabled button. A greyed control still
                  invites a click and then has to explain itself; a sentence
                  does the explaining first. */}
              <p className="mt-6 rounded-field border border-edge px-4 py-2.5 text-center text-[13px] text-ink-muted">
                Coming with the first release
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="opening-heading"
        className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
      >
        <h2
          id="opening-heading"
          className="max-w-[20ch] text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] font-medium tracking-[-0.03em] text-balance text-ink"
        >
          Opening it the first time.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.65] text-ink-secondary text-pretty">
          These builds are not code signed yet, so both macOS and Windows will
          ask about them once. Signing certificates cost money per year and are
          being deferred until Riggit has customers rather than charged to them
          in advance. This is what that decision costs you, stated plainly
          rather than left as a surprise after the download.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-edge bg-panel px-6 py-7">
            <h3 className="text-[16px] font-medium text-ink">macOS</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-ink-secondary text-pretty">
              Double clicking shows a message saying macOS cannot verify the app
              is free of malware. Open System Settings, then Privacy and
              Security, scroll to the Security section, and click Open Anyway
              beside Riggit&#39;s name. Confirm, and it opens normally from then
              on.
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-muted text-pretty">
              Older instructions elsewhere say to Control-click and choose Open.
              That route was removed in macOS Sequoia and no longer works.
            </p>
          </div>

          <div className="rounded-card border border-edge bg-panel px-6 py-7">
            <h3 className="text-[16px] font-medium text-ink">Windows</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-ink-secondary text-pretty">
              SmartScreen shows a blue dialog saying it protected your PC. Click
              More info, then Run anyway. That is the whole of it, and it
              happens once per download rather than every launch.
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-muted text-pretty">
              Linux has no equivalent step. An AppImage needs its executable bit
              set, which your file manager or{" "}
              <code className="rounded bg-input px-1.5 py-0.5 font-mono text-[13px] text-ink">
                chmod +x
              </code>{" "}
              will do.
            </p>
          </div>
        </div>
      </section>

      <section className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36">
        <div className="flex flex-col items-center border-t border-edge py-20 text-center">
          <h2 className="max-w-[22ch] text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-ink">
            Worth reading before you install.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="rounded-field border border-edge px-6 py-3 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Documentation
            </Link>
            <Link
              href="/product"
              className="rounded-field border border-edge px-6 py-3 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              What it will not do
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
