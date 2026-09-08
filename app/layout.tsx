import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/brand";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { canonical, SITE_ORIGIN } from "@/lib/site";
import "./globals.css";

/**
 * The app uses the OS system stack deliberately, being a tool rather than
 * something to be read or persuaded by. DESIGN.md explicitly leaves a display
 * face for "marketing surfaces that actually need a voice", which is this.
 *
 * Geist is self-hosted through its package rather than fetched at build time,
 * so there is no network dependency in CI and no layout shift on load.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${brand.productName} - ${brand.tagline}`,
    template: `%s - ${brand.productName}`,
  },
  description:
    "Commit to Git at any date and time. Backfill the work you actually did, and make your contribution graph tell the truth.",
  // The default only. Every indexable page sets its own, because a canonical
  // inherited from the layout would tell a crawler that seven pages are all
  // the home page.
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: `${brand.productName} - ${brand.tagline}`,
    description: "Commit to Git at any date and time.",
    type: "website",
    siteName: brand.productName,
    url: canonical("/"),
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
        {/* Site-wide, so they sit here rather than on every page. The
            per-page blocks reference these by `@id` instead of restating
            them. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
