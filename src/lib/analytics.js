/**
 * ANALYTICS & CONVERSION TRACKING
 * -------------------------------------------------------------------------
 * Everything goes through window.dataLayer. Google Tag Manager (recommended)
 * reads these events and forwards them to GA4 and LinkedIn. See docs/TRACKING.md.
 *
 * dataLayer events this site sends:
 *   virtual_page_view      every page view (including the first)
 *   cta_click              any tracked button/link (cta_id, cta_location)
 *   form_start             first interaction with the mini-audit form
 *   mini_audit_submitted   KEY EVENT: mini-audit form successfully submitted
 *   scheduler_view         booking widget loaded
 *   scheduler_time_selected visitor picked a slot (Calendly only)
 *   discovery_call_booked  KEY EVENT: booking confirmed by the scheduler
 *   whatsapp_click / email_click
 *   consent_update
 *
 * Double-counting protection: conversions carry a unique event_id and are
 * sent at most once per id (remembered in the browser), so reloads,
 * double clicks or repeated scheduler messages never count twice.
 */
import { site } from '../config/site'
import { getAttribution } from './attribution'
import { getConsent, onConsentChange } from './consent'
import { readJSON, writeJSON } from './storage'

const FIRED_KEY = 'cdc_conversions_fired'
let lastPageKey = null
const debug = import.meta.env.DEV

function push(payload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  if (debug) console.info('[dataLayer]', payload)
  // Fallback mode only (no GTM): forward events straight to GA4.
  if (!site.tracking.gtmId && site.tracking.ga4Id && typeof window.gtag === 'function' && payload.event) {
    const { event, ...params } = payload
    const map = { virtual_page_view: 'page_view', mini_audit_submitted: 'generate_lead' }
    window.gtag('event', map[event] || event, params)
  }
}

export function trackPageView(key, path) {
  if (key === lastPageKey) return // React StrictMode / re-render guard
  lastPageKey = key
  // Let the page component set its <title> first.
  setTimeout(() => {
    push({
      event: 'virtual_page_view',
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, 0)
}

export function trackEvent(event, params = {}) {
  push({ event, ...params })
}

export function trackCta({ id, text, location, destination }) {
  push({ event: 'cta_click', cta_id: id, cta_text: text, cta_location: location, cta_destination: destination })
}

/**
 * Send a conversion exactly once per eventId.
 * Returns true if sent, false if it was a duplicate.
 */
export function trackConversion(event, eventId, params = {}) {
  const fired = readJSON(FIRED_KEY) || []
  const key = `${event}:${eventId}`
  if (fired.includes(key)) {
    if (debug) console.info('[dataLayer] duplicate conversion ignored', key)
    return false
  }
  writeJSON(FIRED_KEY, [...fired.slice(-49), key])
  const a = getAttribution()
  push({
    event,
    event_id: eventId,
    ...params,
    attribution_source: a.utm_source,
    attribution_medium: a.utm_medium,
    attribution_campaign: a.utm_campaign,
    first_touch_source: a.first_utm_source,
    first_touch_campaign: a.first_utm_campaign,
  })
  return true
}

/* ---- Fallback loaders (used ONLY when no GTM container is configured) ---- */

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

let ga4Loaded = false
let liLoaded = false

function loadFallbackTags(consent) {
  const { ga4Id, linkedinPartnerId } = site.tracking
  if (ga4Id && !ga4Loaded) {
    ga4Loaded = true
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`)
    window.gtag('js', new Date())
    window.gtag('config', ga4Id, { send_page_view: false })
    // Fire the page view for the current page, now that GA4 exists.
    window.gtag('event', 'page_view', { page_path: window.location.pathname, page_location: window.location.href, page_title: document.title })
  }
  if (linkedinPartnerId && consent?.marketing && !liLoaded) {
    liLoaded = true
    window._linkedin_partner_id = linkedinPartnerId
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
    window._linkedin_data_partner_ids.push(linkedinPartnerId)
    loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js')
  }
}

export function initAnalytics() {
  if (site.tracking.gtmId) return // GTM is loaded from index.html
  if (!site.tracking.ga4Id && !site.tracking.linkedinPartnerId) return
  // GA4 respects Consent Mode (cookieless pings until analytics consent is granted).
  loadFallbackTags(getConsent())
  onConsentChange(loadFallbackTags)
}
