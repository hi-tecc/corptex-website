import type { StaticImageData } from "next/image";

import dassyWerf from "@/assets/images/dassy-werf.jpg";
import fristads from "@/assets/images/fristads.jpg";
import safetyJoggerHivis from "@/assets/images/safety-jogger-hivis.jpg";
import sievi from "@/assets/images/sievi.jpg";
import snickersHigvis from "@/assets/images/snickers-higvis.jpg";
import snickers from "@/assets/images/snickers.jpg";
import snickersWinterjas from "@/assets/images/snickers-winterjas.jpg";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://corptex.be";

export const business = {
  name: "Corptex",
  tagline: "Partner in werkkledij",
  description:
    "Werkkleding, veiligheidsschoenen en accessoires met advies op maat in Zwevegem. Topmerken als Snickers, Dassy, Fristads en Sievi onder één dak.",
  contactPerson: "Kylie",
  email: "kylie@corptex.be",
  phone: "+32 497 04 08 69",
  phoneHref: "tel:+32497040869",
  whatsappHref: "https://wa.me/32497040869",
  address: {
    street: "Deerlijkstraat 185",
    postalCode: "8550",
    city: "Zwevegem",
    country: "België",
    countryCode: "BE",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Corptex%2C+Deerlijkstraat+185%2C+8550+Zwevegem",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Deerlijkstraat+185,+8550+Zwevegem,+Belgi%C3%AB&output=embed",
  opening: {
    label: "Opening januari 2027",
    note: "Vanaf december starten we met beperkte openingsuren. Daarbuiten ben je altijd welkom op afspraak.",
  },
  // Add social profiles once available, e.g. { label: "Instagram", href: "https://instagram.com/corptex" }
  socials: [] as { label: string; href: string }[],
};

export type OpeningDay = {
  day: string;
  /** Date#getDay() values: 0 = zondag … 6 = zaterdag */
  dayIndex: number[];
  hours: string | null;
  opens?: string;
  closes?: string;
  schemaDays?: string[];
};

export const openingHours: OpeningDay[] = [
  { day: "Maandag – Dinsdag", dayIndex: [1, 2], hours: "13:00 – 18:00", opens: "13:00", closes: "18:00", schemaDays: ["Monday", "Tuesday"] },
  { day: "Woensdag", dayIndex: [3], hours: null },
  { day: "Donderdag", dayIndex: [4], hours: "13:00 – 19:00", opens: "13:00", closes: "19:00", schemaDays: ["Thursday"] },
  { day: "Vrijdag", dayIndex: [5], hours: "13:00 – 18:00", opens: "13:00", closes: "18:00", schemaDays: ["Friday"] },
  { day: "Zaterdag", dayIndex: [6], hours: "06:30 – 12:00", opens: "06:30", closes: "12:00", schemaDays: ["Saturday"] },
  { day: "Zondag", dayIndex: [0], hours: null },
];

export const nav = [
  { label: "Over ons", href: "#over-ons" },
  { label: "Assortiment", href: "#assortiment" },
  { label: "Diensten", href: "#diensten" },
  { label: "Merken", href: "#merken" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Werkkleding · Zwevegem",
  title: ["Ontdek jouw", "perfecte", "werkkleding."],
  intro:
    "Bij Corptex in Zwevegem krijg je advies op maat en de beste oplossingen voor elke klant. Kwaliteit die het werk aankan, met een stijl die je graag draagt.",
  image: snickersHigvis,
  imageAlt: "Vakman in een zwarte Snickers werkjas met reflecterende hi-vis banden",
};

export const about = {
  eyebrow: "Over ons",
  title: "Stijlvolle werkkleding op maat.",
  statement:
    "Met een achtergrond in de modesector en een passie voor de bouwsector streven we in onze winkel in Zwevegem naar advies op maat voor elke klant.",
  body: "Ons team staat klaar om de beste oplossing te vinden die aansluit bij jouw behoeften. Ontdek onze collectie hoogwaardige werkkleding die zowel functioneel als modieus is.",
  image: dassyWerf,
  imageAlt: "Bouwvakker in Dassy werkkleding voor een wiellader op de werf",
  pillars: [
    { title: "Oog voor stijl", text: "Een achtergrond in mode: werkkleding die er ook goed uitziet." },
    { title: "Hart voor de bouw", text: "We kennen de werf en weten wat je kleding moet aankunnen." },
    { title: "Advies op maat", text: "Persoonlijk advies over pasvorm, materiaal en bescherming." },
  ],
};

export type Category = {
  title: string;
  text: string;
  image?: StaticImageData;
  imageAlt?: string;
  tags: string[];
};

export const categories: Category[] = [
  {
    title: "Veiligheidsschoenen",
    text: "Kies uit ons assortiment hoogwaardige veiligheidsschoenen voor comfort en bescherming.",
    image: sievi,
    imageAlt: "Sievi veiligheidsschoen in actie op een werf",
    tags: ["Comfort", "Bescherming"],
  },
  {
    title: "Werkbroeken",
    text: "Stevige werkbroeken met knie- en holsterzakken, gemaakt om elke dag mee te bewegen.",
    image: snickers,
    imageAlt: "Drie vakmensen in zwarte Snickers werkbroeken en veiligheidsschoenen",
    tags: ["Kniezakken", "Stretch"],
  },
  {
    title: "Winterjassen & softshells",
    text: "Ontdek kwalitatieve winterjassen & softshells voor optimale werkprestaties en professionele uitstraling.",
    image: fristads,
    imageAlt: "Man in een donkerblauwe Fristads regenjas met kap",
    tags: ["Warm", "Weerbestendig"],
  },
  {
    title: "Signalisatiekleding",
    text: "Gezien worden is veilig werken. Hi-vis jassen, broeken en hesjes voor op de werf en langs de weg.",
    image: safetyJoggerHivis,
    imageAlt: "Vakman in fluo gele hi-vis kleding op een hoogtewerker",
    tags: ["Hi-vis", "Reflecterend"],
  },
  {
    title: "Accessoires",
    text: "Handschoenen, petten, veiligheidsbrillen en meer: de perfecte afwerking van je werkoutfit.",
    tags: ["Handschoenen", "Petten", "Veiligheidsbrillen"],
  },
];

export const services = [
  {
    number: "01",
    title: "Logo bedrukking & personalisatie",
    text: "Zet je bedrijf in de kijker. We personaliseren werkkleding met jouw logo, zodat je hele team professioneel en herkenbaar voor de dag komt.",
    points: ["Bedrukking van logo's", "Voor teams van elke grootte", "Eén aanspreekpunt"],
    image: snickersWinterjas,
    imageAlt: "Grijze Snickers softshell jas",
  },
  {
    number: "02",
    title: "Advies & pasvorm",
    text: "Kom langs en pas in alle rust. We helpen je de juiste maat en het juiste model te kiezen, afgestemd op je job en je werkomgeving.",
    points: ["Persoonlijk advies in de winkel", "Pasvorm per merk", "Ook op afspraak"],
    image: snickers,
    imageAlt: "Vakmensen in Snickers werkbroeken",
  },
  {
    number: "03",
    title: "Offerte op maat voor bedrijven",
    text: "Kleed je volledige ploeg in één keer aan. Je krijgt een voorstel op maat van jullie noden, sector en budget.",
    points: ["Voorstel op maat", "Vaste contactpersoon", "Persoonlijke opvolging"],
    image: dassyWerf,
    imageAlt: "Bouwvakker in Dassy werkkleding",
  },
];

export const brands = [
  "Snickers",
  "Dassy",
  "Carhartt",
  "Safety Jogger",
  "Sievi",
  "Sixton",
  "Solid Gear",
  "Puma",
  "Fristads",
];

export const usps = [
  {
    title: "Afhaalsas",
    text: "Bestelling klaar? Haal ze vlot op via onze afhaalsas.",
  },
  {
    title: "Kwaliteitsgarantie",
    text: "Enkel merken die hun kwaliteit op de werf bewezen hebben. Daar staan we voor.",
  },
  {
    title: "Offerte op maat",
    text: "Voor bedrijven en teams maken we een voorstel dat past bij jullie noden.",
  },
];

export const stats = [
  { value: 9, suffix: "+", label: "topmerken onder één dak" },
  { value: 5, suffix: "", label: "dagen per week open" },
  { value: 100, suffix: "%", label: "advies op maat" },
];

export const faqs = [
  {
    q: "Welke soorten werkkleding bieden jullie aan?",
    a: "We bieden een compleet assortiment werkkleding voor elke sector aan in de winkel, zoals broeken, jassen, shirts en veiligheidsschoenen.",
  },
  {
    q: "Kunnen jullie werkkleding bedrukken met een logo?",
    a: "Ja, we bieden personalisatiediensten aan, inclusief het bedrukken van logo's op werkkleding.",
  },
  {
    q: "Hoe kies ik de juiste maat werkkleding?",
    a: "Raadpleeg de maattabel op de website van de leverancier voor gedetailleerde maatinformatie en pasvormadvies. Of kom langs in onze winkel, we helpen je graag verder.",
  },
  {
    q: "Bieden jullie ook accessoires aan die bij werkkleding passen?",
    a: "Ja, we hebben een selectie accessoires zoals handschoenen, petten en veiligheidsbrillen in ons assortiment.",
  },
];
