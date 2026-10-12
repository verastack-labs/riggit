import type { MetadataRoute } from "next";
import { canonical, SITE_URL } from "@/lib/site";

/**
 * Fetched for real, now that there is a host root to fetch it from.
 *
 * `robots.txt` is only ever read from the root of a host, per RFC 9309. While
 * the site lived at `verastack-labs.github.io/riggit` the export wrote
 * `/riggit/robots.txt`, which nothing ever requested, and the file was
 * shipped on the bet that a domain would arrive. It has.
 *
 * `/welcome` is kept out of search here as well as by its own `noindex` meta
 * tag. Belt and braces, because the two work differently: the meta tag stops
 * a page that was crawled from being indexed, and this stops it being
 * crawled. A purchase confirmation in a search result is a page that makes no
 * sense to whoever lands on it.
 *
 * The sitemap still has to be submitted to Search Console by hand. Naming it
 * here means a crawler that arrives on its own can find it, which is not the
 * same as being discovered in the first place.
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
