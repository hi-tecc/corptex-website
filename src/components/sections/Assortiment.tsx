import { Glasses, Hand, HardHat } from "lucide-react";

import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, type Category } from "@/content/site";
import { cn } from "@/lib/cn";

const layout = [
  "lg:col-span-7 lg:row-span-2 min-h-[28rem] lg:min-h-[44rem]",
  "lg:col-span-5 min-h-[24rem]",
  "lg:col-span-5 min-h-[24rem]",
  "lg:col-span-6 min-h-[26rem] lg:min-h-[32rem]",
  "lg:col-span-6 min-h-[26rem] lg:min-h-[32rem]",
];

function Tags({ tags, dark }: { tags: string[]; dark?: boolean }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
            dark ? "bg-ink/10 text-ink" : "bg-white/15 text-white backdrop-blur",
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  if (!category.image) {
    return (
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-hivis p-8 text-ink sm:p-10">
        <div className="flex items-start justify-between">
          <span className="text-sm font-semibold tabular-nums">{number}</span>
          <div className="flex gap-3" aria-hidden="true">
            {[HardHat, Glasses, Hand].map((Icon, i) => (
              <span
                key={i}
                className="grid size-14 place-items-center rounded-2xl bg-ink/10 transition-transform duration-500 group-hover:-translate-y-1"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Icon className="size-6" strokeWidth={1.75} />
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[clamp(1.6rem,7vw,2.25rem)] leading-[1.05] font-extrabold tracking-tight hyphens-auto">{category.title}</h3>
          <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-ink/75">{category.text}</p>
          <Tags tags={category.tags} dark />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10">
      <ParallaxImage
        src={category.image}
        alt={category.imageAlt ?? ""}
        className="absolute inset-0 -z-20"
        imageClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        sizes="(min-width: 1024px) 60vw, 100vw"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />
      <span className="absolute top-8 left-8 text-sm font-semibold tabular-nums text-white/80 sm:left-10">{number}</span>
      <h3 className="text-[clamp(1.6rem,7vw,2.25rem)] leading-[1.05] font-extrabold tracking-tight hyphens-auto">{category.title}</h3>
      <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-white/80">{category.text}</p>
      <Tags tags={category.tags} />
    </article>
  );
}

export function Assortiment() {
  return (
    <section id="assortiment" aria-labelledby="assortiment-title" className="bg-paper pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="assortiment-title"
            eyebrow="Assortiment"
            title={
              <>
                Alles voor op de werf.
                <br className="hidden sm:block" /> En daarbuiten.
              </>
            }
          />
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-lg leading-relaxed text-muted">
              Een compleet assortiment werkkleding voor elke sector: broeken, jassen, shirts, veiligheidsschoenen en
              accessoires.
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-12">
          {categories.map((category, i) => (
            <StaggerItem as="li" key={category.title} className={cn("flex min-w-0", layout[i])}>
              <div className="w-full min-w-0">
                <CategoryCard category={category} index={i} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
