type DemoWrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function DemoWrapper({ title, description, children }: DemoWrapperProps) {
  const slug = slugify(title);
  const titleId = `demo-${slug}`;
  const descId = `demo-${slug}-desc`;

  return (
    <div
      className="my-8 rounded border border-border bg-bg p-6"
      role="region"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
    >
      <h2 id={titleId} className="text-xl font-semibold text-fg mb-2">
        {title}
      </h2>
      {description ? (
        <p id={descId} className="text-fg-muted text-sm mb-4">
          {description}
        </p>
      ) : null}
      <div className="rounded bg-[var(--color-bg)] p-4 motion-safe-transition">{children}</div>
    </div>
  );
}
