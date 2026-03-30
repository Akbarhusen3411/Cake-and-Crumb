import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram, MessageCircle, Phone, MapPin, ArrowRight, Home, Cake, Heart, Star, Send, ShoppingBag } from 'lucide-react'
import useCartStore from '../store/useCartStore'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'

const navLinks = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Menu', to: '/menu', icon: Cake },
  { label: 'About', to: '/about', icon: Heart },
  { label: 'Reviews', to: '/reviews', icon: Star },
  { label: 'Contact', to: '/contact', icon: Send },
]

export default function Navbar({ onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const location = useLocation()
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Smooth drawer open/close with proper sequencing
  const openDrawer = useCallback(() => {
    setMobileOpen(true)
    document.body.style.overflow = 'hidden'
    // Small delay so the DOM renders the drawer before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerVisible(true))
    })
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false)
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setMobileOpen(false)
      document.body.style.overflow = ''
    }, 400)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    if (mobileOpen) closeDrawer()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-scrolled py-2' : 'py-3 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group relative z-50">
          <img
            src="/images/logo.png"
            alt="Cake & Crumb"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-500 border-2 border-gold/30"
          />
          <div className="leading-tight hidden sm:block">
            <span className={`font-script text-2xl tracking-wide block transition-colors duration-500 ${mobileOpen ? 'text-cream' : 'text-chocolate'}`}>
              Cake <span className={mobileOpen ? 'text-berry-light' : 'text-berry'}>&</span> Crumb
            </span>
            <span className="font-heading text-[10px] text-chocolate-light/60 italic tracking-wider">
              The Gourmet Chocolate & Berry Boutique
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-berry after:transition-all after:duration-500 ${
                  isActive
                    ? 'text-berry after:w-full'
                    : 'text-chocolate-light hover:text-berry after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
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
            onClick={() => mobileOpen ? closeDrawer() : openDrawer()}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-400 ease-out ${
              drawerVisible ? 'bg-cream rotate-45 translate-y-[7px]' : 'bg-chocolate'
            }`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${
              drawerVisible ? 'bg-cream opacity-0 scale-x-0' : 'bg-chocolate opacity-100'
            }`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-400 ease-out ${
              drawerVisible ? 'bg-cream -rotate-45 -translate-y-[7px]' : 'bg-chocolate'
            }`} />
          </button>
        </div>
      </div>

      {/* =========== Mobile Drawer =========== */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`lg:hidden fixed inset-0 z-40 transition-all duration-400 ease-out ${
              drawerVisible
                ? 'bg-black/50 backdrop-blur-sm'
                : 'bg-black/0 backdrop-blur-none'
            }`}
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <div
            className={`lg:hidden fixed top-0 right-0 bottom-0 w-[82%] max-w-sm z-40 transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
              drawerVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Drawer background */}
            <div className="absolute inset-0 bg-gradient-to-b from-chocolate via-[#3a2118] to-[#2C1810] shadow-2xl" />
            {/* Ambient light */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-berry/8 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/8 rounded-full blur-[60px]" />

            {/* Drawer content */}
            <div className="relative h-full flex flex-col pt-20 pb-8 px-6 overflow-y-auto drawer-scroll">

              {/* Logo in drawer */}
              <div className={`flex items-center gap-3 mb-8 transition-all duration-500 ${
                drawerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`} style={{ transitionDelay: drawerVisible ? '150ms' : '0ms' }}>
                <img
                  src="/images/logo.png"
                  alt="Cake & Crumb"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold/30 shadow-lg"
                />
                <div>
                  <p className="font-script text-xl text-cream">
                    Cake <span className="text-berry-light">&</span> Crumb
                  </p>
                  <p className="text-[10px] text-cream/40 italic tracking-wider">
                    The Gourmet Chocolate & Berry Boutique
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent mb-6" />

              {/* Nav Links */}
              <div className="space-y-1 mb-10">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to
                  const LinkIcon = link.icon
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-400 ${
                        drawerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                      } ${isActive ? 'bg-white/10' : 'active:bg-white/5'}`}
                      style={{ transitionDelay: drawerVisible ? `${200 + i * 60}ms` : '0ms' }}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-gold/20' : 'bg-white/5'
                      }`}>
                        <LinkIcon size={17} className={`transition-colors duration-300 ${
                          isActive ? 'text-gold' : 'text-cream/50'
                        }`} />
                      </div>
                      <span className={`font-heading text-base font-semibold transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-cream/80'
                      }`}>
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                      <ArrowRight size={14} className="ml-auto text-cream/15" />
                    </Link>
                  )
                })}
              </div>

              {/* Order CTA in drawer */}
              <div className={`mb-8 transition-all duration-500 ${
                drawerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: drawerVisible ? '550ms' : '0ms' }}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-medium text-sm active:scale-95 transition-transform"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </a>
              </div>

              {/* Bottom Info */}
              <div className={`mt-auto space-y-3 transition-all duration-500 ${
                drawerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: drawerVisible ? '600ms' : '0ms' }}>
                <a href="tel:+919081668490" className="flex items-center gap-3 text-cream/40 active:text-cream/70 transition-colors">
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
        </>
      )}
    </nav>
  )
}
