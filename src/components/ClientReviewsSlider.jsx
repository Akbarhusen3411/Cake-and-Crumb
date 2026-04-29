import { useEffect, useMemo, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import useReviews from '../hooks/useReviews'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '' }
}

function Avatar({ name, photo }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        className="review-photo w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    )
  }
  // Fallback gradient + initial
  return (
    <div className="w-full h-full bg-gradient-to-br from-soft-pink via-cream-dark to-gold/30 flex items-center justify-center">
      <span className="font-script text-7xl sm:text-8xl text-chocolate/80">{name?.charAt(0) || 'C'}</span>
    </div>
  )
}

export default function ClientReviewsSlider() {
  const { reviews: customerReviews } = useReviews()
  const [index, setIndex] = useState(0)

  // Real customer reviews from Firestore
  const reviews = useMemo(() => customerReviews.map((r, i) => ({
    id: `cust-${i}`,
    name: r.name,
    product: r.product || '',
    text: r.text,
    rating: Number(r.rating),
    date: r.date,
    photo: r.photo || '',
  })), [customerReviews])

  // Reset index if reviews change
  useEffect(() => {
    if (index >= reviews.length) setIndex(0)
  }, [reviews.length, index])

  if (!reviews.length) return null

  const review = reviews[index] || reviews[0]
  const next = () => setIndex((i) => (i + 1) % reviews.length)
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-gradient-to-b from-cream-light to-cream relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-soft-pink/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title — left-aligned script, like the reference */}
        <div className="mb-10 sm:mb-12">
          <p className="fade-up text-[10px] sm:text-xs font-semibold text-berry tracking-[0.3em] uppercase mb-2">
            Testimonials
          </p>
          <h2 className="fade-up font-script text-4xl sm:text-5xl lg:text-6xl text-chocolate leading-tight">
            What Our <span className="text-berry/85">Clients Say</span>
          </h2>
          <div className="fade-up mt-4 w-20 h-[1px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
        </div>

        {/* Slider — Image left + Review right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 fade-up">
            <div
              key={`img-${review.id}`}
              className="relative aspect-square sm:aspect-[4/5] lg:aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold/25 anim-msg-in-slow"
            >
              <Avatar name={review.name} photo={review.photo} />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/35 via-transparent to-transparent" />

              {/* Floating Quote icon */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-[#B8915F] flex items-center justify-center shadow-2xl ring-4 ring-cream">
                <Quote size={20} className="text-white fill-white" />
              </div>

              {/* Star rating overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full flex gap-0.5 shadow-md">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className={i < review.rating ? 'fill-gold text-gold' : 'text-chocolate/15'} />
                ))}
              </div>

              {/* Product badge */}
              {review.product && (
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block text-[10px] font-bold text-white bg-berry/90 backdrop-blur px-2.5 py-1 rounded-full">
                    {review.product}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Review side */}
          <div className="lg:col-span-7">
            <div
              key={`txt-${review.id}`}
              className="anim-msg-in-slow"
            >
              {/* Name in elegant script */}
              <p className="text-[10px] font-semibold text-berry tracking-[0.25em] uppercase mb-2">— Customer</p>
              <h3 className="font-script text-3xl sm:text-4xl lg:text-5xl text-chocolate leading-tight">
                {review.name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-3 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'fill-gold text-gold' : 'text-chocolate/15'} />
                ))}
                {review.date && (
                  <span className="ml-3 text-[11px] text-chocolate-light/45 italic">{formatDate(review.date)}</span>
                )}
              </div>

              {/* Review text */}
              <p className="text-base sm:text-lg text-chocolate-light/75 leading-relaxed italic max-w-xl">
                "{review.text}"
              </p>

              {/* Navigation row */}
              {reviews.length > 1 && (
                <div className="flex items-center justify-between gap-4 mt-8 sm:mt-10 max-w-xl">
                  {/* Counter + dots */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-chocolate-light/60 tabular-nums tracking-wider">
                      {String(index + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {reviews.slice(0, Math.min(reviews.length, 6)).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          aria-label={`Go to review ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === index ? 'w-6 bg-gold' : 'w-1.5 bg-chocolate/15 hover:bg-chocolate/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous review"
                      className="group w-11 h-11 rounded-xl bg-cream-light border border-gold/30 flex items-center justify-center text-chocolate hover:bg-chocolate hover:border-chocolate hover:text-cream transition-all duration-300 active:scale-95"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next review"
                      className="group w-11 h-11 rounded-xl bg-gradient-to-br from-chocolate to-chocolate-light border border-chocolate text-cream flex items-center justify-center hover:shadow-lg hover:shadow-chocolate/30 transition-all duration-300 active:scale-95"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* CTA to all reviews */}
              <a
                href="#/reviews"
                className="inline-flex items-center gap-2 mt-8 text-xs font-semibold text-berry hover:text-chocolate tracking-[0.2em] uppercase transition-colors"
              >
                Read All Reviews
                <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
