import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import { WHATSAPP_URL } from '../config/constants'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToMenu = () => {
    const menu = document.getElementById('cakes')
    if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Full-bleed hero image */}
      <img
        src={assetUrl('/images/strawberry-cheesecake.jpg')}
        alt="Strawberry Cheesecake by Cake & Crumb"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-out ${loaded ? 'scale-100' : 'scale-105'}`}
        fetchpriority="high"
      />

      {/* Cinematic dark overlay — chocolate-tinted, gradient bottom-fade */}
      <div className="absolute inset-0 bg-chocolate/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate/40 via-chocolate/20 to-chocolate/70" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(62,39,35,0.45)_100%)]" />

      {/* Content — perfectly centered */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

        {/* Tagline strip — top */}
        <div
          className={`inline-flex items-center gap-3 mb-8 sm:mb-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <span className="w-8 h-px bg-gold/80" />
          <span className="text-[10px] sm:text-xs font-medium text-gold tracking-[0.35em] uppercase">
            Handcrafted in Vaso
          </span>
          <span className="w-8 h-px bg-gold/80" />
        </div>

        {/* Massive headline — Wix-template style */}
        <h1
          className={`font-heading font-black text-white leading-[0.9] tracking-tight transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontSize: 'clamp(4rem, 16vw, 12rem)' }}
        >
          Cake.
        </h1>

        {/* Brand wordmark in script */}
        <div
          className={`mt-2 sm:mt-4 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-script text-3xl sm:text-5xl lg:text-6xl text-cream">
            Cake <span className="text-gold">&</span> Crumb
          </p>
        </div>

        {/* Subtitle */}
        <p
          className={`font-heading italic text-sm sm:text-base lg:text-lg text-cream/85 mt-3 sm:mt-4 tracking-wide transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          The Gourmet Chocolate <span className="text-gold">&</span> Berry Boutique
        </p>

        {/* Gold separator */}
        <div
          className={`mx-auto mt-6 sm:mt-8 w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        />

        {/* Body copy */}
        <p
          className={`text-sm sm:text-base text-cream/75 max-w-md mx-auto mt-6 sm:mt-8 leading-relaxed transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Small-batch cakes baked fresh in Vaso, Gujarat. Premium chocolate, seasonal berries — limited daily.
        </p>

        {/* CTAs — centered */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group inline-flex items-center justify-center gap-2 bg-cream text-chocolate px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-all duration-500 hover:-translate-y-0.5 shadow-2xl shadow-chocolate/40"
          >
            <ShoppingBag size={17} />
            Order Now
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-500" />
          </a>
          <Link
            to="/menu"
            className="group inline-flex items-center justify-center gap-2 border border-cream/40 text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-cream/10 hover:border-cream/70 transition-all duration-500 backdrop-blur-sm"
          >
            View Menu
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToMenu}
        aria-label="Scroll to menu"
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 group transition-all duration-1000 delay-[1100ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-cream/60 tracking-[0.25em] uppercase font-medium group-hover:text-cream transition-colors">
            Discover
          </span>
          <ChevronDown size={20} className="text-cream/70 animate-bounce group-hover:text-cream transition-colors" />
        </div>
      </button>
    </section>
  )
}
