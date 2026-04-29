import { useState, useRef, useMemo } from 'react'
import { Star, Send, CheckCircle, Sparkles, Camera, X, ChevronDown, MessageCircle } from 'lucide-react'
import { isFirebaseConfigured } from '../config/firebase'
import { products, productCategories } from '../data/products'
import { addReviewToCache, submitReview } from '../hooks/useReviews'
import { WHATSAPP_NUMBER } from '../config/constants'

function buildWhatsAppFallback({ product, name, rating, text }) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  const msg = `Hi Cake & Crumb! I'd like to leave a review:\n\n` +
    `*Product:* ${product}\n` +
    `*Name:* ${name}\n` +
    `*Rating:* ${stars} (${rating}/5)\n` +
    `*Review:* ${text}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

// Build unique reviewable product list grouped by category
function getReviewableProducts() {
  const seen = new Set()
  const grouped = {}

  productCategories.forEach((cat) => {
    grouped[cat.id] = { label: cat.label, items: [] }
  })

  products.forEach((p) => {
    if (!p.inStock) return
    // For cheesecakes, deduplicate by flavourKey (slice + banto = one entry)
    const key = p.category === 'cheesecake' ? `cheesecake-${p.flavourKey}` : p.id
    if (seen.has(key)) return
    seen.add(key)

    const displayName = p.category === 'cheesecake'
      ? (p.subcategory === 'slice' ? p.shortName : null)
      : p.shortName

    if (!displayName) return

    if (grouped[p.category]) {
      grouped[p.category].items.push(displayName)
    }
  })

  return Object.entries(grouped)
    .filter(([, g]) => g.items.length > 0)
    .map(([id, g]) => ({ id, label: g.label, items: g.items }))
}

function resizeImage(file, maxSize = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let w = img.width
        let h = img.height
        if (w > maxSize || h > maxSize) {
          if (w > h) { h = Math.round((h * maxSize) / w); w = maxSize }
          else { w = Math.round((w * maxSize) / h); h = maxSize }
        }
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        // High-quality scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, w, h)
        // Return full data URL — 800px @ 0.78 quality keeps the file
        // comfortably under Firestore's 1 MB document limit (≈150–250 KB after base64)
        resolve(canvas.toDataURL('image/jpeg', 0.78))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function WriteReviewPage() {
  const [product, setProduct] = useState('')
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitFailed, setSubmitFailed] = useState(false)
  const fileRef = useRef(null)

  const reviewableProducts = useMemo(() => getReviewableProducts(), [])

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Accept all image formats including HEIC (iPhone), WEBP, AVIF, GIF, BMP, SVG
    const isImage = file.type.startsWith('image/') || /\.(heic|heif|webp|avif|jpe?g|png|gif|bmp|svg)$/i.test(file.name)
    if (!isImage) { setError('Please select an image file (JPG, PNG, WEBP, HEIC, etc.)'); return }
    if (file.size > 20 * 1024 * 1024) { setError('Image too large. Max 20MB.'); return }
    setError('')
    const previewReader = new FileReader()
    previewReader.onload = (ev) => setPhotoPreview(ev.target.result)
    previewReader.readAsDataURL(file)
    const base64 = await resizeImage(file)
    setPhoto(base64)
  }

  const removePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitFailed(false)
    if (!product) return setError('Please select which item you are reviewing')
    if (!name.trim()) return setError('Please enter your name')
    if (rating === 0) return setError('Please select a star rating')
    if (!text.trim()) return setError('Please write your review')
    if (text.trim().length < 10) return setError('Please write at least 10 characters')

    if (!isFirebaseConfigured()) {
      setError('Review system is not configured yet. Please contact the bakery.')
      setSubmitFailed(true)
      return
    }

    setSubmitting(true)
    const reviewData = {
      product,
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
      photo: photo || '',
    }
    try {
      await submitReview(reviewData)
      // Add to local cache for instant display
      addReviewToCache(reviewData)
      setSubmitted(true)
    } catch (err) {
      const blocked = /blocked|fetch|network|unavailable|offline/i.test(err?.message || '') || err?.code === 'unavailable'
      setError(
        blocked
          ? 'Could not reach our review server — this is usually caused by an ad blocker or privacy extension. Please disable it for this site, or send your review on WhatsApp instead.'
          : (err?.message || 'Something went wrong. Please try sending your review on WhatsApp.')
      )
      setSubmitFailed(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-cream-light">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="check-animate w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-chocolate mb-3">Thank You!</h2>
          <p className="text-chocolate-light/60 mb-8">
            Your review for <strong>{product}</strong> has been submitted and is now live!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#/menu" className="inline-flex items-center justify-center gap-2 bg-chocolate text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-colors">
              <Star size={16} /> See Your Review
            </a>
            <a href="#/" className="inline-flex items-center justify-center gap-2 border border-chocolate/20 text-chocolate px-6 py-3 rounded-xl font-medium text-sm hover:bg-cream transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gold/10 border border-gold/15 rounded-full">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">Your Feedback</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-chocolate mb-3">
            Rate Your <span className="font-script text-3xl sm:text-4xl">Experience</span>
          </h1>
          <p className="text-chocolate-light/60 text-sm">Tell us what you loved from Cake & Crumb!</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Product Selector */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">What did you order?</label>
            <div className="relative">
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select a product...</option>
                {reviewableProducts.map((cat) => (
                  <optgroup key={cat.id} label={cat.label}>
                    {cat.items.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate-light/55 pointer-events-none" />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate placeholder:text-chocolate-light/55 focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-3">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hoverRating || rating) ? 'fill-gold text-gold' : 'fill-none text-chocolate/20'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="self-center ml-2 text-sm text-chocolate-light/50">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][rating]}
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">Your Review</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate placeholder:text-chocolate-light/55 focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors resize-none"
            />
            <p className="text-right text-xs text-chocolate-light/55 mt-1">{text.length}/500</p>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">
              Photo <span className="text-chocolate-light/55 font-normal">(optional)</span>
            </label>
            {photoPreview ? (
              <div className="relative inline-block">
                <img src={photoPreview} alt="Preview" className="w-full max-w-[200px] h-auto rounded-xl border border-chocolate/10 object-cover" />
                <button type="button" onClick={removePhoto} className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-berry text-white flex items-center justify-center shadow-md hover:bg-berry-light transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full py-8 rounded-xl border-2 border-dashed border-chocolate/15 bg-cream-light/30 flex flex-col items-center gap-2 hover:border-berry/30 hover:bg-berry/3 transition-colors">
                <Camera size={28} className="text-chocolate-light/30" />
                <span className="text-sm text-chocolate-light/50">Tap to add a photo</span>
                <span className="text-xs text-chocolate-light/30">JPG, PNG, WEBP, HEIC (max 20MB)</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*,.heic,.heif,.webp,.avif" onChange={handlePhotoSelect} className="hidden" />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-berry/5 border border-berry/15 rounded-xl px-4 py-3 space-y-3">
              <p className="text-sm text-berry">{error}</p>
              {submitFailed && product && name.trim() && rating > 0 && text.trim().length >= 10 && (
                <a
                  href={buildWhatsAppFallback({ product, name: name.trim(), rating, text: text.trim() })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={15} />
                  Send Review via WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              submitting ? 'bg-chocolate/50 text-cream/70 cursor-not-allowed' : 'btn-shimmer bg-chocolate text-cream hover:bg-chocolate-light active:scale-[0.98]'
            }`}
          >
            {submitting ? <>Submitting...</> : <><Send size={16} /> Submit Review</>}
          </button>
        </form>
      </div>
    </div>
  )
}
