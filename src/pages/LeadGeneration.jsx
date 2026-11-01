import PageSeo from '../components/ui/PageSeo'
import { Container, Section, SectionHeading } from '../components/ui/Layout'
import { Icon } from '../components/ui/icons'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/sections/PageHero'
import Symptoms from '../components/sections/Symptoms'
import OfferCards from '../components/sections/OfferCards'
import Faq from '../components/sections/Faq'
import ResultsShowcase from '../components/sections/ResultsShowcase'
import AgencyNote from '../components/sections/AgencyNote'
import FinalCta from '../components/sections/FinalCta'
import ClosedLoopDiagram from '../components/diagrams/ClosedLoopDiagram'
import { leadgen } from '../content/leadgen'
import { pricingNote } from '../content/shared'

function FunnelVisual() {
  // Illustrative only: shows why cost per lead and cost per customer differ.
  const rows = [
    { label: 'Leads reported', w: 100 },
    { label: 'Qualified by sales', w: 38 },
    { label: 'Became customers', w: 12 },
  ]
  return (
    <figure className="rounded-2xl border border-white/10 bg-ink-950/60 p-5 font-mono text-[12px] text-ink-300 backdrop-blur sm:p-6">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.14em] text-ink-400">Same spend, three costs</span>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-400">Illustrative</span>
      </div>
      <ul className="mt-6 space-y-4">
        {rows.map((r, i) => (
          <li key={r.label}>
            <div className="flex justify-between"><span className={i === 2 ? 'text-paper' : ''}>{r.label}</span></div>
            <div className="mt-1.5 h-7 rounded bg-white/5">
              <div className={`h-full animate-rise rounded ${i === 2 ? 'bg-signal-400' : 'bg-caution-500/60'}`} style={{ width: `${r.w}%`, animationDelay: `${150 + i * 120}ms` }} />
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-[11px]">
        <span>Cost per lead<br /><span className="text-ink-200">looks cheap</span></span>
        <span>Per qualified<br /><span className="text-ink-200">costs more</span></span>
        <span>Per customer<br /><span className="font-semibold text-signal-400">the real cost</span></span>
      </figcaption>
    </figure>
  )
}

export default function LeadGeneration() {
  const { hero, symptoms, segments, offers, loop, faqs } = leadgen
  return (
    <>
      <PageSeo path="/lead-generation" />
      <PageHero {...hero} location="leadgen_hero" aside={<FunnelVisual />} />

      <Symptoms {...symptoms} index="01" />

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow={segments.eyebrow} index="02" title={segments.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {segments.items.map((s, i) => (
              <Reveal key={s.name} delay={i * 80} className="flex flex-col rounded-2xl border border-line bg-paper p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-900 text-signal-400"><Icon name={s.icon} className="h-5 w-5" /></span>
                <h3 className="mt-5 text-xl font-semibold text-ink-900">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{s.body}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink-800">{s.measure}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="alt" id="services">
        <Container>
          <SectionHeading eyebrow={offers.eyebrow} index="03" title={offers.title} intro={pricingNote} />
          <div className="mt-12"><OfferCards offers={offers.items} location="leadgen_offer" /></div>
          <div className="mt-5"><AgencyNote /></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow={loop.eyebrow} index="04" title={loop.title} intro={loop.intro} />
          <div className="mt-12"><ClosedLoopDiagram /></div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Example result" index="05" title="What a result looks like" intro="Every lead-generation case study shows cost per lead next to cost per qualified lead and cost per customer, before and after." />
          <div className="mt-10"><ResultsShowcase segment="leadgen" limit={2} location="leadgen_result" /></div>
        </Container>
      </Section>

      <Faq items={faqs} index="06" />
      <FinalCta location="leadgen_final" title="Stop paying for leads that never buy." />
    </>
  )
}
