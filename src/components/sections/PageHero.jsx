import { Container, Eyebrow } from '../ui/Layout'
import { CtaPair } from '../ui/CtaButtons'

// Dark hero used at the top of inner pages.
export default function PageHero({ eyebrow, title, body, location, aside, children, ctas = true }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-paper">
      <div className="grid-faint absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-signal-500/15 blur-3xl" aria-hidden="true" />
      <Container className={`relative py-16 sm:py-24 ${aside ? 'grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]' : ''}`}>
        <div className="max-w-2xl animate-rise">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2.35rem] font-semibold leading-[1.05] sm:text-6xl">{title}</h1>
          {body && <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">{body}</p>}
          {ctas && <CtaPair location={location} dark className="mt-9" />}
          {children}
        </div>
        {aside && <div className="animate-rise [animation-delay:150ms]">{aside}</div>}
      </Container>
    </section>
  )
}
