"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useLenis } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { business, nav } from "@/content/site";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Sticky header. On the home page it starts transparent on top of the dark hero (`overlay`),
 * becomes solid and more compact once the user scrolls, and hides while scrolling down.
 */
export function Header({ overlay = false, homeHref = "" }: { overlay?: boolean; homeHref?: string }) {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > previous && latest > 400);
  });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const solid = scrolled || !overlay;
  const light = !solid && !open;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding,color] duration-500",
          solid && !open ? "bg-paper/85 py-3 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl" : "py-5",
          light ? "text-white" : "",
          open ? "text-white" : "",
        )}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <SmartLink href={`${homeHref}#top`} aria-label="Corptex – naar boven" className="relative z-10">
            <Logo />
          </SmartLink>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={`${homeHref}${item.href}`}
                    className="group relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 bg-hivis transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <SmartLink
              href={`${homeHref}#contact`}
              className="hidden rounded-full bg-hivis px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ink hover:text-white sm:inline-flex"
            >
              Maak een afspraak
            </SmartLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              className="grid size-11 place-items-center rounded-full border border-current/20 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-navy-900 px-5 pt-28 pb-10 text-white sm:px-8 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <nav aria-label="Mobiele navigatie">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                  >
                    <SmartLink
                      href={`${homeHref}${item.href}`}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-4xl font-extrabold tracking-tight hover:text-hivis"
                    >
                      {item.label}
                    </SmartLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-4">
              <SmartLink
                href={`${homeHref}#contact`}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-hivis px-6 py-4 font-semibold text-ink"
              >
                Maak een afspraak
              </SmartLink>
              <a href={business.phoneHref} className="flex items-center justify-center gap-2 text-white/80">
                <Phone className="size-4" aria-hidden="true" /> {business.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
