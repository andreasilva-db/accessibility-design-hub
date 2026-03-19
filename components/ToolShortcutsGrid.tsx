import Link from "next/link";
import { TOOL_ITEMS } from "@/lib/tools";
import { ToolCardIcon } from "@/components/ToolCardIcon";

export function ToolShortcutsGrid() {
  return (
    <ul className="not-prose m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-4">
      {TOOL_ITEMS.map((tool) => (
        <li key={tool.slug}>
          <Link
            href={`/tools/${tool.slug}`}
            className="group flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-3 text-sm font-medium text-fg transition-all duration-200 hover:border-focus-ring/50 hover:bg-focus-ring/5 hover:text-focus-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            <ToolCardIcon slug={tool.slug} className="shrink-0 opacity-70 group-hover:opacity-100" />
            <span className="leading-snug">{tool.title}</span>
            <svg
              className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
