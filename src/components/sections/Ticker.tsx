import { LogoMark } from "@/components/ui/Logo";
import { business } from "@/content/site";

const items = [
  business.opening.label,
  "Advies op maat",
  "Logo bedrukking",
  "Offerte voor bedrijven",
  "Topmerken onder één dak",
  `${business.address.street}, ${business.address.city}`,
];

/** Yellow hi-vis strip with an endlessly scrolling line of key messages. */
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 text-lg font-bold tracking-tight whitespace-nowrap uppercase sm:text-xl">
          {item}
          <LogoMark className="size-4 text-ink/80" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-hivis py-4 text-ink">
      <div className="flex w-max animate-marquee [--marquee-duration:35s]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
