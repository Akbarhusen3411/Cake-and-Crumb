import { Star, Quote, Sparkles } from 'lucide-react'
import { testimonials as staticTestimonials } from '../data/cakes'
import useReviews from '../hooks/useReviews'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

function formatReviewDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  } catch {
    return ''
  }
}

export default function Testimonials() {
  const { reviews: customerReviews } = useReviews()

  const allReviews = [
    ...customerReviews.map((r, i) => ({
      id: `customer-${i}`,
      name: r.name,
      product: r.product || '',
      text: r.text,
      rating: Number(r.rating),
      date: r.date,
      photo: r.photo || '',
    })),
    ...staticTestimonials,
  ]

  return (
    <section id="testimonials" className="py-20 bg-cream-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/8 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gold/10 border border-gold/15 rounded-full">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">Testimonials</span>
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
          {allReviews.map((review, index) => (
            <div
              key={review.id}
              className="fade-up group bg-white rounded-2xl overflow-hidden card-hover relative"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-berry to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {review.photo && (
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img src={review.photo} alt={`Review by ${review.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              )}

              <div className="p-5">
                {review.product && (
                  <span className="inline-block text-[10px] font-semibold text-berry bg-berry/5 px-2 py-0.5 rounded-full mb-2">{review.product}</span>
                )}
                <Quote size={22} className="text-cream-dark/50 mb-3" />
                <StarRating rating={review.rating} />
                <p className="text-sm text-chocolate-light/70 mt-4 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-cream-dark/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-pink to-cream-dark flex items-center justify-center shadow-sm shrink-0">
                    <span className="font-heading text-sm font-bold text-berry">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-chocolate">{review.name}</p>
                    <p className="text-xs text-chocolate-light/50">
                      {review.date ? formatReviewDate(review.date) : review.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
