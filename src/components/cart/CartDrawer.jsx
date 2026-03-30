import { useMemo } from 'react'
import { ShoppingBag, X, ArrowRight, Sparkles, MessageCircle, Minus, Plus, Trash2 } from 'lucide-react'
import useCartStore, { getCartItems, getItemCount, getSubtotal } from '../../store/useCartStore'
import useCheckoutStore from '../../store/useCheckoutStore'

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const cartItems = useMemo(() => getCartItems(items), [items])
  const itemCount = getItemCount(items)
  const subtotal = getSubtotal(items)
  const checkoutFee = useCheckoutStore((s) => s.deliveryFee)
  const deliveryFee = checkoutFee || 0
  const total = subtotal + deliveryFee

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
        className={`fixed inset-0 z-[110] transition-all duration-300 ${
          isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel — bottom sheet on mobile, side drawer on desktop */}
      <div
        className={`fixed z-[110] bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl
          sm:top-0 sm:right-0 sm:left-auto sm:bottom-0 sm:w-full sm:max-w-md sm:rounded-t-none sm:max-h-none
          ${isOpen
            ? 'translate-y-0 sm:translate-x-0'
            : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Drag handle — mobile only */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-chocolate/15" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-chocolate/5">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-chocolate" />
              <h2 className="font-heading text-base sm:text-lg font-bold text-chocolate">
                Your Cart
                {itemCount > 0 && (
                  <span className="ml-2 text-xs font-normal text-chocolate-light/50">
                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light active:bg-chocolate/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Items */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="text-chocolate-light/25" />
              </div>
              <h3 className="font-heading text-base font-semibold text-chocolate mb-1">
                Your cart is empty
              </h3>
              <p className="text-sm text-chocolate-light/50 mb-5">
                Add something delicious!
              </p>
              <button
                onClick={onClose}
                className="text-sm font-medium text-berry px-5 py-2 rounded-full border border-berry/20 active:bg-berry/5 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items — compact list */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 max-h-[40vh] sm:max-h-none">
                {cartItems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-cream/40 rounded-xl p-2.5 cart-item-enter"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0"
                      loading="lazy"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-chocolate truncate">{item.shortName}</h4>
                      <p className="text-xs text-chocolate-light/50">₹{item.price} / {item.unit}</p>

                      {/* Quantity + Total */}
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.productId || item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white border border-chocolate/10 flex items-center justify-center text-chocolate active:scale-90 transition-transform"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-chocolate">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId || item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-chocolate text-cream flex items-center justify-center active:scale-90 transition-transform"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-chocolate">₹{item.price * item.quantity}</span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId || item.id)}
                      className="self-start w-7 h-7 rounded-full flex items-center justify-center text-chocolate-light/30 active:text-berry transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary + CTA — sticky bottom */}
              <div className="px-4 pb-5 pt-3 border-t border-chocolate/5 bg-white space-y-3">
                {/* Price Summary */}
                <div className="bg-cream/50 rounded-xl px-4 py-3 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-chocolate-light/60">Subtotal</span>
                    <span className="font-medium text-chocolate">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-chocolate-light/60">Delivery</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-chocolate'}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-chocolate/8 pt-1.5 flex justify-between">
                    <span className="font-semibold text-chocolate">Total</span>
                    <span className="font-bold text-chocolate text-lg">₹{total}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => { onClose(); onCheckout() }}
                    className="flex-[1.5] bg-chocolate text-cream py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform"
                  >
                    <Sparkles size={14} />
                    Checkout
                    <ArrowRight size={14} />
                  </button>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-center text-[10px] text-chocolate-light/40">
                    Free delivery on orders above ₹499
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
