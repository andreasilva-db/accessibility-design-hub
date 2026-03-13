import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus-ring disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2",
  };

  const variants = {
    primary:
      "bg-focus-ring text-white hover:bg-blue-700 dark:hover:bg-blue-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-surface-2 text-fg hover:bg-border border border-border",
    ghost:
      "text-fg-muted hover:text-fg hover:bg-surface-2",
  };

  return (
    <button
      type="button"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
