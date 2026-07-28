import Link from "next/link";

const CAPABILITIES = [
  {
    title: "Any date, any time",
    body: "Down to the minute, not just the day. A week you backfill looks like a week you worked, because the commits land at the hours you would have been working.",
  },
  {
    title: "The Git you already have",
    body: "Riggit drives the Git on your machine. Your SSH keys, credential helpers, hooks, aliases and remotes all apply, unchanged. If you can push to a repository today, you can use Riggit with it.",
  },
  {
    title: "Stage and push in the same step",
    body: "Two toggles beside the commit button. Leave them off and Riggit commits exactly what you have already staged, and leaves the pushing to you.",
  },
  {
    title: "Identity, settled once",
    body: "Riggit reads the name and email your repository already commits under, falls back to your global config, then to your last commit. It asks only when there is genuinely nothing to find.",
  },
  {
    title: "Offline is a normal state",
    body: "A commit is local. If the push fails because you are on a train, the commit still stands and Riggit tells you exactly that, rather than reporting the whole thing as a failure.",
  },
];

/**
 * What the product is, before what it refuses to do.
 *
 * Rows rather than cards. Five feature cards in a grid would give every item
 * the same weight and turn the page into a comparison table, which is the
 * shape of a spec sheet rather than of an explanation.
 */
export function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <h2
        id="capabilities-heading"
        className="max-w-[18ch] text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-ink"
      >
        A small app that does one thing properly.
      </h2>

      <ul className="mt-14 flex flex-col">
        {CAPABILITIES.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-2 border-t border-edge py-9 sm:flex-row sm:gap-12"
          >
            <h3 className="text-[17px] font-medium tracking-[-0.015em] text-ink sm:w-[15rem] sm:shrink-0">
              {item.title}
            </h3>
            <p className="max-w-[58ch] text-[15.5px] leading-[1.65] text-ink-secondary text-pretty">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const BOUNDARIES = [
  {
    title: "It never rewrites history",
    body: "Riggit only ever creates new commits. It does not amend, rebase, squash or force anything, and a commit that already exists is left exactly as it is.",
  },
  {
    title: "It never touches a repository you have not opened",
    body: "Nothing happens in the background and nothing is scanned. Riggit works on the repositories you have added, one at a time, when you press the button.",
  },
  {
    title: "It never asks for your GitHub account",
    body: "No password, no OAuth, no token. Riggit talks to exactly one server, the one that checks your licence, and that server never learns which repositories you have or what is in them.",
  },
  {
    title: "Your code never leaves your machine",
    body: "The only thing that goes anywhere is the push you asked for, to the remote you already had, over the connection Git already uses.",
  },
];

/**
 * The trust section, and the reason this page exists at all.
 *
 * A tool that writes to your Git history has to say what it will not do
 * before anyone will let it near a real repository, and it has to say it in
 * the negative. "Safe" is a claim; "never amends, rebases or force pushes" is
 * something a reader can check.
 *
 * Panelled, unlike the rows above, because these are the four sentences most
 * worth stopping on.
 */
export function BoundariesSection() {
  return (
    <section
      aria-labelledby="boundaries-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <h2
        id="boundaries-heading"
        className="max-w-[20ch] text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-ink"
      >
        And a longer list of things it will not do.
      </h2>
      <p className="mt-5 max-w-[56ch] text-[15.5px] leading-[1.6] text-ink-secondary text-pretty">
        Riggit writes to your Git history. That is worth being precise about,
        so here is the boundary, stated as what cannot happen rather than as a
        promise that everything is fine.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {BOUNDARIES.map((item) => (
          <li
            key={item.title}
            className="rounded-card border border-edge bg-panel px-6 py-7"
          >
            <h3 className="max-w-[24ch] text-[16px] leading-snug font-medium tracking-[-0.015em] text-balance text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-secondary text-pretty">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const REQUIREMENTS = [
  { label: "Git", value: "Any recent version, already installed" },
  { label: "macOS", value: "11 Big Sur or later" },
  { label: "Windows", value: "10 or later" },
  { label: "Linux", value: "A recent distribution with WebKitGTK" },
];

export function RequirementsSection() {
  return (
    <section
      aria-labelledby="requirements-heading"
      className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36"
    >
      <h2
        id="requirements-heading"
        className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] font-medium tracking-[-0.03em] text-ink"
      >
        What you need.
      </h2>

      <dl className="mt-9 flex flex-col">
        {REQUIREMENTS.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 border-t border-edge py-5 sm:flex-row sm:gap-12"
          >
            <dt className="font-mono text-[12.5px] text-ink-muted sm:w-[15rem] sm:shrink-0 sm:pt-0.5">
              {item.label}
            </dt>
            <dd className="text-[15.5px] text-ink-secondary">{item.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-9 max-w-[60ch] text-[15px] leading-[1.6] text-ink-secondary text-pretty">
        Riggit does not bundle its own copy of Git. It uses yours, which is
        what keeps your existing setup working and is why there is nothing to
        configure after installing.
      </p>
    </section>
  );
}

export function ProductClosing() {
  return (
    <section className="riggit-reveal mx-auto max-w-[1080px] px-6 pt-28 sm:pt-36">
      <div className="flex flex-col items-center border-t border-edge py-20 text-center">
        {/* No figure here on purpose. The price moves as the early tiers
            close, and a number in this headline would be a second place to
            forget to update. `/pricing` is the one that carries it. */}
        <h2 className="max-w-[20ch] text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.03] font-medium tracking-[-0.03em] text-balance text-ink">
          Try it on a repository you already have.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/download"
            className="rounded-field bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Download Riggit
          </Link>
          <Link
            href="/pricing"
            className="rounded-field border border-edge px-7 py-3.5 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:border-edge-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            See pricing
          </Link>
        </div>
        <p className="mt-4 text-[12.5px] text-ink-muted">
          No account needed. Nothing to configure.
        </p>
      </div>
    </section>
  );
}
