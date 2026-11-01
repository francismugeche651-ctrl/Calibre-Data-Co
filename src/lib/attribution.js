/**
 * UTM / CLICK-ID ATTRIBUTION
 * -------------------------------------------------------------------------
 * Captures UTM parameters and click IDs when a visitor lands, keeping:
 *   - first touch: the first source we ever saw for this browser (90 days)
 *   - last touch:  the most recent campaign-tagged visit
 * These are attached to form submissions and conversion events so every
 * lead can be traced back to the LinkedIn post or message that produced it.
 * Data stays in the visitor's browser until they submit a form.
 */
import { readJSON, writeJSON } from './storage'

const KEY = 'cdc_attribution_v1'
const TTL_MS = 90 * 24 * 60 * 60 * 1000
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id']

function referrerTouch() {
  const ref = document.referrer
  if (!ref) return { utm_source: '(direct)', utm_medium: '(none)' }
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (host === window.location.hostname.replace(/^www\./, '')) return null
    const medium = /linkedin|lnkd/.test(host) ? 'social' : /google|bing|duckduckgo|yahoo/.test(host) ? 'organic' : 'referral'
    return { utm_source: /lnkd/.test(host) ? 'linkedin' : host, utm_medium: medium }
  } catch {
    return null
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  const now = Date.now()
  let data = readJSON(KEY)
  if (data && now - (data.first?.ts || 0) > TTL_MS) data = null

  const qs = new URLSearchParams(window.location.search)
  const tagged = {}
  PARAMS.forEach((p) => {
    const v = qs.get(p)
    if (v) tagged[p] = v.slice(0, 200)
  })
  const base = { landing_page: window.location.pathname, referrer: document.referrer || '', ts: now }

  if (Object.keys(tagged).length) {
    const touch = { ...tagged, ...base }
    data = { first: data?.first || touch, last: touch }
  } else if (!data) {
    const ref = referrerTouch()
    if (ref) data = { first: { ...ref, ...base }, last: null }
  }
  if (data) writeJSON(KEY, data)
}

export function getAttribution() {
  const data = readJSON(KEY) || {}
  const first = data.first || {}
  const last = data.last || first
  return {
    utm_source: last.utm_source || '',
    utm_medium: last.utm_medium || '',
    utm_campaign: last.utm_campaign || '',
    utm_content: last.utm_content || '',
    utm_term: last.utm_term || '',
    first_utm_source: first.utm_source || '',
    first_utm_medium: first.utm_medium || '',
    first_utm_campaign: first.utm_campaign || '',
    landing_page: first.landing_page || '',
    referrer: first.referrer || '',
    click_id: last.gclid || last.li_fat_id || last.fbclid || '',
  }
}
