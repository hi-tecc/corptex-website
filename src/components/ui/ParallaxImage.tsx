"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/cn";

type Props = {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Total vertical travel in percent of the container height */
  strength?: number;
  priority?: boolean;
  sizes?: string;
};

/** Image that drifts slower than the page while scrolling, inside a clipping frame. */
export function ParallaxImage({ src, alt, className, imageClassName, strength = 14, priority, sizes }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`]);

  return (
    <div ref={ref} className={cn(!className?.includes("absolute") && "relative", "overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ y: reduce ? 0 : y, top: `-${strength / 2}%`, bottom: `-${strength / 2}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
