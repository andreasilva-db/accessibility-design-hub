"use client";

import Link from "next/link";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-border px-4 py-3 flex items-center gap-4 flex-wrap" role="banner">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          className="md:hidden p-2 rounded hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          onClick={onMenuClick}
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="w-6 h-6 text-fg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          href="/"
          className="text-fg font-semibold hover:underline truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
        >
          Hub de Accesibilidad
        </Link>
      </div>
      <div className="flex-1 min-w-[120px] max-w-xs">
        <label htmlFor="search-input" className="sr-only">
          Buscar
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="Buscar"
          className="w-full rounded border border-border bg-bg px-3 py-2 text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-transparent"
          aria-label="Buscar"
        />
      </div>
    </header>
  );
}
