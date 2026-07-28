/**
 * `template.tsx` rather than `layout.tsx` because templates remount on every
 * navigation where layouts persist. That remount is what gives each route an
 * entry animation with no state to manage and no exit bookkeeping.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="riggit-page-in">{children}</div>;
}
