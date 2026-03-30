const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export function assetUrl(path) {
  return `${BASE}${path}`
}
