import type { Metadata } from "next";

export const metadata: Metadata = { title: "Product" };

export default function Page() {
  return (
    <main className="mx-auto max-w-[1080px] px-6 pt-20 pb-16">
      <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ink">
        Product
      </h1>
      <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-secondary">
        The commit composer, how backdating behaves, and what Riggit deliberately does not do. This page is being written.
      </p>
    </main>
  );
}
