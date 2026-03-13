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
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg shadow-sm hover:border-focus-ring hover:shadow-md hover:-translate-y-0.5 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 dark:shadow-none dark:hover:shadow-none"
      >
        {/* Decorative illustration */}
        <ToolCardIllustration slug={slug} />

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3">
            <ToolCardIcon slug={slug} />
            <h3 className="text-base font-semibold text-fg">{title}</h3>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-fg-muted">
            {description}
          </p>

          {/* Visual-only button — the whole card is the link */}
          <span
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded bg-focus-ring px-4 py-2 text-sm font-medium text-white group-hover:opacity-90 motion-safe-transition"
            aria-hidden="true"
          >
            Run check
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </Link>
    </li>
  );
}
