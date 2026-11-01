// Form field wrappers with accessible labels and error messages.
const base =
  'block w-full rounded-lg border bg-white px-3.5 text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-signal-500/30'

export function Field({ id, label, hint, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-ink-900">
        <span>{label}{required && <span className="text-signal-600" aria-hidden="true"> *</span>}</span>
        {hint && <span className="text-xs font-normal text-ink-400">{hint}</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  )
}

export function inputProps(id, error) {
  return {
    id,
    name: id,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: `${base} h-12 ${error ? 'border-red-600 focus:border-red-600' : 'border-ink-200 focus:border-signal-500'}`,
  }
}

export function textareaProps(id, error) {
  const p = inputProps(id, error)
  return { ...p, className: p.className.replace('h-12', 'min-h-28 py-3') }
}
