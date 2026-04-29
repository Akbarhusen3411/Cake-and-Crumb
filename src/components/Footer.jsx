import { Link } from 'react-router-dom'
import { Instagram, Phone, MessageCircle, Heart, ArrowUp, MapPin, Send, Cake, Cookie, Coffee } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import { WHATSAPP_URL, INSTAGRAM_URL } from '../config/constants'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'About Us', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-cream to-cream-light overflow-hidden">
      {/* Animated bakery decorations */}
      <Cake size={28} className="absolute top-8 left-[6%] text-gold/20 footer-bake-rise pointer-events-none" aria-hidden="true" />
      <Cookie size={22} className="absolute top-16 right-[7%] text-berry/18 footer-bake-rise pointer-events-none" style={{ animationDelay: '1.2s' }} aria-hidden="true" />
      <Coffee size={20} className="absolute bottom-16 left-[10%] text-chocolate/18 footer-bake-rise pointer-events-none" style={{ animationDelay: '2.4s' }} aria-hidden="true" />
      <span className="absolute top-1/3 right-[15%] text-gold/30 text-xl footer-spin-slow pointer-events-none" aria-hidden="true">✦</span>

      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-soft-pink/30 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">

        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold text-base">✦</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Compact brand block */}
        <div className="text-center mb-8">
          <img
            src={assetUrl('/images/logo.png')}
            alt="Cake & Crumb"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md border-2 border-gold/40 mx-auto mb-2"
          />
          <h3 className="font-script text-2xl sm:text-3xl text-chocolate leading-none">
            Cake <span className="text-gold">&</span> Crumb
          </h3>
          <p className="text-[9px] text-chocolate-light/45 mt-1 tracking-[0.3em] uppercase font-semibold">
            Est. Vaso, Gujarat
          </p>
        </div>

        {/* 3-column compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 max-w-4xl mx-auto text-[13px]">

          {/* Visit */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2">
              <MapPin size={11} className="text-gold" />
              <h4 className="text-[10px] font-bold text-chocolate tracking-[0.18em] uppercase">Visit</h4>
            </div>
            <p className="text-chocolate-light/65 leading-snug">
              Vaso, Kheda · Gujarat 387380
            </p>
            <p className="text-[11px] text-chocolate-light/45 italic mt-1">
              Pre-order — 1 day in advance
            </p>
          </div>

          {/* Explore */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              <h4 className="text-[10px] font-bold text-chocolate tracking-[0.18em] uppercase">Explore</h4>
              <span className="w-1 h-1 rounded-full bg-gold" />
            </div>
            <ul className="space-y-1 grid grid-cols-2 sm:grid-cols-1 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-chocolate-light/65 hover:text-chocolate transition-colors"
                  >
                    <span className="w-0 h-px bg-berry transition-all duration-300 group-hover:w-2.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach */}
          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-end gap-1.5 mb-2">
              <h4 className="text-[10px] font-bold text-chocolate tracking-[0.18em] uppercase">Reach</h4>
              <Send size={11} className="text-gold" />
            </div>
            <ul className="space-y-1 text-chocolate-light/65">
              <li><a href="tel:+919081668490" className="hover:text-berry transition-colors">+91 90816 68490</a></li>
              <li><a href="tel:+919173183440" className="hover:text-berry transition-colors">+91 91731 83440</a></li>
              <li className="pt-0.5">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-berry transition-colors text-[12px]">
                  @cake_and_crumb_1
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social row — compact */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group relative w-10 h-10 rounded-full bg-cream-light border border-gold/30 flex items-center justify-center text-chocolate hover:text-white transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/25 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Instagram size={15} className="relative z-10" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group relative w-10 h-10 rounded-full bg-cream-light border border-gold/30 flex items-center justify-center text-chocolate hover:text-white transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/25 overflow-hidden"
          >
            <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <MessageCircle size={15} className="relative z-10" />
          </a>
          <a
            href="tel:+919081668490"
            aria-label="Phone"
            className="group relative w-10 h-10 rounded-full bg-cream-light border border-gold/30 flex items-center justify-center text-chocolate hover:text-cream transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-chocolate/20 overflow-hidden"
          >
            <span className="absolute inset-0 bg-chocolate opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Phone size={15} className="relative z-10" />
          </a>
        </div>
      </div>

      {/* Bottom bar — compact */}
      <div className="relative mt-8 pt-4 pb-4 border-t border-chocolate/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-chocolate-light/45 flex items-center gap-1.5 tracking-wide">
            &copy; {new Date().getFullYear()} Cake <span className="text-gold">&</span> Crumb · Baked with
            <Heart size={11} className="text-berry fill-berry animate-pulse" />
            in Vaso
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex items-center gap-2 text-[10px] font-semibold text-chocolate-light/55 hover:text-chocolate tracking-[0.18em] uppercase transition-colors"
          >
            <span>Back to Top</span>
            <span className="w-8 h-8 rounded-full bg-cream-light border border-gold/30 flex items-center justify-center group-hover:bg-chocolate group-hover:border-chocolate group-hover:text-cream transition-all duration-500 group-hover:-translate-y-0.5">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
