"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

export function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        "glass-nav sticky top-0 z-40 w-full backdrop-blur-md motion-safe-transition px-4 py-3 flex items-center justify-between gap-4 " +
        (scrolled ? "scrolled" : "")
      }
      role="banner"
    >
      <Link
        href="/"
        className="text-fg font-semibold hover:underline truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
      >
        Hub de Accesibilidad
      </Link>
      <div className="flex items-center gap-1 shrink-0">
        <nav className="flex items-center gap-1" aria-label="Navegación principal">
          <Link
            href="/docs"
            className="px-3 py-2 rounded text-fg hover:bg-fg/10 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            Documentación
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded text-fg hover:bg-fg/10 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            Acerca de
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
