import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram, MessageCircle, Phone, MapPin, Home, Cake, Heart, Star, Send, HelpCircle, ShoppingBag, X } from 'lucide-react'
import useCartStore from '../store/useCartStore'
import { assetUrl } from '../utils/assetPath'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'
const INSTAGRAM_URL = 'https://instagram.com/cake_and_crumb_1'

const navLinks = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Menu', to: '/menu', icon: Cake },
  { label: 'About', to: '/about', icon: Heart },
  { label: 'Reviews', to: '/reviews', icon: Star },
  { label: 'Contact', to: '/contact', icon: Send },
  { label: 'FAQ', to: '/faq', icon: HelpCircle },
]

export default function Navbar({ onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const location = useLocation()
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = useCallback(() => {
    setMenuVisible(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuOpen(true)
      })
    })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => {
      setMenuVisible(false)
    }, 400)
  }, [])

  // Close on route change
  useEffect(() => {
    if (menuOpen) closeMenu()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-scrolled py-2' : 'py-3 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group relative z-[110] min-w-0">
          <img src={assetUrl('/images/logo.png')} alt="Cake & Crumb" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-500 border-2 border-gold/30 shrink-0" />
          <div className="leading-tight min-w-0">
            <span className="font-script text-lg sm:text-2xl tracking-wide block text-chocolate">Cake <span className="text-berry">&</span> Crumb</span>
            <span className="font-heading text-[7px] sm:text-[10px] text-chocolate-light/50 italic tracking-wide block truncate">The Gourmet Chocolate & Berry Boutique</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link key={link.label} to={link.to} className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-berry after:transition-all after:duration-500 ${isActive ? 'text-berry after:w-full' : 'text-chocolate-light hover:text-berry after:w-0 hover:after:w-full'}`}>
                {link.label}
              </Link>
            )
          })}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-chocolate/15 flex items-center justify-center text-chocolate-light hover:bg-berry hover:border-berry hover:text-white transition-all duration-300" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <button onClick={onCartClick} className="relative w-9 h-9 rounded-full border border-chocolate/15 flex items-center justify-center text-chocolate-light hover:bg-chocolate hover:border-chocolate hover:text-cream transition-all duration-300" aria-label="Cart">
            <ShoppingBag size={16} />
            {itemCount > 0 && <span className="badge-pop absolute -top-1.5 -right-1.5 w-5 h-5 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">{itemCount}</span>}
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-shimmer bg-chocolate text-cream px-6 py-2.5 rounded-full text-sm font-medium hover:bg-chocolate-light transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
            <MessageCircle size={15} />
            Order Now
          </a>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="lg:hidden flex items-center gap-1 relative z-[110]">
          <button onClick={onCartClick} className="relative w-10 h-10 flex items-center justify-center text-chocolate" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && <span className="badge-pop absolute top-0.5 right-0.5 w-5 h-5 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">{itemCount}</span>}
          </button>
          <button
            onClick={() => menuOpen ? closeMenu() : openMenu()}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] rounded-full bg-chocolate transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-chocolate transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-chocolate transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* =========== Slide-from-Right Mobile Menu =========== */}
      {menuVisible && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop with blur */}
          <div
            onClick={closeMenu}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(62, 39, 35, 0.3)',
              backdropFilter: menuOpen ? 'blur(6px)' : 'blur(0px)',
              WebkitBackdropFilter: menuOpen ? 'blur(6px)' : 'blur(0px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Slide-in Panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '360px',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
            className="bg-cream-light shadow-2xl overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] right-[-15%] w-80 h-80 bg-soft-pink/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-15%] w-72 h-72 bg-gold/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-[30%] left-[50%] w-48 h-48 bg-berry/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto">

              {/* Nav Links */}
              <nav className="flex flex-col items-center gap-0.5 mb-5">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to
                  const LinkIcon = link.icon
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      style={{
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                        transition: menuOpen
                          ? `opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${80 + i * 50}ms, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${80 + i * 50}ms`
                          : 'opacity 0.2s ease, transform 0.2s ease',
                      }}
                      className={`flex items-center gap-4 px-7 py-2.5 rounded-2xl w-60 transition-colors duration-200 ${
                        isActive
                          ? 'bg-chocolate text-cream shadow-lg shadow-chocolate/20'
                          : 'text-chocolate active:bg-chocolate/5'
                      }`}
                    >
                      <LinkIcon size={18} className={isActive ? 'text-gold' : 'text-chocolate-light/40'} />
                      <span className="font-heading text-[15px] font-semibold">{link.label}</span>
                      {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-gold" />}
                    </Link>
                  )
                })}
              </nav>

              {/* Bottom Social */}
              <div
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                  transition: menuOpen
                    ? 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 380ms, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 380ms'
                    : 'opacity 0.2s ease, transform 0.2s ease',
                }}
              >
                <div className="flex items-center justify-center gap-4 mb-3">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light active:bg-chocolate/10"><Instagram size={18} /></a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light active:bg-chocolate/10"><MessageCircle size={18} /></a>
                  <a href="tel:+919081668490" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light active:bg-chocolate/10"><Phone size={18} /></a>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-chocolate-light/40">
                  <MapPin size={11} />
                  <span className="text-[11px]">Vaso, Kheda, Gujarat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
