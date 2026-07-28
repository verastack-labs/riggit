"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Turns scroll position into a discrete step index.
 *
 * This exists because scroll-driven CSS animation is scrubbed by definition:
 * it maps scroll straight onto animation progress, so stopping mid-scroll
 * leaves the thing mid-transition. Quantising here means the section is only
 * ever in one of its defined states, and CSS transitions handle the movement
 * between them on their own timing rather than the reader's.
 *
 * A scroll listener rather than IntersectionObserver, because we need a
 * position along the track, not a threshold crossing. Reads are batched into
 * one animation frame so a fast scroll cannot queue a layout per event.
 */
export function useStep(ref: RefObject<HTMLElement | null>, count: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || count < 1) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const box = node.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      if (travel <= 0) return;

      // 0 when the track's top reaches the viewport top, 1 when its bottom does.
      const progress = Math.min(Math.max(-box.top / travel, 0), 1);

      // Rounding rather than flooring puts the switch at the midpoint between
      // two steps, so a step owns the scroll either side of it and the change
      // lands where it feels due.
      setStep(Math.round(progress * (count - 1)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, count]);

  return step;
}

/** Where an item sits relative to the step currently held. */
export function slotFor(index: number, step: number) {
  const delta = index - step;
  if (delta === 0) return "primary";
  if (delta === -1) return "above";
  if (delta === 1) return "below";
  return delta < 0 ? "gone-above" : "gone-below";
}
