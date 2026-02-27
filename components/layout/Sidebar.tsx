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

  return (
    <nav
      className={`flex flex-col ${className}`}
      aria-label="Secciones de documentación"
    >
      <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ slug, label }) => {
          const href = `/docs/${slug}`;
          const isActive = pathname === href;
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
