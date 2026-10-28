import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  titleClassName,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  className?: string;
  titleClassName?: string;
  id?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={cn(
            "mt-5 text-4xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-6xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
