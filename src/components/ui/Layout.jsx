// Small layout primitives.
export function Container({ children, className = '', narrow = false }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${narrow ? 'max-w-3xl' : 'max-w-6xl'} ${className}`}>{children}</div>
}

export function Section({ children, className = '', id, tone = 'paper' }) {
  const tones = {
    paper: 'bg-paper',
    alt: 'bg-paper-2',
    white: 'bg-white',
    dark: 'bg-ink-900 text-paper',
  }
  return (
    <section id={id} className={`py-16 sm:py-24 scroll-mt-20 ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, index, dark = false, className = '' }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${dark ? 'text-signal-400' : 'text-signal-600'} ${className}`}>
      {index && <span className={dark ? 'text-ink-400' : 'text-ink-400'}>{index}</span>}
      {index && <span className={`h-px w-6 ${dark ? 'bg-ink-600' : 'bg-ink-300'}`} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

export function SectionHeading({ eyebrow, index, title, intro, dark = false, center = false, className = '' }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center [&>p:first-child]:justify-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow index={index} dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-3xl font-semibold leading-[1.1] sm:text-[2.6rem] ${dark ? 'text-paper' : 'text-ink-900'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-600'}`}>{intro}</p>}
    </div>
  )
}

export function Ruler({ className = '' }) {
  return <div className={`ruler ${className}`} aria-hidden="true" />
}

// Clearly-labelled placeholder for content you still need to supply.
export function Placeholder({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-dashed border-caution-500/50 bg-caution-100/60 px-4 py-3 font-mono text-xs text-caution-500 ${className}`}>
      {children}
    </div>
  )
}
