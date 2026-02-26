import { Trash2 } from 'lucide-react'
import QuantitySelector from '../ui/QuantitySelector'
import useCartStore from '../../store/useCartStore'

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex gap-3 py-4 border-b border-chocolate/5 last:border-0">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-chocolate truncate">{item.shortName || item.name}</h4>
        <p className="text-xs text-chocolate-light/50 mt-0.5">₹{item.price} / {item.unit}</p>
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.productId || item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.productId || item.id, item.quantity - 1)}
            size="sm"
          />
          <span className="text-sm font-bold text-chocolate">₹{item.price * item.quantity}</span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.productId || item.id)}
        className="self-start mt-1 w-7 h-7 rounded-lg flex items-center justify-center text-chocolate-light/30 hover:text-berry hover:bg-berry/5 transition-all"
        aria-label="Remove item"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
