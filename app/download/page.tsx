import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroWash } from "@/components/hero-wash";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Riggit for macOS, Windows and Linux, with the install notes each platform needs. Three commits free, no account.",
};

const V = brand.latestVersion;

/**
 * Pinned to the exact tag rather than to `latest`.
 *
 * Asset filenames carry the version, so a `latest/download/Riggit_0.1.0_...`
 * link keeps working right up until the next release renames the file, and
 * then breaks for everybody at once. Pinning means the page and the binary it
 * describes always agree.
 */
const asset = (file: string) =>
  `https://github.com/verastack-labs/riggit/releases/download/v${V}/${file}`;

/**
 * One primary download per platform, with the rest as plain links beneath.
 *
 * Three equally weighted buttons on Linux would make somebody choose a
 * packaging format before they have decided they want the app. The common
 * answer is offered, and the other two stay one click away for people who know
 * they want them.
 */
const PLATFORMS = [
  {
    name: "macOS",
    detail: "Apple silicon and Intel, 11 Big Sur or later",
    primary: { label: "Download for macOS", file: `Riggit_${V}_universal.dmg` },
    alternates: [],
  },
  {
    name: "Windows",
    detail: "64 bit, Windows 10 or later",
    primary: {
      label: "Download for Windows",
      file: `Riggit_${V}_x64-setup.exe`,
    },
    alternates: [{ label: "MSI installer", file: `Riggit_${V}_x64_en-US.msi` }],
  },
  {
    name: "Linux",
    detail: "64 bit, WebKitGTK required",
    primary: { label: "Download .deb", file: `Riggit_${V}_amd64.deb` },
    alternates: [
      { label: "RPM package", file: `Riggit-${V}-1.x86_64.rpm` },
      { label: "AppImage, portable", file: `Riggit_${V}_amd64.AppImage` },
    ],
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

              <a
                href={asset(platform.primary.file)}
                className="mt-6 block rounded-field bg-accent px-4 py-2.5 text-center text-[13.5px] font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {platform.primary.label}
              </a>

              {platform.alternates.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {platform.alternates.map((alternate) => (
                    <li key={alternate.file}>
                      <a
                        href={asset(alternate.file)}
                        className="text-[13px] text-ink-secondary underline decoration-edge-strong underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-accent-bright"
                      >
                        {alternate.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 text-[13.5px] text-ink-secondary">
          Version {V}.{" "}
          <a
            href={brand.downloadUrl}
            className="text-accent-bright underline decoration-accent-track underline-offset-4 transition-colors duration-150 hover:decoration-accent-bright"
          >
            Release notes and checksums
          </a>
          .
        </p>
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
