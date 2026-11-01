import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { processSteps } from '../../content/shared'
import Reveal from '../ui/Reveal'

// Audit → Setup → Oversight, one line each.
export default function ProcessSteps({ showLink = true }) {
  return (
    <div>
      <ol className="relative grid gap-4 md:grid-cols-3 md:gap-0">
        <span aria-hidden="true" className="absolute top-[30px] right-[16%] left-[16%] hidden h-px bg-ink-300 md:block" />
        {processSteps.map((s, i) => (
          <Reveal as="li" key={s.key} delay={i * 100} className="relative flex gap-4 md:flex-col md:items-center md:px-6 md:text-center">
            <span className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-ink-300 bg-paper font-mono text-sm font-medium text-ink-900">
              {s.step}
            </span>
            <div className="pt-1 md:pt-5">
              <h3 className="text-xl font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-600">{s.oneLine}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {s.timeline}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
      {showLink && (
        <div className="mt-10 md:text-center">
          <Link to="/how-we-work" className="inline-flex items-center gap-1.5 font-medium text-signal-600 hover:text-signal-700">
            See how we work in detail <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
