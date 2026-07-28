import type { Metadata } from "next";

export const metadata: Metadata = { title: "Download" };

export default function Page() {
  return (
    <main className="mx-auto max-w-[1080px] px-6 pt-20 pb-16">
      <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ink">
        Download
      </h1>
      <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-secondary">
        Builds for macOS, Windows and Linux, with install notes per platform. Downloads open once the first release is cut.
      </p>
    </main>
  );
}
