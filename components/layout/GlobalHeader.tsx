"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function GlobalHeader() {
  return (
    <header className="border-b border-border px-4 py-3 flex items-center justify-between gap-4" role="banner">
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
