# corptex.be

Nieuwe website voor **Corptex** – werkkleding, veiligheidsschoenen en accessoires met advies op maat in Zwevegem.
Eén lange, geanimeerde pagina (Over ons, Assortiment, Diensten, Merken, Waarom Corptex, FAQ, Contact) plus een privacypagina.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript) als **statische export** (`out/`) – geen server nodig
- [Tailwind CSS 4](https://tailwindcss.com) – design tokens in `src/app/globals.css`
- [Motion](https://motion.dev) voor scroll-animaties (reveals, parallax, sticky "Diensten", tellers)
- [Lenis](https://lenis.darkroom.engineering) voor smooth scrolling
- Archivo via `next/font`, iconen via `lucide-react`
- SEO: Metadata API, OpenGraph, `sitemap.xml`, `robots.txt` en LocalBusiness (ClothingStore) JSON-LD
- Alle animaties respecteren `prefers-reduced-motion`; zonder JavaScript blijft alle inhoud zichtbaar

## Aan de slag

Vereist Node.js ≥ 20.9 (aanbevolen: 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commando            | Wat het doet                                                |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Ontwikkelserver met hot reload                              |
| `npm run build`     | Productiebuild → statische site in `out/`                   |
| `npm run preview`   | Serveert `out/` lokaal (na `npm run build`)                 |
| `npm run lint`      | ESLint                                                      |
| `npm run typecheck` | TypeScript-controle                                         |

## Inhoud aanpassen

- **Alle teksten, openingsuren, contactgegevens, merken en FAQ** staan in [`src/content/site.ts`](src/content/site.ts).
- **Foto's** staan in `src/assets/images/` en worden in `site.ts` geïmporteerd. Vervang een bestand (zelfde naam) of
  importeer een nieuw bestand. Gebruik bij voorkeur JPG/WebP van max. ±1600 px breed.
- **Logo**: `src/components/ui/Logo.tsx` (SVG-beeldmerk + woordmerk) en `src/app/icon.svg` (favicon).
- **Social media**: vul `business.socials` in `site.ts` in; links verschijnen dan automatisch in de footer en JSON-LD.
- **Kleuren & typografie**: `src/app/globals.css` (`--color-hivis`, `--color-navy`, …).

## Configuratie (omgevingsvariabelen)

Kopieer `.env.example` naar `.env.local` en vul in waar nodig:

| Variabele                   | Doel                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | Publieke URL (canonical, sitemap, OpenGraph). Standaard `https://corptex.be`                     |
| `NEXT_PUBLIC_BASE_PATH`     | Subpad als de site niet op de root draait (bv. `/corptex-website` op GitHub Pages)              |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpoint van het contactformulier ([Formspree](https://formspree.io) of [Web3Forms](https://web3forms.com)) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Enkel voor Web3Forms: de (publieke) access key                                                   |

Het contactformulier is **verborgen** zolang `NEXT_PUBLIC_FORM_ENDPOINT` leeg is: de contactsectie toont dan enkel telefoon, mail, WhatsApp, openingsuren en de kaart, en de privacyverklaring vermeldt het formulier niet. Vul je de variabele in en bouw je de site opnieuw, dan verschijnt het formulier automatisch.

## Deployen

De build is een map met statische bestanden (`out/`) en kan op elke statische host draaien.

### GitHub Pages (workflow inbegrepen)

1. Repo → **Settings → Pages** → Source: **GitHub Actions**.
2. Optioneel onder **Settings → Secrets and variables → Actions → Variables**:
   - `DEPLOY_PAGES=true` → automatisch deployen bij elke push naar `main` (anders enkel manueel via *Actions → Deploy to GitHub Pages → Run workflow*)
   - `FORM_ENDPOINT`, `WEB3FORMS_KEY`, `SITE_URL`
3. Het subpad (`/corptex-website`) wordt automatisch ingesteld. Zodra er een custom domain (corptex.be) is ingesteld
   onder Settings → Pages, valt het subpad automatisch weg.

> GitHub Pages voor een **private** repo vereist een betaald GitHub-plan. Anders: Vercel/Netlify/Cloudflare Pages.

### Vercel / Netlify / Cloudflare Pages

Importeer de repo, build command `npm run build`, output directory `out`. Zet de `NEXT_PUBLIC_*` variabelen in het dashboard.

### Domein overzetten (one.com → nieuwe host)

Het domein blijft bij one.com; enkel de DNS-records wijzigen:

- **GitHub Pages**: `A`-records voor `corptex.be` naar `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
  `185.199.111.153` en een `CNAME` `www` → `<owner>.github.io`. Stel daarna het custom domain in en activeer *Enforce HTTPS*.
- **Vercel/Netlify**: volg de DNS-instructies in hun dashboard.
- Laat de **MX-records** (e-mail @corptex.be) ongemoeid!

CI (`.github/workflows/ci.yml`) draait lint, typecheck en build op elke push en pull request.

## Nog nodig van de eigenaar

- [ ] **Logo** als SVG (huidige versie is een nagetekende benadering) + eventueel huisstijlgids
- [ ] **Eigen foto's** van de winkel, het team en producten (nu tijdelijke merkbeelden van de huidige site)
- [ ] **Merklogo's** (SVG) als die i.p.v. tekst in de merkenband moeten
- [ ] **Teksten nalezen** – een deel is nieuw geschreven (beschrijvingen werkbroeken, signalisatiekleding, accessoires,
      diensten, USP's, cijfers). Is het merk "Sixton" (de huidige site schrijft "Sixon")? Wat houdt de "afhaalsas" precies in?
- [ ] **Social media**-links (Instagram, Facebook, LinkedIn, …)
- [ ] **Talen**: enkel Nederlands, of ook Frans/Engels?
- [ ] **Webshop** later gewenst?
- [ ] **Formulier** (staat voorlopig uit): account bij Formspree of Web3Forms aanmaken (gratis) en endpoint/key doorgeven om het aan te zetten
- [ ] **Privacyverklaring** nalezen (staat als concept online)
- [ ] **Domein**: wie beheert de one.com-account? Nodig voor de DNS-wijziging
- [ ] Na de eigen beelden: SEO-/toegankelijkheidsronde en Lighthouse ≥ 95
