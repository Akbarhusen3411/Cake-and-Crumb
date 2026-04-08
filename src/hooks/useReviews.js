import { useState, useEffect, useCallback } from 'react'
import { REVIEWS_SCRIPT_URL } from '../config/googleSheetReviews'

let cachedReviews = null
let fetchPromise = null
let listeners = new Set()

function notifyListeners() {
  listeners.forEach((fn) => fn(cachedReviews || []))
}

// Convert Google Drive URL to embeddable thumbnail format
function fixDrivePhotoUrl(url) {
  if (!url) return ''
  // Extract file ID from any Google Drive URL format
  const match = url.match(/(?:thumbnail\?id=|\/d\/|id=|export=view&id=)([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
  return url
}

export default function useReviews() {
  const [reviews, setReviews] = useState(cachedReviews || [])
  const [loading, setLoading] = useState(!cachedReviews)

  useEffect(() => {
    listeners.add(setReviews)
    return () => listeners.delete(setReviews)
  }, [])

  useEffect(() => {
    if (cachedReviews) { setReviews(cachedReviews); setLoading(false); return }
    if (!REVIEWS_SCRIPT_URL) { setLoading(false); return }

    if (!fetchPromise) {
      fetchPromise = fetch(REVIEWS_SCRIPT_URL)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            cachedReviews = data
              .filter((r) => r.name && r.rating && r.text)
              .map((r) => ({ ...r, photo: fixDrivePhotoUrl(r.photo) }))
          } else {
            cachedReviews = []
          }
          return cachedReviews
        })
        .catch(() => { cachedReviews = []; return [] })
    }

    fetchPromise.then((data) => {
      setReviews(data)
      setLoading(false)
    })
  }, [])

  return { reviews, loading }
}

// Add a review to cache immediately (optimistic update) and notify all components
export function addReviewToCache(review) {
  if (!cachedReviews) cachedReviews = []
  cachedReviews = [review, ...cachedReviews]
  notifyListeners()
}

// Force refetch from Google Sheets on next mount
export function clearReviewsCache() {
  cachedReviews = null
  fetchPromise = null
}

// Get reviews for a specific product (matches by product name)
export function getProductReviews(reviews, productName) {
  if (!productName || !reviews.length) return []
  const name = productName.toLowerCase()
  return reviews.filter((r) => r.product && r.product.toLowerCase() === name)
}

// Get average rating for reviews
export function getAverageRating(productReviews) {
  if (!productReviews.length) return 0
  const sum = productReviews.reduce((acc, r) => acc + Number(r.rating), 0)
  return Math.round((sum / productReviews.length) * 10) / 10
}
