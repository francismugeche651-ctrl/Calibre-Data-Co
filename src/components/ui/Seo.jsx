import { useEffect } from 'react'
import { site } from '../../config/site'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets title, description, canonical and social tags for the current page.
// (Static versions of the same tags are written at build time by scripts/postbuild.mjs.)
export default function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    document.title = title
    const url = site.url + (path === '/' ? '/' : path)
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = url
  }, [title, description, path, noindex])
  return null
}
