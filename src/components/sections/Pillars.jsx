import { pillars } from '../../content/shared'
import { Icon } from '../ui/icons'
import Reveal from '../ui/Reveal'

export default function Pillars({ dark = false }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3 ${dark ? 'border-white/10 bg-white/10' : 'border-line bg-line'}`}>
      {pillars.map((p, i) => (
        <Reveal key={p.title} delay={i * 80} className={`p-7 sm:p-8 ${dark ? 'bg-ink-900' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${dark ? 'bg-white/5 text-signal-400' : 'bg-signal-100 text-signal-600'}`}>
              <Icon name={p.icon} className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
          </div>
          <h3 className={`mt-6 text-xl font-semibold ${dark ? 'text-paper' : 'text-ink-900'}`}>{p.title}.</h3>
          <p className={`mt-2.5 leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-600'}`}>{p.body}</p>
        </Reveal>
      ))}
    </div>
  )
}
