import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Home, MessageCircle, XCircle, Clock } from 'lucide-react'
import useCartStore, { getCartItems, getSubtotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'
import { sendOrderConfirmation, generateOrderId } from '../../services/emailService'
import { WHATSAPP_NUMBER } from '../../config/constants'

const TIME_SLOT_LABELS = {
  '10-12': '10 AM – 12 PM',
  '12-14': '12 PM – 2 PM',
  '14-16': '2 PM – 4 PM',
  '16-18': '4 PM – 6 PM',
  '18-20': '6 PM – 8 PM',
}

const CANCEL_WINDOW_MS = 30 * 60 * 1000 // 30 minutes

export default function ConfirmationStep({ onClose }) {
  const checkout = useCheckoutStore()
  const items = useCartStore((s) => s.items)
  const cartItems = getCartItems(items)
  const subtotal = getSubtotal(items)
  const deliveryFee = checkout.deliveryFee || 0
  const total = subtotal + deliveryFee
  const clearCart = useCartStore((s) => s.clearCart)
  const hasSent = useRef(false)

  const orderId = checkout.orderId || generateOrderId(checkout.customerName)
  const [orderTimestamp] = useState(Date.now())
  const [cancelExpired, setCancelExpired] = useState(false)
  const [remainingTime, setRemainingTime] = useState(CANCEL_WINDOW_MS)
  const [orderCancelled, setOrderCancelled] = useState(false)

  // Countdown timer for cancel button
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - orderTimestamp
      const remaining = CANCEL_WINDOW_MS - elapsed
      if (remaining <= 0) {
        setCancelExpired(true)
        setRemainingTime(0)
        clearInterval(interval)
      } else {
        setRemainingTime(remaining)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [orderTimestamp])

  const formatRemaining = () => {
    const mins = Math.floor(remainingTime / 60000)
    const secs = Math.floor((remainingTime % 60000) / 1000)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (hasSent.current) return
    hasSent.current = true

    if (!checkout.orderId) {
      checkout.setOrderId(orderId)
    }

    // Send email (fire and forget)
    sendOrderConfirmation({
      orderId,
      customerName: checkout.customerName,
      email: checkout.email,
      phone: checkout.phone,
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      address: checkout.fullAddress,
      area: checkout.deliveryArea,
      date: formatDate(checkout.selectedDate),
      timeSlot: TIME_SLOT_LABELS[checkout.selectedSlot] || checkout.selectedSlot,
      paymentMethod: checkout.paymentMethod,
      paymentId: checkout.upiTxnRef,
    })

    // Send WhatsApp order to admin
    const itemsList = cartItems.map((i) => `• ${i.shortName || i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n')
    const timeLabel = TIME_SLOT_LABELS[checkout.selectedSlot] || checkout.selectedSlot
    const orderTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const upiRefLine = checkout.upiTxnRef
      ? `*🧾 UPI Ref:* ${checkout.upiTxnRef}\n`
      : `*🧾 UPI Ref:* not provided\n`

    const msg = `🎂 *NEW ORDER — ${orderId}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*👤 Customer:* ${checkout.customerName}\n` +
      `*📞 Phone:* ${checkout.phone}\n` +
      `*📍 Address:* ${checkout.fullAddress}, ${checkout.deliveryArea}\n` +
      `*📅 Delivery:* ${formatDate(checkout.selectedDate)} | ${timeLabel}\n` +
      `*🕐 Order Time:* ${orderTime}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*📋 Order Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ₹${subtotal}\n` +
      `*Delivery:* ${deliveryFee === 0 ? 'FREE ✅' : '₹' + deliveryFee}\n` +
      `*💰 Total: ₹${total}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*💳 Payment:* UPI — claimed by customer\n` +
      upiRefLine +
      `*✅ Amount to verify:* ₹${total}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⚠️ *Cancel window:* 30 min from order time.\n\n` +
      `Please verify the payment in your bank app and approve. Thank you! 🙏`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoHome = () => {
    clearCart()
    checkout.reset()
    onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    if (cancelExpired || orderCancelled) return
    setOrderCancelled(true)
    const cancelReq = `🚫 *ORDER CANCELLED*\n\nOrder ID: *${orderId}*\nCustomer: ${checkout.customerName}\nPhone: ${checkout.phone}\n\nThis order has been cancelled by the customer within the 30-minute window.\n\n📋 Items were:\n${cartItems.map((i) => `• ${i.shortName || i.name} x${i.quantity}`).join('\n')}\n\nTotal was: ₹${total}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(cancelReq)}`, '_blank')
  }

  return (
    <div className="text-center space-y-6 py-6">
      {/* Animated checkmark or cancelled icon */}
      {orderCancelled ? (
        <div className="w-20 h-20 rounded-full bg-berry/10 flex items-center justify-center mx-auto">
          <XCircle size={40} className="text-berry" />
        </div>
      ) : (
        <div className="check-animate w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
          <CheckCircle size={40} className="text-green-500" />
        </div>
      )}

      <div>
        <h3 className="font-heading text-xl font-bold text-chocolate mb-2">
          {orderCancelled ? 'Order Cancelled' : 'Order Submitted'}
        </h3>
        <p className="text-sm text-chocolate-light/60">
          {orderCancelled
            ? 'Your order has been cancelled. Admin has been notified via WhatsApp.'
            : 'Awaiting payment verification. We\'ll confirm via WhatsApp shortly.'
          }
        </p>
      </div>

      {/* Order ID */}
      <div className="inline-block bg-cream rounded-xl px-6 py-3">
        <p className="text-[10px] font-medium text-chocolate-light/40 uppercase tracking-wider">Order ID</p>
        <p className="font-heading text-lg font-bold text-chocolate">{orderId}</p>
      </div>

      {/* Summary */}
      <div className="bg-cream/60 rounded-xl p-5 text-left space-y-3 max-w-xs mx-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-chocolate-light/70">{item.shortName || item.name} x{item.quantity}</span>
            <span className="text-chocolate font-medium">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t border-chocolate/8 pt-2 flex justify-between">
          <span className="font-semibold text-chocolate text-sm">Total</span>
          <span className="font-bold text-chocolate">₹{total}</span>
        </div>
        <div className="text-xs text-chocolate-light/50 space-y-1 pt-1">
          <p>📅 {formatDate(checkout.selectedDate)} | {TIME_SLOT_LABELS[checkout.selectedSlot] || ''}</p>
          <p>📍 {checkout.deliveryArea}</p>
          <p>💳 UPI — pending verification</p>
          {checkout.upiTxnRef && <p>🧾 Ref: {checkout.upiTxnRef}</p>}
        </div>
      </div>

      <p className="text-xs text-chocolate-light/40 max-w-[260px] mx-auto">
        Order details sent to WhatsApp. We'll verify your UPI payment and approve shortly.
      </p>

      {/* Cancellation notice with countdown */}
      {!orderCancelled && (
        <div className={`rounded-xl px-4 py-3 max-w-xs mx-auto text-left ${cancelExpired ? 'bg-gray-100 border border-gray-200' : 'bg-gold/5 border border-gold/15'}`}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={13} className={cancelExpired ? 'text-gray-400' : 'text-gold'} />
            <p className="text-xs font-semibold text-chocolate">
              {cancelExpired ? 'Cancellation Window Closed' : 'Cancellation Policy'}
            </p>
          </div>
          <p className="text-[11px] text-chocolate-light/60 leading-relaxed">
            {cancelExpired
              ? 'The 30-minute cancellation window has expired. This order can no longer be cancelled.'
              : `You can cancel within 30 minutes. Time remaining: ${formatRemaining()}`
            }
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2 max-w-xs mx-auto">
        <button
          onClick={handleGoHome}
          className="btn-shimmer w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Back to Home
        </button>

        {!orderCancelled && (
          <button
            onClick={handleCancel}
            disabled={cancelExpired}
            className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              cancelExpired
                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                : 'border border-berry/20 text-berry hover:bg-berry/5'
            }`}
          >
            {cancelExpired
              ? <><span>🔒</span> Cancel Expired</>
              : <><span>🚫</span> Cancel Order ({formatRemaining()} left)</>
            }
          </button>
        )}

        {orderCancelled && (
          <div className="bg-berry/5 border border-berry/15 rounded-xl px-4 py-3 text-left">
            <p className="text-xs font-semibold text-berry mb-1">Order Cancelled</p>
            <p className="text-[11px] text-chocolate-light/60">
              Cancellation notification sent to admin via WhatsApp. If you did not complete the WhatsApp message, please send it manually.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}
