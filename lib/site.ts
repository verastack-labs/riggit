/**
 * Where the site lives, in the two forms the metadata layer needs.
 *
 * Since the move to `riggit.verastack.dev` these are equal: the site is
 * served from a domain root, so there is no base path to add.
 *
 * Both names survive the move anyway, and deliberately. They mean different
 * things, and the difference is the kind that fails silently:
 *
 * `SITE_ORIGIN` is the bare origin, and it is what `metadataBase` wants.
 * Next's file conventions (the Open Graph image, the icons) prefix the base
 * path themselves, so an origin carrying it too yields a doubled path.
 *
 * `SITE_URL` is the origin plus any base path, and it is what anything
 * writing a URL by hand wants: the sitemap, `robots.txt`, canonical tags and
 * every `@id` in the structured data. Those get no automatic prefix.
 *
 * Collapsing them into one constant today would work today, and would hand
 * the next brand served from a project path the same bug to rediscover.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_ORIGIN = "https://riggit.verastack.dev";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * The absolute, canonical URL for a route.
 *
 * Absolute on purpose. Next resolves a relative `alternates.canonical`
 * against `metadataBase`, which is origin-only, so a relative value would
 * drop any base path and point every canonical tag at a 404. Writing the
 * whole URL sidesteps the question rather than depending on the answer, and
 * keeps working whether or not a base path is in play.
 *
 * The trailing slash matches `trailingSlash: true` in the Next config. A
 * canonical that disagrees with the URL actually served is a canonical
 * pointing at a redirect, which is the one thing it must never do.
 */
export function canonical(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}/`;
}
