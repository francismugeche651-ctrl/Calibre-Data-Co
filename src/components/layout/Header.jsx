import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { mainNav } from '../../config/navigation'
import { Logo } from '../ui/BrandIcons'
import { Container } from '../ui/Layout'
import { BookCallButton, MiniAuditButton } from '../ui/CtaButtons'
import { ctas } from '../../content/shared'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkCls = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-ink-600 hover:text-ink-900'}`

  return (
    <header className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ${scrolled || open ? 'border-line bg-paper/90 backdrop-blur-md' : 'border-transparent bg-paper'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Calibre Data Co home" className="shrink-0"><Logo /></Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {mainNav.map((item) => <NavLink key={item.to} to={item.to} className={linkCls}>{item.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-2">
          <BookCallButton location="header" size="sm" label={ctas.primary.short} className="!gap-1.5" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-900/15 text-ink-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden">
          <Container className="py-6">
            <nav aria-label="Mobile" className="flex flex-col">
              <NavLink to="/" end className="border-b border-line py-4 text-lg text-ink-900">Home</NavLink>
              {mainNav.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `border-b border-line py-4 text-lg ${isActive ? 'font-medium text-signal-600' : 'text-ink-900'}`}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <BookCallButton location="mobile_menu" size="lg" />
              <MiniAuditButton location="mobile_menu" size="lg" />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
