import { ArrowRight, FlaskConical } from 'lucide-react'
import { results } from '../../content/results'
import { MiniAuditButton } from '../ui/CtaButtons'

function ResultCard({ r }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-600">{r.segment === 'leadgen' ? 'Lead generation' : 'E-commerce'}</p>
        <h3 className="mt-2 text-xl font-semibold text-ink-900">{r.clientType}</h3>
        <dl className="mt-5 space-y-4 text-[15px]">
          <div><dt className="font-medium text-ink-900">Problem</dt><dd className="mt-1 text-ink-600">{r.problem}</dd></div>
          <div>
            <dt className="font-medium text-ink-900">What we did</dt>
            <dd className="mt-1"><ul className="list-disc space-y-1 pl-5 text-ink-600">{r.whatWeDid.map((w) => <li key={w}>{w}</li>)}</ul></dd>
          </div>
        </dl>
      </div>
      {r.metrics?.length > 0 && (
        <table className="w-full border-t border-line text-left text-sm">
          <thead className="bg-paper font-mono text-[10px] uppercase tracking-wider text-ink-400">
            <tr><th className="px-6 py-2.5 font-medium sm:px-8">Metric</th><th className="px-3 py-2.5 font-medium">Before</th><th className="px-3 py-2.5 font-medium">After</th></tr>
          </thead>
          <tbody>
            {r.metrics.map((m) => (
              <tr key={m.label} className="border-t border-line">
                <td className="px-6 py-3 text-ink-800 sm:px-8">{m.label}</td>
                <td className="px-3 py-3 font-mono text-ink-500">{m.before}</td>
                <td className="px-3 py-3 font-mono font-medium text-signal-600">{m.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  )
}

// Shows real case studies from content/results.js, or an honest
// "in progress" note while there are none yet.
export default function ResultsShowcase({ segment, limit, location = 'results' }) {
  const list = results.filter((r) => !segment || r.segment === segment).slice(0, limit || undefined)

  if (list.length) {
    return <div className="grid gap-5 lg:grid-cols-2">{list.map((r) => <ResultCard key={r.id} r={r} />)}</div>
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-signal-100 text-signal-600">
          <FlaskConical className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-ink-900">Our first case studies are in progress.</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">
            We&rsquo;re currently working with pilot clients. We will publish results here once they&rsquo;re complete and approved. We won&rsquo;t show numbers we can&rsquo;t stand behind. In the meantime, the fastest way to see how we think is a free mini-audit of your own setup.
          </p>
          <div className="mt-5 grid gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:grid-cols-4">
            {['Client type', 'Problem', 'What we did', 'Before → after'].map((s) => (
              <span key={s} className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2"><ArrowRight className="h-3 w-3" />{s}</span>
            ))}
          </div>
          <MiniAuditButton location={location} variant="dark" className="mt-6" />
        </div>
      </div>
    </div>
  )
}
