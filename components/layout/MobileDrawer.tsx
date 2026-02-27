"use client";

import { useEffect } from "react";
import { Sidebar } from "./Sidebar";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      <button
        type="button"
        className="absolute inset-0 bg-fg/30 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-label="Cerrar menú"
      />
      <aside
        className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-bg border-r border-border shadow-lg overflow-y-auto motion-safe-transition"
        aria-label="Secciones de documentación"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="font-semibold text-fg">Secciones</span>
          <button
            type="button"
            className="p-2 rounded hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-3">
          <Sidebar onNavigate={onClose} />
        </div>
      </aside>
    </div>
  );
}
