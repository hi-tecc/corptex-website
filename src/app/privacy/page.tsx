import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe Corptex omgaat met je persoonsgegevens.",
  alternates: { canonical: "/privacy/" },
};

const { street, postalCode, city } = business.address;

export default function PrivacyPage() {
  return (
    <>
      <Header homeHref="/" />
      <main id="main" className="mx-auto max-w-3xl px-5 pt-40 pb-28 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-muted uppercase">Juridisch</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">Privacyverklaring</h1>
        <p className="mt-6 rounded-2xl bg-hivis/25 p-4 text-sm">
          Concept – deze tekst moet nog nagelezen en goedgekeurd worden door {business.name}.
        </p>

        <div className="mt-12 space-y-10 text-lg leading-relaxed text-charcoal [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
          <section>
            <h2>Wie zijn wij?</h2>
            <p>
              {business.name}, {street}, {postalCode} {city}, is verantwoordelijk voor de verwerking van persoonsgegevens
              via deze website. Vragen? Mail naar{" "}
              <a className="underline" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>Welke gegevens verzamelen we?</h2>
            <p>
              Via het contactformulier vragen we je naam, e-mailadres, onderwerp en bericht. Als je dat aanvinkt, gebruiken
              we je e-mailadres ook om je onze nieuwsbrief te sturen.
            </p>
          </section>
          <section>
            <h2>Waarom gebruiken we die gegevens?</h2>
            <p>
              Enkel om je vraag te beantwoorden, een offerte op te maken of een afspraak in te plannen, en – met je
              toestemming – om je nieuws en acties te sturen. Je kan je op elk moment uitschrijven.
            </p>
          </section>
          <section>
            <h2>Met wie delen we je gegevens?</h2>
            <p>
              We verkopen je gegevens nooit. Berichten via het formulier worden verwerkt door een externe
              formulierendienst die ze naar onze mailbox doorstuurt. De kaart op de contactpagina wordt pas geladen als je
              daar zelf op klikt; op dat moment worden gegevens gedeeld met Google.
            </p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>Deze website gebruikt geen tracking- of advertentiecookies.</p>
          </section>
          <section>
            <h2>Je rechten</h2>
            <p>
              Je hebt het recht om je gegevens in te kijken, te laten verbeteren of te laten verwijderen. Stuur hiervoor een
              mail naar {business.email}. Je kan ook een klacht indienen bij de Gegevensbeschermingsautoriteit
              (www.gegevensbeschermingsautoriteit.be).
            </p>
          </section>
        </div>
      </main>
      <Footer homeHref="/" />
    </>
  );
}
