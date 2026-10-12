import type { NextConfig } from "next";

/**
 * Built as a static export for GitHub Pages.
 *
 * The site is served from the root of `riggit.verastack.dev`, so `basePath`
 * is empty and every internal link resolves where it is written.
 *
 * It stays an env var rather than being deleted. It was one so that pointing
 * a real domain at the site would be a config change rather than a find and
 * replace, and that turned out to be exactly right: the move cost one line in
 * the deploy workflow. A second brand served from a project path would need
 * it back on the same terms.
 *
 * `images.unoptimized` is required: the Next image optimiser needs a server,
 * and a static export has none.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // `next build` and `next dev` share `.next` by default, and a build run
  // while dev is up leaves the dev server serving chunks that no longer
  // exist ("Cannot find module './899.js'"). Giving the build its own
  // directory makes the two impossible to collide.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  basePath,
  // Without this, GitHub Pages serves /about as a 404 rather than finding
  // /about/index.html.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
