import PageSeo from '../components/ui/PageSeo'
import { Container, Section, SectionHeading } from '../components/ui/Layout'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/sections/PageHero'
import Symptoms from '../components/sections/Symptoms'
import OfferCards from '../components/sections/OfferCards'
import Faq from '../components/sections/Faq'
import ResultsShowcase from '../components/sections/ResultsShowcase'
import AgencyNote from '../components/sections/AgencyNote'
import FinalCta from '../components/sections/FinalCta'
import ReconciliationVisual from '../components/diagrams/ReconciliationVisual'
import { ecommerce } from '../content/ecommerce'
import { pricingNote } from '../content/shared'

export default function Ecommerce() {
  const { hero, symptoms, offers, metrics, faqs } = ecommerce
  return (
    <>
      <PageSeo path="/ecommerce" />
      <PageHero {...hero} location="ecom_hero" aside={<ReconciliationVisual />} />

      <Symptoms {...symptoms} index="01" />

      <Section tone="alt" id="services">
        <Container>
          <SectionHeading eyebrow={offers.eyebrow} index="02" title={offers.title} intro={pricingNote} />
          <div className="mt-12"><OfferCards offers={offers.items} location="ecom_offer" /></div>
          <div className="mt-5"><AgencyNote /></div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SectionHeading eyebrow={metrics.eyebrow} index="03" title={metrics.title} dark />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.items.map((m, i) => (
              <Reveal key={m.name} delay={i * 70} className="bg-ink-900 p-7">
                <p className="font-mono text-3xl font-medium text-signal-400">{m.name}</p>
                <p className="mt-4 font-semibold text-paper">{m.full}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Example result" index="04" title="What a result looks like" intro="Every e-commerce case study shows the gap we found, what we fixed, and the metrics before and after." />
          <div className="mt-10"><ResultsShowcase segment="ecommerce" limit={2} location="ecom_result" /></div>
        </Container>
      </Section>

      <Faq items={faqs} index="05" />
      <FinalCta location="ecom_final" title="Know which ads actually make your store money." />
    </>
  )
}
