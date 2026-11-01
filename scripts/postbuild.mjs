/**
 * Runs after `vite build`.
 * 1. Writes dist/<page>/index.html for every page with the correct <title>,
 *    description, canonical and Open Graph tags, so LinkedIn and Google link
 *    previews are right (they don't run JavaScript).
 * 2. Generates dist/sitemap.xml and dist/robots.txt.
 * Reads the site URL from VITE_SITE_URL (.env or Netlify environment variables).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { seo } from '../src/config/seo.js'
import { articles } from '../src/content/insights.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

function readEnvUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL
  for (const f of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    const p = path.join(root, f)
    if (!fs.existsSync(p)) continue
    const m = fs.readFileSync(p, 'utf8').match(/^VITE_SITE_URL\s*=\s*(.+)$/m)
    if (m && m[1].trim()) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return 'https://www.example.com'
}
const siteUrl = readEnvUrl().replace(/\/$/, '')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const pages = {
  ...seo,
  ...Object.fromEntries(articles.map((a) => [`/insights/${a.slug}`, { title: `${a.title} | Calibre Data Co`, description: a.description }])),
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function render(route, { title, description }) {
  const url = siteUrl + (route === '/' ? '/' : route)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${siteUrl}/og-image.png$2`)
}

for (const [route, meta] of Object.entries(pages)) {
  const html = render(route, meta)
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages).map((r) => `  <url><loc>${siteUrl}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

console.log(`postbuild: wrote ${Object.keys(pages).length} page shells, sitemap.xml and robots.txt for ${siteUrl}`)
if (siteUrl.includes('example.com')) console.warn('postbuild: VITE_SITE_URL is not set. Using https://www.example.com placeholder.')
