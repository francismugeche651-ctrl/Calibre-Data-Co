import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { footerNav } from '../../config/navigation'
import { site, whatsappHref } from '../../config/site'
import { Logo, LinkedInIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { Container, Ruler } from '../ui/Layout'
import { openConsentSettings } from '../../lib/consent'
import { trackEvent } from '../../lib/analytics'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-950 text-ink-300">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.contact.email && (
                <a href={`mailto:${site.contact.email}`} onClick={() => trackEvent('email_click', { link_location: 'footer' })} className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm hover:border-white/30 hover:text-white">
                  <Mail className="h-4 w-4" /> Email
                </a>
              )}
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { link_location: 'footer' })} className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm hover:border-white/30 hover:text-white">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              )}
              {site.contact.linkedinCompany && (
                <a href={site.contact.linkedinCompany} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm hover:border-white/30 hover:text-white">
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}><Link to={l.to} className="text-sm text-ink-300 hover:text-white">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Ruler className="mt-14 text-ink-600" />
        <div className="mt-6 flex flex-col gap-4 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-ink-200">Privacy</Link>
            <Link to="/terms" className="hover:text-ink-200">Terms</Link>
            <button type="button" onClick={openConsentSettings} className="hover:text-ink-200">Cookie settings</button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
