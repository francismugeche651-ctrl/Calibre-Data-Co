import PageSeo from '../components/ui/PageSeo'
import { Container, Section } from '../components/ui/Layout'
import PageHero from '../components/sections/PageHero'
import ResultsShowcase from '../components/sections/ResultsShowcase'
import FinalCta from '../components/sections/FinalCta'

// Case studies are managed in src/content/results.js
export default function Results() {
  return (
    <>
      <PageSeo path="/results" />
      <PageHero
        eyebrow="Results"
        title="Numbers before and after. Nothing else."
        body="Every case study follows the same format: client type, problem, what we did, and the numbers before and after. Only published with the client's approval."
        location="results_hero"
        ctas={false}
      />
      <Section>
        <Container>
          <ResultsShowcase location="results_page" />
        </Container>
      </Section>
      <FinalCta location="results_final" title="Want to be one of our first case studies?" body="We're taking on a small number of pilot clients. Book a call to see if your business is a fit." />
    </>
  )
}
