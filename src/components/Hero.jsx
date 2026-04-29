import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import { WHATSAPP_URL } from '../config/constants'

const HEADLINE = 'Crafted'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const scrollToMenu = () => {
    const menu = document.getElementById('cakes')
    if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Full-bleed hero image with subtle ken-burns + blur-to-crisp on mount */}
      <img
        src={assetUrl('/images/strawberry-cheesecake.jpg')}
        alt="Strawberry Cheesecake by Cake & Crumb"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2.4s] ease-out ${
          loaded ? 'scale-100 blur-0' : 'scale-110 blur-md'
        }`}
        fetchpriority="high"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-chocolate/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate/40 via-chocolate/20 to-chocolate/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(62,39,35,0.45)_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">

        {/* Top eyebrow — fades down from above */}
        <div
          className={`inline-flex items-center gap-3 mb-7 sm:mb-9 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <span className="w-8 sm:w-10 h-px bg-gold/80" />
          <span className="text-[10px] sm:text-xs font-semibold text-gold tracking-[0.35em] uppercase whitespace-nowrap">
            Handcrafted in Vaso
          </span>
          <span className="w-8 sm:w-10 h-px bg-gold/80" />
        </div>

        {/* Headline — letter-by-letter reveal */}
        <h1
          className="font-heading font-black text-cream leading-[0.92] tracking-tight"
          style={{ fontSize: 'clamp(3.25rem, 13vw, 11rem)' }}
          aria-label="Crafted."
        >
          {HEADLINE.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: loaded ? `hero-letter-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.07}s both` : 'none',
                opacity: loaded ? undefined : 0,
              }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
          <span
            className="inline-block text-gold"
            style={{
              animation: loaded ? `hero-letter-rise 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + HEADLINE.length * 0.07}s both` : 'none',
              opacity: loaded ? undefined : 0,
            }}
          >
            .
          </span>
        </h1>

        {/* Decorative script under headline */}
        <p
          className={`font-script text-2xl sm:text-3xl lg:text-4xl text-gold mt-2 sm:mt-3 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0 delay-[850ms]' : 'opacity-0 translate-y-6'
          }`}
        >
          with love, in small batches
        </p>

        {/* Gold separator — animates from center */}
        <div
          className={`mx-auto mt-7 sm:mt-9 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all ease-out ${
            loaded ? 'w-24 opacity-100 duration-[1.2s] delay-[1000ms]' : 'w-0 opacity-0 duration-300'
          }`}
        />

        {/* Body copy */}
        <p
          className={`text-sm sm:text-base text-cream/80 max-w-md mx-auto mt-7 sm:mt-9 leading-relaxed transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0 delay-[1150ms]' : 'opacity-0 translate-y-6'
          }`}
        >
          Small-batch cheesecakes, cookies and gourmet cakes — baked fresh from premium chocolate and seasonal berries.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-9 sm:mt-11 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0 delay-[1300ms]' : 'opacity-0 translate-y-8'
          }`}
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
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 group transition-opacity duration-1000 ${
          loaded ? 'opacity-100 delay-[1700ms]' : 'opacity-0'
        }`}
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
