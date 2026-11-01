import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { trackCta } from '../../lib/analytics'

const variants = {
  primary: 'bg-signal-600 text-white hover:bg-signal-700 shadow-[0_1px_0_rgb(255_255_255/0.15)_inset]',
  dark: 'bg-ink-900 text-paper hover:bg-ink-800',
  outline: 'border border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/[0.03]',
  light: 'bg-paper text-ink-900 hover:bg-white',
  'outline-light': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
}
const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-13 px-6 text-base',
}

/**
 * Button / link with built-in CTA tracking.
 *   to="/page"     internal link     href="https://…"  external link
 *   trackId        short id for analytics, e.g. "hero_book_call"
 *   trackLocation  where on the site it sits, e.g. "home_hero"
 */
export default function Button({
  to, href, onClick, children, variant = 'primary', size = 'md', arrow = false,
  icon: IconCmp, trackId, trackLocation, className = '', type = 'button', ...rest
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 select-none disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`

  const handle = (e) => {
    if (trackId) {
      trackCta({ id: trackId, text: typeof children === 'string' ? children : trackId, location: trackLocation || 'unknown', destination: to || href || '' })
    }
    onClick?.(e)
  }

  const inner = (
    <>
      {IconCmp && <IconCmp className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </>
  )

  if (to) return <Link to={to} onClick={handle} className={cls} {...rest}>{inner}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} onClick={handle} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {inner}
      </a>
    )
  }
  return <button type={type} onClick={handle} className={cls} {...rest}>{inner}</button>
}
