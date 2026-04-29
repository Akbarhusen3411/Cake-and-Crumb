import { create } from 'zustand'

const useCheckoutStore = create((set) => ({
  step: 1,
  isOpen: false,

  // Address
  customerName: '',
  phone: '',
  email: '',
  deliveryArea: '',
  fullAddress: '',
  pincode: '',

  // Delivery distance
  deliveryDistanceKm: 0,
  deliveryFee: 0,

  // Schedule
  selectedDate: '',
  selectedSlot: '',

  // Payment (UPI only)
  paymentMethod: 'upi',
  paymentStatus: '',
  upiTxnRef: '',

  // Order
  orderId: '',

  open: () => set({ isOpen: true, step: 1 }),
  close: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

  setAddress: (data) => set(data),
  setDelivery: (distanceKm, fee) => set({ deliveryDistanceKm: distanceKm, deliveryFee: fee }),
  setSchedule: (date, slot) => set({ selectedDate: date, selectedSlot: slot }),
  setPaymentClaimed: (upiTxnRef) => set({
    paymentMethod: 'upi',
    paymentStatus: 'claimed',
    upiTxnRef: upiTxnRef || '',
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
    deliveryDistanceKm: 0,
    deliveryFee: 0,
    selectedDate: '',
    selectedSlot: '',
    paymentMethod: 'upi',
    paymentStatus: '',
    upiTxnRef: '',
    orderId: '',
  }),
}))

export default useCheckoutStore
