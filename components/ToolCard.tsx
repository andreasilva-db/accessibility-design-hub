import Link from "next/link";
import type { ToolSlug } from "@/lib/tools";
import { ToolCardIcon } from "@/components/ToolCardIcon";
import { ToolCardIllustration } from "@/components/ToolCardIllustration";

type ToolCardProps = {
  slug: ToolSlug;
  title: string;
  description: string;
};

export function ToolCard({ slug, title, description }: ToolCardProps) {
  return (
    <li>
      <Link
        href={`/tools/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg card-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
      >
        {/* Illustration */}
        <ToolCardIllustration slug={slug} />

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex items-center gap-2.5">
            <ToolCardIcon slug={slug} />
            <h3 className="text-sm font-semibold text-fg leading-snug">{title}</h3>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-fg-muted">
            {description}
          </p>

          {/* CTA row */}
          <div
            className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-focus-ring"
            aria-hidden="true"
          >
            <span>Run check</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </li>
  );
}
