---
name: Riggit
description: Commit at any date and time. Own your GitHub timeline.
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
  nav-sheet:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    letterSpacing: "-0.03em"
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

## How this document is structured

Riggit has two design surfaces and they are not the same job. The app is an **Operate** surface where someone completes a task; this site is a **Persuade** surface where someone decides. A single rulebook serving both produces either a shouty app or a timid landing page.

So the system is split:

- **Foundations** live in `docs/design-foundations.md` in riggit-internal and are canonical: colour, shape, elevation, motion principles, the brand mark. Those sections are mirrored below because the design detector needs a machine-readable block next to the code it checks. **Change them at the source first**, then propagate.
- **Everything else in this file is specific to the website** and is owned here. The type scale, layout and components below have no bearing on the app.

Sections are tagged `[shared]` or `[site]` accordingly.

## Overview

**Creative North Star: "The Quiet Terminal"**

Riggit's UI is built to disappear into the work. It borrows the register of Arc, Linear, and Raycast (near-black surfaces, a single restrained accent, tight radii) rather than the workshop density of GitHub Desktop or Sourcetree. This isn't a Git client with panels and diffs; it's one focused action (commit, at any date) presented with enough calm that the user trusts it immediately. The app should feel worth paying for within five seconds of opening it, per the product's own principle, which means no visual noise competing with the commit form itself.

This direction was chosen after comparison against three alternates (glassmorphic, neo-brutalist, minimal) built during design exploration. Established won because it best matches the "quiet, confident tool" register the product needs, and because a loud or maximalist surface would work against a product whose entire value proposition depends on the user trusting it immediately.

**Key Characteristics:**

- Near-black surfaces stepped in three tones (page, sidebar, panel/input), never pure black
- One accent color only, a refined emerald, not GitHub's raw contribution-graph green
- Tight 8–12px radii on controls and cards; full pills only for status chips and badges
- Uppercase, letter-spaced micro-labels do the section-labeling work instead of borders or dividers
- Dark-first is a firm constraint, not a default. No light mode ships in V1 (see Do's and Don'ts)

## Colors [shared]

A near-monochrome dark palette with a single accent carrying all emphasis: a Restrained color strategy, not a full palette or drenched surface.

### Primary

- **Page black** (`#0A0B0A`): the base app window background.
- **Sidebar black** (`#0E100E`): one step lighter than page black, separates the repo/nav rail from the main panel without a visible border doing all the work.
- **Panel/input black** (`#12140F` / `#171A18`): cards, text inputs, modals. The surface directly under interactive content.

### Accent

- **Signal emerald** (`#35D08C`): the only saturated color in the system. Used for the commit button fill, active toggle states, trial progress fill, and the brand mark. Deliberately not GitHub's raw `#39D353`, desaturated slightly for a premium register rather than a literal graph-green callback.
- **Emerald dim** (`#173324` bg / `#3FD992` text): the tinted-background pairing used for avatar circles, the brand mark, and any small badge that needs the accent without full saturation.

### Neutral

- **Primary text** (`#EEF0EC`): headings, active state labels, primary content.
- **Secondary text** (`#A6ACA3`): supporting text: chip labels, identity email, field values.
- **Muted text** (`#5F665F`): section labels, placeholder text, disabled/inactive states.
- **Border** (`#23261F`): the only border color in the system at rest.

### Named Rules

**The One Accent Rule.** Emerald appears in exactly one saturation across the entire app. No lighter or darker variant is introduced for a second meaning. If a second signal color is ever needed (error, warning), it must be a genuinely different hue, never a shade of the accent.

## Typography [site]

**Display/Body Font:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, the OS-native system stack.

**Character:** Quiet and functional. This is an Operate-mode surface (a tool that gets used, not read or persuaded by), so the system stack is the honest choice, the same reasoning Linear and Raycast apply. A custom display face is worth revisiting once the brand has marketing surfaces (the landing page) that actually need a voice; the app itself does not.

### Scale

The app's ramp stops at 18px because nothing in a tool needs to be larger than a screen title. This is a Persuade surface and needs a display scale the app has no use for.

The typeface also differs on purpose: the app uses the OS system stack, the site uses Geist, self-hosted. That is the "custom display face worth revisiting once the brand has marketing surfaces" noted above, and this is that surface.

| Step | Size | Use |
|---|---|---|
| Display | `clamp(2.6rem, 7vw, 4.75rem)`, 500, -0.035em | The hero headline, once per site |
| Page title | `clamp(2rem, 5vw, 3.2rem)`, 500, -0.03em | The h1 on every other route |
| Lead | 16.5px, 400 | The paragraph directly under a headline |
| Body | 15.5px, 400 | Running copy |
| Nav sheet | 30px, 500, -0.03em | Links in the full-screen mobile menu, where the row becomes the whole page |
| UI | 13.5px, 400 | Navigation, controls, footer links |
| Caption | 12.5px, 400 | Supporting notes, trial terms |
| Micro label | 10.5px, 600, +0.09em, uppercase | Section labels, carried over from the app |

