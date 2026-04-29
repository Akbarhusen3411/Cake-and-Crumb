import { Sparkles, ChevronDown } from 'lucide-react'
import FeaturedCakes from '../components/FeaturedCakes'
import { assetUrl } from '../utils/assetPath'

export default function MenuPage() {
  const scrollToMenu = () => {
    document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      {/* ────── Page Hero Header ────── */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        {/* Background image */}
        <img
          src={assetUrl('/images/real-rose-eclairs.jpg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-chocolate/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate/30 via-transparent to-cream-light" />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-5 fade-up">
            <span className="w-8 h-px bg-gold/70" />
            <Sparkles size={13} className="text-gold" />
            <span className="text-[10px] sm:text-xs font-semibold text-gold tracking-[0.35em] uppercase">
              Fresh Daily
            </span>
            <Sparkles size={13} className="text-gold" />
            <span className="w-8 h-px bg-gold/70" />
          </div>
          <h1 className="fade-up font-heading font-bold text-cream leading-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Our <span className="font-script text-gold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>Menu</span>
          </h1>
          <p className="fade-up font-heading italic text-cream/85 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            23+ cheesecake flavours · cookies · milk cakes · drinks — handcrafted from scratch
          </p>
          <div className="fade-up mx-auto mt-6 w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Scroll cue */}
          <button
            onClick={scrollToMenu}
            aria-label="Scroll to menu"
            className="fade-up group inline-flex flex-col items-center gap-1 mt-10 text-cream/65 hover:text-cream transition-colors"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Browse</span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ────── Menu (FeaturedCakes) ────── */}
      <FeaturedCakes />
    </div>
  )
}
