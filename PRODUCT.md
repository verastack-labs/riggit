# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

(Tauri desktop app — UI is built with web technology (React/HTML/CSS) rendered in a native shell, so the design language is web, not native OS chrome, for macOS/Windows/Linux.)

## Users

Primary: individual developers (indie devs, freelancers, students) who want control over when their Git commits appear to have been made — most often to fix or curate their GitHub contribution graph after the fact (forgot to commit, worked offline, imported an old project).

Secondary, now an active go-to-market target: cohorts of students at coding bootcamps (e.g. Kodnest), where the institution buys seat-based access for the cohort. These users are typically building a GitHub graph as a portfolio signal for job applications.

## Product Purpose

Riggit is a desktop app that lets developers commit to Git at any date and time, through a polished UI over Git's native (but little-known) `GIT_AUTHOR_DATE` / `GIT_COMMITTER_DATE` mechanism. It exists to give developers ownership over their GitHub contribution graph. Success is the user feeling they've unlocked something that "wasn't supposed to be possible," and their graph reflecting the story they want it to tell.

## Positioning

A **GitHub contribution graph curator** — not a Git client, not competing with GitHub Desktop/Fork/Sourcetree. Core claim: "Own your GitHub timeline."

**Hard brand commitment:** the underlying mechanism (native Git env vars) is deliberately never named to the user. Sold as a discovery, not a wrapper. Must never say "Git already supports this," "we wrapped environment variables," or "this is just GIT_AUTHOR_DATE."

## Operating Context

Solo desktop use — a developer opens the app after (or instead of) using their normal Git workflow, on a repo already checked out locally, to log a commit with a custom date/time, optionally pushing after. Also used to backfill history on a freshly-imported old project, or after working offline for a stretch.

Institutional context: bootcamp students use it toward a portfolio-worthy GitHub graph for job hunting; access is licensed per-seat to the purchasing institution rather than self-serve per student.

## Capabilities and Constraints

- Cross-platform desktop app (macOS, Windows, Linux) via Tauri; all Git operations shell out to the system `git` binary
- Core flow: repository list → stage/commit-message/custom-date-time input → commit (optionally push)
- Git identity detection/verification, matched against the email linked to the user's GitHub account (critical — a mismatched email means commits silently don't appear on the graph)
- Usage-based free trial: 3 commits, then paywall
- Licensing via Polar: consumer subscription (tiered pricing) and a separate institutional seat-based product; one device per license/seat; 7-day offline grace period
- V1 is dark-first only — no light mode (a light palette was explored and is recorded in DESIGN.md's reference notes, but is explicitly out of V1 scope)

## Brand Commitments

- Product name: **Riggit** (bundle id `com.rigan.riggit`) — double meaning: founder's name "Rig" + "rigging" (as in rigging your Git history)
- "**Chrono**" retained as tagline/marketing language (timeline/time-travel framing), not the product name
- Core tagline: "Own your GitHub timeline."
- Agency umbrella: Verastack Labs (GitHub org `verastack-labs`)
- Dark-first UI is a firm V1 constraint
- Visual direction is resolved — see DESIGN.md: near-black surfaces, single emerald accent, Arc/Linear/Raycast register. Chosen over glassmorphic, neo-brutalist, and minimal alternates that were compared during design exploration.

## Evidence on Hand

None. This is a pre-build project — no real screenshots, testimonials, usage data, or customer logos exist yet. Do not fabricate any for mockups or copy.

## Product Principles

1. The underlying mechanism must never be surfaced to the user — sold as a discovery, not a wrapper.
2. The GitHub contribution graph is the emotional payoff; the app is the means, not the star.
3. The app should feel worth paying for within five seconds of opening it.
4. Minimal, high density of craft over feature breadth — V1 scope is intentionally frozen.
