"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";

export function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <div className="flex min-h-[calc(100vh-0)] flex-1">
        <aside
          className="hidden md:block w-56 shrink-0 border-r border-border p-4 overflow-y-auto"
          aria-label="Navegación por secciones"
        >
          <Sidebar />
        </aside>
        <main id="main" className="flex-1 min-w-0 px-4 py-6 md:px-6 md:py-8" role="main">
          {children}
        </main>
      </div>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
