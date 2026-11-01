import { MousePointerClick, FileInput, Database, BadgeCheck, RotateCcw } from 'lucide-react'

const nodes = [
  { icon: MousePointerClick, title: 'Ad click', body: 'Google, Meta or LinkedIn ad' },
  { icon: FileInput, title: 'Website form', body: 'Source, campaign and click ID captured' },
  { icon: Database, title: 'CRM', body: 'Sales updates the lead stage' },
  { icon: BadgeCheck, title: 'Customer', body: 'Revenue recorded against the source' },
]

export default function ClosedLoopDiagram() {
  return (
    <figure className="rounded-2xl border border-line bg-white p-5 sm:p-8">
      <ol className="relative grid gap-3 md:grid-cols-4 md:gap-4">
        {nodes.map((n, i) => (
          <li key={n.title} className="relative">
            <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-paper p-4 md:flex-col md:gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-signal-400">
                <n.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">Step {i + 1}</p>
                <p className="mt-0.5 font-semibold text-ink-900">{n.title}</p>
                <p className="mt-1 text-sm leading-snug text-ink-600">{n.body}</p>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="absolute left-9 -bottom-3 z-10 h-3 w-px bg-ink-300 md:top-1/2 md:-right-4 md:left-auto md:bottom-auto md:h-px md:w-4" />
            )}
          </li>
        ))}
      </ol>

      {/* Return path */}
      <div className="relative mt-3 md:mt-4">
        <div aria-hidden="true" className="absolute inset-x-[12%] -top-4 hidden h-4 border-x border-b border-dashed border-signal-500 md:block" />
        <div className="flex items-start gap-3 rounded-xl border border-signal-200 bg-signal-100 p-4 md:mx-auto md:mt-4 md:max-w-xl md:items-center md:justify-center md:text-center">
          <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-signal-600 md:mt-0" aria-hidden="true" />
          <p className="text-sm text-ink-800">
            <span className="font-semibold">Loop closed:</span> qualified-lead and sale events are sent back to the ad platforms, so they optimise for customers, not form fills.
          </p>
        </div>
      </div>
      <figcaption className="sr-only">Closed-loop measurement: ad click, website form, CRM, customer, then outcomes sent back to ad platforms.</figcaption>
    </figure>
  )
}
