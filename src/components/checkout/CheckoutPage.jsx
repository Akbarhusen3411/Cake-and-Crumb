import { X, MapPin, Calendar, CreditCard, CheckCircle } from 'lucide-react'
import useCheckoutStore from '../../store/useCheckoutStore'
import AddressStep from './AddressStep'
import ScheduleStep from './ScheduleStep'
import PaymentStep from './PaymentStep'
import ConfirmationStep from './ConfirmationStep'

const steps = [
  { num: 1, label: 'Address', icon: MapPin },
  { num: 2, label: 'Schedule', icon: Calendar },
  { num: 3, label: 'Payment', icon: CreditCard },
  { num: 4, label: 'Done', icon: CheckCircle },
]

export default function CheckoutPage({ isOpen, onClose }) {
  const { step, nextStep, prevStep } = useCheckoutStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80] bg-cream-light overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-cream-light/95 backdrop-blur-sm border-b border-chocolate/5 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-chocolate">Checkout</h2>
          {step < 4 && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-chocolate-light" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="max-w-lg mx-auto px-4 pb-4">
          <div className="flex items-center justify-between relative">
            {/* Connection line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-[2px] bg-chocolate/8" />
            <div
              className="absolute top-4 left-[10%] h-[2px] bg-berry transition-all duration-700"
              style={{ width: `${((Math.min(step, 4) - 1) / 3) * 80}%` }}
            />

            {steps.map((s) => {
              const Icon = s.icon
              const isActive = step === s.num
              const isDone = step > s.num
              return (
                <div key={s.num} className="relative flex flex-col items-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isDone ? 'bg-berry text-white scale-90'
                    : isActive ? 'bg-chocolate text-cream scale-110 shadow-lg shadow-chocolate/20'
                    : 'bg-white text-chocolate-light/30 border border-chocolate/10'
                  }`}>
                    {isDone ? <CheckCircle size={16} /> : <Icon size={14} />}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-medium transition-colors ${
                    isActive ? 'text-chocolate' : isDone ? 'text-berry' : 'text-chocolate-light/30'
                  }`}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div key={step} className="tab-content-enter">
          {step === 1 && <AddressStep onNext={nextStep} />}
          {step === 2 && <ScheduleStep onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <PaymentStep onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <ConfirmationStep onClose={onClose} />}
        </div>
      </div>
    </div>
  )
}
