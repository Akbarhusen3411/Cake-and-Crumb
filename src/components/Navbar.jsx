import { useState, useEffect } from 'react'
import { Menu, X, Instagram, MessageCircle, Phone, MapPin, ArrowRight, Sparkles, Home, Cake, Heart, Star, Send, ShoppingBag } from 'lucide-react'
import useCartStore from '../store/useCartStore'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Cakes', href: '#cakes', icon: Cake },
  { label: 'About', href: '#about', icon: Heart },
  { label: 'Reviews', href: '#testimonials', icon: Star },
  { label: 'Contact', href: '#contact', icon: Send },
]

export default function Navbar({ onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const itemCount = useCartStore((s) => s.getItemCount())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in view
  useEffect(() => {
    const sectionIds = ['home', 'cakes', 'about', 'testimonials', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'navbar-scrolled py-2.5' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo + Slogan */}
        <a href="#home" className="flex items-center gap-3 group relative z-50">
          <div className="w-11 h-11 rounded-full bg-chocolate flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
            <span className="font-heading text-cream text-sm font-bold">C&C</span>
          </div>
          <div className="leading-tight">
            <span className={`font-script text-2xl sm:text-2xl tracking-wide block transition-colors duration-500 ${mobileOpen ? 'text-cream' : 'text-chocolate'}`}>
              Cake <span className={mobileOpen ? 'text-berry-light' : 'text-berry'}>&</span> Crumb
            </span>
            <span className="font-heading text-[10px] sm:text-xs text-chocolate-light/60 italic tracking-wider hidden sm:block">
              The Gourmet Chocolate & Berry Boutique
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = `#${activeSection}` === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-berry after:transition-all after:duration-500 ${
                  isActive
                    ? 'text-berry after:w-full'
                    : 'text-chocolate-light hover:text-berry after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="https://instagram.com/cake_and_crumb_1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-chocolate/15 flex items-center justify-center text-chocolate-light hover:bg-berry hover:border-berry hover:text-white transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <button
            onClick={onCartClick}
            className="relative w-9 h-9 rounded-full border border-chocolate/15 flex items-center justify-center text-chocolate-light hover:bg-chocolate hover:border-chocolate hover:text-cream transition-all duration-300"
            aria-label="Cart"
          >
            <ShoppingBag size={16} />
            {itemCount > 0 && (
              <span className="badge-pop absolute -top-1.5 -right-1.5 w-5 h-5 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                {itemCount}
              </span>
            )}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer bg-chocolate text-cream px-6 py-2.5 rounded-full text-sm font-medium hover:bg-chocolate-light transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <MessageCircle size={15} />
            Order Now
          </a>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="lg:hidden flex items-center gap-2 relative z-50">
          <button
            onClick={onCartClick}
            className="relative w-10 h-10 flex items-center justify-center text-chocolate"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="badge-pop absolute top-0.5 right-0.5 w-5 h-5 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                {itemCount}
              </span>
            )}
          </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-500 ease-out ${
            mobileOpen ? 'bg-cream rotate-45 translate-y-[7px]' : 'bg-chocolate'
          }`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${
            mobileOpen ? 'bg-cream opacity-0 scale-x-0' : 'bg-chocolate opacity-100'
          }`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-500 ease-out ${
            mobileOpen ? 'bg-cream -rotate-45 -translate-y-[7px]' : 'bg-chocolate'
          }`} />
        </button>
        </div>
      </div>

      {/* =========== Mobile Drawer =========== */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer Panel — slides from right */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-40 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate via-[#3a2118] to-[#2C1810]" />
        {/* Ambient light */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-berry/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-[60px]" />

        {/* Drawer content */}
        <div className="relative h-full flex flex-col pt-24 pb-8 px-7 overflow-y-auto">

          {/* Header with slogan */}
          <div className={`mb-8 transition-all duration-700 delay-200 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="font-heading text-sm text-cream/40 italic tracking-wide leading-relaxed">
              The Gourmet Chocolate<br />& Berry Boutique
            </p>
            <div className="w-10 h-[2px] bg-gradient-to-r from-gold to-berry mt-3 rounded-full" />
          </div>

          {/* Nav Links */}
          <div className="space-y-1 mb-10">
            {navLinks.map((link, i) => {
              const isActive = `#${activeSection}` === link.href
              const LinkIcon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-500 ${
                    mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  } ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  style={{ transitionDelay: mobileOpen ? `${250 + i * 70}ms` : '0ms' }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-gold/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <LinkIcon size={17} className={`transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-cream/50 group-hover:text-cream/80'
                    }`} />
                  </div>
                  <span className={`font-heading text-lg font-semibold transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-cream/80 group-hover:text-cream'
                  }`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                  <ArrowRight size={14} className="ml-auto text-cream/20 group-hover:text-cream/50 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              )
            })}
          </div>

          {/* Bottom Info */}
          <div className={`mt-auto space-y-3 transition-all duration-700 ${
            mobileOpen ? 'opacity-100 translate-y-0 delay-[750ms]' : 'opacity-0 translate-y-6'
          }`}>
            <a href="tel:+919081668490" className="flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors duration-300">
              <Phone size={14} />
              <span className="text-xs">+91 90816 68490</span>
            </a>
            <div className="flex items-center gap-3 text-cream/40">
              <MapPin size={14} />
              <span className="text-xs">Ahmedabad, Gujarat</span>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-cream/20 tracking-wider">
                THE GOURMET CHOCOLATE & BERRY BOUTIQUE
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
