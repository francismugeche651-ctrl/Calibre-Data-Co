import PageSeo from '../components/ui/PageSeo'
import { Container, Eyebrow, Placeholder } from '../components/ui/Layout'
import { site } from '../config/site'

// [PLACEHOLDER] Starter outlines only, not legal advice.
// Have these reviewed for your jurisdiction (e.g. Kenya Data Protection Act, GDPR/UK GDPR) before launch.

function LegalPage({ path, title, children }) {
  return (
    <>
      <PageSeo path={path} />
      <Container narrow className="py-14 sm:py-20">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold text-ink-900">{title}</h1>
        <Placeholder className="mt-6">[PLACEHOLDER] Starter template. Have this reviewed by a qualified professional before launch.</Placeholder>
        <div className="prose-calibre mt-8">{children}</div>
      </Container>
    </>
  )
}

export function Privacy() {
  return (
    <LegalPage path="/privacy" title="Privacy policy">
      <p><strong>Last updated:</strong> [PLACEHOLDER: date]</p>
      <h2>Who we are</h2>
      <p>{site.name} ([PLACEHOLDER: registered company name and address]). Contact: {site.contact.email || '[PLACEHOLDER: email]'}.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Forms:</strong> when you request a mini-audit, we collect your name, work email, website, business type, ad spend range and your question.</li>
        <li><strong>Campaign source:</strong> we record which link or campaign brought you to the site (UTM parameters), the first page you visited and the referring site, and attach these to your enquiry.</li>
        <li><strong>Bookings:</strong> discovery calls are booked through our scheduling provider ([PLACEHOLDER: Calendly / Cal.com]), which processes the details you enter there.</li>
        <li><strong>Analytics and marketing cookies (with your consent):</strong> Google Analytics 4 via Google Tag Manager, and the LinkedIn Insight Tag.</li>
      </ul>
      <h2>Why we use it</h2>
      <p>To respond to your enquiry, prepare your mini-audit, run discovery calls, and understand which content and campaigns are useful. We do not sell your data.</p>
      <h2>Cookies and consent</h2>
      <p>Analytics and marketing cookies only run if you allow them. You can change your choice at any time with the &ldquo;Cookie settings&rdquo; link in the footer.</p>
      <h2>Where data is stored</h2>
      <p>[PLACEHOLDER: e.g. Netlify (form submissions), your CRM, Google, LinkedIn, your scheduling tool.]</p>
      <h2>How long we keep it</h2>
      <p>[PLACEHOLDER: retention period.]</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your personal data by emailing {site.contact.email || '[PLACEHOLDER: email]'}.</p>
    </LegalPage>
  )
}

export function Terms() {
  return (
    <LegalPage path="/terms" title="Terms of use">
      <p><strong>Last updated:</strong> [PLACEHOLDER: date]</p>
      <h2>Use of this website</h2>
      <p>The content on this website is for general information. It is not a substitute for advice specific to your business.</p>
      <h2>Free mini-audits</h2>
      <p>Mini-audits are based on publicly visible information about your website and are provided without charge or obligation.</p>
      <h2>Intellectual property</h2>
      <p>All content on this site belongs to {site.name} unless stated otherwise.</p>
      <h2>Governing law</h2>
      <p>[PLACEHOLDER: jurisdiction.]</p>
    </LegalPage>
  )
}
