import { useMemo } from 'react'
import { ShoppingBag, X, ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import useCartStore, { getCartItems, getItemCount, getSubtotal } from '../../store/useCartStore'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const items = useCartStore((s) => s.items)
  const cartItems = useMemo(() => getCartItems(items), [items])
  const itemCount = getItemCount(items)
  const subtotal = getSubtotal(items)

  const handleWhatsAppOrder = () => {
    const itemLines = cartItems.map((item) =>
      `- ${item.shortName} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('%0A')
    const msg = `Hi Cake %26 Crumb!%0A%0AI'd like to order:%0A${itemLines}%0A%0ATotal: ₹${subtotal}%0A%0APlease confirm availability!`
    window.open(`https://wa.me/919081668490?text=${msg}`, '_blank')
  }

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
          <div className="flex items-center justify-between p-5 border-b border-chocolate/5 bg-gradient-to-r from-cream-light to-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-chocolate flex items-center justify-center">
                <ShoppingBag size={16} className="text-cream" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-chocolate">Your Cart</h2>
                {itemCount > 0 && (
                  <p className="text-[11px] text-chocolate-light/50">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <X size={18} className="text-chocolate-light" />
            </button>
          </div>

          {/* Items */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center mb-5 animate-float-slow">
                <ShoppingBag size={36} className="text-chocolate-light/30" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-chocolate mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-chocolate-light/50 max-w-[260px] leading-relaxed">
                Browse our handcrafted menu and add something delicious!
              </p>
              <button
                onClick={onClose}
                className="btn-touch mt-6 text-sm font-medium text-berry hover:text-berry-light transition-colors px-5 py-2 rounded-full border border-berry/20 hover:bg-berry/5"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5">
                {cartItems.map((item, i) => (
                  <div key={item.id} className="cart-item-enter" style={{ animationDelay: `${i * 50}ms` }}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              {/* Summary + CTA */}
              <div className="p-5 border-t border-chocolate/5 space-y-3 bg-gradient-to-t from-cream-light/50 to-white">
                <CartSummary />

                {/* Quick WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="btn-touch w-full bg-[#25D366] text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#1FB855] hover:shadow-lg active:scale-[0.98]"
                >
                  <MessageCircle size={16} />
                  Quick Order via WhatsApp
                </button>

                <button
                  onClick={() => { onClose(); onCheckout() }}
                  className="btn-shimmer btn-touch btn-order-pulse w-full bg-chocolate text-cream py-3.5 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Sparkles size={14} />
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-chocolate-light/40 pt-1">
                  Free delivery on orders above ₹499
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
