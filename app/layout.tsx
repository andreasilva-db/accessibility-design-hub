import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { AxeDev } from "@/components/AxeDev";
import { ThemeScript } from "@/components/ThemeScript";
import { GlobalHeader } from "@/components/layout/GlobalHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Accessibility Design Hub",
  description: "Interactive tools and learning modules to help designers build inclusive, WCAG-compliant experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-bg text-fg font-sans">
        <ThemeScript />
        <AxeDev />
        <SkipLink />
        <GlobalHeader />
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
        <footer
          className="border-t border-border px-4 py-8 md:px-6"
          role="contentinfo"
        >
          <div className="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-fg">Accessibility Design Hub</p>
              <p className="text-xs text-fg-muted mt-0.5">Helping designers build inclusive experiences.</p>
            </div>
            <p className="text-xs text-fg-muted">
              Built with WCAG 2.2 in mind · Design Team 2026
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
