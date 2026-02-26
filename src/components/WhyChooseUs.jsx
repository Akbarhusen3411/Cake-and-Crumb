import { Heart, Cookie, Cherry, Palette, Sparkles } from 'lucide-react'
import { whyChooseUs } from '../data/cakes'

const iconMap = {
  HandHeart: Heart,
  Cookie: Cookie,
  Cherry: Cherry,
  Palette: Palette,
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden wave-divider">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-soft-pink/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-chocolate/5 border border-chocolate/8 rounded-full">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">
              Our Promise
            </span>
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
            Why Choose Cake & Crumb
          </h2>
          <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto leading-relaxed">
            We believe every celebration deserves something extraordinary — made with heart, not shortcuts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <div
                key={index}
                className="fade-up group text-center p-6 bg-cream-light rounded-2xl card-hover relative overflow-hidden"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-soft-pink/0 to-soft-pink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-berry/10 text-berry text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-soft-pink/80 text-berry mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-berry/10">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-chocolate mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-chocolate-light/60 leading-relaxed">
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
