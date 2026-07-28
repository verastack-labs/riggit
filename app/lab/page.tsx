import type { Metadata } from "next";
import { CanvasDemo } from "@/components/canvas-demo";
import { DemoSection } from "@/components/demo-section";

export const metadata: Metadata = {
  title: "Lab",
  // Not linked from anywhere and not for visitors: a place to see two
  // treatments of the same idea one after the other and pick.
  robots: { index: false, follow: false },
};

function Divider({ label, note }: { label: string; note: string }) {
  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16">
      <span className="text-[10.5px] font-semibold tracking-[0.09em] text-ink-muted uppercase">
        {label}
      </span>
      <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-ink-secondary">
        {note}
      </p>
    </div>
  );
}

export default function Lab() {
  return (
    <main>
      <Divider
        label="Variation A"
        note="The grid as a panel beside the copy. Copy steps through three slots; the panel holds its own frame. Currently what is on the home page."
      />
      <DemoSection />

      <Divider
        label="Variation B"
        note="The grid as the page. A full-bleed field cut off by the viewport, copy floating over it, patterns forming out of the same cells in the middle. Quieter at rest, louder when a pattern lights."
      />
      <CanvasDemo />
    </main>
  );
}
