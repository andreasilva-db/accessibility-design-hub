"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

export function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      style={
        !scrolled
          ? ({
              "--color-fg": "white",
              "--color-border": "rgba(255,255,255,0.18)",
              "--color-focus-ring": "white",
            } as React.CSSProperties)
          : undefined
      }
      className={[
        "sticky top-0 z-50 px-4 py-3 flex items-center justify-between gap-4",
        "motion-safe:transition-all motion-safe:duration-300",
        scrolled
          ? "border-b border-border bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-700 border-b border-white/10",
      ].join(" ")}
    >
      <Link
        href="/"
        className="text-fg font-semibold hover:underline truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
      >
        Hub de Accesibilidad
      </Link>
      <div className="flex items-center gap-1 shrink-0">
        <nav className="flex items-center gap-1" aria-label="Principal">
          <Link
            href="/docs"
            className="px-3 py-2 rounded text-fg hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            Documentación
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded text-fg hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            Acerca de
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
