"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.09, delayChildren: delay } }),
};

const line: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.1, ease } },
};

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: (index: number) => string | undefined;
  as?: "h1" | "h2";
  delay?: number;
  /** Animate immediately on mount (hero) instead of when scrolled into view */
  onMount?: boolean;
};

/** Headline whose lines slide up from behind a mask. */
export function SplitHeading({ lines, className, lineClassName, as = "h2", delay = 0, onMount }: Props) {
  const Component = as === "h1" ? motion.h1 : motion.h2;
  const trigger = onMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Component className={className} variants={container} custom={delay} initial="hidden" {...trigger}>
      {lines.map((text, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span data-reveal className={cn("block", lineClassName?.(i))} variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
