import { Check, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageSeo from '../components/ui/PageSeo'
import { Container, Eyebrow } from '../components/ui/Layout'
import SchedulerEmbed from '../components/forms/SchedulerEmbed'
import { WhatsAppIcon } from '../components/ui/BrandIcons'
import { site, whatsappHref } from '../config/site'
import { trackEvent } from '../lib/analytics'

const onCall = [
  'How you measure performance today, and which numbers you trust',
  'Where your tracking or attribution is most likely breaking',
  'What a fix would involve, and roughly what it would cost',
  'An honest answer on whether we are the right fit',
]

// These three questions should also be added to your Calendly / Cal.com event
// (Event settings → Booking questions) so answers arrive with each booking.
const questions = [
  'What does your business sell, and what is your website?',
  'Roughly how much do you spend on ads each month?',
  "What's the one number you don't trust right now?",
]

export default function BookCall() {
  return (
    <>
      <PageSeo path="/book-a-call" />
      <section className="relative overflow-hidden bg-ink-900 text-paper">
        <div className="grid-faint absolute inset-0" aria-hidden="true" />
        <Container className="relative py-14 sm:py-20">
          <div className="max-w-2xl animate-rise">
            <Eyebrow dark>Book a discovery call</Eyebrow>
            <h1 className="mt-5 text-[2.35rem] leading-[1.05] font-semibold sm:text-6xl">30 minutes to find out what your numbers are really telling you.</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">Pick a time that suits you. No pitch deck, no pressure, just a practical conversation about your measurement.</p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <aside className="order-2 space-y-5 lg:order-1">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-ink-900">What we&rsquo;ll cover</h2>
              <ul className="mt-4 space-y-2.5">
                {onCall.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink-700"><Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-ink-900">We&rsquo;ll ask three quick questions</h2>
              <ol className="mt-4 space-y-3">
                {questions.map((q, i) => (
                  <li key={q} className="flex gap-3 text-[15px] leading-relaxed text-ink-700"><span className="font-mono text-xs leading-6 text-signal-600">0{i + 1}</span>{q}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line p-6 text-[15px] text-ink-600 sm:p-7">
              <p className="font-medium text-ink-900">Prefer another way?</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { link_location: 'book_call_page' })} className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#1f9d55] px-4 text-sm font-medium text-white hover:bg-[#1a8a4a]">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
                  </a>
                )}
                {site.contact.email && (
                  <a href={`mailto:${site.contact.email}`} onClick={() => trackEvent('email_click', { link_location: 'book_call_page' })} className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium text-ink-900 hover:border-ink-400">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                )}
                <Link to="/free-mini-audit" className="inline-flex h-11 items-center rounded-lg border border-line px-4 text-sm font-medium text-ink-900 hover:border-ink-400">Free mini-audit instead</Link>
              </div>
            </div>
          </aside>
          <div className="order-1 lg:order-2">
            <SchedulerEmbed />
          </div>
        </div>
      </Container>
    </>
  )
}
