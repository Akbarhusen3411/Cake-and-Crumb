import { useState } from 'react'
import { CreditCard, Banknote, ShieldCheck, AlertCircle } from 'lucide-react'
import useCartStore, { getCartItems, getSubtotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'
import { openRazorpay } from '../../config/razorpay'

export default function PaymentStep({ onNext, onBack }) {
  const checkout = useCheckoutStore()
  const items = useCartStore((s) => s.items)
  const cartItems = getCartItems(items)
  const subtotal = getSubtotal(items)
  const deliveryFee = checkout.deliveryFee || 0
  const total = subtotal + deliveryFee

  const [selectedMethod, setSelectedMethod] = useState(checkout.paymentMethod || '')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const codAllowed = total <= 1000

  const handlePayment = () => {
    if (!selectedMethod) { setError('Please select a payment method'); return }
    setError('')

    if (selectedMethod === 'online') {
      setProcessing(true)
      openRazorpay({
        amount: total,
        customerName: checkout.customerName,
        email: checkout.email,
        phone: checkout.phone,
        onSuccess: (paymentId) => {
          checkout.setPayment('online', 'success', paymentId)
          setProcessing(false)
          onNext()
        },
        onFailure: (reason) => {
          setProcessing(false)
          setError(`Payment failed: ${reason}`)
        },
      })
    } else {
      checkout.setPayment('cod', 'success')
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-5">
        <CreditCard size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">Payment</h3>
      </div>

      {/* Order Summary */}
      <div className="bg-cream/60 rounded-xl p-4 space-y-2">
        <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider mb-3">Order Summary</p>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-chocolate-light/70">{item.shortName || item.name} x{item.quantity}</span>
            <span className="text-chocolate font-medium">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t border-chocolate/5 pt-2 mt-2 flex justify-between text-sm">
          <span className="text-chocolate-light/60">Subtotal</span>
          <span className="text-chocolate font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-chocolate-light/60">Delivery</span>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-chocolate'}`}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="border-t border-chocolate/8 pt-2 flex justify-between">
          <span className="font-semibold text-chocolate">Total</span>
          <span className="font-bold text-chocolate text-lg">₹{total}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider">Choose Payment Method</p>

        <button
          onClick={() => { setSelectedMethod('online'); setError('') }}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
            selectedMethod === 'online'
              ? 'border-berry/30 bg-berry/5 shadow-md'
              : 'border-chocolate/8 hover:border-chocolate/20'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            selectedMethod === 'online' ? 'bg-berry/10' : 'bg-cream'
          }`}>
            <CreditCard size={18} className={selectedMethod === 'online' ? 'text-berry' : 'text-chocolate-light/50'} />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-semibold text-chocolate">Pay Online</p>
            <p className="text-xs text-chocolate-light/50">UPI, Cards, Wallets, Netbanking</p>
          </div>
          <ShieldCheck size={16} className="text-green-500/50" />
        </button>

        <button
          onClick={() => { if (codAllowed) { setSelectedMethod('cod'); setError('') } }}
          disabled={!codAllowed}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
            !codAllowed ? 'opacity-40 cursor-not-allowed' :
            selectedMethod === 'cod'
              ? 'border-berry/30 bg-berry/5 shadow-md'
              : 'border-chocolate/8 hover:border-chocolate/20'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            selectedMethod === 'cod' ? 'bg-berry/10' : 'bg-cream'
          }`}>
            <Banknote size={18} className={selectedMethod === 'cod' ? 'text-berry' : 'text-chocolate-light/50'} />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-semibold text-chocolate">Cash on Delivery</p>
            <p className="text-xs text-chocolate-light/50">
              {codAllowed ? 'Pay when you receive' : 'Available for orders under ₹1000'}
            </p>
          </div>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-berry bg-berry/5 px-4 py-3 rounded-xl">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl font-medium text-sm border border-chocolate/10 text-chocolate hover:bg-cream transition-all"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processing}
          className="btn-shimmer flex-[2] bg-berry text-white py-3.5 rounded-xl font-medium text-sm hover:bg-berry-light transition-all duration-300 disabled:opacity-60"
        >
          {processing ? 'Processing...' : selectedMethod === 'cod' ? 'Place Order' : `Pay ₹${total}`}
        </button>
      </div>
    </div>
  )
}
