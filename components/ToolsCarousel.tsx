"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ToolCard } from "@/components/ToolCard";
import type { ToolItem } from "@/lib/tools";

export function ToolsCarousel({ tools }: { tools: ToolItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const scroll = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const li = el.querySelector("li");
    const step = li ? li.offsetWidth + 16 : 264;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="relative px-8">
      {/* Gradient fade — left */}
      <div
        className="pointer-events-none absolute inset-y-0 left-8 z-10 w-12 bg-gradient-to-r from-surface to-transparent transition-opacity duration-200"
        style={{ opacity: canLeft ? 1 : 0 }}
        aria-hidden="true"
      />
      {/* Gradient fade — right */}
      <div
        className="pointer-events-none absolute inset-y-0 right-8 z-10 w-12 bg-gradient-to-l from-surface to-transparent transition-opacity duration-200"
        style={{ opacity: canRight ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Prev arrow */}
      <button
        onClick={() => scroll("left")}
        disabled={!canLeft}
        aria-label="Ver herramientas anteriores"
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-md text-fg transition-opacity hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-0"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Scrollable row */}
      <ul
        ref={ref}
        role="list"
        aria-label="Accessibility tools"
        className="flex gap-4 overflow-x-auto scroll-smooth list-none m-0 p-0 py-1"
        style={{ scrollbarWidth: "none" }}
      >
        {tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            title={tool.title}
            description={tool.description}
            liClassName="shrink-0 w-64 flex"
          />
        ))}
      </ul>

      {/* Next arrow */}
      <button
        onClick={() => scroll("right")}
        disabled={!canRight}
        aria-label="Ver siguientes herramientas"
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-md text-fg transition-opacity hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-0"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
