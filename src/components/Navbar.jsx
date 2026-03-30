import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram, MessageCircle, Phone, MapPin, Home, Cake, Heart, Star, Send, ShoppingBag, X } from 'lucide-react'
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

  const openDrawer = useCallback(() => {
    setMobileOpen(true)
    setDrawerVisible(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false)
    setTimeout(() => {
      setMobileOpen(false)
      document.body.style.overflow = ''
    }, 400)
  }, [])

  useEffect(() => {
    if (mobileOpen) closeDrawer()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <Link to="/" className="flex items-center gap-2 group relative z-50">
          <img
            src={assetUrl('/images/logo.png')}
            alt="Cake & Crumb"
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-500 border-2 border-gold/30"
          />
          <div className="leading-tight">
            <span className="font-script text-xl sm:text-2xl tracking-wide block text-chocolate">
              Cake <span className="text-berry">&</span> Crumb
            </span>
            <span className="font-heading text-[9px] sm:text-[10px] text-chocolate-light/60 italic tracking-wider hidden sm:block">
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
            href={INSTAGRAM_URL}
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
        <div className="lg:hidden flex items-center gap-1 relative z-50">
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
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ease-out ${
              drawerVisible ? 'bg-chocolate rotate-45 translate-y-[7px]' : 'bg-chocolate'
            }`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-200 ${
              drawerVisible ? 'bg-chocolate opacity-0 scale-x-0' : 'bg-chocolate opacity-100'
            }`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ease-out ${
              drawerVisible ? 'bg-chocolate -rotate-45 -translate-y-[7px]' : 'bg-chocolate'
            }`} />
          </button>
        </div>
      </div>

      {/* =========== Full-Screen Mobile Menu =========== */}
      {mobileOpen && (
      <div
        className="lg:hidden fixed inset-0 z-[100] overflow-hidden"
      >
        {/* Solid background — fully covers page */}
        <div className="absolute inset-0 bg-cream-light" />

        {/* Decorative blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-soft-pink/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-10%] w-64 h-64 bg-gold/15 rounded-full blur-[80px]" />

        {/* Close button */}
        <button
          onClick={closeDrawer}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate active:bg-chocolate/10 "
          style={{
            opacity: drawerVisible ? 1 : 0,
            transform: drawerVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)',
            transition: 'all 300ms ease',
            transitionDelay: drawerVisible ? '150ms' : '0ms',
          }}
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8 ">

          {/* Nav Links — centered */}
          <nav className="flex flex-col items-center gap-2 mb-8">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to
              const LinkIcon = link.icon
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`flex items-center gap-4 px-8 py-3.5 rounded-2xl transition-all duration-300 w-64 ${
                    isActive
                      ? 'bg-chocolate text-cream shadow-lg shadow-chocolate/20'
                      : 'text-chocolate active:bg-chocolate/5'
                  }`}
                  style={{
                    opacity: drawerVisible ? 1 : 0,
                    transform: drawerVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 350ms ease, transform 350ms ease',
                    transitionDelay: drawerVisible ? `${80 + i * 60}ms` : '0ms',
                  }}
                >
                  <LinkIcon size={20} className={isActive ? 'text-gold' : 'text-chocolate-light/40'} />
                  <span className="font-heading text-lg font-semibold">{link.label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-gold" />}
                </Link>
              )
            })}
          </nav>

          {/* CTA Buttons */}
          <div
            className="flex flex-col gap-3 w-64"
            style={{
              opacity: drawerVisible ? 1 : 0,
              transform: drawerVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 350ms ease',
              transitionDelay: drawerVisible ? '420ms' : '0ms',
            }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm active:scale-[0.97] transition-transform shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
            <button
              onClick={() => { closeDrawer(); setTimeout(onCartClick, 420) }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-chocolate/15 text-chocolate font-semibold text-sm active:scale-[0.97] transition-transform"
            >
              <ShoppingBag size={18} />
              View Cart
              {itemCount > 0 && (
                <span className="ml-1 w-5 h-5 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Bottom — Social + Contact */}
          <div
            className="absolute bottom-10 left-0 right-0 px-8"
            style={{
              opacity: drawerVisible ? 1 : 0,
              transition: 'opacity 350ms ease',
              transitionDelay: drawerVisible ? '500ms' : '0ms',
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light">
                <Instagram size={18} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light">
                <MessageCircle size={18} />
              </a>
              <a href="tel:+919081668490" className="w-10 h-10 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light">
                <Phone size={18} />
              </a>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-chocolate-light/40 mb-1">
                <MapPin size={11} />
                <span className="text-[11px]">Ahmedabad, Gujarat</span>
              </div>
              <p className="text-[9px] text-chocolate-light/25 tracking-widest uppercase">
                The Gourmet Chocolate & Berry Boutique
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </nav>
  )
}
