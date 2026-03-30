import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProductById } from '../data/products'

const DELIVERY_FEE = 49
const FREE_DELIVERY_ABOVE = 499

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

      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.productId === productId)
        return item ? item.quantity : 0
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cake-crumb-cart',
    }
  )
)

// Computed helpers (call outside of selectors to avoid infinite re-renders)
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

export function getDeliveryFee(items) {
  const subtotal = getSubtotal(items)
  return subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
}

export function getTotal(items) {
  return getSubtotal(items) + getDeliveryFee(items)
}

export default useCartStore
