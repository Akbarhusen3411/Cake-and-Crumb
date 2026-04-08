import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'sm' }) {
  const isSmall = size === 'sm'
  return (
    <div className={`count-animate inline-flex items-center rounded-full bg-chocolate text-cream ${isSmall ? 'h-8 gap-0.5' : 'h-9 gap-1'}`}>
      <button
        onClick={onDecrease}
        className={`flex items-center justify-center rounded-full hover:bg-chocolate-light active:scale-90 transition-all ${isSmall ? 'w-8 h-8' : 'w-9 h-9'}`}
        aria-label="Decrease quantity"
      >
        <Minus size={isSmall ? 14 : 16} />
      </button>
      <span className={`font-bold min-w-[18px] text-center ${isSmall ? 'text-sm' : 'text-base'}`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-full hover:bg-chocolate-light active:scale-90 transition-all ${isSmall ? 'w-8 h-8' : 'w-9 h-9'}`}
        aria-label="Increase quantity"
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  )
}
