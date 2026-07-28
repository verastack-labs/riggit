import Link from "next/link";
import { brand } from "@/lib/brand";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/product", label: "What it does" },
      { href: "/pricing", label: "Pricing" },
      { href: "/download", label: "Download" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs#troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-edge">
      <div className="mx-auto max-w-[1080px] px-6 py-14">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-[260px]">
            <span className="text-[15px] font-medium tracking-[-0.02em] text-ink lowercase">
              {brand.productName}
            </span>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
              {brand.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <span className="text-[10.5px] font-semibold tracking-[0.09em] text-ink-muted uppercase">
                  {column.heading}
                </span>
                <ul className="mt-3 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-ink-secondary transition-colors duration-150 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
