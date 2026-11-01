import { useRef, useState } from 'react'
import { CircleCheck, LoaderCircle, Lock } from 'lucide-react'
import { Field, inputProps, textareaProps } from './Field'
import Button from '../ui/Button'
import { BookCallButton } from '../ui/CtaButtons'
import { businessTypes, adSpendRanges } from '../../content/forms'
import { getAttribution } from '../../lib/attribution'
import { trackConversion, trackEvent } from '../../lib/analytics'
import { submitForm } from '../../lib/forms'
import { uid } from '../../lib/storage'
import { site, whatsappHref } from '../../config/site'

const FREE_EMAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton|protonmail|ymail)\./i
const empty = { name: '', email: '', website: '', business_type: '', ad_spend: '', question: '' }

function normaliseUrl(v) {
  const t = v.trim()
  if (!t) return ''
  return /^https?:\/\//i.test(t) ? t : `https://${t}`
}

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  try {
    const u = new URL(normaliseUrl(v.website))
    if (!u.hostname.includes('.')) throw new Error()
  } catch {
    e.website = 'Please enter your website, e.g. yourstore.com'
  }
  if (!v.business_type) e.business_type = 'Please choose your business type.'
  if (!v.ad_spend) e.ad_spend = 'Please choose a range.'
  if (v.question.trim().length < 5) e.question = 'Tell us briefly what you would like us to look at.'
  return e
}

export default function MiniAuditForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const started = useRef(false)
  const formRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }
  const onFocus = () => {
    if (!started.current) { started.current = true; trackEvent('form_start', { form_id: 'mini_audit' }) }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    const bot = formRef.current?.elements?.namedItem('bot-field')?.value
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(empty).find((k) => errs[k])
      formRef.current?.elements?.namedItem(first)?.focus()
      return
    }
    if (bot) { setStatus('success'); return } // spam: pretend success, send nothing

    setStatus('submitting')
    const submissionId = uid()
    const payload = {
      ...values,
      website: normaliseUrl(values.website),
      ...getAttribution(),
      page_path: window.location.pathname,
      submission_id: submissionId,
    }
    try {
      await submitForm('mini-audit', payload)
      trackConversion('mini_audit_submitted', submissionId, {
        form_id: 'mini_audit',
        business_type: values.business_type,
        ad_spend_range: values.ad_spend,
      })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-signal-200 bg-white p-6 sm:p-8" role="status">
        <CircleCheck className="h-10 w-10 text-signal-500" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-ink-900">Request received. Thank you.</h2>
        <p className="mt-2 leading-relaxed text-ink-600">
          We&rsquo;ll review your site and send a personalised 5-minute video to <strong className="text-ink-900">{values.email || 'your inbox'}</strong> within 3 business days.
        </p>
        <p className="mt-4 leading-relaxed text-ink-600">Want to talk sooner? Book a discovery call and we&rsquo;ll go through it together.</p>
        <BookCallButton location="mini_audit_success" className="mt-6" />
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onFocus} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-8" name="mini-audit">
      {/* Honeypot: hidden from people, catches bots */}
      <p className="hidden" aria-hidden="true"><label>Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input {...inputProps('name', errors.name)} value={values.name} onChange={onChange} autoComplete="name" />
        </Field>
        <Field id="email" label="Work email" required error={errors.email}>
          <input {...inputProps('email', errors.email)} type="email" inputMode="email" value={values.email} onChange={onChange} autoComplete="email" placeholder="you@company.com" />
          {!errors.email && FREE_EMAIL.test(values.email) && (
            <p className="mt-1.5 text-xs text-ink-500">A work email helps us find your business faster, but this is fine too.</p>
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field id="website" label="Website" required error={errors.website}>
            <input {...inputProps('website', errors.website)} type="text" inputMode="url" value={values.website} onChange={onChange} autoComplete="url" placeholder="yourcompany.com" />
          </Field>
        </div>
        <Field id="business_type" label="Business type" required error={errors.business_type}>
          <select {...inputProps('business_type', errors.business_type)} value={values.business_type} onChange={onChange}>
            <option value="" disabled>Select…</option>
            {businessTypes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field id="ad_spend" label="Monthly ad spend" required error={errors.ad_spend}>
          <select {...inputProps('ad_spend', errors.ad_spend)} value={values.ad_spend} onChange={onChange}>
            <option value="" disabled>Select…</option>
            {adSpendRanges.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="question" label="What's your main question?" required error={errors.question} hint="One or two sentences is plenty">
            <textarea {...textareaProps('question', errors.question)} value={values.question} onChange={onChange} rows={4} placeholder="e.g. Meta says our ROAS is 4x but revenue hasn't moved. Which number is right?" />
          </Field>
        </div>
      </div>

      {status === 'error' && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          Sorry, something went wrong sending your request. Please try again
          {site.contact.email && <>, or email <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></>}
          {whatsappHref && <>, or message us on <a className="underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></>}.
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-ink-500"><Lock className="h-3.5 w-3.5" aria-hidden="true" /> We only use your details to reply. No mailing list.</p>
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? (<><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>) : 'Request my free mini-audit'}
        </Button>
      </div>
    </form>
  )
}
