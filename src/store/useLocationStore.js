import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useLocationStore = create(
  persist(
    (set) => ({
      area: '',
      address: '',
      pincode: '',
      isInAhmedabad: true,
      dialogShown: false,
      dialogOpen: false,

      setArea: (area) => set({ area }),
      setAddress: (address) => set({ address }),
      setPincode: (pincode) => set({ pincode }),
      setIsInAhmedabad: (val) => set({ isInAhmedabad: val }),
      setDialogShown: () => set({ dialogShown: true }),
      openDialog: () => set({ dialogOpen: true }),
      closeDialog: () => set({ dialogOpen: false }),
    }),
    {
      name: 'cake-crumb-location',
      partialize: (state) => ({
        area: state.area,
        address: state.address,
        pincode: state.pincode,
        isInAhmedabad: state.isInAhmedabad,
        dialogShown: state.dialogShown,
      }),
    }
  )
)

export default useLocationStore
