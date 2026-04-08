import { useState, useRef } from 'react'
import { Star, Send, CheckCircle, Sparkles, Camera, X } from 'lucide-react'
import { REVIEWS_SCRIPT_URL } from '../config/googleSheetReviews'

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
          if (w > h) {
            h = Math.round((h * maxSize) / w)
            w = maxSize
          } else {
            w = Math.round((w * maxSize) / h)
            h = maxSize
          }
        }
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        // Remove the data:image/...;base64, prefix — send only raw base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
        resolve(dataUrl.split(',')[1])
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function WriteReviewPage() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null) // base64 string
  const [photoPreview, setPhotoPreview] = useState(null) // data URL for preview
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image is too large. Maximum 10MB.')
      return
    }

    setError('')
    // Show preview
    const previewReader = new FileReader()
    previewReader.onload = (ev) => setPhotoPreview(ev.target.result)
    previewReader.readAsDataURL(file)

    // Resize for upload
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

    if (!name.trim()) return setError('Please enter your name')
    if (rating === 0) return setError('Please select a star rating')
    if (!text.trim()) return setError('Please write your review')
    if (text.trim().length < 10) return setError('Please write at least 10 characters')

    if (!REVIEWS_SCRIPT_URL) {
      setError('Review system is not configured yet. Please contact the bakery.')
      return
    }

    setSubmitting(true)
    try {
      await fetch(REVIEWS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          text: text.trim(),
          date: new Date().toISOString(),
          photo: photo || '',
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
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
          <h2 className="font-heading text-2xl font-bold text-chocolate mb-3">
            Thank You!
          </h2>
          <p className="text-chocolate-light/60 mb-8">
            Your review has been submitted. We truly appreciate your feedback!
          </p>
          <a
            href="#/"
            className="inline-flex items-center gap-2 bg-chocolate text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-colors"
          >
            Back to Home
          </a>
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
            <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">
              Your Feedback
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-chocolate mb-3">
            Rate Your <span className="font-script text-3xl sm:text-4xl">Experience</span>
          </h1>
          <p className="text-chocolate-light/60 text-sm">
            We'd love to hear about your Cake & Crumb experience!
          </p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate placeholder:text-chocolate-light/35 focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors"
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
                      star <= (hoverRating || rating)
                        ? 'fill-gold text-gold'
                        : 'fill-none text-chocolate/20'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="self-center ml-2 text-sm text-chocolate-light/50">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent!'}
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
              className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate placeholder:text-chocolate-light/35 focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors resize-none"
            />
            <p className="text-right text-xs text-chocolate-light/40 mt-1">{text.length}/500</p>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-chocolate mb-2">
              Photo <span className="text-chocolate-light/40 font-normal">(optional)</span>
            </label>

            {photoPreview ? (
              <div className="relative inline-block">
                <img
                  src={photoPreview}
                  alt="Review photo preview"
                  className="w-full max-w-[200px] h-auto rounded-xl border border-chocolate/10 object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-berry text-white flex items-center justify-center shadow-md hover:bg-berry-light transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full py-8 rounded-xl border-2 border-dashed border-chocolate/15 bg-cream-light/30 flex flex-col items-center gap-2 hover:border-berry/30 hover:bg-berry/3 transition-colors"
              >
                <Camera size={28} className="text-chocolate-light/30" />
                <span className="text-sm text-chocolate-light/50">Tap to add a photo</span>
                <span className="text-xs text-chocolate-light/30">JPG, PNG (max 10MB)</span>
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-berry/5 border border-berry/15 rounded-xl px-4 py-3">
              <p className="text-sm text-berry">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              submitting
                ? 'bg-chocolate/50 text-cream/70 cursor-not-allowed'
                : 'btn-shimmer bg-chocolate text-cream hover:bg-chocolate-light active:scale-[0.98]'
            }`}
          >
            {submitting ? (
              <>Submitting...</>
            ) : (
              <>
                <Send size={16} />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
