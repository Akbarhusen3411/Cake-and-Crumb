import { useState, useMemo, useEffect, useRef } from 'react'
import { Star, Sparkles, X } from 'lucide-react'
import { testimonials as staticTestimonials } from '../data/cakes'
import useReviews from '../hooks/useReviews'

function Stars({ rating, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < rating ? 'fill-gold text-gold' : 'text-chocolate/10'} />
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
    const h = [], o = []
    allReviews.forEach((r) => (r.product && r.product.toLowerCase() === f) ? h.push(r) : o.push(r))
    return { highlighted: h, others: o }
  }, [allReviews, filter])

  const productNames = useMemo(() => {
    const s = new Set()
    customerReviews.forEach((r) => { if (r.product) s.add(r.product) })
    return Array.from(s)
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

        {/* Filter Chips */}
        {productNames.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10 fade-up">
            <button onClick={() => setFilter('')} className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${!filter ? 'bg-chocolate text-cream shadow-lg shadow-chocolate/15' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-chocolate/25'}`}>All</button>
            {productNames.map((name) => (
              <button key={name} onClick={() => setFilter(filter === name ? '' : name)} className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${filter === name ? 'bg-berry text-white shadow-lg shadow-berry/20' : 'bg-white border border-chocolate/10 text-chocolate-light hover:border-berry/25'}`}>{name}</button>
            ))}
          </div>
        )}

        {/* Filter Banner */}
        {filter && highlighted.length > 0 && (
          <div ref={highlightRef} className="flex items-center justify-between mb-6 fade-up">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-gold fill-gold" />
              <h3 className="font-heading text-lg font-bold text-chocolate">Reviews for <span className="text-berry">{filter}</span></h3>
              <span className="text-[11px] text-chocolate-light/40 bg-cream px-2 py-0.5 rounded-full">{highlighted.length}</span>
            </div>
            <button onClick={() => setFilter('')} className="w-8 h-8 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light hover:bg-chocolate/10 transition-colors"><X size={14} /></button>
          </div>
        )}

        {/* Highlighted Reviews */}
        {highlighted.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {highlighted.map((r, i) => <ReviewCard key={r.id} review={r} index={i} highlighted />)}
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

        {/* All Reviews */}
        {others.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {others.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
          </div>
        ) : highlighted.length === 0 && (
          <div className="text-center py-16 fade-up">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Star size={28} className="text-gold" />
            </div>
            <h3 className="font-heading text-lg font-bold text-chocolate mb-2">Be the First to Review!</h3>
            <p className="text-sm text-chocolate-light/50 mb-6 max-w-sm mx-auto">
              Ordered from Cake & Crumb? Share your experience and help others discover our treats.
            </p>
            <a href="#/review" className="inline-flex items-center gap-2 bg-chocolate text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-chocolate-light transition-colors">
              <Star size={15} /> Write a Review
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewCard({ review, index, highlighted = false }) {
  const hasPhoto = !!review.photo

  return (
    <div
      className={`fade-up group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 ${
        highlighted
          ? 'shadow-lg shadow-berry/8 ring-1 ring-berry/15'
          : 'shadow-sm shadow-chocolate/5 hover:shadow-lg hover:shadow-chocolate/10'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Photo Section */}
      {hasPhoto && (
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          <img
            src={review.photo}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.closest('.relative').style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Stars on photo */}
          <div className="absolute bottom-3 left-3">
            <Stars rating={review.rating} size={14} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Product + Stars row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {review.product ? (
            <span className="text-[10px] font-bold text-berry bg-berry/5 border border-berry/8 px-2.5 py-1 rounded-full truncate">{review.product}</span>
          ) : <span />}
          {!hasPhoto && <Stars rating={review.rating} />}
        </div>

        {/* Review text */}
        <p className="text-[13px] text-chocolate-light/65 leading-relaxed flex-1 mb-4">
          "{review.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-chocolate/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-berry/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-chocolate">{review.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-chocolate truncate">{review.name}</p>
            <p className="text-[11px] text-chocolate-light/35">{review.date ? formatDate(review.date) : review.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
