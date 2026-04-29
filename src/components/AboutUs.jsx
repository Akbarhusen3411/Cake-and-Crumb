import { Quote } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import SectionHeader from './ui/SectionHeader'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-soft-pink/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Story"
          title="A Boutique Born"
          scriptAccent="from Passion"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo collage — 3 stacked images at offsets */}
          <div className="lg:col-span-5 slide-left">
            <div className="relative max-w-md mx-auto h-[450px] sm:h-[520px]">
              {/* Main image */}
              <div className="absolute top-0 left-0 w-2/3 h-3/4 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gold/20" data-parallax="0.04">
                <img
                  src={assetUrl('/images/real-strawberry-cheesecake.jpg')}
                  alt="Strawberry Cheesecake by Cake & Crumb"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Secondary image — top right */}
              <div className="absolute top-12 right-0 w-1/2 h-2/5 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gold/20 animate-float-slow" data-parallax="-0.06">
                <img
                  src={assetUrl('/images/real-rose-eclairs.jpg')}
                  alt="Rose pistachio eclairs"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Third image — bottom right */}
              <div className="absolute bottom-0 right-4 w-3/5 h-2/5 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gold/20 animate-float" data-parallax="-0.04">
                <img
                  src={assetUrl('/images/real-biscoff-cups.jpg')}
                  alt="Biscoff dessert cups"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative gold dot */}
              <div className="absolute -bottom-3 left-8 w-2 h-2 rounded-full bg-gold shadow-lg shadow-gold/40" />
            </div>
          </div>

          {/* Text block */}
          <div className="lg:col-span-7 slide-right">
            <div className="space-y-5 text-chocolate-light/75 leading-relaxed">
              <p>
                Cake & Crumb started with a simple dream — to bring gourmet-quality desserts to
                Gujarat without the gourmet price tag. What began as weekend baking experiments
                in Vaso has grown into a boutique brand trusted by dessert lovers across the region.
              </p>
              <p>
                We keep things intentionally small. Every cake is handcrafted in limited quantities
                each day, using premium Belgian chocolate, fresh seasonal berries, and honest
                ingredients you can taste. No preservatives, no shortcuts — just real baking.
              </p>
            </div>

            {/* Pull quote */}
            <div className="mt-10 relative pl-8 sm:pl-10">
              <Quote size={28} className="absolute -top-1 left-0 text-gold/70 fill-gold/30 -scale-x-100" />
              <p className="font-script text-2xl sm:text-3xl text-chocolate leading-snug">
                Every slice is a chance to make someone's day a little more special.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[10px] font-semibold text-berry tracking-[0.25em] uppercase">
                  Cake & Crumb
                </span>
              </div>
            </div>

            {/* Stats — vintage-numeric style */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 pt-8 border-t border-chocolate/8">
              {[
                { value: 'Many', label: 'Happy Customers' },
                { value: '23+', label: 'Cheesecake Flavours' },
                { value: '100%', label: 'Handcrafted' },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-gradient leading-none group-hover:scale-110 transition-transform duration-500 origin-left">
                    {stat.value}
                  </p>
                  <div className="w-6 h-px bg-gold/40 my-2" />
                  <p className="text-[11px] sm:text-xs text-chocolate-light/55 tracking-wider uppercase font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
