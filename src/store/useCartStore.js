import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProductById } from '../data/products'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ productId, quantity }]

      addItem: (productId) => {
        const { items } = get()
        const existing = items.find((i) => i.productId === productId)
        if (existing) {
          set({ items: items.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ items: [...items, { productId, quantity: 1 }] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({ items: get().items.map((i) => i.productId === productId ? { ...i, quantity } : i) })
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cake-crumb-cart',
    }
  )
)

// Computed helpers
export function getCartItems(items) {
  return items.map((item) => {
    const product = getProductById(item.productId)
    return product ? { ...product, quantity: item.quantity } : null
  }).filter(Boolean)
}

export function getSubtotal(items) {
  return getCartItems(items).reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getItemCount(items) {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}

// Delivery fee now comes from checkout store (distance-based)
// These are fallback for cart preview before checkout
export function getDeliveryFee(items, checkoutFee) {
  if (typeof checkoutFee === 'number') return checkoutFee
  return 0 // Will be calculated during checkout
}

export function getTotal(items, checkoutFee) {
  return getSubtotal(items) + getDeliveryFee(items, checkoutFee)
}

export default useCartStore
