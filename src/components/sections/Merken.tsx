import { LogoMark } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/content/site";
import { cn } from "@/lib/cn";

function Row({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const list = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
      {items.map((brand) => (
        <li key={brand} className="flex items-center gap-10 sm:gap-16">
          <span
            className={cn(
              "font-wide text-5xl font-black whitespace-nowrap uppercase tracking-tight transition-colors duration-300 sm:text-7xl lg:text-8xl",
              outline ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] hover:text-ink" : "text-ink hover:text-hivis-600",
            )}
          >
            {brand}
          </span>
          <LogoMark className="size-7 shrink-0 text-hivis sm:size-9" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn("flex w-max group-hover:[animation-play-state:paused]", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        {list()}
        {list(true)}
      </div>
    </div>
  );
}

export function Merken() {
  const half = Math.ceil(brands.length / 2);
  return (
    <section id="merken" aria-labelledby="merken-title" className="overflow-hidden bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="merken-title"
          eyebrow="Merken"
          title={
            <>
              Topmerken.
              <br /> Eén adres.
            </>
          }
        />
        <p className="sr-only">Merken in onze winkel: {brands.join(", ")}.</p>
      </div>
      <div className="mt-16 space-y-6 sm:mt-20 sm:space-y-10" aria-hidden="true">
        <Row items={[...brands.slice(0, half), ...brands.slice(0, half)]} />
        <Row items={[...brands.slice(half), ...brands.slice(half)]} reverse outline />
      </div>
    </section>
  );
}
