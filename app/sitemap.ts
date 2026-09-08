import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

/**
 * The sitemap, emitted as a static file by the export.
 *
 * It matters more here than it would on a domain root. `robots.txt` is only
 * read from the root of a host, and this site is a project path on a host
 * shared with every other GitHub user, so the usual way a crawler discovers a
 * sitemap is unavailable. This file has to be handed to Search Console and
 * Bing Webmaster Tools directly.
 *
 * `/welcome` is absent deliberately. It is `noindex`, and listing a page in
 * the sitemap while telling crawlers not to index it is a contradiction that
 * gets reported as an error rather than quietly ignored.
 */
export const dynamic = "force-static";

/**
 * Relative to each other, not absolute truth. Priority only orders this
 * site's own pages, so the point is that download and pricing outrank the
 * legal pages, not the specific numbers.
 */
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/download", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/product", priority: 0.8 },
  { path: "/docs", priority: 0.7 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp for the whole build. Per-page dates would need real edit
  // times, and a `lastModified` that just says "now" on every crawl is worse
  // than none: it trains the crawler to stop believing the field.
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: canonical(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
