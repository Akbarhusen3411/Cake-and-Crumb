import { useEffect, useMemo, useState } from 'react'
import { Smartphone, Copy, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import QRCode from 'qrcode'
import useCartStore, { getCartItems, getSubtotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'
import { UPI_ID, PAYEE_NAME, ACCOUNT_HOLDER_NAME, buildUpiLink } from '../../config/upiPayment'
import { generateOrderId } from '../../services/emailService'

export default function PaymentStep({ onNext, onBack }) {
  const checkout = useCheckoutStore()
  const items = useCartStore((s) => s.items)
  const cartItems = getCartItems(items)
  const subtotal = getSubtotal(items)
  const deliveryFee = checkout.deliveryFee || 0
  const total = subtotal + deliveryFee

  const orderId = useMemo(
    () => checkout.orderId || generateOrderId(checkout.customerName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!checkout.orderId) checkout.setOrderId(orderId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const upiLink = useMemo(() => buildUpiLink({ amount: total, orderId }), [total, orderId])

  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [txnRef, setTxnRef] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    QRCode.toDataURL(upiLink, { width: 280, margin: 1, color: { dark: '#3E2723', light: '#FFFFFF' } })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''))
  }, [upiLink])

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handlePaid = () => {
    setError('')
    checkout.setPaymentClaimed(txnRef.trim())
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-5">
        <Smartphone size={18} className="text-berry" />
        <h3 className="font-heading text-base font-semibold text-chocolate">UPI Payment</h3>
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
          <span className="font-semibold text-chocolate">Total to Pay</span>
          <span className="font-bold text-chocolate text-lg">₹{total}</span>
        </div>
      </div>

      {/* QR + UPI block */}
      <div className="bg-white border border-chocolate/8 rounded-2xl p-5 shadow-sm">
        <div className="text-center mb-4">
          <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider mb-1">Scan to Pay</p>
          <p className="text-sm text-chocolate-light/70">
            Pay <span className="font-bold text-chocolate">₹{total}</span> to <span className="font-semibold text-chocolate">{PAYEE_NAME}</span>
          </p>
          <p className="text-[11px] text-chocolate-light/50 mt-1">
            Account: <span className="font-medium">{ACCOUNT_HOLDER_NAME}</span>
          </p>
        </div>

        {/* QR */}
        <div className="flex justify-center mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`UPI QR for ₹${total}`}
              className="w-56 h-56 rounded-xl border border-chocolate/8"
            />
          ) : (
            <div className="w-56 h-56 rounded-xl border border-chocolate/8 bg-cream/40 flex items-center justify-center">
              <span className="text-xs text-chocolate-light/40">Generating QR…</span>
            </div>
          )}
        </div>

        {/* UPI ID with copy */}
        <button
          onClick={copyUpiId}
          className="w-full flex items-center justify-between bg-cream/60 rounded-xl px-4 py-3 hover:bg-cream transition-colors mb-3"
        >
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-chocolate-light/45">UPI ID</p>
            <p className="text-sm font-semibold text-chocolate font-mono">{UPI_ID}</p>
          </div>
          {copied ? (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle size={14} /> Copied
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-chocolate-light/60">
              <Copy size={14} /> Copy
            </span>
          )}
        </button>

        {/* Open UPI app button (mobile deep link) */}
        <a
          href={upiLink}
          className="w-full flex items-center justify-center gap-2 bg-berry text-white py-3 rounded-xl font-medium text-sm hover:bg-berry-light transition-colors"
        >
          <ExternalLink size={16} />
          Open UPI App (GPay / PhonePe / Paytm)
        </a>

        <p className="text-[11px] text-chocolate-light/45 text-center mt-3 leading-relaxed">
          Order ID <span className="font-mono">{orderId}</span> is auto-filled in the payment note.
        </p>
      </div>

      {/* Optional UPI ref */}
      <div>
        <label className="block text-sm font-medium text-chocolate mb-2">
          UPI Transaction Ref <span className="text-chocolate-light/40 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={txnRef}
          onChange={(e) => setTxnRef(e.target.value)}
          placeholder="e.g. 412345678901"
          maxLength={30}
          className="w-full px-4 py-3 rounded-xl border border-chocolate/15 bg-cream-light/50 text-chocolate placeholder:text-chocolate-light/35 focus:outline-none focus:border-berry/40 focus:ring-1 focus:ring-berry/20 transition-colors"
        />
        <p className="text-[11px] text-chocolate-light/45 mt-1.5">
          Helps us match your payment faster. You'll find this in your UPI app after paying.
        </p>
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
          onClick={handlePaid}
          className="btn-shimmer flex-[2] bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300"
        >
          I've Paid — Submit Order
        </button>
      </div>

      <p className="text-[11px] text-chocolate-light/45 text-center leading-relaxed">
        Your order will be confirmed once we verify the payment in our bank app. You'll receive a WhatsApp message with the approval.
      </p>
    </div>
  )
}
