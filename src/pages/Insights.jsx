import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageSeo from '../components/ui/PageSeo'
import { Container, Section } from '../components/ui/Layout'
import PageHero from '../components/sections/PageHero'
import FinalCta from '../components/sections/FinalCta'
import Reveal from '../components/ui/Reveal'
import { articles } from '../content/insights'

export function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Insights() {
  return (
    <>
      <PageSeo path="/insights" />
      <PageHero
        eyebrow="Insights"
        title="Short, practical notes on measurement."
        body="Tracking, attribution and lead quality explained in plain business language. Most started life as LinkedIn posts."
        location="insights_hero"
        ctas={false}
      />
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <Link to={`/insights/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-[border-color,box-shadow] hover:border-ink-300 hover:shadow-[0_20px_40px_-24px_rgb(13_22_38/0.35)]">
                  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                    <span className="text-signal-600">{a.category}</span><span>{a.readingTime}</span>
                  </p>
                  <h2 className="mt-4 text-xl leading-snug font-semibold text-ink-900">{a.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{a.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 pt-2 font-medium text-signal-600 md:mt-auto">Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta location="insights_final" />
    </>
  )
}