Tracking tightens as size grows and never passes -0.04em. The wordmark sits at 15px, between UI and lead, because it is a logotype rather than text.

**The One Accent Rule still holds.** The contribution grid's intensity ramp is not an exception to it: contribution graphs have intensity by nature, and that ramp stays confined to grid cells. It is never borrowed for buttons, borders, or text.

## Layout [site]

A scrolling document, not a shell. Content sits in a 1080px measure centred with 24px gutters, which keeps body copy inside a comfortable 65 to 75 character line at the sizes above.

The header is sticky and 64px tall. At rest it is transparent and part of the page; once anything has scrolled behind it, it gains a 1px bottom border and a backdrop blur. That transition is the only place blur is used, and it is a specific effect rather than decoration.

Vertical rhythm runs on the shared spacing scale. Sections separate by 80 to 112px, more above a heading than below it, so a heading belongs to what follows it rather than floating between two blocks.

Home is a showcase: every section is a summary that anchors through to the page holding the detail. Nothing is stated in full twice.

## Elevation & Depth [shared]

Flat by design, with no drop shadows on in-flow surfaces. Depth is conveyed entirely through the three-step background stepping (page → sidebar → panel) and 1px borders, not shadow. The one exception is the outer app-window frame itself against its OS chrome, which carries a soft ambient shadow to read as a floating window.

### Named Rules

**The Flat Surface Rule.** No card, input, or panel casts a shadow at rest. If a future interaction needs to signal "this is above everything else" (a toast, a dropdown menu), that's the only place a shadow is earned.

## Shapes [shared]

Controls (buttons, inputs, toggles) use 8 to 10px radii, soft enough to feel considered and tight enough to stay serious. Cards and modals step up to 12–14px. Full pills (`20px`+ / fully rounded) are reserved for status chips (branch name, trial state, plan badge), anything that reads as a small tag rather than a container. Borders are always 1px, full 4-sided; no single-sided accent borders.

## Components [site]

### Buttons

- **Shape:** 10px radius (`{rounded.field}`).
- **Primary:** solid accent fill with `accent-ink` text, the only filled-accent surface. One per view.
- **Secondary:** transparent with a 1px `edge` border and secondary text, brightening its border and text on hover.

### Navigation

- **Active indicator:** a single element that slides between items rather than each item lighting on its own. Implemented as a CSS transition, not a keyframe animation, because transitions interpolate from the element's current position and therefore redirect mid-flight instead of restarting.
- **Rest position:** the active route. On mouse leave the indicator returns there; with no active route in the row it fades out rather than parking arbitrarily.
- **Brand mark:** sweeps once on hover. A sign the thing is alive, without a permanently spinning logo in the corner.

### Cards and figures

- **Corner style:** 12px, panel background, 1px `edge` border, no shadow.
- **Padding:** 24px, rising to 40px for the hero figure.
- **Never nested.** A card inside a card is always the wrong answer.

### The contribution grid

The site's one signature element. Cells are 11px with a 3px radius on a 15px pitch, using the intensity ramp described in the foundations. It appears in the hero filling its own gaps, and later as the sticky scrolling grid that forms patterns.

Its ramp is confined to the grid and is never borrowed by another component.

### Loaders

- **Circular:** the brand mark, animated, for route changes. Same component as the app's splash.
- **Linear:** contribution blocks lighting right to left for inline waits. The reversed direction restates the product at the smallest scale.

## Do's and Don'ts [site]

### Do:

- **Do** keep the accent to a single saturation, per the foundations. The contribution grid's ramp is the only intensity scale and it stays inside the grid.
- **Do** let home summarise and link. The moment a section starts explaining rather than showing, it belongs on its own page.
- **Do** keep body copy inside a 65 to 75 character measure.
- **Do** give every interactive element a visible keyboard focus ring. This surface is public, and the app's assumptions about its audience do not carry over.

### Don't:

- **Don't** ship light mode. Dark-first is a product constraint, not a default, and the site has to match the app it is selling. (A light palette was explored and recorded in the brief's Future Features for whenever that changes; do not re-derive it.)
- **Don't** add drop shadows to in-flow surfaces. Depth is background stepping and 1px borders.
- **Don't** use gradient text, single-sided accent borders, or blur as decoration. The header's scrolled backdrop is the one sanctioned blur, and it is a specific effect.
- **Don't** put an uppercase tracked eyebrow above every section. One named kicker is a system; an eyebrow everywhere is grammar nobody chose.
- **Don't** reveal the underlying Git mechanism in any copy. This is load-bearing for positioning and matters more here than in the app, because this is the page that does the selling.
