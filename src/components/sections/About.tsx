"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { about } from "@/content/site";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Statement paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

export function About() {
  return (
    <section id="over-ons" aria-labelledby="over-ons-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow className="text-muted">{about.eyebrow}</Eyebrow>
        </Reveal>
        <h2 id="over-ons-title" className="sr-only">
          {about.title}
        </h2>
        <ScrollHighlight
          text={about.statement}
          className="mt-8 max-w-6xl text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.05] font-bold tracking-[-0.025em] text-balance"
        />

        <div className="mt-20 grid grid-cols-1 gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ParallaxImage
              src={about.image}
              alt={about.imageAlt}
              className="aspect-[4/5] rounded-[2rem] bg-paper-2"
              imageClassName="object-[50%_30%]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <div className="flex flex-col justify-end lg:col-span-7">
            <Reveal>
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">{about.title}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{about.body}</p>
            </Reveal>

            <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
              {about.pillars.map((pillar, i) => (
                <StaggerItem as="li" key={pillar.title} className="bg-paper p-6">
                  <span className="text-sm font-semibold text-muted tabular-nums">0{i + 1}</span>
                  <h3 className="mt-6 text-lg font-bold">{pillar.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{pillar.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
