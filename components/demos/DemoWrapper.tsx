type DemoWrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function DemoWrapper({ title, description, children }: DemoWrapperProps) {
  return (
    <div
      className="my-8 rounded border border-border bg-bg p-6"
      role="region"
      aria-labelledby="demo-title"
      aria-describedby={description ? "demo-desc" : undefined}
    >
      <h2 id="demo-title" className="text-xl font-semibold text-fg mb-2">
        {title}
      </h2>
      {description ? (
        <p id="demo-desc" className="text-fg-muted text-sm mb-4">
          {description}
        </p>
      ) : null}
      <div className="rounded bg-[var(--color-bg)] p-4 motion-safe-transition">{children}</div>
    </div>
  );
}
