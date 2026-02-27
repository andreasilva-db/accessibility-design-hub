import type { Metadata } from "next";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { AxeDev } from "@/components/AxeDev";
import { ThemeScript } from "@/components/ThemeScript";
import { GlobalHeader } from "@/components/layout/GlobalHeader";

export const metadata: Metadata = {
  title: "Hub de Accesibilidad",
  description: "Documentación y referencia sobre buenas prácticas de accesibilidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-bg text-fg">
        <ThemeScript />
        <AxeDev />
        <SkipLink />
        <GlobalHeader />
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
        <footer className="border-t border-border px-4 py-4 md:px-6 text-fg-muted text-sm" role="contentinfo">
          <p>A Project by Design Team 2026.</p>
        </footer>
      </body>
    </html>
  );
}
