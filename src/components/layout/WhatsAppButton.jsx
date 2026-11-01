import { whatsappHref } from '../../config/site'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { trackEvent } from '../../lib/analytics'

// Floating WhatsApp button. Hidden until VITE_WHATSAPP_NUMBER is set
// (in local development a dimmed reminder is shown instead).
export default function WhatsAppButton() {
  if (!whatsappHref) {
    if (!import.meta.env.DEV) return null
    return (
      <div className="fixed right-4 bottom-4 z-30 flex h-12 items-center gap-2 rounded-full border border-dashed border-caution-500 bg-caution-100 px-4 font-mono text-[11px] text-caution-500 shadow-lg" title="Set VITE_WHATSAPP_NUMBER in .env">
        <WhatsAppIcon className="h-4 w-4" /> Set VITE_WHATSAPP_NUMBER
      </div>
    )
  }
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { link_location: 'floating_button' })}
      className="fixed right-4 bottom-4 z-30 inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#1f9d55] text-white shadow-[0_8px_24px_-6px_rgb(13_22_38/0.45)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  )
}
