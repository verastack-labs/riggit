import type { MetadataRoute } from "next";
import { canonical, SITE_URL } from "@/lib/site";

/**
 * Not read by any crawler today, and shipped anyway.
 *
 * `robots.txt` is only ever fetched from the root of a host, per RFC 9309.
 * This site is served from `/riggit` on a host shared with every GitHub user,
 * so what the export writes is `/riggit/robots.txt`, which nothing requests.
 * The root belongs to a `verastack-labs.github.io` repository that does not
 * exist yet.
 *
 * It is here because the file is the correct one to serve the moment there is
 * a root to serve it from, and because the alternative is rediscovering these
 * rules later. Nothing depends on it in the meantime: `/welcome` is kept out
 * of search by its own `robots` metadata, which is a per-page meta tag and
 * works regardless of this file, and the sitemap has to be submitted to
 * Search Console by hand either way.
 *
 * So do not read the presence of this file as the site being crawlable on
 * purpose. It is crawlable because nothing is stopping it.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Belt and braces with the page's own `noindex`. A purchase
        // confirmation in a search result is a page that makes no sense to
        // whoever lands on it.
        disallow: canonical("/welcome").replace(SITE_URL, ""),
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
