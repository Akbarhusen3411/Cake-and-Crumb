import { Truck } from 'lucide-react'
import useCartStore from '../../store/useCartStore'

export default function CartSummary() {
  const subtotal = useCartStore((s) => s.getSubtotal())
  const deliveryFee = useCartStore((s) => s.getDeliveryFee())
  const total = useCartStore((s) => s.getTotal())

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
        {deliveryFee === 0 ? (
          <span className="font-medium text-green-600">FREE</span>
        ) : (
          <span className="font-medium text-chocolate">₹{deliveryFee}</span>
        )}
      </div>
      {deliveryFee > 0 && (
        <p className="text-[11px] text-chocolate-light/40 text-center">
          Free delivery on orders above ₹499
        </p>
      )}
      <div className="border-t border-chocolate/8 pt-3 flex justify-between">
        <span className="font-semibold text-chocolate">Total</span>
        <span className="font-bold text-chocolate text-lg">₹{total}</span>
      </div>
    </div>
  )
}
