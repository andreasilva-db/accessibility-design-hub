"use client";

import { useRef, useState } from "react";

export function PillarCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <li
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        "relative overflow-hidden rounded-xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-focus-ring/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] " +
        className
      }
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(96,165,250,0.10), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </li>
  );
}
