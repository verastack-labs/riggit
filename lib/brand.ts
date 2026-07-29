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
  /**
   * The one word of the tagline drawn as lit rather than flat. Named here
   * rather than split out in the component, so a second brand whose tagline
   * has no such word simply omits this and the heading renders plain, instead
   * of a component reaching into a string it should not know the shape of.
   */
  taglineAccent: "GitHub",
  /** Not live until Phase 10 cuts a release. */
  downloadUrl: "https://github.com/verastack-labs/riggit/releases/latest",
  /**
   * The early access checkout, hosted by Polar.
   *
   * The tier's price and its cap live on the link rather than here: a preset
   * discount capped at 300 redemptions, which is what closes the offer. That
   * means switching to the next tier is a matter of pointing this at a
   * different link, with no code change to the price shown beside it.
   *
   * Which also means the two can drift. If the figures on the pricing page
   * ever stop matching what checkout charges, this is the pair to look at.
   */
  checkoutUrl:
    "https://buy.polar.sh/polar_cl_loJgbxMDn2ZLXiCgY1HyEJ7zTLefVLoiAsnv93oTplE",
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
