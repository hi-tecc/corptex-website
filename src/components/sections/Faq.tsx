"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, faqs } from "@/content/site";
import { cn } from "@/lib/cn";

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left text-xl font-bold sm:text-2xl"
        >
          <span className="transition-colors group-hover:text-charcoal">{q}</span>
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500",
              open ? "rotate-45 border-hivis bg-hivis" : "border-line group-hover:border-ink",
            )}
          >
            <Plus className="size-5" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pr-16 pb-8 text-lg leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Veelgestelde vragen." />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                Staat je vraag er niet tussen? {business.contactPerson} helpt je graag verder.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={business.phoneHref} variant="dark">
                  Bel {business.contactPerson}
                </ButtonLink>
                <ButtonLink href="#contact" variant="outline-dark">
                  Stuur een bericht
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
        <Stagger className="border-t border-line lg:col-span-7">
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.q}>
              <Item q={faq.q} a={faq.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
