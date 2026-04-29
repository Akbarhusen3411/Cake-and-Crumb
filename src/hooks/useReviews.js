import { useState, useEffect } from 'react'
import { db, isFirebaseConfigured } from '../config/firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'

const COLLECTION_NAME = 'reviews'
const CACHE_KEY = 'cake-crumb-reviews'
let cachedReviews = null
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
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {}
}

// Fetch reviews from Firestore
async function fetchReviews() {
  if (!isFirebaseConfigured()) return cachedReviews || []
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const reviews = snapshot.docs
      .map((doc) => {
        const d = doc.data()
        return {
          id: doc.id,
          name: d.name || '',
          rating: d.rating || 0,
          text: d.text || '',
          product: d.product || '',
          photo: d.photo || '',
          date: d.date || '',
        }
      })
      .filter((r) => r.name && r.rating && r.text)
    cachedReviews = reviews
    saveToStorage(reviews)
    notifyListeners()
    return reviews
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    return cachedReviews || []
  }
}

// Submit a review to Firestore
export async function submitReview(reviewData) {
  if (!isFirebaseConfigured()) {
    throw new Error('Review system is not configured. Please contact the bakery.')
  }
  const docData = {
    product: reviewData.product,
    name: reviewData.name,
    rating: reviewData.rating,
    text: reviewData.text,
    photo: reviewData.photo || '',
    date: reviewData.date,
    createdAt: serverTimestamp(),
  }
  const docRef = await addDoc(collection(db, COLLECTION_NAME), docData)
  return docRef.id
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

    // Fetch fresh data from Firestore
    fetchReviews().then((data) => {
      setReviews(data)
      setLoading(false)
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
