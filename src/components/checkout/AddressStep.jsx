import { useState, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import useCheckoutStore from '../../store/useCheckoutStore'
import { getDistricts, getTalukas, getCities } from '../../data/gujaratLocations'

// FloatingInput defined OUTSIDE component to prevent remount on every render
function FloatingInput({ field, label, type = 'text', value, onChange, error, focusedField, setFocusedField }) {
  return (
    <div className="relative">
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
        focusedField === field || value
          ? 'top-1.5 text-[10px] text-berry font-medium'
          : 'top-3 text-sm text-chocolate-light/35'
      }`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full bg-cream/50 border rounded-xl px-4 pt-5 pb-2 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300 ${
          error ? 'border-berry/40' : 'border-chocolate/8'
        }`}
      />
      {error && <p className="text-[11px] text-berry mt-1 ml-1">{error}</p>}
    </div>
  )
}

function SelectField({ label, value, onChange, options, error, placeholder }) {
  return (
    <div className="relative">
      <label className="block text-[10px] text-chocolate-light/50 font-medium uppercase tracking-wider mb-1 ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 text-sm text-chocolate focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all appearance-none pr-10 ${
            error ? 'border-berry/40' : 'border-chocolate/8'
          } ${!value ? 'text-chocolate-light/40' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-light/30 pointer-events-none" />
      </div>
      {error && <p className="text-[11px] text-berry mt-1 ml-1">{error}</p>}
    </div>
  )
}

export default function AddressStep({ onNext }) {
  const checkout = useCheckoutStore()
  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    customerName: checkout.customerName || '',
    phone: checkout.phone || '',
    email: checkout.email || '',
    district: checkout.district || '',
    taluka: checkout.taluka || '',
    city: checkout.city || '',
    fullAddress: checkout.fullAddress || '',
    pincode: checkout.pincode || '',
  })

  const districts = getDistricts()
  const talukas = getTalukas(form.district)
  const cities = getCities(form.district, form.taluka)

  const update = (field, value) => {
    setForm((f) => {
      const updated = { ...f, [field]: value }
      // Reset dependent fields
      if (field === 'district') { updated.taluka = ''; updated.city = '' }
      if (field === 'taluka') { updated.city = '' }
      return updated
    })
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.customerName.trim()) errs.customerName = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.district) errs.district = 'Select district'
    if (!form.taluka) errs.taluka = 'Select taluka'
    if (!form.city) errs.city = 'Select city/town'
    if (!form.fullAddress.trim()) errs.fullAddress = 'Address is required'
    if (!form.pincode.trim()) errs.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter valid 6-digit pincode'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    checkout.setAddress({
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      deliveryArea: `${form.city}, ${form.taluka}, ${form.district}`,
      fullAddress: form.fullAddress,
      pincode: form.pincode,
    })
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-5">
        <MapPin size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">Delivery Address</h3>
      </div>

      {/* Name & Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <FloatingInput
          field="customerName" label="Full Name *" value={form.customerName}
          onChange={update} error={errors.customerName}
          focusedField={focusedField} setFocusedField={setFocusedField}
        />
        <FloatingInput
          field="phone" label="Phone Number *" type="tel" value={form.phone}
          onChange={update} error={errors.phone}
          focusedField={focusedField} setFocusedField={setFocusedField}
        />
      </div>

      {/* Email */}
      <FloatingInput
        field="email" label="Email (optional)" type="email" value={form.email}
        onChange={update} error={errors.email}
        focusedField={focusedField} setFocusedField={setFocusedField}
      />

      {/* Location: District → Taluka → City */}
      <div className="bg-cream/30 rounded-2xl p-4 space-y-3 border border-chocolate/5">
        <p className="text-[11px] font-medium text-chocolate-light/50 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin size={12} />
          Delivery Location
        </p>

        <SelectField
          label="District"
          value={form.district}
          onChange={(v) => update('district', v)}
          options={districts}
          error={errors.district}
          placeholder="Select District"
        />

        {form.district && (
          <SelectField
            label="Taluka"
            value={form.taluka}
            onChange={(v) => update('taluka', v)}
            options={talukas}
            error={errors.taluka}
            placeholder="Select Taluka"
          />
        )}

        {form.taluka && (
          <SelectField
            label="City / Town / Area"
            value={form.city}
            onChange={(v) => update('city', v)}
            options={cities}
            error={errors.city}
            placeholder="Select City / Town"
          />
        )}
      </div>

      {/* Full Address */}
      <div className="relative">
        <label className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          focusedField === 'fullAddress' || form.fullAddress
            ? 'top-1.5 text-[10px] text-berry font-medium'
            : 'top-3 text-sm text-chocolate-light/35'
        }`}>
          Full Address (House/Flat, Street, Landmark) *
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

      {/* Pincode */}
      <div className="w-1/2">
        <FloatingInput
          field="pincode" label="Pincode *" value={form.pincode}
          onChange={update} error={errors.pincode}
          focusedField={focusedField} setFocusedField={setFocusedField}
        />
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
