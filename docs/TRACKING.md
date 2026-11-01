# Tracking implementation guide

The website sends structured events to `window.dataLayer`. **Google Tag Manager (GTM)** reads them and forwards them to GA4 and LinkedIn.
Nothing is hard-coded: you add IDs as environment variables, and tags inside GTM.

## 1. How the pieces fit

```
index.html   → Consent Mode v2 defaults (all denied) → GTM loads (if VITE_GTM_ID set)
src/lib/consent.js      → cookie banner choice → gtag('consent','update') + {event:'consent_update'}
src/lib/attribution.js  → stores first/last-touch UTMs + click IDs in the browser (90 days)
src/lib/analytics.js    → pushes events below; de-duplicates conversions
```

## 2. dataLayer events

| Event | When | Key parameters |
|---|---|---|
| `virtual_page_view` | Every page view, including the first (single-page app) | `page_path`, `page_location`, `page_title` |
| `cta_click` | Any tracked button | `cta_id` (`book_call`, `mini_audit`, `hero_path_ecommerce`…), `cta_location` (`header`, `home_hero`, `ecom_final`…), `cta_destination` |
| `form_start` | First interaction with the mini-audit form | `form_id` |
| **`mini_audit_submitted`** | Form successfully submitted (after the server accepts it) | `event_id`, `business_type`, `ad_spend_range`, `attribution_*`, `first_touch_*` |
| `scheduler_view` | Booking widget loaded | `scheduler` |
| `scheduler_time_selected` | Time slot picked (Calendly) | `scheduler` |
| **`discovery_call_booked`** | Booking confirmed by Calendly/Cal.com | `event_id` (booking ID), `scheduler`, `attribution_*` |
| `whatsapp_click`, `email_click` | Contact links | `link_location` |
| `consent_update` | Visitor saves cookie choice | `consent_analytics`, `consent_marketing` |

### No double-counting
- Conversions fire **only once per `event_id`** (remembered in the visitor's browser). Reloads, double clicks, or Cal.com sending both its v1 and v2 success events can't inflate counts.
- Conversions fire on **confirmed success**, not on button clicks. CTA clicks are separate events (`cta_click`) and should **not** be marked as key events.
- Don't also create GTM triggers on "Form submission", "Thank-you page views" or "Clicks" for these conversions. Use only the custom events above.
- `event_id` is also suitable for de-duplication with the LinkedIn Conversions API or GA4 Measurement Protocol later.

## 3. GTM setup (recommended)

Create a **Web** container, then set `VITE_GTM_ID=GTM-XXXXXXX` and redeploy.

**Variables** (Data Layer Variable type): `page_path`, `page_location`, `page_title`, `cta_id`, `cta_location`, `event_id`, `business_type`, `ad_spend_range`, `scheduler`, `attribution_source`, `attribution_medium`, `attribution_campaign`.

**Triggers** (Custom Event): `virtual_page_view`, `cta_click`, `form_start`, `mini_audit_submitted`, `discovery_call_booked`, `whatsapp_click`.

**Tags**
1. **Google tag (GA4)**: Measurement ID `G-…`. Under configuration settings set `send_page_view` = `false`. Trigger: *Initialization – All Pages*.
2. **GA4 Event `page_view`**: params `page_location`, `page_path`, `page_title`. Trigger: `virtual_page_view`.
3. **GA4 Event `generate_lead`**: params `event_id`, `form_id`=`mini_audit`, `business_type`, `ad_spend_range`. Trigger: `mini_audit_submitted`.
4. **GA4 Event `book_discovery_call`**: params `event_id`, `scheduler`. Trigger: `discovery_call_booked`.
5. **GA4 Event `cta_click`**: params `cta_id`, `cta_location`. Trigger: `cta_click`. (Also optional events for `form_start` and `whatsapp_click`.)
6. **LinkedIn Insight Tag** (template from the Community Template Gallery): Partner ID. Trigger: *All Pages*. **Consent: require `ad_storage`** (Advanced settings → Consent settings).
7. **LinkedIn conversion: Mini-audit**: create a conversion in Campaign Manager (*Conversion tracking → Event-specific*), and fire it on `mini_audit_submitted`. Do the same for `discovery_call_booked`. Require `ad_storage` consent.

Google tags respect Consent Mode automatically. Publish the container, then test with **GTM Preview** and **GA4 DebugView**.

**GA4 admin:** mark `generate_lead` and `book_discovery_call` as **Key events**. Register custom dimensions for `cta_id`, `cta_location`, `business_type`, `ad_spend_range`, `scheduler`.

### Without GTM (fallback)
If `VITE_GTM_ID` is empty, the site can load GA4 (`VITE_GA4_ID`) and the LinkedIn Insight Tag (`VITE_LINKEDIN_PARTNER_ID`, only after marketing consent) directly. Events are mapped automatically (`mini_audit_submitted` → `generate_lead`). **Never set these alongside GTM** if GTM already contains the same tags, or you will double-count.

## 4. Consent

- Defaults (in `index.html`): `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = **denied**.
- Banner choices: *Accept all*, *Essential only*, *Customise* (Analytics → `analytics_storage`; Marketing → ad signals and LinkedIn).
- Stored in `localStorage` under `cdc_consent_v1`, and re-applied before GTM loads on later visits.
- Visitors can change it anytime via **Cookie settings** in the footer.

## 5. UTM conventions for LinkedIn

Keep a simple sheet of every link you share, with its UTMs (as in the plan).

| LinkedIn source | Link to | UTMs |
|---|---|---|
| Profile link / Featured section | `/` | `utm_source=linkedin&utm_medium=profile` |
| Post about e-commerce tracking | `/ecommerce` | `utm_source=linkedin&utm_medium=organic&utm_campaign=post-ecom` |
| Post about lead quality | `/lead-generation` | `utm_source=linkedin&utm_medium=organic&utm_campaign=post-leadgen` |
| Outreach with a Loom mini-audit | `/book-a-call` | `utm_source=linkedin&utm_medium=outreach&utm_campaign=loom` |
| Outreach to a cold prospect | `/free-mini-audit` | `utm_source=linkedin&utm_medium=outreach&utm_campaign=miniaudit` |
| Article or carousel | `/insights/<slug>` | `utm_source=linkedin&utm_medium=organic&utm_campaign=article` |

Use lowercase, hyphens, no spaces. Add `utm_content` to tell posts apart (e.g. `utm_content=2026-11-roas-post`).

The LinkedIn app often hides the referrer, so **always use UTMs**. Attribution data (first and last touch) is attached to every form submission and passed into the scheduler.

## 6. Testing checklist

1. `npm run dev`, then open the console: every action logs `[dataLayer] …`.
2. Visit `/?utm_source=linkedin&utm_medium=profile`, navigate, and submit the form. The conversion should include `attribution_source: linkedin`.
3. In production: GTM Preview → submit one mini-audit and one booking → each conversion appears **once** in GA4 DebugView.
4. Reject cookies → confirm GA4 sends cookieless pings only and LinkedIn does not load.
