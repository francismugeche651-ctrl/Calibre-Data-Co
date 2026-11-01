/**
 * FORM SUBMISSION
 * -------------------------------------------------------------------------
 * provider "netlify" (default): posts to Netlify Forms. Submissions appear in
 *   Netlify → Forms, and can be emailed to you or forwarded to HubSpot/Zapier.
 * provider "webhook": posts JSON to VITE_FORM_WEBHOOK_URL (Make, Zapier, n8n,
 *   or your own endpoint). Use this to push leads straight into your CRM.
 * In local development (npm run dev) submissions are simulated and logged.
 */
import { site } from '../config/site'

function encode(data) {
  return Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k] ?? '')).join('&')
}

export async function submitForm(formName, data) {
  if (import.meta.env.DEV && site.forms.provider === 'netlify') {
    console.info(`[forms] DEV: simulated "${formName}" submission`, data)
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, simulated: true }
  }

  if (site.forms.provider === 'webhook') {
    if (!site.forms.webhookUrl) throw new Error('VITE_FORM_WEBHOOK_URL is not set')
    const res = await fetch(site.forms.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form: formName, submitted_at: new Date().toISOString(), ...data }),
    })
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
    return { ok: true }
  }

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({ 'form-name': formName, ...data }),
  })
  if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
  return { ok: true }
}
