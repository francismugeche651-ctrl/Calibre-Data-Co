import { Container, Eyebrow, Ruler } from '../ui/Layout'
import { CtaPair } from '../ui/CtaButtons'
import { pricingNote } from '../../content/shared'

// The same two calls to action end every important page.
export default function FinalCta({
  location,
  title = 'Find out which of your numbers you can trust.',
  body = "Book a 30-minute discovery call. We'll look at how you measure today, where the numbers are likely breaking, and whether we can help. If we can't, we'll say so.",
  showPricing = true,
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-paper">
      <div className="grid-faint absolute inset-0" aria-hidden="true" />
      <Container className="relative py-20 sm:py-28">
        <Ruler className="mb-12 text-ink-500" />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow dark>Next step</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">{body}</p>
          </div>
          <div>
            <CtaPair location={location} dark className="lg:flex-col" />
            {showPricing && <p className="mt-4 font-mono text-xs text-ink-400">{pricingNote}</p>}
          </div>
        </div>
      </Container>
    </section>
  )
}
