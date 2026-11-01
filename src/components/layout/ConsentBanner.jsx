import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '../../lib/consent'
import Button from '../ui/Button'

// Cookie banner wired to Google Consent Mode v2 (see src/lib/consent.js).
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [custom, setCustom] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false })

  useEffect(() => {
    const existing = getConsent()
    if (!existing) setVisible(true)
    else setPrefs({ analytics: existing.analytics, marketing: existing.marketing })
    const reopen = () => { setCustom(true); setVisible(true) }
    window.addEventListener('cdc:open-consent', reopen)
    return () => window.removeEventListener('cdc:open-consent', reopen)
  }, [])

  if (!visible) return null

  const save = (value) => { setConsent(value); setVisible(false); setCustom(false) }

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md">
      <div className="rounded-xl border border-line bg-white p-5 shadow-[0_20px_50px_-12px_rgb(13_22_38/0.35)]">
        <p className="text-sm font-semibold text-ink-900">We measure what we do, too.</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
          With your permission we use analytics cookies to understand how the site is used, and marketing cookies to measure LinkedIn campaigns. <Link to="/privacy" className="underline underline-offset-2">Privacy policy</Link>
        </p>

        {custom && (
          <div className="mt-4 space-y-2.5 border-t border-line pt-4">
            <label className="flex items-start gap-3 text-sm text-ink-400">
              <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-signal-600" />
              <span><span className="text-ink-900">Essential</span>: needed for the site to work. Always on.</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
              <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-signal-600" />
              <span><span className="text-ink-900">Analytics</span>: Google Analytics, to see which pages help visitors.</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
              <input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-signal-600" />
              <span><span className="text-ink-900">Marketing</span>: LinkedIn Insight Tag, to measure ad campaigns.</span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {custom ? (
            <Button size="sm" variant="dark" onClick={() => save(prefs)}>Save choices</Button>
          ) : (
            <Button size="sm" variant="dark" onClick={() => save({ analytics: true, marketing: true })}>Accept all</Button>
          )}
          <Button size="sm" variant="outline" onClick={() => save({ analytics: false, marketing: false })}>Essential only</Button>
          {!custom && (
            <button type="button" onClick={() => setCustom(true)} className="h-10 px-1 text-sm text-ink-600 underline underline-offset-2 hover:text-ink-900">Customise</button>
          )}
        </div>
      </div>
    </div>
  )
}
