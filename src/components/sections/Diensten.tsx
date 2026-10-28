"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { useLenis } from "@/components/providers/SmoothScroll";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/site";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-8 space-y-3">
      {points.map((point) => (
        <li key={point} className="flex items-center gap-3 text-[1.05rem]">
          <span className="grid size-6 place-items-center rounded-full bg-hivis text-ink">
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

/** Desktop: a pinned panel whose content changes as you scroll through the section. */
function StickyServices() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length))));
  });

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const step = (el.offsetHeight - window.innerHeight) / services.length;
    const target = top + step * index + step * 0.5;
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const service = services[active];

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${services.length * 85 + 15}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-16 px-8">
          <div className="col-span-6 flex flex-col justify-center">
            <Eyebrow className="text-white/60">Diensten</Eyebrow>
            <h2 id="diensten-title" className="mt-5 text-6xl leading-[0.98] font-extrabold tracking-tight">
              Meer dan een winkel.
            </h2>

            <ol className="mt-12 space-y-1 border-l border-white/15">
              {services.map((s, i) => (
                <li key={s.number}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "relative -ml-px flex w-full items-baseline gap-4 border-l-2 py-3 pl-6 text-left text-xl font-bold transition-colors duration-500",
                      i === active ? "border-hivis text-white" : "border-transparent text-white/35 hover:text-white/70",
                    )}
                  >
                    <span className="text-sm tabular-nums">{s.number}</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative mt-10 min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease }}
                  aria-live="polite"
                >
                  <p className="max-w-lg text-lg leading-relaxed text-white/75">{service.text}</p>
                  <Points points={service.points} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative col-span-6 h-[72vh] overflow-hidden rounded-[2rem] bg-white/5">
            <AnimatePresence initial={false}>
              <motion.div
                key={service.number}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1, ease }}
              >
                <Image src={service.image} alt={service.imageAlt} fill sizes="45vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between text-sm font-semibold">
              <span className="rounded-full bg-black/40 px-4 py-2 backdrop-blur">
                {service.number} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                {services.map((s, i) => (
                  <span
                    key={s.number}
                    className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-hivis" : "w-1.5 bg-white/50")}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile & tablet: a simple stacked list with reveal animations. */
function StackedServices() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:hidden">
      <SectionHeading eyebrow="Diensten" title="Meer dan een winkel." titleClassName="text-white" className="[&_p]:text-white/60" />
      <ol className="mt-14 space-y-16">
        {services.map((s) => (
          <li key={s.number}>
            <Reveal>
              <ParallaxImage src={s.image} alt={s.imageAlt} className="aspect-[4/3] rounded-[1.5rem] bg-white/5" sizes="100vw" />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 text-sm font-semibold text-hivis tabular-nums">{s.number}</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{s.text}</p>
              <Points points={s.points} />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Diensten() {
  return (
    <section id="diensten" aria-labelledby="diensten-title" className="relative bg-navy-900 text-white">
      <StickyServices />
      <StackedServices />
    </section>
  );
}
