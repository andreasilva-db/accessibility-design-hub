"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/#tools-heading", label: "Tools" },
  { href: "/about", label: "About" },
];

export function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        "glass-nav sticky top-0 z-40 w-full backdrop-blur-xl motion-safe-transition " +
        (scrolled ? "scrolled" : "")
      }
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
        >
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-focus-ring text-white text-xs font-bold tracking-tight select-none"
            aria-hidden="true"
          >
            A
          </span>
          <span className="text-sm font-semibold text-fg truncate group-hover:text-focus-ring motion-safe-transition">
            Accessibility Design Hub
          </span>
        </Link>

        {/* Nav + toggle */}
        <div className="flex items-center gap-0.5 shrink-0">
          <nav className="flex items-center" aria-label="Main">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href.startsWith("/#")
                ? false
                : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    "nav-link px-3.5 py-2 rounded-md text-sm font-medium motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 " +
                    (isActive
                      ? "text-focus-ring"
                      : "text-fg-muted hover:text-fg")
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-1 pl-1 border-l border-border">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
