import Button from './Button'
import { ctas } from '../../content/shared'

// The two standard calls to action, used consistently across the site.
export function BookCallButton({ location, variant = 'primary', size = 'md', label, className = '' }) {
  return (
    <Button to={ctas.primary.to} variant={variant} size={size} arrow trackId="book_call" trackLocation={location} className={className}>
      {label || ctas.primary.label}
    </Button>
  )
}

export function MiniAuditButton({ location, variant = 'outline', size = 'md', label, className = '' }) {
  return (
    <Button to={ctas.secondary.to} variant={variant} size={size} trackId="mini_audit" trackLocation={location} className={className}>
      {label || ctas.secondary.label}
    </Button>
  )
}

export function CtaPair({ location, dark = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <BookCallButton location={location} size="lg" />
      <MiniAuditButton location={location} size="lg" variant={dark ? 'outline-light' : 'outline'} />
    </div>
  )
}
