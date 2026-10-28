import { cn } from "@/lib/cn";

/** Octagonal "C" mark based on the current Corptex branding. Replace with the official SVG when available. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
      <path d="M30 0H70L90 20L74 36L62 24H38L24 38V62L38 76H62L74 64L90 80L70 100H30L0 70V30Z" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-7 text-hivis", markClassName)} />
      <span className="font-wide text-xl font-black uppercase tracking-[0.08em]">Corptex</span>
    </span>
  );
}
