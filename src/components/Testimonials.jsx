import { Star, Quote, Sparkles } from 'lucide-react'
import { testimonials } from '../data/cakes'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-cream-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/8 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gold/10 border border-gold/15 rounded-full">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
            What Our <span className="font-script text-3xl sm:text-4xl lg:text-5xl">Customers</span> Say
          </h2>
          <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto leading-relaxed">
            Real stories from real people who've tasted the Cake & Crumb difference.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((review, index) => (
            <div
              key={review.id}
              className="fade-up group bg-white rounded-2xl p-5 card-hover relative overflow-hidden"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Subtle top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-berry to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Quote size={22} className="text-cream-dark/50 mb-3" />
              <StarRating rating={review.rating} />
              <p className="text-sm text-chocolate-light/70 mt-4 mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-cream-dark/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-pink to-cream-dark flex items-center justify-center shadow-sm">
                  <span className="font-heading text-sm font-bold text-berry">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-chocolate">{review.name}</p>
                  <p className="text-xs text-chocolate-light/50">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
