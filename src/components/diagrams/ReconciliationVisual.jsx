// Hero visual: platform-reported sales vs what the store actually recorded.
// Clearly labelled as illustrative. These are not client figures.
const rows = [
  { label: 'Meta reports', value: 46, tone: 'caution' },
  { label: 'Google Ads reports', value: 38, tone: 'caution' },
  { label: 'TikTok reports', value: 17, tone: 'caution' },
]
const claimed = rows.reduce((s, r) => s + r.value, 0) // 101
const actual = 72
const max = claimed

export default function ReconciliationVisual() {
  return (
    <figure className="relative rounded-2xl border border-white/10 bg-ink-950/60 p-5 font-mono text-[12px] text-ink-300 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] backdrop-blur sm:p-6">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.14em] text-ink-400">Orders · last 7 days</span>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-400">Illustrative</span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {rows.map((r, i) => (
          <li key={r.label}>
            <div className="flex justify-between"><span>{r.label}</span><span className="text-ink-200">{r.value}</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-white/5">
              <div className="h-full origin-left animate-rise rounded-full bg-caution-500/80" style={{ width: `${(r.value / max) * 100}%`, animationDelay: `${150 + i * 120}ms` }} />
            </div>
          </li>
        ))}
      </ul>

      <div className="my-5 border-t border-dashed border-white/15" />

      <div className="space-y-3.5">
        <div>
          <div className="flex justify-between"><span>Platforms claim</span><span className="text-caution-500">{claimed}</span></div>
          <div className="mt-1.5 h-2 rounded-full bg-white/5"><div className="h-full w-full rounded-full bg-caution-500/40" /></div>
        </div>
        <div>
          <div className="flex justify-between"><span className="text-paper">Store actually recorded</span><span className="font-semibold text-signal-400">{actual}</span></div>
          <div className="mt-1.5 h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-signal-400" style={{ width: `${(actual / max) * 100}%` }} /></div>
        </div>
      </div>

      <figcaption className="mt-5 flex items-start justify-between gap-4 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-ink-400">
        <span>Each platform counts the same order. We reconcile every source against real store or CRM records.</span>
        <span className="shrink-0 text-ink-200">+{claimed - actual} over-claimed</span>
      </figcaption>
    </figure>
  )
}
