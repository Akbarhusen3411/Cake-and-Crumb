import { useState, useMemo, useEffect, useRef } from 'react'
import { Star, Quote, Sparkles, X, Camera } from 'lucide-react'
import { testimonials as staticTestimonials } from '../data/cakes'
import useReviews from '../hooks/useReviews'

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < rating ? 'fill-gold text-gold' : 'fill-cream-dark/20 text-cream-dark/20'} />
      ))}
    </div>
  )
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  } catch { return '' }
}

export default function Testimonials({ highlightProduct = '' }) {
  const { reviews: customerReviews } = useReviews()
  const [filter, setFilter] = useState(highlightProduct)
  const highlightRef = useRef(null)

  useEffect(() => { setFilter(highlightProduct) }, [highlightProduct])

  useEffect(() => {
    if (filter && highlightRef.current) {
      setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [filter])

  const allReviews = useMemo(() => [
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
  ], [customerReviews])

  const { highlighted, others } = useMemo(() => {
    if (!filter) return { highlighted: [], others: allReviews }
    const f = filter.toLowerCase()
    const highlighted = []
    const others = []
    allReviews.forEach((r) => {
      if (r.product && r.product.toLowerCase() === f) highlighted.push(r)
      else others.push(r)
    })
    return { highlighted, others }
  }, [allReviews, filter])

  const productNames = useMemo(() => {
    const names = new Set()
    customerReviews.forEach((r) => { if (r.product) names.add(r.product) })
    return Array.from(names)
  }, [customerReviews])

  return (
    <section id="testimonials" className="py-20 bg-cream-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/8 rounded-full blur-[100px]" />
      <div className="absolute top-20 left-[-10%] w-72 h-72 bg-soft-pink/15 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Product Filter Chips */}
        {productNames.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10 fade-up">
            <button
              onClick={() => setFilter('')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                !filter ? 'bg-chocolate text-cream shadow-lg shadow-chocolate/15' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-chocolate/25 hover:shadow-md'
              }`}
            >
              All
            </button>
            {productNames.map((name) => (
              <button
                key={name}
                onClick={() => setFilter(filter === name ? '' : name)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  filter === name ? 'bg-berry text-white shadow-lg shadow-berry/20' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-berry/25 hover:shadow-md'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {/* Active filter banner */}
        {filter && highlighted.length > 0 && (
          <div ref={highlightRef} className="mb-8 fade-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-gold fill-gold" />
                <h3 className="font-heading text-lg font-bold text-chocolate">
                  Reviews for <span className="text-berry">{filter}</span>
                </h3>
                <span className="text-xs text-chocolate-light/40 bg-cream px-2 py-0.5 rounded-full">({highlighted.length})</span>
              </div>
              <button onClick={() => setFilter('')} className="w-8 h-8 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light hover:bg-chocolate/10 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Highlighted Product Reviews */}
        {highlighted.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {highlighted.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} isHighlighted />
            ))}
          </div>
        )}

        {/* Divider */}
        {highlighted.length > 0 && others.length > 0 && (
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chocolate/10 to-transparent" />
            <span className="text-[10px] font-semibold text-chocolate-light/30 uppercase tracking-[0.2em]">All Reviews</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chocolate/10 to-transparent" />
          </div>
        )}

        {/* All Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {others.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, index, isHighlighted = false }) {
  return (
    <div
      className={`fade-up group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isHighlighted ? 'ring-2 ring-berry/20 shadow-lg' : 'shadow-sm hover:shadow-chocolate/8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${isHighlighted ? 'bg-gradient-to-r from-berry via-gold to-berry' : 'bg-gradient-to-r from-gold/40 via-berry/30 to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'}`} />

      {/* Photo banner (if has photo) */}
      {review.photo && (
        <div className="relative h-44 overflow-hidden bg-cream">
          <img
            src={review.photo}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.closest('.relative').style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {review.product && (
            <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-berry/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {review.product}
            </span>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-5 flex flex-col" style={{ minHeight: review.photo ? '180px' : '220px' }}>
        {/* Product badge (no photo) */}
        {!review.photo && review.product && (
          <span className="inline-block self-start text-[10px] font-bold text-berry bg-berry/5 border border-berry/10 px-2.5 py-1 rounded-full mb-3">
            {review.product}
          </span>
        )}

        {/* Stars */}
        <div className="mb-3">
          <StarRating rating={review.rating} size={15} />
        </div>

        {/* Quote */}
        <p className="text-[13px] sm:text-sm text-chocolate-light/70 leading-relaxed flex-1 mb-4">
          <span className="text-berry/30 font-serif text-lg leading-none">"</span>
          {review.text}
          <span className="text-berry/30 font-serif text-lg leading-none">"</span>
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-3 border-t border-chocolate/5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-berry/10 to-gold/10 flex items-center justify-center shrink-0">
            <span className="font-heading text-xs font-bold text-berry">{review.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-chocolate truncate">{review.name}</p>
            <p className="text-[11px] text-chocolate-light/40">
              {review.date ? formatDate(review.date) : review.location}
            </p>
          </div>
          {review.photo && (
            <Camera size={13} className="text-chocolate-light/20 shrink-0" />
          )}
        </div>
      </div>
    </div>
  )
}
