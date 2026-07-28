import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DemoSection } from "@/components/demo-section";
import { HeroWash } from "@/components/hero-wash";
import {
  BoundariesSection,
  CapabilitiesSection,
  ProductClosing,
  RequirementsSection,
} from "@/components/product-sections";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Riggit is a desktop app for making Git commits at any date and time. What it does, what it deliberately does not do, and what it needs to run.",
};

/**
 * The page home anchors into. Home says the graph is wrong and shows it being
 * fixed; this one answers the question that follows, which is what exactly the
 * thing does before anyone installs it.
 *
 * The walkthrough is variation A, the panel demo, which moved here from
 * `/lab`. Home carries variation B, the full-bleed one. They are two
 * treatments of the same four beats, so running both on one page would be
 * saying it twice. Split across the two, home gets the louder one as a first
 * impression and this gets the one that sits beside its own explanation.
 */
export default function Product() {
  return (
    <main>
      <HeroWash>
        <section className="mx-auto max-w-[1080px] px-6 pt-14 pb-4 sm:pt-20">
          <span
            className="riggit-enter text-[10.5px] font-semibold tracking-[0.11em] text-ink-muted uppercase"
            style={{ "--enter-delay": "40ms" } as CSSProperties}
          >
            The product
          </span>

          <h1
            className="riggit-enter mt-6 max-w-[17ch] text-[clamp(2.4rem,6vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance text-ink"
            style={{ "--enter-delay": "110ms" } as CSSProperties}
          >
            {/* The class directly rather than LitWord, which exists to pick a
                word out of a brand string it must not hardcode. This heading
                is page copy, so the split is already made. */}
            Write the <span className="riggit-gradient-text">commit</span>.
            Choose when it happened.
          </h1>

          <p
            className="riggit-enter mt-6 max-w-[54ch] text-[16.5px] leading-[1.6] text-ink-secondary text-pretty"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            Riggit is a desktop app, about the size of a calculator. Point it at
            a repository you already have, write a message, pick a date and a
            time, and commit. That is the whole product.
          </p>
        </section>
      </HeroWash>

      <DemoSection />
      <CapabilitiesSection />
      <BoundariesSection />
      <RequirementsSection />
      <ProductClosing />
    </main>
  );
}
