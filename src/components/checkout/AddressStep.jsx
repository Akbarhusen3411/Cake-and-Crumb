import { useState } from 'react'
import { MapPin, Loader2, CheckCircle, XCircle, Truck } from 'lucide-react'
import useCheckoutStore from '../../store/useCheckoutStore'
import { getCoordinatesFromPincode, calculateDistance, calculateDeliveryFee, getDeliveryInfo, BAKERY_LOCATION, FREE_RADIUS_KM, RATE_PER_KM } from '../../utils/deliveryCalculator'

export default function AddressStep({ onNext }) {
  const checkout = useCheckoutStore()
  const [errors, setErrors] = useState({})
  const [pincodeStatus, setPincodeStatus] = useState(null)
  const [pincodeInfo, setPincodeInfo] = useState(null)
  const [deliveryCalc, setDeliveryCalc] = useState(null) // { distanceKm, fee, text }

  const [form, setForm] = useState({
    customerName: checkout.customerName || '',
    phone: checkout.phone || '',
    email: checkout.email || '',
    pincode: checkout.pincode || '',
    fullAddress: checkout.fullAddress || '',
    area: '',
    district: '',
    state: '',
  })

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const lookupPincode = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) return

    setPincodeStatus('loading')
    setPincodeInfo(null)
    setDeliveryCalc(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      const data = await res.json()

      if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0]
        const state = po.State
        const district = po.District
        const areas = data[0].PostOffice.map((p) => p.Name)

        if (state !== 'Gujarat') {
          setPincodeStatus('not_available')
          setPincodeInfo({ district, state, areas })
          setForm((f) => ({ ...f, district, state, area: '' }))
          return
        }

        setPincodeStatus('found')
        setPincodeInfo({ district, state, areas })
        setForm((f) => ({ ...f, district, state, area: areas[0] || '' }))

        // Calculate delivery distance & fee
        const coords = await getCoordinatesFromPincode(pincode)
        if (coords) {
          const distanceKm = calculateDistance(coords.lat, coords.lng)
          const info = getDeliveryInfo(distanceKm)
          setDeliveryCalc({ distanceKm, fee: info.fee, text: info.text })
        }
      } else {
        setPincodeStatus('not_found')
      }
    } catch {
      clearTimeout(timeoutId)
      setPincodeStatus('not_found')
    }
  }

  const handlePincodeChange = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 6)
    update('pincode', clean)
    if (clean.length === 6) {
      lookupPincode(clean)
    } else {
      setPincodeStatus(null)
      setPincodeInfo(null)
      setDeliveryCalc(null)
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.customerName.trim()) errs.customerName = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter valid 10-digit number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter valid email'
    if (!form.pincode || form.pincode.length !== 6) errs.pincode = 'Enter 6-digit pincode'
    if (pincodeStatus === 'not_available') errs.pincode = 'Delivery not available outside Gujarat'
    if (pincodeStatus === 'not_found') errs.pincode = 'Invalid pincode'
    if (!form.fullAddress.trim()) errs.fullAddress = 'Address is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const area = form.area || pincodeInfo?.areas?.[0] || ''
    checkout.setAddress({
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      deliveryArea: `${area}, ${form.district}, ${form.state}`,
      fullAddress: form.fullAddress,
      pincode: form.pincode,
    })
    // Save delivery distance and fee
    checkout.setDelivery(
      deliveryCalc?.distanceKm || 0,
      deliveryCalc?.fee || 0
    )
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-5">
        <MapPin size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">Delivery Address</h3>
      </div>

      {/* Name & Phone */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-chocolate-light/60 mb-1 ml-1">Full Name *</label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => update('customerName', e.target.value)}
            placeholder="Enter your full name"
            className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 ${errors.customerName ? 'border-berry/40' : 'border-chocolate/8'}`}
          />
          {errors.customerName && <p className="text-[11px] text-berry mt-1 ml-1">{errors.customerName}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-chocolate-light/60 mb-1 ml-1">Phone Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="10-digit mobile number"
            className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 ${errors.phone ? 'border-berry/40' : 'border-chocolate/8'}`}
          />
          {errors.phone && <p className="text-[11px] text-berry mt-1 ml-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-chocolate-light/60 mb-1 ml-1">Email (optional)</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="For order confirmation"
          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 ${errors.email ? 'border-berry/40' : 'border-chocolate/8'}`}
        />
        {errors.email && <p className="text-[11px] text-berry mt-1 ml-1">{errors.email}</p>}
      </div>

      {/* Pincode */}
      <div className="bg-cream/30 rounded-2xl p-4 space-y-3 border border-chocolate/5">
        <p className="text-[11px] font-medium text-chocolate-light/50 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin size={12} />
          Delivery Location
        </p>

        <div>
          <label className="block text-xs font-medium text-chocolate-light/60 mb-1 ml-1">Pincode *</label>
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              value={form.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              className={`w-full bg-white border rounded-xl px-4 py-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 pr-10 ${errors.pincode ? 'border-berry/40' : 'border-chocolate/8'}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {pincodeStatus === 'loading' && <Loader2 size={16} className="text-chocolate-light/40 animate-spin" />}
              {pincodeStatus === 'found' && <CheckCircle size={16} className="text-green-500" />}
              {(pincodeStatus === 'not_found' || pincodeStatus === 'not_available') && <XCircle size={16} className="text-berry" />}
            </div>
          </div>
          {errors.pincode && <p className="text-[11px] text-berry mt-1 ml-1">{errors.pincode}</p>}
        </div>

        {/* Location + Delivery Fee */}
        {pincodeStatus === 'found' && pincodeInfo && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 space-y-3" style={{ animation: 'chat-msg-in 0.3s ease-out' }}>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-600 shrink-0" />
              <p className="text-sm font-semibold text-green-800">Delivery Available!</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
              <div>
                <span className="text-green-600/60 block">District</span>
                <span className="font-medium">{pincodeInfo.district}</span>
              </div>
              <div>
                <span className="text-green-600/60 block">State</span>
                <span className="font-medium">{pincodeInfo.state}</span>
              </div>
            </div>
            {pincodeInfo.areas?.length > 1 && (
              <div>
                <label className="block text-xs text-green-600/60 mb-1">Select Area</label>
                <select
                  value={form.area}
                  onChange={(e) => update('area', e.target.value)}
                  className="w-full bg-white border border-green-200 rounded-lg px-3 py-2 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  {pincodeInfo.areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Delivery Fee Card */}
            {deliveryCalc && (
              <div className={`rounded-lg px-3 py-2.5 flex items-center gap-3 ${deliveryCalc.fee === 0 ? 'bg-green-100' : 'bg-amber-50 border border-amber-200'}`}>
                <Truck size={18} className={deliveryCalc.fee === 0 ? 'text-green-600' : 'text-amber-600'} />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${deliveryCalc.fee === 0 ? 'text-green-700' : 'text-amber-800'}`}>
                    {deliveryCalc.fee === 0 ? 'FREE Delivery!' : `₹${deliveryCalc.fee} Delivery`}
                  </p>
                  <p className="text-[11px] text-green-600/70">
                    {deliveryCalc.distanceKm} km from {BAKERY_LOCATION}
                    {deliveryCalc.fee > 0 && ` • ₹${RATE_PER_KM}/km`}
                  </p>
                </div>
                {deliveryCalc.fee === 0 && (
                  <span className="text-xs font-bold text-green-600 bg-green-200 px-2 py-0.5 rounded-full">FREE</span>
                )}
              </div>
            )}
            {!deliveryCalc && pincodeStatus === 'found' && (
              <div className="flex items-center gap-2 text-xs text-green-600/60">
                <Loader2 size={12} className="animate-spin" />
                Calculating delivery distance...
              </div>
            )}
          </div>
        )}

        {pincodeStatus === 'not_available' && pincodeInfo && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3" style={{ animation: 'chat-msg-in 0.3s ease-out' }}>
            <div className="flex items-center gap-2 mb-1">
              <XCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-sm font-semibold text-red-700">Delivery Not Available</p>
            </div>
            <p className="text-xs text-red-600">
              This pincode is in {pincodeInfo.district}, {pincodeInfo.state}. We currently deliver only within Gujarat.
            </p>
            <a
              href="https://wa.me/919081668490?text=Hi!%20I'm%20outside%20Gujarat.%20Can%20you%20deliver%20to%20my%20area?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-medium text-red-700 underline"
            >
              Contact us for special delivery
            </a>
          </div>
        )}

        {pincodeStatus === 'not_found' && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3" style={{ animation: 'chat-msg-in 0.3s ease-out' }}>
            <p className="text-xs text-red-600 flex items-center gap-1.5">
              <XCircle size={13} className="shrink-0" />
              Invalid pincode. Please check and try again.
            </p>
          </div>
        )}

        {/* Delivery pricing info */}
        <div className="text-[10px] text-chocolate-light/40 leading-relaxed">
          <p>📍 Bakery: {BAKERY_LOCATION}</p>
          <p>🆓 Free delivery within {FREE_RADIUS_KM} km • ₹{RATE_PER_KM}/km after that</p>
        </div>
      </div>

      {/* Full Address */}
      <div>
        <label className="block text-xs font-medium text-chocolate-light/60 mb-1 ml-1">Full Address *</label>
        <textarea
          rows={3}
          value={form.fullAddress}
          onChange={(e) => update('fullAddress', e.target.value)}
          placeholder="House/Flat, Street, Landmark"
          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 resize-none ${errors.fullAddress ? 'border-berry/40' : 'border-chocolate/8'}`}
        />
        {errors.fullAddress && <p className="text-[11px] text-berry mt-1 ml-1">{errors.fullAddress}</p>}
      </div>

      <button
        type="submit"
        disabled={pincodeStatus === 'not_available' || pincodeStatus === 'loading'}
        className="btn-shimmer w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Schedule
      </button>
    </form>
  )
}
