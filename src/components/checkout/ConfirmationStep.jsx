import { useEffect, useRef } from 'react'
import { CheckCircle, Home, MessageCircle } from 'lucide-react'
import useCartStore, { getCartItems, getSubtotal, getDeliveryFee, getTotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'
import { sendOrderConfirmation, generateOrderId } from '../../services/emailService'

const TIME_SLOT_LABELS = {
  '10-12': '10 AM – 12 PM',
  '12-14': '12 PM – 2 PM',
  '14-16': '2 PM – 4 PM',
  '16-18': '4 PM – 6 PM',
  '18-20': '6 PM – 8 PM',
}

export default function ConfirmationStep({ onClose }) {
  const checkout = useCheckoutStore()
  const items = useCartStore((s) => s.items)
  const cartItems = getCartItems(items)
  const subtotal = getSubtotal(items)
  const deliveryFee = getDeliveryFee(items)
  const total = getTotal(items)
  const clearCart = useCartStore((s) => s.clearCart)
  const hasSent = useRef(false)

  const orderId = checkout.orderId || generateOrderId()

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
      paymentId: checkout.razorpayOrderId,
    })

    // Send WhatsApp summary to admin
    const phone = checkout.phone.replace(/\s/g, '')
    const customerWa = phone.startsWith('+') ? phone.replace('+', '') : `91${phone}`
    const itemsList = cartItems.map((i) => `• ${i.shortName || i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n')
    const timeLabel = TIME_SLOT_LABELS[checkout.selectedSlot] || checkout.selectedSlot

    const confirmMsg = `✅ Hi ${checkout.customerName}! Your Cake & Crumb order *${orderId}* is *CONFIRMED*! 🎂\n\nWe'll deliver on ${formatDate(checkout.selectedDate)} (${timeLabel}).\nTotal: ₹${total} ${checkout.paymentMethod === 'cod' ? '(COD)' : '(Paid Online)'}\n\nThank you! 🙏`
    const confirmLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(confirmMsg)}`

    const rejectMsg = `Hi ${checkout.customerName}, we're sorry but we cannot fulfill your order *${orderId}* at this time. Please contact us for alternatives. — Cake & Crumb`
    const rejectLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(rejectMsg)}`

    const shippedMsg = `📦 Hi ${checkout.customerName}! Your order *${orderId}* has been *SHIPPED*! 🚗\n\nIt's on the way to: ${checkout.fullAddress}\nExpected: ${formatDate(checkout.selectedDate)} (${timeLabel})\n\nEnjoy your treats! — Cake & Crumb 🎂`
    const shippedLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(shippedMsg)}`

    // Message sent BY customer TO admin (customer can see this)
    const msg = `🎂 *NEW ORDER — ${orderId}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*📋 Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ₹${subtotal}\n` +
      `*Delivery:* ${deliveryFee === 0 ? 'FREE ✅' : '₹' + deliveryFee}\n` +
      `*💰 Total: ₹${total}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*👤* ${checkout.customerName}\n` +
      `*📞* ${checkout.phone}\n` +
      `*📍* ${checkout.fullAddress}, ${checkout.deliveryArea}\n` +
      `*📅* ${formatDate(checkout.selectedDate)} | ${timeLabel}\n` +
      `*💳* ${checkout.paymentMethod === 'online' ? 'Paid Online' : 'Cash on Delivery'}\n\n` +
      `Please confirm my order. Thank you! 🙏`

    // Admin-only message (sent to admin's self-chat with action links)
    const adminMsg = `🔔 *ORDER ACTIONS — ${orderId}*\n` +
      `Customer: ${checkout.customerName} (${checkout.phone})\n\n` +
      `✅ *Confirm:*\n${confirmLink}\n\n` +
      `📦 *Shipped:*\n${shippedLink}\n\n` +
      `❌ *Reject:*\n${rejectLink}`

    // Open customer → admin chat
    window.open(`https://wa.me/919081668490?text=${encodeURIComponent(msg)}`, '_blank')

    // After a short delay, open admin self-chat with action links
    setTimeout(() => {
      window.open(`https://wa.me/919081668490?text=${encodeURIComponent(adminMsg)}`, '_blank')
    }, 2000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoHome = () => {
    clearCart()
    checkout.reset()
    onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="text-center space-y-6 py-6">
      {/* Animated checkmark */}
      <div className="check-animate w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
        <CheckCircle size={40} className="text-green-500" />
      </div>

      <div>
        <h3 className="font-heading text-xl font-bold text-chocolate mb-2">Order Confirmed!</h3>
        <p className="text-sm text-chocolate-light/60">Thank you for ordering from Cake & Crumb</p>
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
          <p>💳 {checkout.paymentMethod === 'online' ? 'Paid Online' : 'Cash on Delivery'}</p>
        </div>
      </div>

      <p className="text-xs text-chocolate-light/40 max-w-[260px] mx-auto">
        Order details have been sent to WhatsApp. We'll confirm your order shortly!
      </p>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleGoHome}
          className="btn-shimmer w-full max-w-xs mx-auto bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}
