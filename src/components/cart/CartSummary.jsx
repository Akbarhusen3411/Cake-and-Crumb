import { Truck } from 'lucide-react'
import useCartStore, { getSubtotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'
import { FREE_RADIUS_KM, RATE_PER_KM } from '../../utils/deliveryCalculator'

export default function CartSummary() {
  const items = useCartStore((s) => s.items)
  const subtotal = getSubtotal(items)
  const checkoutFee = useCheckoutStore((s) => s.deliveryFee)
  const distanceKm = useCheckoutStore((s) => s.deliveryDistanceKm)

  // If checkout has calculated a fee, use it. Otherwise show info message.
  const hasDeliveryInfo = distanceKm > 0
  const deliveryFee = hasDeliveryInfo ? checkoutFee : null
  const total = subtotal + (deliveryFee || 0)

  return (
    <div className="bg-cream/60 rounded-xl p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-chocolate-light/60">Subtotal</span>
        <span className="font-medium text-chocolate">₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm items-center">
        <span className="text-chocolate-light/60 flex items-center gap-1.5">
          <Truck size={14} />
          Delivery
        </span>
        {deliveryFee !== null ? (
          deliveryFee === 0 ? (
            <span className="font-medium text-green-600">FREE</span>
          ) : (
            <span className="font-medium text-chocolate">₹{deliveryFee}</span>
          )
        ) : (
          <span className="text-xs text-chocolate-light/40 italic">Calculated at checkout</span>
        )}
      </div>
      {deliveryFee !== null && deliveryFee > 0 && distanceKm > 0 && (
        <p className="text-[11px] text-chocolate-light/40 text-center">
          {distanceKm} km from Vaso • ₹{RATE_PER_KM}/km
        </p>
      )}
      {deliveryFee === null && (
        <p className="text-[11px] text-chocolate-light/40 text-center">
          Free within {FREE_RADIUS_KM} km • ₹{RATE_PER_KM}/km after
        </p>
      )}
      <div className="border-t border-chocolate/8 pt-3 flex justify-between">
        <span className="font-semibold text-chocolate">Total</span>
        <span className="font-bold text-chocolate text-lg">₹{total}</span>
      </div>
    </div>
  )
}
