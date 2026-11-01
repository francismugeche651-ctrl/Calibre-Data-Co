/**
 * SITE SETTINGS
 * -------------------------------------------------------------------------
 * Values come from environment variables (see .env.example) so you can change
 * them in Netlify without editing code. Anything shown as [PLACEHOLDER] is
 * something for you to replace. Search the project for "[PLACEHOLDER" to find them all.
 */
const env = import.meta.env

export const site = {
  name: 'Calibre Data Co',
  tagline: 'Measurement-led growth for e-commerce and lead-generation brands.',
  url: (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, ''),

  contact: {
    email: env.VITE_CONTACT_EMAIL || '',
    whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
    whatsappMessage: "Hi Calibre Data Co, I'd like to ask about tracking and measurement for my business.",
    linkedinCompany: env.VITE_LINKEDIN_COMPANY_URL || '',
    linkedinFounder: env.VITE_LINKEDIN_FOUNDER_URL || '',
    location: '[PLACEHOLDER: City, Country]',
  },

  founder: {
    name: '[PLACEHOLDER: Founder name]',
    role: 'Founder, Calibre Data Co',
    // Put a compressed square headshot (≈600×600, WebP/JPG under 80 KB) in /public and set the path, e.g. '/founder.webp'
    photo: '',
  },

  pricing: {
    auditsFrom: 'USD 1,250',
  },

  scheduler: {
    provider: (env.VITE_SCHEDULER_PROVIDER || 'calendly').toLowerCase(), // 'calendly' | 'cal'
    url: env.VITE_SCHEDULER_URL || '',
  },

  forms: {
    provider: (env.VITE_FORM_PROVIDER || 'netlify').toLowerCase(), // 'netlify' | 'webhook'
    webhookUrl: env.VITE_FORM_WEBHOOK_URL || '',
  },

  tracking: {
    gtmId: env.VITE_GTM_ID || '',
    ga4Id: env.VITE_GA4_ID || '',
    linkedinPartnerId: env.VITE_LINKEDIN_PARTNER_ID || '',
  },
}

export const whatsappHref = site.contact.whatsappNumber
  ? `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappMessage)}`
  : ''
