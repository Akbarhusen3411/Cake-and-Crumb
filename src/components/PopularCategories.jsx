import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

const categories = [
  {
    id: 'cheesecake',
    name: 'Cheese Cake',
    price: 'From ₹120',
    image: assetUrl('/images/real-strawberry-cheesecake.jpg'),
  },
  {
    id: 'cookies',
    name: 'Cookies',
    price: 'From ₹50',
    image: assetUrl('/images/real-triple-choc-cookies.jpg'),
  },
  {
    id: 'brownies',
    name: 'Brownies',
    price: 'From ₹80',
    image: assetUrl('/images/real-brownies.jpg'),
  },
]

export default function PopularCategories() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-cream-light via-cream to-cream-light relative overflow-hidden">
      {/* Soft background blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-soft-pink/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/12 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — script title left, See all right */}
        <div className="flex items-end justify-between mb-14 sm:mb-16 fade-up">
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-chocolate leading-none">
            Popular <span className="text-berry">Categories</span>
          </h2>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-berry tracking-[0.2em] uppercase hover:text-chocolate transition-colors whitespace-nowrap pb-1"
          >
            See all
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 edge-cutting cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to="/menu"
              className="fade-up group bg-white rounded-3xl shadow-md hover:shadow-2xl hover:shadow-chocolate/15 transition-all duration-500 hover:-translate-y-2 ring-1 ring-gold/15 hover:ring-gold/40 relative px-5 pt-28 sm:pt-32 pb-7 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Edge-cutting image — circular, floats above the card top edge */}
              <div className="absolute left-1/2 -top-12 sm:-top-14 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-2xl shadow-chocolate/25 ring-4 ring-cream-light group-hover:ring-gold/40 transition-all duration-500 group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Caption — text below the floating image */}
              <h3 className="font-heading text-lg sm:text-xl font-bold text-chocolate group-hover:text-berry transition-colors">
                {cat.name}
              </h3>
              <div className="mx-auto my-2 w-6 h-px bg-gold/40 group-hover:w-12 transition-all duration-500" />
              <p className="text-[12px] sm:text-sm text-chocolate-light/60 italic tabular-nums">
                {cat.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
