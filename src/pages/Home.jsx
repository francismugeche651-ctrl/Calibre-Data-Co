import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import PageSeo from '../components/ui/PageSeo'
import { Container, Eyebrow, Section, SectionHeading } from '../components/ui/Layout'
import Button from '../components/ui/Button'
import { BookCallButton } from '../components/ui/CtaButtons'
import { Icon } from '../components/ui/icons'
import Reveal from '../components/ui/Reveal'
import ReconciliationVisual from '../components/diagrams/ReconciliationVisual'
import Pillars from '../components/sections/Pillars'
import ProcessSteps from '../components/sections/ProcessSteps'
import ResultsShowcase from '../components/sections/ResultsShowcase'
import FounderNote from '../components/sections/FounderNote'
import AgencyNote from '../components/sections/AgencyNote'
import FinalCta from '../components/sections/FinalCta'
import { home } from '../content/home'

export default function Home() {
  const { hero, problem, pillars, process, audiences, proof, founder } = home
  return (
    <>
      <PageSeo path="/" />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-paper">
        <div className="grid-faint absolute inset-0" aria-hidden="true" />
        <div className="absolute -top-48 right-[-15%] h-[28rem] w-[28rem] rounded-full bg-signal-500/15 blur-3xl" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="animate-rise">
            <Eyebrow dark>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] leading-[1.02] font-semibold sm:text-7xl">{hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl">{hero.body}</p>

            <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Start here</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {hero.paths.map((p) => (
                <Button key={p.to} to={p.to} variant="outline-light" size="lg" arrow trackId={p.id} trackLocation="home_hero" className="!justify-between">
                  <span className="inline-flex items-center gap-2.5"><Icon name={p.icon} className="h-5 w-5 text-signal-400" />{p.label}</span>
                </Button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookCallButton location="home_hero" size="lg" />
              <Link to="/free-mini-audit" className="px-1 py-2 text-sm text-ink-300 underline-offset-4 hover:text-white hover:underline">or get a free mini-audit</Link>
            </div>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <ReconciliationVisual />
          </div>
        </Container>
      </section>

      {/* 2. The problem */}
      <Section>
        <Container>
          <SectionHeading eyebrow={problem.eyebrow} index="01" title={problem.title} intro={problem.intro} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {problem.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="bg-paper p-7 sm:p-8">
                <span className="font-mono text-xs text-caution-500">0{i + 1} /</span>
                <h3 className="mt-3 text-xl font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Value pillars */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow={pillars.eyebrow} index="02" title={pillars.title} intro={pillars.intro} />
          <div className="mt-12"><Pillars /></div>
        </Container>
      </Section>

      {/* 4. How we work */}
      <Section>
        <Container>
          <SectionHeading eyebrow={process.eyebrow} index="03" title={process.title} intro={process.intro} center className="md:mx-auto md:text-center" />
          <div className="mt-14"><ProcessSteps /></div>
        </Container>
      </Section>

      {/* 5. Who we help */}
      <Section tone="alt">
        <Container>
          <SectionHeading eyebrow={audiences.eyebrow} index="04" title={audiences.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {audiences.cards.map((c, i) => (
              <Reveal key={c.to} delay={i * 80}>
                <Link
                  to={c.to}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-[border-color,box-shadow] hover:border-ink-300 hover:shadow-[0_20px_40px_-24px_rgb(13_22_38/0.35)] sm:p-9"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-900 text-signal-400"><Icon name={c.icon} className="h-5 w-5" /></span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-600">{c.label}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-ink-900">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{c.body}</p>
                  <ul className="mt-6 space-y-2">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[15px] text-ink-800"><Check className="h-4 w-4 text-signal-500" aria-hidden="true" />{p}</li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1.5 pt-2 font-medium text-signal-600 md:mt-auto">
                    {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-5"><AgencyNote /></div>
        </Container>
      </Section>

      {/* 6. Proof */}
      <Section>
        <Container>
          <SectionHeading eyebrow={proof.eyebrow} index="05" title={proof.title} intro={proof.body} />
          <div className="mt-10"><ResultsShowcase limit={2} location="home_proof" /></div>
        </Container>
      </Section>

      {/* 7. Founder note */}
      <Section className="!pt-0">
        <Container>
          <FounderNote quote={founder.quote} eyebrow={founder.eyebrow} />
        </Container>
      </Section>

      {/* 8. Final CTA */}
      <FinalCta location="home_final" />
    </>
  )
}
