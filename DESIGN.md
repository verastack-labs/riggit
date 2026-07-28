---
name: Riggit
description: Commit at any date and time — own your GitHub timeline.
colors:
  page-bg: "#0A0B0A"
  sidebar-bg: "#0E100E"
  panel-bg: "#12140F"
  input-bg: "#171A18"
  border: "#23261F"
  border-strong: "#33382F"
  text-primary: "#EEF0EC"
  text-secondary: "#A6ACA3"
  text-muted: "#5F665F"
  accent: "#35D08C"
  accent-dim-bg: "#173324"
  accent-on-dim: "#3FD992"
typography:
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "10.5px"
    fontWeight: 600
    letterSpacing: "0.09em"
  display:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 4.75rem)"
    fontWeight: 500
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.2rem)"
    fontWeight: 500
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.6
  site-body:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.6
  wordmark:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    letterSpacing: "-0.02em"
  ui:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  ui-compact:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  caption:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
  caption-mono:
    fontFamily: "var(--font-geist-mono), ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 400
rounded:
  control: "8px"
  field: "10px"
  card: "12px"
  modal: "14px"
  pill: "20px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "34px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#06170F"
    rounded: "{rounded.field}"
    padding: "11px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.field}"
    padding: "10px 18px"
  input-field:
    backgroundColor: "{colors.input-bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.field}"
    padding: "11px 14px"
---

# Design System: Riggit

## Overview

**Creative North Star: "The Quiet Terminal"**

Riggit's UI is built to disappear into the work. It borrows the register of Arc, Linear, and Raycast — near-black surfaces, a single restrained accent, tight radii — rather than the workshop density of GitHub Desktop or Sourcetree. This isn't a Git client with panels and diffs; it's one focused action (commit, at any date) presented with enough calm that the user trusts it immediately. The app should feel worth paying for within five seconds of opening it, per the product's own principle — that means no visual noise competing with the commit form itself.

This direction was chosen after comparison against three alternates (glassmorphic, neo-brutalist, minimal) built during design exploration. Established won because it best matches the "quiet, confident tool" register the product needs, and because a loud or maximalist surface would work against a product whose entire value proposition depends on the user trusting it immediately.

**Key Characteristics:**

- Near-black surfaces stepped in three tones (page, sidebar, panel/input), never pure black
- One accent color only — a refined emerald, not GitHub's raw contribution-graph green
- Tight 8–12px radii on controls and cards; full pills only for status chips and badges
- Uppercase, letter-spaced micro-labels do the section-labeling work instead of borders or dividers
- Dark-first is a firm constraint, not a default — no light mode ships in V1 (see Do's and Don'ts)

## Colors

A near-monochrome dark palette with a single accent carrying all emphasis — a Restrained color strategy, not a full palette or drenched surface.

### Primary

- **Page black** (`#0A0B0A`): the base app window background.
- **Sidebar black** (`#0E100E`): one step lighter than page black, separates the repo/nav rail from the main panel without a visible border doing all the work.
- **Panel/input black** (`#12140F` / `#171A18`): cards, text inputs, modals — the surface directly under interactive content.

### Accent

- **Signal emerald** (`#35D08C`): the only saturated color in the system. Used for the commit button fill, active toggle states, trial progress fill, and the brand mark. Deliberately not GitHub's raw `#39D353` — desaturated slightly for a premium register rather than a literal graph-green callback.
- **Emerald dim** (`#173324` bg / `#3FD992` text): the tinted-background pairing used for avatar circles, the brand mark, and any small badge that needs the accent without full saturation.

### Neutral

- **Primary text** (`#EEF0EC`): headings, active state labels, primary content.
- **Secondary text** (`#A6ACA3`): supporting text — chip labels, identity email, field values.
- **Muted text** (`#5F665F`): section labels, placeholder text, disabled/inactive states.
- **Border** (`#23261F`): the only border color in the system at rest.

### Named Rules

**The One Accent Rule.** Emerald appears in exactly one saturation across the entire app — no lighter/darker variant is introduced for a second meaning. If a second signal color is ever needed (error, warning), it must be a genuinely different hue, never a shade of the accent.

## Typography

**Display/Body Font:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — the OS-native system stack.

**Character:** Quiet and functional. This is an Operate-mode surface (a tool that gets used, not read or persuaded by), so the system stack is the honest choice — the same reasoning Linear and Raycast apply. A custom display face is worth revisiting once the brand has marketing surfaces (the landing page) that actually need a voice; the app itself does not.

### Hierarchy

- **Title** (500, 18px, -0.01em): screen/repo title in the top bar.
- **Body** (400/500, 13–14.5px): field values, commit message text, settings rows.
- **Label** (600, 10.5px, +0.09em, uppercase): section headers ("REPOSITORIES", "COMMIT MESSAGE") and field labels ("DATE", "TIME"). Never used for anything longer than 1–2 words.
- **Caption** (400, 11.5–12px): metadata — branch name, repo meta, trial counter, timestamps.

### Named Rules

