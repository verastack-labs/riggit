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
  /**
   * Placeholder until the agency domain exists, then swapped for the real
   * address. `.invalid` is reserved by RFC 2606 and can never resolve, so a
   * forgotten placeholder cannot quietly deliver mail to whoever has
   * registered the domain it looks like.
   *
   * Not an environment variable. This is a static export, so `NEXT_PUBLIC_`
   * values are inlined into the bundle at build time and would be just as
   * visible on the deployed site. The only thing a variable buys is keeping
   * the address out of this public repository, which stops mattering the
   * moment it is an agency address rather than a personal one.
   *
   * It deliberately does not fail the build. Nothing renders it as text while
   * it is a placeholder, so a live page would show a contact button that goes
   * nowhere rather than a visibly broken address.
   */
  contactEmail: "enterprise@example.invalid",
} as const;
