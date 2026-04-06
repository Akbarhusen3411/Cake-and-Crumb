/**
 * Distance-based delivery fee calculator
 * Base location: Vaso, Gujarat
 * 0-5 km: FREE
 * Above 5 km: ₹7 per km (full distance)
 */

// Husaini Chowk, Vaso, Gujarat 387380 (22°39'54.76"N 72°45'23.64"E)
const BAKERY_LAT = 22.6652
const BAKERY_LNG = 72.7566
const BAKERY_LOCATION = 'Vaso, Kheda, Gujarat'

const FREE_RADIUS_KM = 5
const RATE_PER_KM = 5

/**
 * Haversine formula — calculates distance between two lat/lng points
 * Returns distance in kilometers
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Get coordinates for a pincode using OpenStreetMap Nominatim API
 */
export async function getCoordinatesFromPincode(pincode) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`,
      {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      }
    )
    clearTimeout(timeoutId)
    const data = await res.json()

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      }
    }
    return null
  } catch {
    clearTimeout(timeoutId)
    return null
  }
}

/**
 * Calculate distance from bakery (Vaso) to given coordinates
 */
export function calculateDistance(lat, lng) {
  return Math.round(haversineDistance(BAKERY_LAT, BAKERY_LNG, lat, lng))
}

/**
 * Calculate delivery fee based on distance
 * 0-5 km: FREE
 * Above 5 km: ₹7 × total distance
 */
export function calculateDeliveryFee(distanceKm) {
  if (distanceKm <= FREE_RADIUS_KM) return 0
  return Math.round(distanceKm * RATE_PER_KM)
}

/**
 * Get delivery info text
 */
export function getDeliveryInfo(distanceKm) {
  if (distanceKm <= FREE_RADIUS_KM) {
    return { fee: 0, text: `FREE delivery (${distanceKm} km from ${BAKERY_LOCATION})` }
  }
  const fee = calculateDeliveryFee(distanceKm)
  return { fee, text: `₹${fee} delivery (${distanceKm} km × ₹${RATE_PER_KM}/km)` }
}

export { BAKERY_LOCATION, FREE_RADIUS_KM, RATE_PER_KM }
