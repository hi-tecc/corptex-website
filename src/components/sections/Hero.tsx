"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { business, hero } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introductie"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#141414] text-white"
    >
      <motion.div
        className="absolute inset-0 -z-10 lg:left-[38%]"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[60%_20%]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-[#141414]/30 lg:bg-gradient-to-r lg:from-[#141414] lg:from-35% lg:via-[#141414]/70 lg:via-50% lg:to-transparent"
      />

      <motion.div
        className="mx-auto w-full max-w-7xl px-5 pt-36 pb-16 sm:px-8 lg:pb-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          data-reveal
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pr-4 pl-3 text-sm font-medium backdrop-blur"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-hivis opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-hivis" />
          </span>
          {business.opening.label}
        </motion.p>

        <SplitHeading
          as="h1"
          onMount
          delay={0.2}
          lines={hero.title}
          className="mt-7 max-w-4xl text-[clamp(3.1rem,9.5vw,8.75rem)] leading-[0.9] font-extrabold tracking-[-0.035em]"
          lineClassName={(i) => (i === 1 ? "text-hivis" : undefined)}
        />

        <motion.div
          data-reveal
          className="mt-8 flex max-w-xl flex-col gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.65 }}
        >
          <p className="text-lg leading-relaxed text-white/75 sm:text-xl">{hero.intro}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#contact">Maak een afspraak</ButtonLink>
            <ButtonLink href="#assortiment" variant="outline-light" icon={false}>
              Bekijk ons assortiment
            </ButtonLink>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#over-ons"
        aria-label="Scroll naar Over ons"
        className="absolute right-8 bottom-10 hidden flex-col items-center gap-3 text-xs font-semibold tracking-[0.25em] text-white/60 uppercase lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-hivis"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
