"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

type Indicator = { left: number; width: number; visible: boolean };

/**
 * One indicator slides between items rather than each item lighting on its
 * own. That single shared element is what makes the row read as a control
 * instead of a list of links, and it is the reason the header feels built.
 *
 * It is a CSS transition, not a keyframe animation, precisely because
 * transitions interpolate from wherever the element currently is. Sweeping
 * the cursor across the row therefore redirects it mid-flight instead of
 * restarting it, which is the difference between fluid and twitchy.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    visible: false,
  });
  const [settled, setSettled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const moveTo = useCallback((element: HTMLElement | null) => {
    const nav = navRef.current;
    if (!nav || !element) return;

    const navBox = nav.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    setIndicator({
      left: box.left - navBox.left,
      width: box.width,
      visible: true,
    });
  }, []);

  const restToActive = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const active = nav.querySelector<HTMLElement>("[data-active='true']");
    if (active) {
      moveTo(active);
      return;
    }

    // No active route in this row, so the indicator has nowhere to rest.
    setIndicator((current) => ({ ...current, visible: false }));
  }, [moveTo]);

  useEffect(() => {
    restToActive();

    // The first placement must not animate in from zero, or the indicator
    // flies across the header on every page load.
    const frame = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname, restToActive]);

  useEffect(() => {
    const onResize = () => restToActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [restToActive]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        // The border and backdrop appear only once content is behind the
        // header. At rest it is part of the page, not a bar sitting on top.
        scrolled
          ? "border-b border-edge bg-page/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1080px] items-center gap-8 px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <BrandMark size={26} id="nav" className="riggit-mark-hover" />
          <span className="text-[15px] font-medium tracking-[-0.02em] text-ink lowercase">
            {brand.productName}
          </span>
        </Link>

        <nav
          ref={navRef}
          onMouseLeave={restToActive}
          className="relative hidden items-center gap-1 sm:flex"
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 -z-10 rounded-control bg-raised",
              settled && "transition-[transform,width,opacity] duration-200",
              indicator.visible ? "opacity-100" : "opacity-0",
            )}
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                onMouseEnter={(event) => moveTo(event.currentTarget)}
                onFocus={(event) => moveTo(event.currentTarget)}
                className={cn(
                  "rounded-control px-3 py-1.5 text-[13.5px] transition-colors duration-150",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active ? "text-ink" : "text-ink-secondary hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/download"
            className={cn(
              "rounded-field bg-accent px-4 py-2 text-[13px] font-medium text-accent-ink",
              "transition-colors duration-150 hover:bg-accent-bright",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}
