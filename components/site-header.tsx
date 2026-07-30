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
 * instead of a list of links.
 *
 * It is a CSS transition, not a keyframe animation, precisely because
 * transitions interpolate from wherever the element currently is. Sweeping
 * the cursor across the row therefore redirects it mid-flight instead of
 * restarting it, which is the difference between fluid and twitchy.
 *
 * Below the small breakpoint the row collapses into a menu. The links are the
 * same set in the same order: a narrow screen gets a different affordance,
 * never a smaller product.
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
  const [menu, setMenu] = useState<"closed" | "open" | "closing">("closed");
  const menuOpen = menu === "open";
  const menuMounted = menu !== "closed";
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenu((current) => (current === "open" ? "closing" : current));
  }, []);

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

    setIndicator((current) => ({ ...current, visible: false }));
  }, [moveTo]);

  useEffect(() => {
    restToActive();

    // The first placement must not animate in from zero, or the indicator
    // flies across the header on every page load.
    const frame = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname, restToActive]);

  // Navigating with the menu open would otherwise leave it hanging over the
  // page it just moved to.
  useEffect(() => setMenu("closed"), [pathname]);

  // Held mounted through the closing animation, then removed.
  useEffect(() => {
    if (menu !== "closing") return;
    const timer = setTimeout(() => setMenu("closed"), 160);
    return () => clearTimeout(timer);
  }, [menu]);

  // The page behind must not scroll under the sheet, and must not shift when
  // the scrollbar disappears.
  useEffect(() => {
    if (!menuMounted) return;

    const root = document.documentElement;
    const gutter = window.innerWidth - root.clientWidth;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;

    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, [menuMounted]);

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

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMenu();
      // Focus goes back where it came from, or it lands on the body and the
      // next Tab restarts from the top of the page.
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        // The glass is permanent. It used to switch on at 8px of scroll, but
        // `backdrop-filter` cannot be transitioned the way a colour can: it
        // snapped in whole, and because the veil arrived on the same frame the
        // effect read as the bar's background sliding up and being replaced.
        // A surface that is simply always there has no such moment.
        "riggit-header-veil backdrop-blur-xl backdrop-saturate-150",
        // The border stays gated, because it means something: content is
        // passing underneath. It is a colour, so `transition-colors` above
        // actually interpolates it and it fades rather than pops.
        scrolled || menuMounted ? "border-b border-edge" : "border-b border-transparent",
        // The seam below replaces it while the sheet is open, so a flat rule
        // and a gradient are never stacked on the same pixel row.
        menuMounted && "border-transparent sm:border-edge",
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
          aria-label="Main"
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
              "transition-[background-color,opacity,transform] duration-200 ease-out hover:bg-accent-bright",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              // The sheet carries its own, larger. Two at once reads as a bug,
              // so this one leaves: it used to be switched off outright, which
              // read as a glitch rather than a handover.
              // Mobile-first: the leaving state is the default and desktop
              // restores it. Written as max-sm: variants this silently did
              // nothing, while every min-width variant in this codebase works.
              menuMounted &&
                "pointer-events-none -translate-y-1 scale-95 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:scale-100 sm:opacity-100",
            )}
          >
            Download
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            ref={menuButtonRef}
            onClick={() =>
              setMenu((current) => (current === "open" ? "closing" : "open"))
            }
            className={cn(
              "flex size-9 items-center justify-center rounded-control text-ink-secondary sm:hidden",
              "transition-colors duration-150 hover:bg-raised hover:text-ink",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            {/* Two bars that cross into an X. The same element changing state,
                rather than swapping one icon for another. */}
            <span className="relative block h-[10px] w-[16px]" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-200",
                  menuOpen ? "top-[4px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-200",
                  menuOpen ? "top-[4px] -rotate-45" : "top-[8px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

        {/* Draws along the header's bottom edge while the sheet is open:
            accent at the centre, nothing at the ends, opening outwards. A flat
            rule across the full width read as a hard seam between two panels
            rather than as one surface opening. */}
        {menuMounted ? (
          <span
            aria-hidden="true"
            className={cn(
              "riggit-seam pointer-events-none absolute inset-x-0 bottom-0 h-px sm:hidden",
              menu === "open" ? "riggit-seam-in" : "riggit-seam-out",
            )}
          />
        ) : null}
      </header>

      {/* Sibling of the header, not a child. `backdrop-filter` on the header
          makes it the containing block for fixed descendants, so nested here
          the sheet resolved against a 64px-tall box and collapsed to nothing. */}
      {menuMounted ? (
        <div
          id="mobile-nav"
          className={cn(
            // Fixed, so opening it floats over the page instead of pushing it
            // down. Sits under the header, which keeps the close button live.
            //
            // Explicit inset-x/top/bottom rather than inset-0 plus an override,
            // and the flex container is this element rather than a child: a
            // child using h-full needs its parent to resolve a definite height,
            // which is what left every item stacked at the top.
            "fixed inset-x-0 bottom-0 z-40 sm:hidden",
            "top-[var(--header-h)] flex flex-col items-center justify-center gap-2 px-6",
            "riggit-sheet backdrop-blur-[30px] backdrop-saturate-150",
            menu === "open" ? "riggit-sheet-in" : "riggit-sheet-out",
          )}
        >
          <nav
            aria-label="Main"
            className="flex w-full flex-col items-center gap-2"
          >
            {LINKS.map((link, index) => {
              const active = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "riggit-sheet-item rounded-control px-6 py-3 text-[30px] leading-tight font-medium tracking-[-0.03em] transition-colors duration-150",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    active ? "text-ink" : "text-ink-secondary",
                  )}
                  style={{ animationDelay: `${60 + index * 45}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/download"
              className="riggit-sheet-item mt-6 rounded-field bg-accent px-8 py-3.5 text-[15px] font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={{ animationDelay: `${60 + LINKS.length * 45}ms` }}
            >
              Download
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
