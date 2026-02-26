import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'sm' }) {
  const isSmall = size === 'sm'
  return (
    <div className={`inline-flex items-center rounded-full bg-chocolate text-cream ${isSmall ? 'gap-1' : 'gap-2'}`}>
      <button
        onClick={onDecrease}
        className={`flex items-center justify-center rounded-full hover:bg-chocolate-light transition-colors ${isSmall ? 'w-7 h-7' : 'w-8 h-8'}`}
        aria-label="Decrease quantity"
      >
        <Minus size={isSmall ? 13 : 15} />
      </button>
      <span className={`font-semibold min-w-[20px] text-center ${isSmall ? 'text-xs' : 'text-sm'}`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-full hover:bg-chocolate-light transition-colors ${isSmall ? 'w-7 h-7' : 'w-8 h-8'}`}
        aria-label="Increase quantity"
      >
        <Plus size={isSmall ? 13 : 15} />
      </button>
    </div>
  )
}
