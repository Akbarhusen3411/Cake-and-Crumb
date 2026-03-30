import { Sparkles } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-cream-light relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-soft-pink/20 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="slide-left relative">
            <div className="relative max-w-md mx-auto">
              {/* Main image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]" data-parallax="0.05">
                <img
                  src={assetUrl('/images/real-strawberry-slices.jpg')}
                  alt="Strawberry cream slices by Cake & Crumb"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/15 to-transparent" />
              </div>

              {/* Floating secondary image */}
              <div
                className="absolute -bottom-6 -right-6 lg:-right-10 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl animate-float-reverse hidden sm:block"
                data-parallax="-0.08"
              >
                <img
                  src={assetUrl('/images/real-cream-horns.jpg')}
                  alt="Cream horns by Cake & Crumb"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Accent shapes */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-soft-pink/60 rounded-2xl -z-10 animate-float-slow" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full -z-10 animate-float" />
            </div>
          </div>

          {/* Text Side */}
          <div className="slide-right">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-berry/5 border border-berry/10 rounded-full">
              <Sparkles size={14} className="text-berry" />
              <span className="text-xs font-medium text-berry tracking-widest uppercase">
                Our Story
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate leading-[1.15] mb-5">
              A Boutique Born
              <span className="block text-gradient">from Passion</span>
            </h2>

            <div className="space-y-5 text-chocolate-light/70 leading-relaxed">
              <p>
                Cake & Crumb started with a simple dream — to bring gourmet-quality desserts to
                Ahmedabad without the gourmet price tag. What began as weekend baking experiments
                has grown into a boutique brand trusted by dessert lovers across the city.
              </p>
              <p>
                We keep things intentionally small. Every cake is handcrafted in limited quantities
                each day, using premium Belgian chocolate, fresh seasonal berries, and honest
                ingredients you can taste. No preservatives, no shortcuts — just real baking.
              </p>
              <p>
                Whether it's a birthday, an anniversary, or just a Tuesday that needs something
                sweet — we pour the same love into every order. Because to us, every slice is a
                chance to make someone's day a little more special.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-chocolate/8">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '21+', label: 'Flavours' },
                { value: '100%', label: 'Handcrafted' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group cursor-default">
                  <p className="font-heading text-xl sm:text-2xl font-bold text-gradient group-hover:scale-110 transition-transform duration-500">{stat.value}</p>
                  <p className="text-xs text-chocolate-light/50 mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
