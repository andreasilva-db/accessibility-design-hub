"use client";

import { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";
import { Button } from "@/components/ui/Button";

export function DemoButtonCompare() {
  const [count, setCount] = useState(0);
  return (
    <DemoWrapper
      title="Botón: accesible frente a no accesible"
      description="Compara un botón con etiqueta visible y estilo de foco (correcto) con un div que parece un botón (mala accesibilidad)."
    >
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">Botón accesible</span>
          <Button
            onClick={() => setCount((c) => c + 1)}
            aria-label="Incrementar contador"
          >
            Pulsado {count} veces
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-muted">Div (no enfocable, sin rol)</span>
          <div
            className="inline-flex items-center justify-center rounded px-4 py-2 font-medium bg-border text-fg cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
              }
            }}
          >
            No es un botón real
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