**The Label, Not Divider Rule.** Sections are separated by an uppercase tracked label plus whitespace, not by a rule/divider line. A visible divider is only introduced where content itself needs a hard boundary (e.g. between a card's rows).

### Landing page type scale

The ramp above belongs to the app, an Operate surface where nothing needs to be larger than a screen title. The landing page is a Persuade surface and needs a display scale the app has no use for. This section documents that scale rather than letting marketing sizes drift as one-offs.

The typeface also differs on purpose: the app uses the OS system stack, the site uses Geist, self-hosted. That is the "custom display face worth revisiting once the brand has marketing surfaces" noted above, and this is that surface.

| Step | Size | Use |
|---|---|---|
| Display | `clamp(2.6rem, 7vw, 4.75rem)`, 500, -0.035em | The hero headline, once per site |
| Page title | `clamp(2rem, 5vw, 3.2rem)`, 500, -0.03em | The h1 on every other route |
| Lead | 16.5px, 400 | The paragraph directly under a headline |
| Body | 15.5px, 400 | Running copy |
| UI | 13.5px, 400 | Navigation, controls, footer links |
| Caption | 12.5px, 400 | Supporting notes, trial terms |
| Micro label | 10.5px, 600, +0.09em, uppercase | Section labels, carried over from the app |

Tracking tightens as size grows and never passes -0.04em. The wordmark sits at 15px, between UI and lead, because it is a logotype rather than text.

**The One Accent Rule still holds.** The contribution grid's intensity ramp is not an exception to it: contribution graphs have intensity by nature, and that ramp stays confined to grid cells. It is never borrowed for buttons, borders, or text.

## Layout

Two-pane shell: a fixed 236px sidebar (repository list or settings nav) and a flexible main panel (34px/40px padding) holding the active screen's content. This shell is reused across every screen — the Settings screen swaps the sidebar's content (repo list → settings nav) rather than introducing a different shell.

Vertical rhythm inside the main panel groups related fields tightly (label sits 9px above its field) and separates unrelated groups generously (22–26px between field groups, matching the spacing scale's `lg` step). Modals and overlays center within the app window rather than the full screen, at a fixed 380px width.

## Elevation & Depth

Flat by design — no drop shadows on in-flow surfaces. Depth is conveyed entirely through the three-step background stepping (page → sidebar → panel) and 1px borders, not shadow. The one exception is the outer app-window frame itself against its OS chrome, which carries a soft ambient shadow to read as a floating window.

### Named Rules

**The Flat Surface Rule.** No card, input, or panel casts a shadow at rest. If a future interaction needs to signal "this is above everything else" (a toast, a dropdown menu), that's the only place a shadow is earned.

## Shapes

Controls (buttons, inputs, toggles) use 8–10px radii — soft enough to feel considered, tight enough to stay serious. Cards and modals step up to 12–14px. Full pills (`20px`+ / fully rounded) are reserved for status chips (branch name, trial state, plan badge) — anything that reads as a small tag rather than a container. Borders are always 1px, full 4-sided; no single-sided accent borders.

## Components

### Buttons

- **Shape:** 10px radius (`{rounded.field}`).
- **Primary:** solid accent fill (`#35D08C`) with near-black text (`#06170F`) — the only filled-accent surface in the system. One primary button per screen (Commit, Activate, Save & continue).
- **Ghost:** transparent background, 1px border (`#23261F`), secondary text color — used for secondary actions (Deactivate) that shouldn't compete with the primary action.

### Toggles

- **Style:** 34×20px track, 16px knob. Off state: dark track (`#181C17`) with a light knob. On state: dim-emerald track (`#1E5C41`) with a full-emerald knob (`#35D08C`).
- **Placement:** sits immediately to the right of its label with a tight 9–10px gap, as a single inline unit — not spread to the far edge of its container. (Corrected during design review: an early draft placed the toggle at the row's far right via `justify-content: space-between`, which read as disconnected from its label and was mistaken for a missing checkbox.)

### Cards / Panels

- **Corner style:** 12px.
- **Background:** panel black (`#12140F`), 1px border (`#23261F`).
- **Shadow strategy:** none — see Elevation & Depth.
- **Internal padding:** 20–26px depending on content density (settings cards use 20/22px, modals use 26px).

### Inputs / Fields

- **Style:** input black background (`#171A18` for the commit message textarea, `#171A18`/`#12140F` for other fields), 1px border (`#23261F`), 10px radius.
- **Labels:** always the uppercase micro-label pattern, never inline placeholder-only fields.
- **Read state (date/time pickers):** rendered as a bordered field with a trailing chevron rather than a native `<select>` look — signals "tap to open a picker" without a dropdown arrow feeling like a raw HTML control.

### Chips / Badges

- **Style:** panel-black or transparent background, 1px border, full pill radius, 11.5px text.
- **Use:** branch name, license plan status, trial counter — anything that's a small piece of state rather than an action.

### Navigation (sidebar)

- **Repo list rows:** 8px radius, active row gets panel-black background (`#151815`); inactive rows are transparent with dimmer text.
- **Section labels:** uppercase micro-label pattern, 8px bottom margin before the list/content it introduces.

## Do's and Don'ts

### Do:

- **Do** keep the accent to a single saturation and hue across the entire app — no accent variants for secondary meanings.
- **Do** place toggle controls immediately adjacent to their label, not spread to a container's far edge.
- **Do** use the uppercase micro-label pattern for every section header and field label — it's the system's primary structuring device in the absence of dividers.
- **Do** keep every screen to one primary (filled) button; secondary actions are always ghost-style.

### Don't:

- **Don't** ship light mode in V1 — dark-first is a firm product constraint, not a placeholder default. (A light palette was explored and is recorded as a reference for future work: accent shifts to `#149A5D` for contrast on light surfaces, neutrals step through warm off-whites `#FAFAF7` / `#F2F3EE` rather than pure white/gray — see the Riggit project brief's Future Features section. Do not re-derive this from scratch when the time comes.)
- **Don't** introduce drop shadows on in-flow surfaces — depth comes from background stepping only.
- **Don't** use single-sided accent borders (`border-left` callouts) — borders are always 1px, 4-sided, or omitted.
- **Don't** reveal the underlying Git mechanism in any UI copy — this is a content rule as much as a visual one, and it's load-bearing for the product's positioning.
