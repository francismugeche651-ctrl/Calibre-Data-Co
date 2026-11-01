import { Check, Clock, FileCheck2 } from 'lucide-react'
import PageSeo from '../components/ui/PageSeo'
import { Container, Section, SectionHeading } from '../components/ui/Layout'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/sections/PageHero'
import AgencyNote from '../components/sections/AgencyNote'
import FinalCta from '../components/sections/FinalCta'
import { howWeWork } from '../content/howWeWork'
import { agencyNote, pricingNote } from '../content/shared'

export default function HowWeWork() {
  const { hero, steps, provide, principles } = howWeWork
  return (
    <>
      <PageSeo path="/how-we-work" />
      <PageHero {...hero} location="process_hero" />

      <Section>
        <Container>
          <SectionHeading eyebrow="The three steps" index="01" title="Audit → Setup → Oversight" intro={pricingNote} />
          <ol className="relative mt-14 space-y-6 before:absolute before:top-4 before:bottom-4 before:left-[27px] before:w-px before:bg-ink-200 sm:before:left-[31px]">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="relative grid gap-5 sm:grid-cols-[64px_1fr]">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-ink-300 bg-paper font-mono text-sm font-medium sm:h-16 sm:w-16">{s.step}</span>
                <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-2xl font-semibold text-ink-900">{s.title}</h2>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400"><Clock className="h-3.5 w-3.5" />{s.timeline}</span>
                  </div>
                  <p className="mt-2 text-lg leading-relaxed text-ink-600">{s.summary}</p>
                  <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink-700"><Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{p}</li>
                    ))}
                  </ul>
                  <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-signal-100 px-4 py-3 text-[15px] text-ink-800">
                    <FileCheck2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-signal-600" aria-hidden="true" /><span><strong>Output:</strong> {s.output}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Your part" index="02" title={provide.title} />
            <ul className="mt-8 space-y-3">
              {provide.items.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl border border-line bg-paper p-4 leading-relaxed text-ink-800"><Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Our part" index="03" title={principles.title} />
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {principles.items.map((p) => (
                <div key={p.title} className="rounded-xl border border-line p-5">
                  <dt className="font-semibold text-ink-900">{p.title}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Agencies and freelancers" index="04" title={agencyNote.title} />
          <div className="mt-10"><AgencyNote id="agencies" /></div>
        </Container>
      </Section>

      <FinalCta location="process_final" title="Start with an audit. Decide the rest with real numbers." />
    </>
  )
}
