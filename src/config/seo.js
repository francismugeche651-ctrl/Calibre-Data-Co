/**
 * PAGE TITLES & META DESCRIPTIONS
 * -------------------------------------------------------------------------
 * One focus phrase per page (see website plan). Used by the app at runtime
 * AND by scripts/postbuild.mjs to write static HTML for each page, so that
 * LinkedIn/Google link previews show the right title and description.
 * Plain JavaScript only in this file (it is also read by Node at build time).
 */
export const seo = {
  '/': {
    title: 'Calibre Data Co | Measurement-led growth for e-commerce and lead-gen brands',
    description:
      'Know which ads actually make you money. Calibre Data Co fixes your tracking, connects your ads to real revenue, and shows you where your next budget should go.',
  },
  '/ecommerce': {
    title: 'Shopify & E-commerce Tracking Audit | Calibre Data Co',
    description:
      'Platform ROAS says one thing, your bank says another. We audit and fix e-commerce tracking, then report MER, new-customer CAC and contribution margin you can trust.',
  },
  '/lead-generation': {
    title: 'Lead Generation Tracking & Closed-Loop Measurement | Calibre Data Co',
    description:
      'Stop paying for leads that never buy. We connect your ads to your CRM so you see cost per customer and lead quality, not just cost per lead.',
  },
  '/how-we-work': {
    title: 'How We Work: Audit, Setup, Oversight | Calibre Data Co',
    description:
      'A measurement-first process in three steps: audit, setup and ongoing oversight. Timelines, what we need from you, and how we work alongside your agency.',
  },
  '/about': {
    title: 'About Calibre Data Co | Measurement-first marketing consultancy',
    description:
      'Why we put measurement before media spend, the standards we work to, and who we work best with.',
  },
  '/results': {
    title: 'Results & Case Studies | Calibre Data Co',
    description:
      'Measurement case studies in a fixed format: client type, problem, what we did, and the numbers before and after.',
  },
  '/free-mini-audit': {
    title: 'Free Tracking Mini-Audit | Calibre Data Co',
    description:
      'Get a free, personalised 5-minute video review of your tracking and measurement setup within 3 business days.',
  },
  '/book-a-call': {
    title: 'Book a Discovery Call | Calibre Data Co',
    description:
      'Book a 30-minute discovery call to talk through your tracking, attribution and growth questions. No obligation.',
  },
  '/insights': {
    title: 'Insights on Tracking, Attribution & Measurement | Calibre Data Co',
    description:
      'Short, practical articles on e-commerce tracking, lead quality, attribution and measurement-led growth.',
  },
  '/privacy': {
    title: 'Privacy Policy | Calibre Data Co',
    description: 'How Calibre Data Co collects, uses and protects personal data on this website.',
  },
  '/terms': {
    title: 'Terms of Use | Calibre Data Co',
    description: 'Terms of use for the Calibre Data Co website.',
  },
}

export const fallbackSeo = seo['/']
