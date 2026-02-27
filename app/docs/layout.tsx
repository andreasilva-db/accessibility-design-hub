import { DocsLayoutClient } from "@/components/layout/DocsLayoutClient";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <DocsLayoutClient>{children}</DocsLayoutClient>
    </div>
  );
}
