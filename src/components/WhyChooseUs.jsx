import { Heart, Cookie, Cherry, Palette } from 'lucide-react'
import { whyChooseUs } from '../data/cakes'
import SectionHeader from './ui/SectionHeader'

const iconMap = { HandHeart: Heart, Cookie: Cookie, Cherry: Cherry, Palette: Palette }

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-cream to-cream-light relative overflow-hidden">
      {/* Soft background blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-soft-pink/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/12 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Promise"
          title="Why Choose"
          scriptAccent="Cake & Crumb"
          description="Every celebration deserves something extraordinary — made with heart, not shortcuts."
        />

        {/* Editorial alternating blocks */}
        <div className="space-y-14 sm:space-y-20 mt-4">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon]
            const isReversed = index % 2 === 1
            return (
              <div
                key={index}
                className={`fade-up grid md:grid-cols-12 gap-6 md:gap-12 items-center ${isReversed ? 'md:[direction:rtl]' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Numeral block */}
                <div className="md:col-span-5 md:[direction:ltr]">
                  <div className="relative inline-flex items-center gap-5 sm:gap-7">
                    <span className="font-script text-7xl sm:text-8xl lg:text-9xl text-gold/35 leading-none select-none pointer-events-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-soft-pink/30 blur-2xl -z-10" />
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cream to-cream-dark/40 border border-gold/20 flex items-center justify-center shadow-sm">
                      <Icon size={22} className="text-berry" />
                    </div>
                  </div>
                </div>

                {/* Text block */}
                <div className="md:col-span-7 md:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-px bg-gold" />
                    <span className="text-[10px] font-semibold text-berry tracking-[0.25em] uppercase">
                      {String(index + 1).padStart(2, '0')} / {String(whyChooseUs.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-chocolate mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-chocolate-light/65 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
