import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 group transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
      aria-label="Order via WhatsApp"
    >
      <div className="relative">
        {/* Glow ring */}
        <span className="absolute -inset-1 rounded-full bg-green-400/30 animate-ping opacity-40" />
        {/* Outer ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-20 blur-sm" />
        {/* Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/25 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/35 transition-all duration-500 wa-btn-bounce">
          <MessageCircle size={24} className="text-white" />
        </div>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-chocolate/90 backdrop-blur-sm text-cream text-xs px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 pointer-events-none shadow-lg">
          Order on WhatsApp
        </span>
      </div>
    </a>
  )
}
