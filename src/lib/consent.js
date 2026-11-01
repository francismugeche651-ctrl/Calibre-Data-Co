/**
 * CONSENT (Google Consent Mode v2)
 * -------------------------------------------------------------------------
 * Defaults are set to "denied" in index.html BEFORE any tag loads.
 * This module stores the visitor's choice and sends a consent "update".
 *   analytics → analytics_storage
 *   marketing → ad_storage, ad_user_data, ad_personalization (LinkedIn Insight Tag, ads)
 */
import { readJSON, writeJSON } from './storage'

const KEY = 'cdc_consent_v1'
const listeners = new Set()

export function getConsent() {
  return readJSON(KEY)
}

function gtag() {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

export function setConsent({ analytics, marketing }) {
  const value = { analytics: !!analytics, marketing: !!marketing, ts: Date.now(), v: 1 }
  writeJSON(KEY, value)
  gtag('consent', 'update', {
    analytics_storage: value.analytics ? 'granted' : 'denied',
    ad_storage: value.marketing ? 'granted' : 'denied',
    ad_user_data: value.marketing ? 'granted' : 'denied',
    ad_personalization: value.marketing ? 'granted' : 'denied',
  })
  window.dataLayer.push({ event: 'consent_update', consent_analytics: value.analytics, consent_marketing: value.marketing })
  listeners.forEach((fn) => fn(value))
  return value
}

export function onConsentChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Lets any component (e.g. the footer "Cookie settings" link) reopen the banner.
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent('cdc:open-consent'))
}
