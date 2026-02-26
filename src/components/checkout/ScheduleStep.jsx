import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import useCheckoutStore from '../../store/useCheckoutStore'

const TIME_SLOTS = [
  { label: '10 AM – 12 PM', value: '10-12' },
  { label: '12 PM – 2 PM', value: '12-14' },
  { label: '2 PM – 4 PM', value: '14-16' },
  { label: '4 PM – 6 PM', value: '16-18' },
  { label: '6 PM – 8 PM', value: '18-20' },
]

function getNext7Days() {
  const days = []
  const now = new Date()
  // Start from tomorrow (24hrs advance)
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() + i)
    days.push({
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      isToday: false,
    })
  }
  return days
}

export default function ScheduleStep({ onNext, onBack }) {
  const checkout = useCheckoutStore()
  const [selectedDate, setSelectedDate] = useState(checkout.selectedDate || '')
  const [selectedSlot, setSelectedSlot] = useState(checkout.selectedSlot || '')
  const [error, setError] = useState('')

  const days = getNext7Days()

  const handleContinue = () => {
    if (!selectedDate) { setError('Please select a delivery date'); return }
    if (!selectedSlot) { setError('Please select a time slot'); return }
    checkout.setSchedule(selectedDate, selectedSlot)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-5">
        <Calendar size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">Delivery Schedule</h3>
      </div>

      <p className="text-sm text-chocolate-light/60">
        Orders require at least 24 hours advance notice. Select your preferred date and time slot.
      </p>

      {/* Date Selection */}
      <div>
        <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider mb-3">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => { setSelectedDate(d.date); setError('') }}
              className={`shrink-0 w-[72px] py-3 rounded-xl text-center transition-all duration-300 border ${
                selectedDate === d.date
                  ? 'bg-chocolate text-cream border-chocolate shadow-lg shadow-chocolate/15 scale-105'
                  : 'bg-white text-chocolate-light border-chocolate/8 hover:border-chocolate/20 hover:shadow-md'
              }`}
            >
              <p className={`text-[10px] font-medium uppercase ${selectedDate === d.date ? 'text-cream/60' : 'text-chocolate-light/40'}`}>
                {d.day}
              </p>
              <p className={`text-xl font-bold ${selectedDate === d.date ? 'text-cream' : 'text-chocolate'}`}>
                {d.dateNum}
              </p>
              <p className={`text-[10px] ${selectedDate === d.date ? 'text-cream/60' : 'text-chocolate-light/40'}`}>
                {d.month}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Clock size={12} />
          Select Time Slot
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.value}
              onClick={() => { setSelectedSlot(slot.value); setError('') }}
              className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                selectedSlot === slot.value
                  ? 'bg-chocolate text-cream border-chocolate shadow-lg shadow-chocolate/15'
                  : 'bg-white text-chocolate-light border-chocolate/8 hover:border-chocolate/20 hover:shadow-md'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-berry text-center">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl font-medium text-sm border border-chocolate/10 text-chocolate hover:bg-cream transition-all"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="btn-shimmer flex-[2] bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
