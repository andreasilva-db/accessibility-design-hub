type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded border border-border bg-bg p-4 ${className}`}
      role={title ? "article" : undefined}
      aria-labelledby={title ? undefined : undefined}
    >
      {title ? (
        <h3 id={title.toLowerCase().replace(/\s+/g, "-")} className="text-lg font-semibold text-fg mb-2">
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
}
