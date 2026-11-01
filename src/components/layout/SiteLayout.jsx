import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import ConsentBanner from './ConsentBanner'
import { trackPageView } from '../../lib/analytics'

function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    // Scroll to an anchor (#agencies) or to the top on page change.
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); return }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  useEffect(() => {
    trackPageView(location.key, location.pathname)
  }, [location.key, location.pathname])
  return null
}

export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <RouteEffects />
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </div>
  )
}
