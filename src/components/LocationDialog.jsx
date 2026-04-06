import { useState, useEffect } from 'react'
import { MapPin, X, Check, MessageCircle } from 'lucide-react'
import useLocationStore from '../store/useLocationStore'
import { deliveryAreas } from '../data/products'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27m%20outside%20Ahmedabad%20but%20I%27d%20love%20to%20order.'

export default function LocationDialog() {
  const { dialogShown, dialogOpen, area, setArea, setDialogShown, closeDialog, setIsInAhmedabad } = useLocationStore()
  const [notInCity, setNotInCity] = useState(false)
  const [selectedArea, setSelectedArea] = useState(area || '')

  // Auto-popup after 3 seconds (only once)
  useEffect(() => {
    if (dialogShown) return
    const timer = setTimeout(() => {
      useLocationStore.getState().openDialog()
      setDialogShown()
    }, 3000)
    return () => clearTimeout(timer)
  }, [dialogShown, setDialogShown])

  const handleConfirm = () => {
    setArea(selectedArea)
    setIsInAhmedabad(true)
    closeDialog()
  }

  const handleNotInCity = () => {
    setNotInCity(true)
    setIsInAhmedabad(false)
  }

  if (!dialogOpen) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm dialog-backdrop-enter"
        onClick={closeDialog}
      />

      {/* Dialog */}
      <div className="dialog-enter relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-chocolate to-chocolate-light p-5 text-cream relative">
          <button
            onClick={closeDialog}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <MapPin size={20} className="text-gold" />
            </div>
            <h3 className="font-heading text-lg font-bold">Delivering Fresh!</h3>
          </div>
          <p className="text-sm text-cream/70">We currently deliver across Ahmedabad</p>
        </div>

        {/* Body */}
        <div className="p-5">
          {!notInCity ? (
            <>
              <p className="text-sm text-chocolate-light/70 mb-4">
                Select your area for accurate delivery options:
              </p>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-cream/50 border border-chocolate/10 rounded-xl px-4 py-3 text-sm text-chocolate focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all mb-4 appearance-none"
              >
                <option value="">Choose your area</option>
                {deliveryAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <button
                onClick={handleConfirm}
                disabled={!selectedArea}
                className="w-full btn-shimmer bg-chocolate text-cream py-3 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Confirm Location
              </button>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={handleNotInCity}
                  className="flex-1 text-sm text-chocolate-light/50 hover:text-berry transition-colors"
                >
                  Not in Ahmedabad
                </button>
                <span className="text-chocolate-light/20">|</span>
                <button
                  onClick={closeDialog}
                  className="flex-1 text-sm text-chocolate-light/50 hover:text-chocolate transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-gold" />
              </div>
              <h4 className="font-heading text-base font-semibold text-chocolate mb-2">
                We're expanding soon!
              </h4>
              <p className="text-sm text-chocolate-light/60 mb-5 leading-relaxed">
                Currently we deliver only in Ahmedabad. But you can still order via WhatsApp — we'll try our best!
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </a>
              <button
                onClick={() => { setNotInCity(false); closeDialog() }}
                className="block w-full text-sm text-chocolate-light/50 hover:text-chocolate mt-3 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
