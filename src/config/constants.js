/**
 * Centralized business configuration for Cake & Crumb
 * Update these values in one place — used across the entire site
 */

// ─── Contact ─────────────────────────────────────────────
export const WHATSAPP_NUMBER = '919081668490'
export const WHATSAPP_NUMBER_ALT = '919173183440'
export const INSTAGRAM_HANDLE = 'cake_and_crumb_1'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Cake & Crumb! I'd like to place an order.")}`
export const WHATSAPP_URL_ALT = `https://wa.me/${WHATSAPP_NUMBER_ALT}`
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`

// ─── Order Policies ──────────────────────────────────────
export const MIN_ORDER_AMOUNT = 150           // Minimum order in ₹
export const CANCEL_WINDOW_MINUTES = 30       // Cancellation window
export const ADVANCE_ORDER_DAYS = 1           // Days in advance to order

// ─── Delivery ────────────────────────────────────────────
export const BAKERY_LAT = 22.6652
export const BAKERY_LNG = 72.7566
export const FREE_DELIVERY_RADIUS_KM = 5
export const DELIVERY_RATE_PER_KM = 5         // ₹ per km beyond free radius

// ─── Payment Methods ─────────────────────────────────────
export const PAYMENT_METHODS = ['GPay', 'PhonePe', 'Paytm', 'Cash']
