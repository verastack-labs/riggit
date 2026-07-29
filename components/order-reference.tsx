"use client";

import { useEffect, useState } from "react";

/**
 * The checkout id, if the payment provider sent one back.
 *
 * Read from `window.location.search` in an effect rather than through
 * `useSearchParams`. On a static export that hook forces the page into a
 * Suspense boundary and prerenders empty anyway, so this is the shorter route
 * to the same result with one less thing to get wrong.
 *
 * Absent by default, and silent when absent: somebody who reaches this page by
 * typing the address should not be shown an empty field labelled "reference"
 * and left wondering what went missing.
 */
export function OrderReference() {
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("checkout_id");
    // Guarded, because the provider substitutes the placeholder only on a real
    // redirect. A test link pasted by hand arrives with the braces intact.
    if (id && !id.startsWith("{")) setReference(id);
  }, []);

  if (!reference) return null;

  return (
    <p className="mt-8 font-mono text-[12.5px] break-all text-ink-muted">
      Order reference {reference}
    </p>
  );
}
