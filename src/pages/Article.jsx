import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Seo from '../components/ui/Seo'
import { Container, Eyebrow } from '../components/ui/Layout'
import { BookCallButton, MiniAuditButton } from '../components/ui/CtaButtons'
import FinalCta from '../components/sections/FinalCta'
import NotFound from './NotFound'
import { getArticle } from '../content/insights'
import { formatDate } from './Insights'

const relatedLabels = {
  '/ecommerce': 'See e-commerce measurement services',
  '/lead-generation': 'See lead-generation measurement services',
  '/how-we-work': 'See how we work',
}

function Block({ b }) {
  if (b.h2) return <h2>{b.h2}</h2>
  if (b.ul) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
  if (b.quote) return <blockquote className="my-8 border-l-2 border-signal-500 pl-5 text-xl font-medium leading-relaxed text-ink-900">{b.quote}</blockquote>
  return <p>{b.p}</p>
}

export default function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  if (!a) return <NotFound />
  const path = `/insights/${a.slug}`
  return (
    <>
      <Seo title={`${a.title} | Calibre Data Co`} description={a.description} path={path} />
      <article>
        <header className="border-b border-line bg-white">
          <Container narrow className="py-12 sm:py-16">
            <Link to="/insights" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900"><ArrowLeft className="h-4 w-4" /> All insights</Link>
            <Eyebrow className="mt-8">{a.category}</Eyebrow>
            <h1 className="mt-4 text-3xl leading-[1.1] font-semibold text-ink-900 sm:text-5xl">{a.title}</h1>
            <p className="mt-5 font-mono text-xs text-ink-400">{formatDate(a.date)} · {a.readingTime}</p>
          </Container>
        </header>
        <Container narrow className="py-12 sm:py-16">
          <div className="prose-calibre text-[17px]">{a.body.map((b, i) => <Block key={i} b={b} />)}</div>
          <aside className="mt-12 rounded-2xl border border-line bg-white p-6 sm:p-8">
            <p className="text-lg font-semibold text-ink-900">Want to know how your own numbers hold up?</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <BookCallButton location={`article_${a.slug}`} />
              <MiniAuditButton location={`article_${a.slug}`} />
            </div>
            {a.related && (
              <Link to={a.related} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-600 hover:text-signal-700">
                {relatedLabels[a.related] || 'Related service'} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </aside>
        </Container>
      </article>
      <FinalCta location="article_final" />
    </>
  )
}
