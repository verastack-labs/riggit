/**
 * Brand strings, mirroring `brand/riggit.json` in riggit-app.
 *
 * Separate repositories, so this is a hand-kept copy rather than an import.
 * Same rule as the app: no product name, tagline or identifier hardcoded in
 * a component, so a second brand stays a config swap.
 */
export const brand = {
  id: "riggit",
  productName: "Riggit",
  tagline: "Own your GitHub timeline.",
  /** Not live until Phase 10 cuts a release. */
  downloadUrl: "https://github.com/verastack-labs/riggit/releases/latest",
} as const;
