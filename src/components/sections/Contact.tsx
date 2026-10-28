import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { OpeningHours } from "@/components/OpeningHours";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/site";
import { contactFormEnabled } from "@/lib/features";

const { street, postalCode, city } = business.address;

const channels = [
  { icon: Phone, label: "Bel ons", value: business.phone, href: business.phoneHref },
  { icon: Mail, label: "Mail", value: business.email, href: `mailto:${business.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Stuur een bericht", href: business.whatsappHref, external: true },
  { icon: MapPin, label: "Winkel", value: `${street}, ${postalCode} ${city}`, href: business.mapsUrl, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper-2 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="contact-title" eyebrow="Contact" title="Kom langs of maak een afspraak." />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Bezoek onze winkel vrijblijvend! We helpen je ook graag telefonisch of via mail verder. Vraag naar{" "}
                {business.contactPerson}.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {channels.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white transition-colors duration-300 group-hover:bg-hivis">
                        <Icon className="size-[1.1rem]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold tracking-wide text-muted uppercase">{label}</span>
                        <span className="block truncate font-semibold">{value}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <h3 className="mt-12 text-xl font-bold">Openingsuren</h3>
              <OpeningHours className="mt-3" />
              <p className="mt-4 rounded-2xl bg-hivis/25 p-4 text-sm leading-relaxed">
                <strong>{business.opening.label}.</strong> {business.opening.note}
              </p>
            </Reveal>
          </div>

          {contactFormEnabled ? (
            <div className="space-y-5 lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-[2rem] bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] sm:p-10">
                  <h3 className="text-2xl font-extrabold tracking-tight">Stuur ons een bericht</h3>
                  <p className="mt-2 mb-8 text-muted">Vraag een offerte, maak een afspraak of stel gewoon je vraag.</p>
                  <ContactForm />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <MapEmbed />
              </Reveal>
            </div>
          ) : (
            <div className="lg:col-span-7">
              <Reveal delay={0.1} className="h-full">
                <MapEmbed className="lg:aspect-auto lg:h-full lg:min-h-[28rem]" />
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
