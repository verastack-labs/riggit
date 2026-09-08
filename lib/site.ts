/**
 * Where the site lives, in the two forms the metadata layer needs.
 *
 * These are not interchangeable, and using the wrong one is silent.
 *
 * `SITE_ORIGIN` is the bare origin, and it is what `metadataBase` wants.
 * Next's file conventions (the Open Graph image, the icons) already prefix
 * `basePath` themselves, so an origin carrying it too yields
 * `/riggit/riggit/opengraph-image.png`.
 *
 * `SITE_URL` is the origin plus `basePath`, and it is what anything writing a
 * URL by hand wants: the sitemap, `robots.txt`, canonical tags and every `@id`
 * in the structured data. Those get no automatic prefix, so an origin-only
 * value points them one level too high, at paths that 404.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_ORIGIN = "https://verastack-labs.github.io";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * The absolute, canonical URL for a route.
 *
 * Absolute on purpose. Next resolves a relative `alternates.canonical`
 * against `metadataBase`, which is origin-only here, so a relative value
 * would drop `/riggit` and point every canonical tag at a 404. Writing the
 * whole URL sidesteps the question rather than depending on the answer.
 *
 * The trailing slash matches `trailingSlash: true` in the Next config. A
 * canonical that disagrees with the URL actually served is a canonical
 * pointing at a redirect, which is the one thing it must never do.
 */
export function canonical(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}/`;
}
