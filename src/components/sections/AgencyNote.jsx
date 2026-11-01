import { Handshake } from 'lucide-react'
import { agencyNote } from '../../content/shared'

export default function AgencyNote({ id }) {
  return (
    <div id={id} className="scroll-mt-24 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:p-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-signal-400">
        <Handshake className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-600">For agencies and freelancers</p>
        <h3 className="mt-2 text-xl font-semibold text-ink-900">{agencyNote.title}</h3>
        <p className="mt-2 leading-relaxed text-ink-600">{agencyNote.body}</p>
      </div>
    </div>
  )
}
