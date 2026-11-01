import Seo from '../components/ui/Seo'
import { Container, Eyebrow } from '../components/ui/Layout'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Calibre Data Co" description="This page could not be found." path="/404" noindex />
      <Container className="py-24 sm:py-32">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold text-ink-900 sm:text-5xl">This page doesn&rsquo;t measure up.</h1>
        <p className="mt-4 max-w-lg text-lg text-ink-600">The link may be broken, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" variant="dark">Go to the homepage</Button>
          <Button to="/book-a-call" variant="outline" trackId="book_call" trackLocation="404">Book a call</Button>
        </div>
      </Container>
    </>
  )
}
