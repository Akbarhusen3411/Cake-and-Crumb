import { ShoppingBag, X, ArrowRight } from 'lucide-react'
import useCartStore from '../../store/useCartStore'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const cartItems = useCartStore((s) => s.getCartItems())
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md z-[70] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-chocolate/5">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-chocolate" />
              <h2 className="font-heading text-lg font-bold text-chocolate">Your Cart</h2>
              {itemCount > 0 && (
                <span className="bg-berry text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-chocolate-light" />
            </button>
          </div>

          {/* Items */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-5">
                <ShoppingBag size={32} className="text-chocolate-light/30" />
              </div>
              <h3 className="font-heading text-base font-semibold text-chocolate mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-chocolate-light/50 max-w-[240px]">
                Browse our menu and add something delicious!
              </p>
              <button
                onClick={onClose}
                className="mt-6 text-sm font-medium text-berry hover:text-berry-light transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Summary + CTA */}
              <div className="p-5 border-t border-chocolate/5 space-y-4">
                <CartSummary />
                <button
                  onClick={() => { onClose(); onCheckout() }}
                  className="btn-shimmer w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
