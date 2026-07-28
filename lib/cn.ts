type ClassValue = string | false | null | undefined;

/** Minimal class joiner. The app uses clsx plus tailwind-merge; the site has
 * no conditional-variant surface that needs merge semantics, so this stays a
 * dependency-free join. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
