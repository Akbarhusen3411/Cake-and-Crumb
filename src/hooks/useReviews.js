import { useState, useEffect } from 'react'
import { REVIEWS_SCRIPT_URL } from '../config/googleSheetReviews'

const CACHE_KEY = 'cake-crumb-reviews'
let cachedReviews = null
let fetchPromise = null
let listeners = new Set()

// Load from localStorage on startup (instant display)
try {
  const stored = localStorage.getItem(CACHE_KEY)
  if (stored) cachedReviews = JSON.parse(stored)
} catch {}

function notifyListeners() {
  listeners.forEach((fn) => fn(cachedReviews || []))
}

function saveToStorage(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)) } catch {}
}

// Pass through photo URL (data URLs or any hosted URL)
function fixPhotoUrl(url) {
  if (!url) return ''
  return url
}

function fetchReviews() {
  if (!REVIEWS_SCRIPT_URL) return Promise.resolve([])
  return fetch(REVIEWS_SCRIPT_URL)
    .then((r) => r.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const reviews = data
          .filter((r) => r.name && r.rating && r.text)
          .map((r) => ({ ...r, photo: fixPhotoUrl(r.photo) }))
        cachedReviews = reviews
        saveToStorage(reviews)
        notifyListeners()
        return reviews
      }
      return cachedReviews || []
    })
    .catch(() => cachedReviews || [])
}

export default function useReviews() {
  const [reviews, setReviews] = useState(cachedReviews || [])
  const [loading, setLoading] = useState(!cachedReviews)

  useEffect(() => {
    listeners.add(setReviews)
    return () => listeners.delete(setReviews)
  }, [])

  useEffect(() => {
    // Show cached reviews instantly
    if (cachedReviews) {
      setReviews(cachedReviews)
      setLoading(false)
    }

    // Always fetch fresh data in background
    if (!fetchPromise) fetchPromise = fetchReviews()
    fetchPromise.then((data) => {
      setReviews(data)
      setLoading(false)
      fetchPromise = null // Allow refetch on next mount
    })
  }, [])

  return { reviews, loading }
}

// Add a review to cache immediately (optimistic update)
export function addReviewToCache(review) {
  if (!cachedReviews) cachedReviews = []
  cachedReviews = [review, ...cachedReviews]
  saveToStorage(cachedReviews)
  notifyListeners()
}

// Get reviews for a specific product
export function getProductReviews(reviews, productName) {
  if (!productName || !reviews.length) return []
  const name = productName.toLowerCase()
  return reviews.filter((r) => r.product && r.product.toLowerCase() === name)
}

// Get average rating
export function getAverageRating(productReviews) {
  if (!productReviews.length) return 0
  const sum = productReviews.reduce((acc, r) => acc + Number(r.rating), 0)
  return Math.round((sum / productReviews.length) * 10) / 10
}
