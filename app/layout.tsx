import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
