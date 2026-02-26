import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import useCheckoutStore from '../../store/useCheckoutStore'
import useLocationStore from '../../store/useLocationStore'
import { deliveryAreas } from '../../data/products'

export default function AddressStep({ onNext }) {
  const checkout = useCheckoutStore()
  const location = useLocationStore()
  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    customerName: checkout.customerName || '',
    phone: checkout.phone || '',
    email: checkout.email || '',
    deliveryArea: checkout.deliveryArea || location.area || '',
    fullAddress: checkout.fullAddress || location.address || '',
    pincode: checkout.pincode || location.pincode || '',
  })

  useEffect(() => {
    if (!form.deliveryArea && location.area) {
      setForm((f) => ({ ...f, deliveryArea: location.area }))
    }
  }, [location.area, form.deliveryArea])

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.customerName.trim()) errs.customerName = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit Indian number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.deliveryArea) errs.deliveryArea = 'Select your area'
    if (!form.fullAddress.trim()) errs.fullAddress = 'Address is required'
    if (!form.pincode.trim()) errs.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit pincode'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    checkout.setAddress(form)
    onNext()
  }

  const FloatingInput = ({ field, label, type = 'text', required = false }) => (
    <div className="relative">
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
        focusedField === field || form[field]
          ? 'top-1.5 text-[10px] text-berry font-medium'
          : 'top-3 text-sm text-chocolate-light/35'
      }`}>
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        value={form[field]}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        onChange={(e) => update(field, e.target.value)}
        className={`w-full bg-cream/50 border rounded-xl px-4 pt-5 pb-2 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300 ${
          errors[field] ? 'border-berry/40' : 'border-chocolate/8'
        }`}
      />
      {errors[field] && <p className="text-[11px] text-berry mt-1 ml-1">{errors[field]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-5">
        <MapPin size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">Delivery Address</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FloatingInput field="customerName" label="Full Name" required />
        <FloatingInput field="phone" label="Phone Number" type="tel" required />
      </div>

      <FloatingInput field="email" label="Email (for order confirmation)" type="email" />

      <div className="relative">
        <select
          value={form.deliveryArea}
          onChange={(e) => update('deliveryArea', e.target.value)}
          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-sm text-chocolate focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all appearance-none ${
            errors.deliveryArea ? 'border-berry/40' : 'border-chocolate/8'
          }`}
        >
          <option value="">Select Delivery Area *</option>
          {deliveryAreas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        {errors.deliveryArea && <p className="text-[11px] text-berry mt-1 ml-1">{errors.deliveryArea}</p>}
      </div>

      <div className="relative">
        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focusedField === 'fullAddress' || form.fullAddress
            ? 'top-1.5 text-[10px] text-berry font-medium'
            : 'top-3 text-sm text-chocolate-light/35'
        }`}>
          Full Address *
        </label>
        <textarea
          rows={3}
          value={form.fullAddress}
          onFocus={() => setFocusedField('fullAddress')}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => update('fullAddress', e.target.value)}
          className={`w-full bg-cream/50 border rounded-xl px-4 pt-6 pb-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300 resize-none ${
            errors.fullAddress ? 'border-berry/40' : 'border-chocolate/8'
          }`}
        />
        {errors.fullAddress && <p className="text-[11px] text-berry mt-1 ml-1">{errors.fullAddress}</p>}
      </div>

      <div className="w-1/2">
        <FloatingInput field="pincode" label="Pincode" required />
      </div>

      <button
        type="submit"
        className="btn-shimmer w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 mt-6"
      >
        Continue to Schedule
      </button>
    </form>
  )
}
