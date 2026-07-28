import { BrandMark } from "@/components/brand-mark";

/**
 * Shown by Next while a route segment resolves. Same mark as the app's splash,
 * so a user who has both installed sees one product rather than two.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <BrandMark size={64} animated id="route" />
      <span className="text-[12.5px] text-ink-muted">Loading</span>
    </div>
  );
}
