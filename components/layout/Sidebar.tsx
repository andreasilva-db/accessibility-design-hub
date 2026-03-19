"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

type SidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function Sidebar({ onNavigate, className = "" }: SidebarProps) {
  const pathname = usePathname();

  const topLevel = NAV_ITEMS.filter((item) => !item.parent);
  const childrenMap = NAV_ITEMS.filter((item) => item.parent).reduce<
    Record<string, typeof NAV_ITEMS>
  >((acc, item) => {
    const p = item.parent!;
    if (!acc[p]) acc[p] = [];
    acc[p].push(item);
    return acc;
  }, {});

  return (
    <nav
      className={`flex flex-col ${className}`}
      aria-label="Documentation sections"
    >
      <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
        {topLevel.map(({ slug, label }) => {
          const href = `/docs/${slug}`;
          const isActive = pathname === href;
          const children = childrenMap[slug] ?? [];

          return (
            <li key={slug}>
              <Link
                href={href}
                onClick={onNavigate}
                className={`block px-3 py-2 rounded motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-focus-ring/15 text-focus-ring font-medium"
                    : "text-fg hover:bg-border hover:text-fg"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>

              {children.length > 0 && (
                <ul className="list-none p-0 m-0 mt-0.5 ml-3 flex flex-col gap-0.5 border-l border-border pl-2">
                  {children.map(({ slug: childSlug, label: childLabel }) => {
                    const childHref = `/docs/${childSlug}`;
                    const isChildActive = pathname === childHref;
                    return (
                      <li key={childSlug}>
                        <Link
                          href={childHref}
                          onClick={onNavigate}
                          className={`block px-3 py-1.5 rounded text-sm motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
                            isChildActive
                              ? "bg-focus-ring/15 text-focus-ring font-medium"
                              : "text-fg-muted hover:bg-border hover:text-fg"
                          }`}
                          aria-current={isChildActive ? "page" : undefined}
                        >
                          {childLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
