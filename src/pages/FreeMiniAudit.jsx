import { Check, Video } from 'lucide-react'
import PageSeo from '../components/ui/PageSeo'
import { Container, Eyebrow } from '../components/ui/Layout'
import MiniAuditForm from '../components/forms/MiniAuditForm'

const checks = [
  'Whether your key conversions (purchases or leads) are tracked correctly',
  'Obvious duplicate, missing or misconfigured tags',
  'Consent banner and Consent Mode setup',
  'How campaign sources (UTMs) are captured',
  'The one fix most likely to make your numbers more reliable',
]

export default function FreeMiniAudit() {
  return (
    <>
      <PageSeo path="/free-mini-audit" />
      <section className="relative overflow-hidden bg-ink-900 pb-40 text-paper sm:pb-48">
        <div className="grid-faint absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-14 sm:pt-20">
          <div className="max-w-2xl animate-rise">
            <Eyebrow dark>Free mini-audit</Eyebrow>
            <h1 className="mt-5 text-[2.35rem] leading-[1.05] font-semibold sm:text-6xl">A 5-minute video on what your tracking is missing.</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">
              Tell us about your business. We&rsquo;ll review your website&rsquo;s tracking from the outside and send you a personalised 5-minute video within 3 business days. Free, with no obligation.
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative -mt-32 pb-20 sm:-mt-36 sm:pb-28">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="animate-rise [animation-delay:100ms]">
            <MiniAuditForm />
          </div>
          <aside className="space-y-5 lg:pt-0">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal-100 text-signal-600"><Video className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="mt-4 text-lg font-semibold text-ink-900">What we look at</h2>
              <ul className="mt-4 space-y-2.5">
                {checks.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink-700"><Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper-2 p-6 text-[15px] leading-relaxed text-ink-600 sm:p-7">
              <p className="font-medium text-ink-900">What happens next</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5">
                <li>You submit the form (about 60 seconds).</li>
                <li>We review your site&rsquo;s public tracking setup.</li>
                <li>You get a personalised video within 3 business days.</li>
                <li>If it&rsquo;s useful, you can book a call. If not, no follow-up chasing.</li>
              </ol>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
