import { DemoWrapper } from "@/components/demos/DemoWrapper";

type ToolPlaceholderProps = {
  title: string;
};

export function ToolPlaceholder({ title }: ToolPlaceholderProps) {
  return (
    <DemoWrapper
      title={title}
      description="This tool is under development. Check back soon for the full interactive experience."
    >
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="rounded-full bg-focus-ring/10 p-4">
          <svg
            className="h-10 w-10 text-focus-ring"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <p className="max-w-sm text-sm text-fg-muted">
          The <strong className="text-fg">{title}</strong> checker is being
          built. It will appear here as an interactive tool.
        </p>
      </div>
    </DemoWrapper>
  );
}
