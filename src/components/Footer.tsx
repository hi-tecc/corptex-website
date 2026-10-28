import Link from "next/link";

import { OpeningHours } from "@/components/OpeningHours";
import { LogoMark } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { business, nav } from "@/content/site";

export function Footer({ homeHref = "" }: { homeHref?: string }) {
  const { street, postalCode, city, country } = business.address;
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pt-24 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoMark className="size-12 text-hivis" />
            <p className="mt-6 max-w-xs text-2xl font-bold tracking-tight">{business.tagline}.</p>
            <p className="mt-3 max-w-xs text-white/60">Werkkleding met advies op maat in Zwevegem.</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">Menu</h2>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <SmartLink href={`${homeHref}${item.href}`} className="text-white/80 transition-colors hover:text-hivis">
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">Contact</h2>
            <address className="mt-5 space-y-2.5 not-italic text-white/80">
              <p>
                {business.name}
                <br />
                {street}
                <br />
                {postalCode} {city}, {country}
              </p>
              <p>
                <a href={business.phoneHref} className="transition-colors hover:text-hivis">
                  {business.phone}
                </a>
                <br />
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-hivis">
                  {business.email}
                </a>
              </p>
            </address>
            {business.socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3">
                {business.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-white/80 underline-offset-4 hover:text-hivis hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">Openingsuren</h2>
            <OpeningHours dark className="mt-2 text-[0.95rem] text-white/80" />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="font-wide mt-20 text-center text-[clamp(3rem,14.2vw,12.75rem)] leading-[0.8] font-black tracking-tight text-white/[0.06] uppercase select-none"
        >
          Corptex
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Alle rechten voorbehouden.
          </p>
          <Link href="/privacy/" className="transition-colors hover:text-white">
            Privacyverklaring
          </Link>
        </div>
      </div>
    </footer>
  );
}
