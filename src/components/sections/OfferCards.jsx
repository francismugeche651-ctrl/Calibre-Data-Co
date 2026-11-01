import { useState } from 'react'
import { Check, ChevronDown, Clock, Tag } from 'lucide-react'
import { BookCallButton } from '../ui/CtaButtons'
import Reveal from '../ui/Reveal'

// Detailed service cards: problem, deliverables, value, ideal client.
function Offer({ offer, location, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Reveal as="article" id={offer.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-400">
          <span className="text-signal-600">Step {offer.step}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{offer.timeline}</span>
          <span className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" />{offer.price}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-ink-900">{offer.name}</h3>
        <p className="mt-2 text-lg leading-relaxed text-ink-600">{offer.summary}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-paper p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">The problem</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-800">{offer.problem}</p>
          </div>
          <div className="rounded-xl bg-signal-100 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-700">Business value</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-800">{offer.value}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 hover:text-signal-600"
        >
          {open ? 'Hide what’s included' : 'What’s included'}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {open && (
          <ul className="mt-4 space-y-2.5">
            {offer.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                <Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{d}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-4 border-t border-line bg-paper/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-ink-600"><span className="font-medium text-ink-900">Ideal for:</span> {offer.idealFor}</p>
        <BookCallButton location={`${location}_${offer.id}`} size="sm" label="Discuss this" variant="dark" className="shrink-0" />
      </div>
    </Reveal>
  )
}

export default function OfferCards({ offers, location }) {
  return (
    <div className="space-y-5">
      {offers.map((o, i) => <Offer key={o.id} offer={o} location={location} defaultOpen={i === 0} />)}
    </div>
  )
}
