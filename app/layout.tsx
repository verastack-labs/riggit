import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/brand";
import "./globals.css";

/**
 * The app uses the OS system stack deliberately, being a tool rather than
 * something to be read or persuaded by. DESIGN.md explicitly leaves a display
 * face for "marketing surfaces that actually need a voice", which is this.
 *
 * Geist is self-hosted through its package rather than fetched at build time,
 * so there is no network dependency in CI and no layout shift on load.
 */
/**
 * Where relative metadata URLs resolve from.
 *
 * Without this the Open Graph image is emitted as a relative path, and every
 * scraper that matters fetches metadata without a page context, so a relative
 * path is one it cannot resolve. The symptom is a link preview that silently
 * shows no image, which is indistinguishable from not having set one.
 *
 * Origin only. The file conventions already prefix `basePath`, so including it
 * here as well produces `/riggit/riggit/opengraph-image.png`.
 */
const SITE_ORIGIN = "https://verastack-labs.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${brand.productName} - ${brand.tagline}`,
    template: `%s - ${brand.productName}`,
  },
  description:
    "Commit to Git at any date and time. Backfill the work you actually did, and make your contribution graph tell the truth.",
  openGraph: {
    title: `${brand.productName} - ${brand.tagline}`,
    description: "Commit to Git at any date and time.",
    type: "website",
    siteName: brand.productName,
  },
  twitter: {
    // Without this the card renders as a thumbnail beside the text rather than
    // as the banner the image was drawn to be.
    card: "summary_large_image",
    title: `${brand.productName} - ${brand.tagline}`,
    description: "Commit to Git at any date and time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-page text-ink antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
