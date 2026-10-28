import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";

import { ScrollProgress } from "@/components/ScrollProgress";
import { Providers } from "@/components/providers/Providers";
import { business, openingHours, siteUrl } from "@/content/site";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const title = "Corptex – Werkkleding & veiligheidsschoenen in Zwevegem";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Corptex" },
  description: business.description,
  applicationName: business.name,
  keywords: [
    "werkkleding",
    "veiligheidsschoenen",
    "werkkledij",
    "Zwevegem",
    "Kortrijk",
    "Snickers",
    "Dassy",
    "Fristads",
    "Sievi",
    "logo bedrukking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "/",
    siteName: business.name,
    title,
    description: business.description,
  },
  twitter: { card: "summary_large_image", title, description: business.description },
};

export const viewport: Viewport = {
  themeColor: "#151a59",
  colorScheme: "light",
};

const { street, postalCode, city, countryCode } = business.address;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: business.name,
  slogan: business.tagline,
  description: business.description,
  url: siteUrl,
  email: business.email,
  telephone: business.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: street,
    postalCode,
    addressLocality: city,
    addressCountry: countryCode,
  },
  hasMap: business.mapsUrl,
  openingHoursSpecification: openingHours
    .filter((d) => d.opens && d.schemaDays)
    .map((d) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: d.schemaDays, opens: d.opens, closes: d.closes })),
  ...(business.socials.length ? { sameAs: business.socials.map((s) => s.href) } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl-BE" className={archivo.variable}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-hivis focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Naar de inhoud
        </a>
        <Providers>
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
