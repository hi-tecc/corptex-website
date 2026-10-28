import { FileText, Package, ShieldCheck } from "lucide-react";

import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats, usps } from "@/content/site";

const icons = [Package, ShieldCheck, FileText];

export function Waarom() {
  return (
    <section aria-labelledby="waarom-title" className="relative overflow-hidden bg-navy py-28 text-white sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-hivis/[0.07] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="waarom-title"
          eyebrow="Waarom Corptex"
          title="Gemaakt voor wie elke dag werkt."
          className="max-w-3xl [&_p]:text-white/60"
        />

        <dl className="mt-16 grid gap-10 border-y border-white/15 py-12 sm:grid-cols-3 sm:gap-6 lg:mt-20">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block text-7xl font-black tracking-tight text-hivis tabular-nums lg:text-8xl"
                />
                <span aria-hidden="true" className="mt-3 block text-lg text-white/70">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Stagger as="ul" className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
          {usps.map((usp, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem
                as="li"
                key={usp.title}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 transition-colors duration-500 hover:bg-white/[0.08]"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-hivis text-ink transition-transform duration-500 group-hover:-rotate-6">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-2xl font-bold">{usp.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{usp.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
