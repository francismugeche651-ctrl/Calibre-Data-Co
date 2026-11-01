import { Check } from 'lucide-react'
import PageSeo from '../components/ui/PageSeo'
import { Container, Section, SectionHeading } from '../components/ui/Layout'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/sections/PageHero'
import { FounderPhoto } from '../components/sections/FounderNote'
import FinalCta from '../components/sections/FinalCta'
import { BookCallButton } from '../components/ui/CtaButtons'
import { LinkedInIcon } from '../components/ui/BrandIcons'
import { about } from '../content/about'
import { site } from '../config/site'

export default function About() {
  const { hero, story, why, name, values, partners } = about
  return (
    <>
      <PageSeo path="/about" />
      <PageHero {...hero} location="about_hero" ctas={false} />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div>
            <FounderPhoto className="w-full max-w-xs" />
            <p className="mt-4 font-semibold text-ink-900">{site.founder.name}</p>
            <p className="text-sm text-ink-600">{site.founder.role}</p>
            {site.contact.linkedinFounder && (
              <a href={site.contact.linkedinFounder} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-signal-600 hover:text-signal-700">
                <LinkedInIcon className="h-4 w-4" /> Connect on LinkedIn
              </a>
            )}
          </div>
          <div>
            <SectionHeading eyebrow="Founder story" index="01" title="Why Calibre Data Co exists" />
            <div className="prose-calibre mt-6 text-lg">
              {story.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our approach" index="02" title={why.title} dark />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-300">{why.body.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-7 sm:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-400">{name.title}</p>
            <p className="mt-4 text-xl leading-relaxed text-paper sm:text-2xl">{name.body}</p>
            <div className="ruler mt-8 text-ink-400" aria-hidden="true" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Values" index="03" title="What we hold ourselves to" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="bg-white p-7">
                <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="alt" id="partners">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Partners" index="04" title={partners.title} intro={partners.body} />
            <BookCallButton location="about_partners" label="Talk about partnering" variant="dark" className="mt-8" />
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-600">Our ideal client</p>
            <ul className="mt-5 space-y-3">
              {partners.idealClient.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-ink-800"><Check className="mt-1 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />{c}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FinalCta location="about_final" />
    </>
  )
}
