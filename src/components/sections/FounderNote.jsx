import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { site } from '../../config/site'

export function FounderPhoto({ className = '' }) {
  const initials = site.founder.name.startsWith('[') ? 'CD' : site.founder.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  if (site.founder.photo) {
    return <img src={site.founder.photo} alt={site.founder.name} width="600" height="600" loading="lazy" className={`aspect-square rounded-2xl object-cover ${className}`} />
  }
  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-ink-900 ${className}`} role="img" aria-label="Founder photo placeholder">
      <div className="grid-faint absolute inset-0" aria-hidden="true" />
      <span className="relative font-mono text-3xl text-signal-400">{initials}</span>
      <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[9px] uppercase tracking-wider text-ink-500">[Photo placeholder]</span>
    </div>
  )
}

export default function FounderNote({ quote, eyebrow }) {
  return (
    <div className="grid items-center gap-8 rounded-2xl border border-line bg-white p-6 sm:grid-cols-[180px_1fr] sm:p-10">
      <FounderPhoto className="w-32 sm:w-full" />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-600">{eyebrow}</p>
        <blockquote className="mt-3 text-xl leading-relaxed text-ink-900 sm:text-2xl">&ldquo;{quote}&rdquo;</blockquote>
        <p className="mt-4 text-sm text-ink-600"><span className="font-medium text-ink-900">{site.founder.name}</span> · {site.founder.role}</p>
        <Link to="/about" className="mt-5 inline-flex items-center gap-1.5 font-medium text-signal-600 hover:text-signal-700">
          More about us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
