"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";

export function DocsLayoutClient({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 min-h-0 min-w-0 w-full">
        <aside
          className="hidden md:flex md:w-56 md:shrink-0 border-r border-border bg-bg p-4 overflow-y-auto"
          aria-label="Navegación por secciones"
        >
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </aside>
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <div className="md:hidden shrink-0 border-b border-border bg-bg px-4 py-3 flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú de navegación"
            >
              <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-fg font-medium">Documentación</span>
          </div>
          <main id="main" className="flex-1 min-w-0 px-4 py-6 md:px-6 md:py-8 overflow-auto" role="main">
            {children}
          </main>
        </div>
      </div>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
