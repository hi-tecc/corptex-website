"use client";

import { useSyncExternalStore } from "react";

import { openingHours } from "@/content/site";
import { cn } from "@/lib/cn";

const noopSubscribe = () => () => {};

/** Opening hours table; highlights today (client-only to avoid hydration mismatches in the static export). */
export function OpeningHours({ dark, className }: { dark?: boolean; className?: string }) {
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getDay(),
    () => null,
  );

  return (
    <dl className={cn("divide-y", dark ? "divide-white/10" : "divide-line", className)}>
      {openingHours.map((row) => {
        const isToday = today !== null && row.dayIndex.includes(today);
        return (
          <div key={row.day} className="flex items-center justify-between gap-4 py-3">
            <dt className={cn("flex items-center gap-2", isToday && "font-semibold")}>
              {row.day}
              {isToday && (
                <span className="rounded-full bg-hivis px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-ink uppercase">
                  Vandaag
                </span>
              )}
            </dt>
            <dd className={cn("tabular-nums", !row.hours && (dark ? "text-white/45" : "text-muted"), isToday && "font-semibold")}>
              {row.hours ?? "Gesloten"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
