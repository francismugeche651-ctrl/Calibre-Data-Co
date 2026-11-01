import { Plus } from 'lucide-react'
import { Container, Section, SectionHeading } from '../ui/Layout'

// Accessible FAQ using native <details>. Also outputs FAQPage structured data for Google.
export default function Faq({ items, index, title = 'Questions we often hear' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return (
    <Section tone="alt">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" index={index} title={title} />
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Section>
  )
}
