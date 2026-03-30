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
  const [orderTimestamp] = useState(Date.now())

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

    const payLabel = checkout.paymentMethod === 'online' ? 'Paid Online' : 'Cash on Delivery'

    const confirmMsg = `✅ *ORDER CONFIRMED — Cake & Crumb* 🎂\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Hi *${checkout.customerName}*! Tamari order confirm thai gai che.\n\n` +
      `*🆔 Order ID:* ${orderId}\n\n` +
      `*📋 Tamara Items:*\n${itemsList}\n\n` +
      `*💰 Total:* ₹${total} ${deliveryFee === 0 ? '(Free Delivery)' : `(incl. ₹${deliveryFee} delivery)`}\n` +
      `*💳 Payment:* ${payLabel}\n\n` +
      `*📍 Delivery Address:*\n${checkout.fullAddress}, ${checkout.deliveryArea}\n\n` +
      `*📅 Delivery:* ${formatDate(checkout.selectedDate)} | ${timeLabel}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `⚠️ *Cancellation Policy:*\n` +
      `Order cancel karva mate *30 minute* ni ander ama j WhatsApp par message karo. 30 min pachi cancel nahi thay.\n\n` +
      `Ame tamari order prepare kari rahya che! Thank you! 🙏❤️\n` +
      `— *Cake & Crumb*`
    const confirmLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(confirmMsg)}`

    const shippedMsg = `📦 *ORDER SHIPPED — Cake & Crumb* 🚗\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Hi *${checkout.customerName}*! Tamari order *${orderId}* ship thai gai che!\n\n` +
      `*📋 Items:*\n${itemsList}\n\n` +
      `*💰 Total:* ₹${total} (${payLabel} — ${checkout.paymentMethod === 'cod' ? 'please keep ready' : 'already paid'})\n\n` +
      `*📍 Delivering to:*\n${checkout.fullAddress}, ${checkout.deliveryArea}\n\n` +
      `*⏰ Expected:* ${formatDate(checkout.selectedDate)} | ${timeLabel}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Enjoy! — *Cake & Crumb* 🎂❤️`
    const shippedLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(shippedMsg)}`

    const rejectMsg = `Hi *${checkout.customerName}*,\n\n` +
      `Maaf karo pan tamari order *${orderId}* ame atyare fulfill nahi kari shakiye.\n\n` +
      `*Reason:* [Admin will type reason]\n\n` +
      `Alternatives mate contact karo:\n📞 +91 90816 68490\n\n— Cake & Crumb 🙏`
    const rejectLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(rejectMsg)}`

    const cancelMsg = `🚫 *ORDER CANCELLED — Cake & Crumb*\n\n` +
      `Hi *${checkout.customerName}*, tamari order *${orderId}* cancel thai gai che.\n\n` +
      `Fari thi order karva mate visit karo:\nhttps://akbarhusen3411.github.io/Cake-and-Crumb/\n\n— Cake & Crumb 🙏`
    const cancelLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(cancelMsg)}`

    const orderTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    // Message sent BY customer TO admin
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
      `*💳* ${payLabel}\n` +
      `*🕐 Order Time:* ${orderTime}\n\n` +
      `⚠️ *Cancel:* 30 min ni ander j cancel thay.\n\n` +
      `Please confirm my order. Thank you! 🙏`

    window.open(`https://wa.me/919081668490?text=${encodeURIComponent(msg)}`, '_blank')

    setTimeout(() => {
      const adminNote = `📋 *${orderId}* — Quick Reply\n` +
        `👤 ${checkout.customerName} | 📞 ${checkout.phone}\n` +
        `🕐 Order: ${orderTime} | ⚠️ Cancel limit: 30 min\n\n` +
        `━━━ Tap to reply ━━━\n\n` +
        `✅ Confirm → ${confirmLink}\n\n` +
        `📦 Shipped → ${shippedLink}\n\n` +
        `🚫 Cancel → ${cancelLink}\n\n` +
        `❌ Reject → ${rejectLink}`
      window.open(`https://wa.me/919081668490?text=${encodeURIComponent(adminNote)}`, '_blank')
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

      {/* Cancellation notice */}
      <div className="bg-gold/5 border border-gold/15 rounded-xl px-4 py-3 max-w-xs mx-auto text-left">
        <p className="text-xs font-semibold text-chocolate mb-1">⚠️ Cancellation Policy</p>
        <p className="text-[11px] text-chocolate-light/60 leading-relaxed">
          30 minute ni ander cancel kari shakay cho. Pachi cancellation available nahi hoy.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2 max-w-xs mx-auto">
        <button
          onClick={handleGoHome}
          className="btn-shimmer w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Back to Home
        </button>
        <button
          onClick={() => {
            const elapsed = Date.now() - orderTimestamp
            if (elapsed > 30 * 60 * 1000) {
              alert('30 minute thi vadhare time thai gayo. Order cancel nahi thai shake.')
              return
            }
            const cancelReq = `🚫 *CANCEL REQUEST*\n\nOrder ID: *${orderId}*\nCustomer: ${checkout.customerName}\nPhone: ${checkout.phone}\n\nMane mari order cancel karavi che. Please confirm.`
            window.open(`https://wa.me/919081668490?text=${encodeURIComponent(cancelReq)}`, '_blank')
          }}
          className="w-full border border-berry/20 text-berry py-3 rounded-xl font-medium text-sm hover:bg-berry/5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          🚫 Cancel Order (30 min ni ander)
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
