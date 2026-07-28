import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.productName} - ${brand.tagline}`,
  description:
    "Commit to Git at any date and time. Backfill the work you actually did, and make your contribution graph tell the truth.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-page text-ink antialiased">{children}</body>
    </html>
  );
}
