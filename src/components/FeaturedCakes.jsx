import { useState } from 'react'
import { Sparkles, MessageCircle, ExternalLink, ChevronRight, Clock, Plus, Star } from 'lucide-react'
import { menuCategories, featuredItems } from '../data/cakes'
import { getProductsByCategory, productCategories } from '../data/products'
import useCartStore from '../store/useCartStore'
import useToastStore from '../store/useToastStore'
import QuantitySelector from './ui/QuantitySelector'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi!%20I%27d%20like%20to%20order%20from%20Cake%20%26%20Crumb.'

const SHOP_CATEGORY_IDS = productCategories.map((c) => c.id)

/* ─── Featured Hero Cards ─── */
function FeaturedCard({ item, index }) {
  return (
    <div
      className="fade-up group relative bg-white rounded-2xl overflow-hidden card-hover"
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/50 via-chocolate/10 to-transparent" />
        {item.badge && (
          <span className="absolute top-4 left-4 bg-berry/90 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-md">
            {item.badge}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="font-heading text-xl font-bold mb-1">{item.name}</h3>
          <p className="text-sm text-white/80 mb-3 leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {item.priceRange}
            </span>
            <span className="inline-block bg-white/0 text-white/0 group-hover:bg-berry/80 group-hover:text-white text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-500 backdrop-blur-sm">
              View Menu
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Product Card (shoppable) ─── */
function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const quantity = useCartStore((s) => s.getItemQuantity(product.id))
  const addToast = useToastStore((s) => s.addToast)

  const handleAdd = () => {
    addItem(product.id)
    addToast(`${product.shortName} added to cart!`)
  }

  return (
    <div className={`product-card bg-white rounded-xl overflow-hidden border border-chocolate/5 relative ${!product.inStock ? 'opacity-50' : ''}`}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-sm">
            <Star size={9} fill="currentColor" /> Best
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-xs font-semibold text-chocolate-light bg-cream px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-chocolate truncate">{product.shortName}</h4>
        <p className="text-xs text-chocolate-light/50 mt-0.5 flex items-center gap-1">
          <span className="text-berry font-semibold">₹{product.price}</span>
          <span>/ {product.unit}</span>
        </p>

        {/* Add / Quantity */}
        <div className="mt-2.5">
          {!product.inStock ? (
            <button disabled className="w-full py-1.5 rounded-lg bg-cream text-chocolate-light/30 text-xs font-medium cursor-not-allowed">
              Unavailable
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="btn-ripple btn-touch w-full py-2 rounded-lg bg-chocolate text-cream text-xs font-medium hover:bg-chocolate-light transition-all duration-300 flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95"
            >
              <Plus size={13} />
              Add to Cart
            </button>
          ) : (
            <div className="flex justify-center count-animate">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => updateQuantity(product.id, quantity + 1)}
                onDecrease={() => {
                  updateQuantity(product.id, quantity - 1)
                  if (quantity === 1) addToast(`${product.shortName} removed`, 'info')
                }}
                size="sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Menu Item Pill (for Coming Soon only) ─── */
function MenuPill({ name }) {
  return (
    <span className="inline-block bg-cream-light border border-chocolate/6 text-chocolate-light text-sm px-4 py-2 rounded-xl hover:bg-soft-pink hover:border-berry/15 hover:text-chocolate transition-all duration-300 cursor-default">
      {name}
    </span>
  )
}

/* ─── Category Tab Content ─── */
function CategoryContent({ category }) {
  const isComingSoon = category.id === 'coming-soon'
  const isShoppable = SHOP_CATEGORY_IDS.includes(category.id)

  if (isShoppable) {
    const categoryProducts = getProductsByCategory(category.id)
    const menuCat = menuCategories.find((c) => c.id === category.id)

    return (
      <div>
        {/* Category Header with Image */}
        {menuCat && (
          <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[21/7] sm:aspect-[21/5]">
            <img src={menuCat.image} alt={menuCat.label} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-chocolate/70 via-chocolate/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {menuCat.label}
                </h3>
                <p className="text-sm sm:text-base font-medium text-white/80">{menuCat.priceLabel}</p>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Note */}
        {menuCat?.note && (
          <p className="text-sm text-chocolate-light/50 italic text-center mt-6">{menuCat.note}</p>
        )}
      </div>
    )
  }

  // Coming Soon / non-shoppable fallback
  const itemCount = category.items?.length || category.subcategories?.reduce((acc, sub) => acc + sub.items.length, 0) || 0

  return (
    <div>
      {/* Category Header with Image */}
      <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[21/7] sm:aspect-[21/5]">
        <img src={category.image} alt={category.label} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/70 via-chocolate/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white">{category.label}</h3>
              {itemCount > 0 && !isComingSoon && (
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {itemCount} {itemCount === 1 ? 'flavour' : 'flavours'}
                </span>
              )}
            </div>
            <p className={`text-sm sm:text-base font-medium ${isComingSoon ? 'text-gold' : 'text-white/80'}`}>
              {isComingSoon && <Clock size={14} className="inline mr-1.5 -mt-0.5" />}
              {category.priceLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      {category.items && (
        <div className="flex flex-wrap gap-2.5 mb-6">
          {category.items.map((item) => (
            <MenuPill key={item} name={item} />
          ))}
        </div>
      )}

      {/* Note */}
      {category.note && (
        <p className="text-sm text-chocolate-light/50 italic text-center mt-4">{category.note}</p>
      )}
    </div>
  )
}

/* ─── Main Menu Section ─── */
export default function FeaturedCakes() {
  const [activeTab, setActiveTab] = useState('cheesecake')

  // Use menuCategories for tab list (all categories including coming-soon)
  const activeCategory = menuCategories.find((c) => c.id === activeTab)

  return (
    <section id="cakes" className="py-20 bg-cream-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-berry/5 border border-berry/10 rounded-full">
            <Sparkles size={14} className="text-berry" />
            <span className="text-xs font-medium text-berry tracking-widest uppercase">
              Our Menu
            </span>
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl">Handcrafted</span> with Love
          </h2>
          <p className="fade-up text-chocolate-light/60 max-w-2xl mx-auto leading-relaxed">
            From 21 cheesecake flavours to fresh-baked cookies, creamy dessert cups and refreshing drinks —
            everything is made to order using premium ingredients.
          </p>
        </div>

        {/* Featured Hero Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {featuredItems.map((item, i) => (
            <FeaturedCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Full Menu Title */}
        <div className="text-center mb-10 fade-up">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-chocolate mb-2">
            Full Menu
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-berry to-gold mx-auto" />
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 scrollbar-hide fade-up -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 px-5 sm:px-7 py-2.5 rounded-full font-medium text-sm transition-all duration-500 whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-chocolate text-cream shadow-xl shadow-chocolate/15 scale-105'
                  : 'bg-white text-chocolate-light border border-chocolate/8 hover:border-chocolate/20 hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div key={activeTab} className="tab-content-enter">
          {activeCategory && <CategoryContent category={activeCategory} />}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-up">
          <p className="text-chocolate-light/50 mb-5 text-sm">
            Can't find what you want? We love custom orders.
          </p>
          <a
            href="https://instagram.com/cake_and_crumb_1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-berry/5 text-berry font-medium px-6 py-3 rounded-full hover:bg-berry hover:text-white transition-all duration-500"
          >
            DM us on Instagram to Customise
            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </section>
  )
}
