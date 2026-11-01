import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import Home from './pages/Home'

// Pages are loaded on demand so the first visit downloads as little as possible.
const Ecommerce = lazy(() => import('./pages/Ecommerce'))
const LeadGeneration = lazy(() => import('./pages/LeadGeneration'))
const HowWeWork = lazy(() => import('./pages/HowWeWork'))
const About = lazy(() => import('./pages/About'))
const Results = lazy(() => import('./pages/Results'))
const FreeMiniAudit = lazy(() => import('./pages/FreeMiniAudit'))
const BookCall = lazy(() => import('./pages/BookCall'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="lead-generation" element={<LeadGeneration />} />
          <Route path="how-we-work" element={<HowWeWork />} />
          <Route path="about" element={<About />} />
          <Route path="results" element={<Results />} />
          <Route path="free-mini-audit" element={<FreeMiniAudit />} />
          <Route path="book-a-call" element={<BookCall />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<Article />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
