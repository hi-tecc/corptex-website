"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import { business } from "@/content/site";
import { cn } from "@/lib/cn";

/** Google Maps is only loaded after an explicit click (no third-party cookies by default). */
export function MapEmbed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const { street, postalCode, city } = business.address;

  return (
    <div
      className={cn("relative aspect-square overflow-hidden rounded-[1.75rem] bg-paper sm:aspect-[16/8]", className)}
    >
      {loaded ? (
        <iframe
          title={`Kaart: ${business.name}, ${street}, ${postalCode} ${city}`}
          src={business.mapsEmbedUrl}
          className="absolute inset-0 size-full border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:22px_22px]">
          <span className="grid size-14 place-items-center rounded-full bg-hivis text-ink shadow-lg">
            <MapPin className="size-6" aria-hidden="true" />
          </span>
          <p className="font-semibold">
            {street}, {postalCode} {city}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Kaart laden
            </button>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-ink"
            >
              Open in Google Maps
            </a>
          </div>
          <p className="max-w-xs text-xs text-muted">Bij het laden van de kaart worden gegevens gedeeld met Google.</p>
        </div>
      )}
    </div>
  );
}
