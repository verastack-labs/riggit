import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs" };

export default function Page() {
  return (
    <main className="mx-auto max-w-[1080px] px-6 pt-20 pb-16">
      <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ink">
        Docs
      </h1>
      <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-secondary">
        Install, first run, your first backdated commit, and troubleshooting. This page is being written.
      </p>
    </main>
  );
}
