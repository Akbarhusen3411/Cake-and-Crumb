import { create } from 'zustand'

const useCheckoutStore = create((set) => ({
  step: 1, // 1: Address, 2: Schedule, 3: Payment, 4: Confirmation
  isOpen: false,

  // Address
  customerName: '',
  phone: '',
  email: '',
  deliveryArea: '',
  fullAddress: '',
  pincode: '',

  // Schedule
  selectedDate: '',
  selectedSlot: '',

  // Payment
  paymentMethod: '', // 'online' or 'cod'
  paymentStatus: '', // 'pending', 'success', 'failed'
  razorpayOrderId: '',

  // Order
  orderId: '',

  open: () => set({ isOpen: true, step: 1 }),
  close: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

  setAddress: (data) => set(data),
  setSchedule: (date, slot) => set({ selectedDate: date, selectedSlot: slot }),
  setPayment: (method, status, razorpayId) => set({
    paymentMethod: method,
    paymentStatus: status || 'pending',
    razorpayOrderId: razorpayId || '',
  }),
  setOrderId: (id) => set({ orderId: id }),

  reset: () => set({
    step: 1,
    isOpen: false,
    customerName: '',
    phone: '',
    email: '',
    deliveryArea: '',
    fullAddress: '',
    pincode: '',
    selectedDate: '',
    selectedSlot: '',
    paymentMethod: '',
    paymentStatus: '',
    razorpayOrderId: '',
    orderId: '',
  }),
}))

export default useCheckoutStore
