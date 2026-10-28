import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-hivis text-ink hover:bg-white",
  dark: "bg-ink text-white hover:bg-navy",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

export function ButtonLink({
  children,
  variant = "primary",
  className,
  icon = true,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: boolean; children: ReactNode }) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-colors duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
