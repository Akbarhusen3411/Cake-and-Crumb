import { create } from 'zustand'

let toastId = 0

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = 'success') => {
    const id = ++toastId
    set({ toasts: [...get().toasts, { id, message, type }] })
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) })
    }, 2500)
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) })
  },
}))

export default useToastStore
