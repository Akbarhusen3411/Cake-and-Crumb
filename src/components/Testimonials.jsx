import { useState, useMemo, useEffect, useRef } from 'react'
import { Star, Quote, Sparkles, X } from 'lucide-react'
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

  // Update filter when URL param changes
  useEffect(() => { setFilter(highlightProduct) }, [highlightProduct])

  // Scroll to highlighted section
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

  // Split into highlighted (matching product) and others
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

  // Get unique product names for filter chips
  const productNames = useMemo(() => {
    const names = new Set()
    customerReviews.forEach((r) => { if (r.product) names.add(r.product) })
    return Array.from(names)
  }, [customerReviews])

  return (
    <section id="testimonials" className="py-20 bg-cream-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/8 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
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
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !filter ? 'bg-chocolate text-cream' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-chocolate/25'
              }`}
            >
              All
            </button>
            {productNames.map((name) => (
              <button
                key={name}
                onClick={() => setFilter(filter === name ? '' : name)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === name ? 'bg-berry text-white' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-berry/25'
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-gold fill-gold" />
                <h3 className="font-heading text-lg font-bold text-chocolate">
                  Reviews for <span className="text-berry">{filter}</span>
                </h3>
                <span className="text-xs text-chocolate-light/40">({highlighted.length})</span>
              </div>
              <button onClick={() => setFilter('')} className="w-7 h-7 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light hover:bg-chocolate/10 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Highlighted Product Reviews */}
        {highlighted.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {highlighted.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} isHighlighted />
            ))}
          </div>
        )}

        {/* Divider if both sections exist */}
        {highlighted.length > 0 && others.length > 0 && (
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-chocolate/8" />
            <span className="text-xs font-medium text-chocolate-light/40 uppercase tracking-wider">All Reviews</span>
            <div className="flex-1 h-px bg-chocolate/8" />
          </div>
        )}

        {/* All Other Reviews */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      className={`fade-up group bg-white rounded-2xl overflow-hidden card-hover relative ${
        isHighlighted ? 'ring-2 ring-berry/20 shadow-lg' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
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
              {review.date ? formatDate(review.date) : review.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
