import Seo from './Seo'
import { seo, fallbackSeo } from '../../config/seo'

// <PageSeo path="/ecommerce" /> pulls the title/description from src/config/seo.js
export default function PageSeo({ path, noindex }) {
  const s = seo[path] || fallbackSeo
  return <Seo title={s.title} description={s.description} path={path} noindex={noindex} />
}
