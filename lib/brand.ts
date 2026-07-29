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
  downloadUrl: "https://github.com/verastack-labs/riggit/releases/latest",
  /**
   * The version the download page links to, and the one whose filenames it
   * builds. Bump it here with every release; it is the only place on the site
   * that carries a version number.
   *
   * The links point at the exact tag rather than at `latest`, because asset
   * filenames carry the version. A `latest/download/Riggit_0.1.0_...` link
   * would keep resolving right up until the next release renamed the file, and
   * then 404 for everyone. Pinning means the page and the binary it describes
   * always agree, and the cost of forgetting to bump is serving an older
   * version rather than serving nothing.
   */
  latestVersion: "0.1.1",
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
   * Real and monitored. Swap it for an address on the agency domain when that
   * exists; nothing else needs to change, since every page reads it from here.
   *
   * Not an environment variable. This is a static export, so `NEXT_PUBLIC_`
   * values are inlined into the bundle at build time and would be just as
   * visible on the deployed site. The only thing a variable would buy is
   * keeping the address out of this public repository, and this one is a
   * business address rather than anything personal.
   */
  contactEmail: "verastack.labs@gmail.com",
} as const;
