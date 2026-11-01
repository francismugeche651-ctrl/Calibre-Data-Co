import { useEffect, useRef, useState } from 'react'
import { CalendarClock, Mail } from 'lucide-react'
import { site, whatsappHref } from '../../config/site'
import { getAttribution } from '../../lib/attribution'
import { trackConversion, trackEvent } from '../../lib/analytics'
import { uid } from '../../lib/storage'
import { WhatsAppIcon } from '../ui/BrandIcons'

/**
 * Embedded booking calendar (Calendly or Cal.com), configured with
 * VITE_SCHEDULER_PROVIDER and VITE_SCHEDULER_URL.
 *
 * Booking confirmation is read from the scheduler's own success event and
 * sent ONCE as `discovery_call_booked` (deduplicated by the booking's ID).
 * UTM values are passed into the scheduler so bookings keep their source.
 */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) { existing.dataset.loaded ? resolve() : existing.addEventListener('load', resolve); return }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => { s.dataset.loaded = '1'; resolve() }
    s.onerror = reject
    document.body.appendChild(s)
  })
}

function useCalendly(ref, url, onBooked, mountId) {
  useEffect(() => {
    if (!url || !ref.current) return
    const a = getAttribution()
    let viewed = false
    loadScript('https://assets.calendly.com/assets/external/widget.js').then(() => {
      if (!ref.current || !window.Calendly) return
      ref.current.innerHTML = ''
      window.Calendly.initInlineWidget({
        url,
        parentElement: ref.current,
        utm: { utmSource: a.utm_source, utmMedium: a.utm_medium, utmCampaign: a.utm_campaign, utmContent: a.utm_content, utmTerm: a.utm_term },
      })
    })
    const onMessage = (e) => {
      let host = ''
      try { host = new URL(e.origin).hostname } catch { return }
      if (!/(^|\.)calendly\.com$/.test(host) || typeof e.data?.event !== 'string' || !e.data.event.startsWith('calendly.')) return
      const name = e.data.event
      if ((name === 'calendly.event_type_viewed' || name === 'calendly.profile_page_viewed') && !viewed) {
        viewed = true
        trackEvent('scheduler_view', { scheduler: 'calendly' })
      }
      if (name === 'calendly.date_and_time_selected') trackEvent('scheduler_time_selected', { scheduler: 'calendly' })
      if (name === 'calendly.event_scheduled') {
        const id = e.data.payload?.invitee?.uri || e.data.payload?.event?.uri || mountId
        onBooked(id, 'calendly')
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [url, ref, onBooked, mountId])
}

function useCal(ref, link, onBooked, mountId) {
  useEffect(() => {
    if (!link || !ref.current) return
    let origin = 'https://cal.com'
    let calLink = link
    if (/^https?:\/\//.test(link)) {
      const u = new URL(link)
      origin = u.origin
      calLink = u.pathname.replace(/^\//, '')
    }
    const embedSrc = origin.includes('cal.com') ? 'https://app.cal.com/embed/embed.js' : `${origin}/embed/embed.js`

    /* eslint-disable */
    ;(function (C, A, L) { let p = function (a, ar) { a.q.push(ar) }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true } if (ar[0] === L) { const api = function () { p(api, arguments) }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]) } else p(cal, ar); return } p(cal, ar) } })(window, embedSrc, 'init')
    /* eslint-enable */

    const a = getAttribution()
    const id = 'cdc-cal-inline'
    ref.current.id = id
    ref.current.innerHTML = ''
    window.Cal('init', 'discovery', { origin })
    const cal = window.Cal.ns.discovery
    cal('inline', {
      elementOrSelector: `#${id}`,
      calLink,
      config: { layout: 'month_view', utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign },
    })
    cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    cal('on', { action: 'linkReady', callback: () => trackEvent('scheduler_view', { scheduler: 'cal' }) })
    const handler = (e) => {
      const d = e?.detail?.data || {}
      onBooked(d.uid || d.booking?.uid || mountId, 'cal')
    }
    // Both event versions are handled; the shared booking ID prevents double counting.
    cal('on', { action: 'bookingSuccessfulV2', callback: handler })
    cal('on', { action: 'bookingSuccessful', callback: handler })
  }, [link, ref, onBooked, mountId])
}

export default function SchedulerEmbed() {
  const ref = useRef(null)
  const [booked, setBooked] = useState(false)
  const mountId = useRef(uid()).current
  const { provider, url } = site.scheduler

  const onBooked = useRef((id, scheduler) => {
    trackConversion('discovery_call_booked', id, { scheduler })
    setBooked(true)
  }).current

  useCalendly(ref, provider === 'calendly' ? url : '', onBooked, mountId)
  useCal(ref, provider === 'cal' ? url : '', onBooked, mountId)

  if (!url) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center">
        <CalendarClock className="h-10 w-10 text-ink-400" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-caution-500">[Placeholder] Scheduler not connected yet</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">
          Set <code className="rounded bg-paper px-1">VITE_SCHEDULER_PROVIDER</code> and <code className="rounded bg-paper px-1">VITE_SCHEDULER_URL</code> to show your Calendly or Cal.com booking calendar here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {site.contact.email && (
            <a href={`mailto:${site.contact.email}?subject=Discovery%20call`} className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium hover:border-ink-400"><Mail className="h-4 w-4" />Email to book</a>
          )}
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium hover:border-ink-400"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
          )}
        </div>
        {import.meta.env.DEV && (
          <button type="button" onClick={() => onBooked('dev-test-booking', 'dev')} className="mt-6 font-mono text-[11px] text-ink-400 underline">
            DEV: simulate a booking (fires discovery_call_booked once)
          </button>
        )}
        {booked && <p className="mt-2 text-sm text-signal-600">Simulated booking tracked. Check the console.</p>}
      </div>
    )
  }

  return (
    <div>
      {booked && (
        <div className="mb-4 rounded-xl border border-signal-200 bg-signal-100 p-4 text-sm text-ink-800" role="status">
          <strong>You&rsquo;re booked.</strong> A calendar invite is on its way. If anything changes, use the link in your confirmation email.
        </div>
      )}
      <div ref={ref} className="min-h-[700px] overflow-hidden rounded-2xl border border-line bg-white" style={{ minWidth: 280 }} />
    </div>
  )
}
