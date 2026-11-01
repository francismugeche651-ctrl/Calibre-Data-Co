# Calibre Data Co: website

Measurement-led growth for e-commerce and lead-generation brands.

A fast, mobile-first marketing site built to turn LinkedIn visitors into **booked discovery calls** and **free mini-audit requests**, and tracked properly, so the site itself shows the method we sell.

**Stack:** React 19 · Vite · Tailwind CSS v4 · React Router · Lucide icons · Netlify (hosting + forms)

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env      # then fill in what you have
npm run dev               # opens http://localhost:5173
```

In development:
- Form submissions are **simulated** (nothing is sent) and logged in the browser console.
- Every tracking event is printed in the console as `[dataLayer] …`.
- The Book a Call page has a "simulate a booking" link to test conversion tracking.

To check the production build:

```bash
npm run build && npm run preview
```

---

## 2. Deploy to Netlify

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project →** pick the repo.
   The build settings are read from `netlify.toml` (build: `npm run build`, publish: `dist`).
3. **Site configuration → Environment variables:** add the values from `.env.example` (at least `VITE_SITE_URL`).
4. **Forms:** go to **Forms** and click **Enable form detection**, then redeploy.
   Then set up **Form notifications → Email** so each mini-audit request reaches your inbox.
5. **Domain:** add your domain under **Domain management**, then set `VITE_SITE_URL` to it and redeploy.
6. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.

> Environment variables are baked in at build time. **After changing one, trigger a new deploy.**

---

## 3. Configuration (`.env` / Netlify environment variables)

| Variable | What it does | Example |
|---|---|---|
| `VITE_SITE_URL` | Live domain, used for canonical URLs, sitemap and link previews | `https://calibredata.com` |
| `VITE_CONTACT_EMAIL` | Email shown in the footer and as a fallback | `hello@calibredata.com` |
| `VITE_WHATSAPP_NUMBER` | Enables the floating WhatsApp button (digits only, with country code) | `2547XXXXXXXX` |
| `VITE_LINKEDIN_COMPANY_URL` / `VITE_LINKEDIN_FOUNDER_URL` | LinkedIn links | |
| `VITE_SCHEDULER_PROVIDER` | `calendly` or `cal` | `calendly` |
| `VITE_SCHEDULER_URL` | Calendly event URL or Cal.com link | `https://calendly.com/you/discovery-call` |
| `VITE_GTM_ID` | Google Tag Manager container (recommended) | `GTM-XXXXXXX` |
| `VITE_GA4_ID` | GA4, **only used if no GTM ID** | `G-XXXXXXXXXX` |
| `VITE_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag, **only used if no GTM ID** | |
| `VITE_FORM_PROVIDER` | `netlify` (default) or `webhook` | `netlify` |
| `VITE_FORM_WEBHOOK_URL` | Endpoint for `webhook` mode (Make, Zapier, n8n…) | |

Anything empty is switched off gracefully. All `VITE_` values are public, so **never put API keys or passwords in them**.

---

## 4. Editing the site

| To change… | Edit |
|---|---|
| Page text and copy | `src/content/*.js` (one file per page: `home.js`, `ecommerce.js`, `leadgen.js`, `howWeWork.js`, `about.js`) |
| Shared text: pillars, process, CTA labels, pricing note, agency note | `src/content/shared.js` |
| Page titles and meta descriptions | `src/config/seo.js` |
| Menu and footer links | `src/config/navigation.js` |
| Founder name/photo, location, pricing | `src/config/site.js` |
| Colours and fonts | top of `src/index.css` (`@theme` block) |
| Case studies | `src/content/results.js` (template inside) |
| Insights articles | `src/content/insights.js` |
| Form dropdown options | `src/content/forms.js` |

**Placeholders.** Search the project for `[PLACEHOLDER` to find everything you still need to supply:
founder name, photo and story, founder quote, location, logo, and the privacy and terms details.

**Founder photo:** add a square, compressed image (about 600×600 WebP, under 80 KB) to `public/`, e.g. `public/founder.webp`, and set `photo: '/founder.webp'` in `src/config/site.js`.

**Logo:** the current mark is a placeholder in `src/components/ui/BrandIcons.jsx` (`Logo`) and `public/favicon.svg`. `public/og-image.png` (1200×630) is the LinkedIn link-preview image. Replace it with your own.

**Suggested defaults to confirm:** timelines (audit ≈ 2 weeks, setup ≈ 3–6 weeks), the ad-spend ranges, and the "What we look at" list on the mini-audit page.

**Working with Claude:** see `CLAUDE.md`. Ask things like *"Change the e-commerce hero headline to …"* or *"Add a case study for …"*.

---

## 5. Scheduler (Book a Call)

1. Create a 30-minute "Discovery call" event in Calendly or Cal.com.
2. Add the **three qualifying questions** (also listed on the Book a Call page):
   1. What does your business sell, and what is your website?
   2. Roughly how much do you spend on ads each month?
   3. What's the one number you don't trust right now?
3. Set `VITE_SCHEDULER_PROVIDER` and `VITE_SCHEDULER_URL`, then redeploy.

UTM parameters are passed into the scheduler, so each booking keeps its LinkedIn source.
Until a URL is set, the page shows a clearly labelled placeholder with email and WhatsApp fallbacks.

---

## 6. Forms (Free Mini-Audit)

Fields: name, work email, website, business type, monthly ad spend range, main question.
Hidden fields are attached automatically: last- and first-touch UTMs, landing page, referrer, click ID, page path, submission ID.

- **Netlify Forms (default):** no backend. Submissions show in Netlify → Forms. Use Netlify's email notification, or Zapier/Make to push them into HubSpot (map the UTM fields to contact properties, so you "store UTM source on every lead").
- **Webhook:** set `VITE_FORM_PROVIDER=webhook` and `VITE_FORM_WEBHOOK_URL`. The form POSTs JSON straight to that URL (it must allow cross-origin requests; Make, Zapier and n8n do).

If you add a field to the React form, also add it to the hidden form at the bottom of `index.html` so Netlify recognises it.
Spam protection: honeypot field (`bot-field`). You can also enable reCAPTCHA in Netlify.

---

## 7. Tracking and analytics

Full setup guide: **[`docs/TRACKING.md`](docs/TRACKING.md)** (GTM tags, GA4 key events, LinkedIn conversions, UTM conventions).

In short:
- Consent Mode v2 defaults to **denied**. The cookie banner updates consent, and the footer "Cookie settings" link reopens it.
- The site pushes clean `dataLayer` events: `virtual_page_view`, `cta_click`, `form_start`, `mini_audit_submitted`, `scheduler_view`, `discovery_call_booked`, `whatsapp_click`, `email_click`.
- The two conversions carry a unique `event_id` and fire **at most once per ID**, so double clicks, reloads and duplicate scheduler messages never double-count.

---

## 8. Project structure

```
index.html                 Consent defaults, GTM loader, Netlify form detection
netlify.toml               Build, redirects, caching and security headers
scripts/postbuild.mjs      Per-page SEO HTML, sitemap.xml, robots.txt
public/                    favicon, og-image, (your founder photo)
src/
  config/                  site.js (settings), seo.js, navigation.js
  content/                 ALL page copy lives here
  lib/                     analytics, consent, attribution (UTMs), forms
  components/
    layout/                Header, Footer, ConsentBanner, WhatsAppButton
    ui/                    Button, CTA buttons, layout primitives, icons, SEO
    sections/              Reusable page sections (hero, offers, FAQ, final CTA…)
    diagrams/              Reconciliation visual, closed-loop diagram
    forms/                 Mini-audit form, scheduler embed
  pages/                   One file per page
docs/TRACKING.md           Analytics implementation guide
```

---

## 9. Launch checklist

- [ ] Replace all `[PLACEHOLDER` content (founder, story, quote, location, legal pages)
- [ ] Logo, favicon and `og-image.png`
- [ ] Environment variables set in Netlify and site redeployed
- [ ] Netlify form detection enabled, plus an email notification
- [ ] Scheduler connected, with the three questions added
- [ ] GTM container published (see `docs/TRACKING.md`), and GA4 key events marked
- [ ] Test on a mid-range Android phone over mobile data
- [ ] Submit a test mini-audit and a test booking end to end, and confirm each conversion appears **once** in GA4 DebugView
- [ ] Privacy policy and terms reviewed by a professional
- [ ] Sitemap submitted in Google Search Console
