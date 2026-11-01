import { CircleAlert } from 'lucide-react'
import { Container, Section, SectionHeading } from '../ui/Layout'
import Reveal from '../ui/Reveal'

export default function Symptoms({ eyebrow, title, items, index = '01' }) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={eyebrow} index={index} title={title} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 2) * 60} className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-5">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-caution-500" aria-hidden="true" />
              <span className="leading-relaxed text-ink-800">{item}</span>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-ink-600">If two or more of these sound familiar, the problem is usually measurement, not marketing.</p>
      </Container>
    </Section>
  )
}
