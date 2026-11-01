# Calibre Data Co website: notes for Claude

Marketing site for a measurement consultancy. React 19 + Vite + Tailwind v4 + React Router, deployed on Netlify.

## Where things live
- **Copy:** `src/content/*.js`. Prefer editing content files over JSX when changing text.
- **Settings and env:** `src/config/site.js` (reads `VITE_*` vars), SEO in `src/config/seo.js`, nav in `src/config/navigation.js`.
- **Design tokens:** `@theme` block at the top of `src/index.css` (ink / paper / signal / caution colours, Geist fonts).
- **Tracking:** `src/lib/analytics.js` (dataLayer events, conversion de-duplication), `consent.js`, `attribution.js`. Guide in `docs/TRACKING.md`.

## Rules
- Never invent testimonials, case studies, statistics, client names or certifications. Use `[PLACEHOLDER: …]` for missing facts. Case studies go in `src/content/results.js` only when real.
- Every important page ends with `<FinalCta location="…" />` (Book a discovery call + Get a free mini-audit).
- Buttons that matter use `Button`/`BookCallButton`/`MiniAuditButton` with a `trackLocation` so clicks are tracked. Conversions use `trackConversion(event, uniqueId)` only on confirmed success.
- New page: add the route in `src/App.jsx`, an entry in `src/config/seo.js` (title + description), and nav/footer links if needed. `scripts/postbuild.mjs` picks up SEO entries automatically.
- New mini-audit form field: also add it to the hidden Netlify form in `index.html`.
- `src/config/seo.js` and `src/content/insights.js` must stay plain JS (no JSX or imports), because Node reads them at build time.
- Voice: precise, plain-spoken, confident. Explain jargon in one line. No AI hype.
- Keep it light: mobile-first, no heavy images or video; test at 390px width.

## Commands
`npm run dev` · `npm run build` (includes postbuild) · `npm run preview`
