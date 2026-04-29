import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, X, Check, MessageCircle, Loader2, Search } from 'lucide-react'
import useLocationStore from '../store/useLocationStore'
import { WHATSAPP_NUMBER } from '../config/constants'

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Cake & Crumb! I'm outside Gujarat but I'd love to order.")}`

export default function LocationDialog() {
  const { dialogShown, dialogOpen, area, setArea, setDialogShown, closeDialog, setIsInAhmedabad } = useLocationStore()
  const [notInCity, setNotInCity] = useState(false)
  const location = useLocation()

  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)
  const [areas, setAreas] = useState([])        // list from API
  const [selectedArea, setSelectedArea] = useState(area || '')
  const [locationInfo, setLocationInfo] = useState(null) // { district, state }
  const [error, setError] = useState('')

  // Auto-popup after 3 seconds (only on homepage, only once)
  useEffect(() => {
    if (dialogShown) return
    if (location.pathname !== '/') return
    const timer = setTimeout(() => {
      useLocationStore.getState().openDialog()
      setDialogShown()
    }, 3000)
    return () => clearTimeout(timer)
  }, [dialogShown, setDialogShown, location.pathname])

  const lookupPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError('Enter a valid 6-digit pincode')
      return
    }
    setLoading(true)
    setError('')
    setAreas([])
    setSelectedArea('')
    setLocationInfo(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      const data = await res.json()

      if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const postOffices = data[0].PostOffice
        const state = postOffices[0].State
        const district = postOffices[0].District
        const areaList = postOffices.map((po) => po.Name)

        if (state !== 'Gujarat') {
          setError('Sorry, we currently deliver only in Gujarat')
          setLoading(false)
          return
        }

        setAreas(areaList)
        setLocationInfo({ district, state })
        if (areaList.length === 1) setSelectedArea(areaList[0])
      } else {
        setError('Invalid pincode. Please check and try again.')
      }
    } catch (e) {
      setError(e.name === 'AbortError' ? 'Request timed out. Try again.' : 'Could not look up pincode. Try again.')
    }
    setLoading(false)
  }

  const handleConfirm = () => {
    const fullArea = locationInfo
      ? `${selectedArea}, ${locationInfo.district}, ${locationInfo.state} - ${pincode}`
      : selectedArea
    setArea(fullArea)
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
          <p className="text-sm text-cream/70">Enter your pincode to check delivery</p>
        </div>

        {/* Body */}
        <div className="p-5">
          {!notInCity ? (
            <>
              <p className="text-sm text-chocolate-light/70 mb-3">
                Enter your pincode to find your area:
              </p>

              {/* Pincode Input + Search */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '')
                    setPincode(v)
                    setError('')
                    if (v.length < 6) { setAreas([]); setSelectedArea(''); setLocationInfo(null) }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && lookupPincode()}
                  placeholder="Enter 6-digit pincode"
                  className="flex-1 bg-cream/50 border border-chocolate/10 rounded-xl px-4 py-3 text-sm text-chocolate focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all"
                />
                <button
                  onClick={lookupPincode}
                  disabled={loading || pincode.length !== 6}
                  className="px-4 py-3 rounded-xl bg-chocolate text-cream text-sm font-medium hover:bg-chocolate-light transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  {loading ? '' : 'Search'}
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[12px] text-berry mb-3">{error}</p>
              )}

              {/* Location Info */}
              {locationInfo && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-3">
                  <p className="text-[12px] text-green-700 font-medium">
                    {locationInfo.district}, {locationInfo.state} — {pincode}
                  </p>
                </div>
              )}

              {/* Area Selector */}
              {areas.length > 1 && (
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full bg-cream/50 border border-chocolate/10 rounded-xl px-4 py-3 text-sm text-chocolate focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all mb-3 appearance-none"
                >
                  <option value="">Select your area</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              )}

              {/* Confirm */}
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
                  Not in Gujarat
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
                Currently we deliver only in Gujarat. But you can still order via WhatsApp — we'll try our best!
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
