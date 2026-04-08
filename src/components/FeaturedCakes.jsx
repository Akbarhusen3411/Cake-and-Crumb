import { useState, useMemo } from 'react'
import { Sparkles, MessageCircle, ExternalLink, ChevronRight, Clock, Plus, Star, Search, X, Quote } from 'lucide-react'
import { menuCategories, featuredItems } from '../data/cakes'
import { getProductsByCategory, productCategories, cheesecakeSubgroups, products } from '../data/products'
import useCartStore from '../store/useCartStore'
import useToastStore from '../store/useToastStore'
import QuantitySelector from './ui/QuantitySelector'
import useReviews, { getProductReviews, getAverageRating } from '../hooks/useReviews'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi!%20I%27d%20like%20to%20order%20from%20Cake%20%26%20Crumb.'

const SHOP_CATEGORY_IDS = productCategories.map((c) => c.id)

/* ─── Featured Hero Cards ─── */
function FeaturedCard({ item, index, onNavigate }) {
  const categoryMap = { 1: 'cheesecake', 2: 'cookies', 3: 'desserts' }
  return (
    <div
      onClick={() => onNavigate?.(categoryMap[item.id])}
      className="fade-up group relative bg-white rounded-2xl overflow-hidden card-hover cursor-pointer"
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

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  } catch { return '' }
}

/* ─── Review Badge with hover tooltip ─── */
function ReviewBadge({ count, avg, latestReview }) {
  if (!count) return null
  return (
    <div className="absolute bottom-2 left-2 z-[2] group/badge">
      <span className="bg-white/90 backdrop-blur-sm text-chocolate text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm cursor-pointer">
        <Star size={10} className="fill-gold text-gold" />
        {avg} <span className="font-normal text-chocolate-light/50">({count})</span>
      </span>
      {latestReview && (
        <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-xl border border-chocolate/8 p-3 opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 pointer-events-none z-[3]">
          <div className="flex gap-0.5 mb-1.5">
            {Array.from({ length: Number(latestReview.rating) }).map((_, j) => (
              <Star key={j} size={10} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="text-xs text-chocolate-light/70 leading-relaxed line-clamp-3">"{latestReview.text}"</p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-dark/20">
            <span className="text-[10px] font-medium text-chocolate">— {latestReview.name}</span>
            {latestReview.date && <span className="text-[10px] text-chocolate-light/40">{formatDate(latestReview.date)}</span>}
          </div>
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-r border-b border-chocolate/8 rotate-45" />
        </div>
      )}
    </div>
  )
}

/* ─── Product Reviews Section (below product grid) ─── */
function ProductReviewsSection({ reviews, categoryProducts }) {
  // Get reviews that match any product in this category
  const categoryReviews = useMemo(() => {
    if (!reviews.length || !categoryProducts.length) return []
    const names = new Set(categoryProducts.map((p) => p.shortName.toLowerCase()))
    return reviews.filter((r) => r.product && names.has(r.product.toLowerCase()))
  }, [reviews, categoryProducts])

  if (!categoryReviews.length) return null

  return (
    <div className="mt-8 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Star size={16} className="text-gold fill-gold" />
        <h4 className="font-heading text-base font-bold text-chocolate">Customer Reviews</h4>
        <span className="text-xs text-chocolate-light/40">({categoryReviews.length})</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categoryReviews.map((review, i) => (
          <div key={i} className="shrink-0 w-[280px] sm:w-[300px] bg-white rounded-xl border border-chocolate/5 overflow-hidden">
            {review.photo && (
              <div className="w-full h-40 overflow-hidden">
                <img src={review.photo} alt={`Review by ${review.name}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-berry bg-berry/5 px-2 py-0.5 rounded-full">{review.product}</span>
              </div>
              <div className="flex gap-0.5 my-2">
                {Array.from({ length: Number(review.rating) }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-chocolate-light/70 leading-relaxed line-clamp-3">"{review.text}"</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cream-dark/20">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-soft-pink to-cream-dark flex items-center justify-center">
                  <span className="font-heading text-xs font-bold text-berry">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-chocolate">{review.name}</p>
                  {review.date && (
                    <p className="text-[10px] text-chocolate-light/40">{formatDate(review.date)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Product Card (shoppable) ─── */
function ProductCard({ product, reviews }) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const quantity = useCartStore((s) => {
    const item = s.items.find((i) => i.productId === product.id)
    return item ? item.quantity : 0
  })
  const addToast = useToastStore((s) => s.addToast)

  const productReviews = useMemo(() => getProductReviews(reviews || [], product.shortName), [reviews, product.shortName])
  const avgRating = getAverageRating(productReviews)

  const handleAdd = () => {
    addItem(product.id)
    addToast(`${product.shortName} added to cart!`)
  }

  return (
    <div className={`product-card bg-white rounded-xl sm:rounded-xl overflow-hidden border border-chocolate/5 relative ${!product.inStock ? 'opacity-50' : ''}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-cream group">
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
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-xs font-bold text-berry bg-white border border-berry/20 px-4 py-1.5 rounded-full shadow-sm">Out of Stock</span>
          </div>
        )}
        <ReviewBadge count={productReviews.length} avg={avgRating} latestReview={productReviews[0]} />
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

/* ─── Cheesecake Flavour Card (shows both Slice & Banto in one card) ─── */
function CheesecakeFlavourCard({ sliceProduct, bantoProduct, reviews }) {
  const product = sliceProduct || bantoProduct
  const productReviews = useMemo(() => getProductReviews(reviews || [], product.shortName), [reviews, product.shortName])
  const avgRating = getAverageRating(productReviews)
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const sliceQty = useCartStore((s) => {
    if (!sliceProduct) return 0
    const item = s.items.find((i) => i.productId === sliceProduct.id)
    return item ? item.quantity : 0
  })
  const bantoQty = useCartStore((s) => {
    if (!bantoProduct) return 0
    const item = s.items.find((i) => i.productId === bantoProduct.id)
    return item ? item.quantity : 0
  })
  const addToast = useToastStore((s) => s.addToast)

  return (
    <div className="product-card bg-white rounded-xl sm:rounded-xl overflow-hidden border border-chocolate/5 relative">
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-[4/3] md:aspect-square overflow-hidden bg-cream group">
        <img
          src={product.image}
          alt={product.shortName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-sm">
            <Star size={9} fill="currentColor" /> Best
          </span>
        )}
        <ReviewBadge count={productReviews.length} avg={avgRating} latestReview={productReviews[0]} />
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
        <h4 className="text-[13px] sm:text-sm font-semibold text-chocolate truncate">{sliceProduct?.shortName || bantoProduct?.shortName}</h4>

        {/* Per Slice option */}
        {sliceProduct && (
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 bg-cream/40 rounded-lg px-2 py-1.5 sm:px-2.5 sm:py-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-medium text-chocolate/60 leading-tight">Per Slice</p>
              <p className="text-[13px] sm:text-sm text-berry font-bold">₹{sliceProduct.price}</p>
            </div>
            <div className="shrink-0">
              {sliceQty === 0 ? (
                <button
                  onClick={() => { addItem(sliceProduct.id); addToast(`${sliceProduct.shortName} slice added!`) }}
                  className="btn-ripple btn-touch px-2.5 sm:px-3 py-1.5 rounded-lg bg-chocolate text-cream text-[10px] sm:text-[11px] font-medium hover:bg-chocolate-light transition-all duration-300 flex items-center gap-1 active:scale-95"
                >
                  <Plus size={10} /> Add
                </button>
              ) : (
                <QuantitySelector
                  quantity={sliceQty}
                  onIncrease={() => updateQuantity(sliceProduct.id, sliceQty + 1)}
                  onDecrease={() => {
                    updateQuantity(sliceProduct.id, sliceQty - 1)
                    if (sliceQty === 1) addToast(`${sliceProduct.shortName} slice removed`, 'info')
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
        )}

        {/* Banto Cake option */}
        {bantoProduct && (
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 bg-berry/[0.04] border border-berry/10 rounded-lg px-2 py-1.5 sm:px-2.5 sm:py-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-medium text-chocolate/60 leading-tight">Banto 4" · 3 slices</p>
              <p className="text-[9px] sm:text-[10px] text-chocolate-light/40 leading-tight">300–350 gm</p>
              <p className="text-[13px] sm:text-sm text-berry font-bold">₹{bantoProduct.price}</p>
            </div>
            <div className="shrink-0">
              {bantoQty === 0 ? (
                <button
                  onClick={() => { addItem(bantoProduct.id); addToast(`${bantoProduct.shortName} added!`) }}
                  className="btn-ripple btn-touch px-2.5 sm:px-3 py-1.5 rounded-lg bg-berry text-white text-[10px] sm:text-[11px] font-medium hover:bg-berry-light transition-all duration-300 flex items-center gap-1 active:scale-95"
                >
                  <Plus size={10} /> Add
                </button>
              ) : (
                <QuantitySelector
                  quantity={bantoQty}
                  onIncrease={() => updateQuantity(bantoProduct.id, bantoQty + 1)}
                  onDecrease={() => {
                    updateQuantity(bantoProduct.id, bantoQty - 1)
                    if (bantoQty === 1) addToast(`${bantoProduct.shortName} removed`, 'info')
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Cheesecake Content (grouped by Classic/Exotic/Chocolate/Premium) ─── */
function CheesecakeContent({ menuCat, reviews }) {
  const allProducts = getProductsByCategory('cheesecake')
  const slices = allProducts.filter((p) => p.subcategory === 'slice')
  const bantos = allProducts.filter((p) => p.subcategory === 'banto')

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

      {/* Subgroup Sections */}
      {cheesecakeSubgroups.map((subgroup) => {
        const groupSlices = slices.filter((p) => p.subgroup === subgroup.id)
        if (groupSlices.length === 0) return null

        // Build flavour pairs (slice + banto for same flavourKey)
        const flavours = groupSlices.map((slice) => {
          const banto = bantos.find((b) => b.flavourKey === slice.flavourKey)
          return { slice, banto }
        })

        return (
          <div key={subgroup.id} className="mb-10 cheesecake-subgroup">
            {/* Subgroup Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-berry text-sm">✦</span>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-chocolate">{subgroup.label}</h4>
              <div className="flex-1 h-px bg-chocolate/8" />
            </div>

            {/* Flavour Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {flavours.map(({ slice, banto }) => (
                <CheesecakeFlavourCard key={slice.flavourKey} sliceProduct={slice} bantoProduct={banto} reviews={reviews} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Note */}
      {menuCat?.note && (
        <p className="text-sm text-chocolate-light/50 italic text-center mt-6">{menuCat.note}</p>
      )}

      {/* Reviews for this category */}
      <ProductReviewsSection reviews={reviews} categoryProducts={allProducts} />
    </div>
  )
}

/* ─── Category Tab Content ─── */
function CategoryContent({ category, reviews }) {
  const isComingSoon = category.id === 'coming-soon'
  const isShoppable = SHOP_CATEGORY_IDS.includes(category.id)

  // Special cheesecake layout with subgroups
  if (category.id === 'cheesecake') {
    const menuCat = menuCategories.find((c) => c.id === 'cheesecake')
    return <CheesecakeContent menuCat={menuCat} reviews={reviews} />
  }

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} reviews={reviews} />
          ))}
        </div>

        {/* Note */}
        {menuCat?.note && (
          <p className="text-sm text-chocolate-light/50 italic text-center mt-6">{menuCat.note}</p>
        )}

        {/* Reviews for this category */}
        <ProductReviewsSection reviews={reviews} categoryProducts={categoryProducts} />
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
  const [searchQuery, setSearchQuery] = useState('')
  const { reviews } = useReviews()

  // Search results across all shoppable categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase()
    return products.filter((p) =>
      p.inStock && (
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    )
  }, [searchQuery])

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
            From 23 cheesecake flavours to fresh-baked cookies, creamy dessert cups and refreshing drinks —
            everything is made to order using premium ingredients.
          </p>
        </div>

        {/* Featured Hero Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {featuredItems.map((item, i) => (
            <FeaturedCard key={item.id} item={item} index={i} onNavigate={setActiveTab} />
          ))}
        </div>

        {/* Full Menu Title */}
        <div className="text-center mb-8 fade-up">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-chocolate mb-2">
            Full Menu
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-berry to-gold mx-auto" />
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 fade-up">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-light/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu... (e.g. Nutella, Biscoff, Mojito)"
              className="w-full bg-white border border-chocolate/8 rounded-full pl-11 pr-10 py-3 text-sm text-chocolate placeholder:text-chocolate-light/35 focus:outline-none focus:border-berry/30 focus:ring-2 focus:ring-berry/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate-light/50 hover:text-chocolate transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
          {searchResults && (
            <p className="text-xs text-chocolate-light/50 text-center mt-2">
              {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'} found
            </p>
          )}
        </div>

        {/* Search Results OR Category View */}
        {searchResults ? (
          <div className="mb-10">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} reviews={reviews} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-chocolate-light/50 text-sm">No items match your search. Try a different term.</p>
              </div>
            )}
          </div>
        ) : (
        <>
        {/* Category Tabs */}
        <div className="relative fade-up mb-10">
        <div className="sm:hidden absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-cream-light to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {menuCategories.filter((c) => c.id !== 'coming-soon').map((cat) => (
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
        </div>

        {/* Active Category Content */}
        <div key={activeTab} className="tab-content-enter">
          {activeCategory && <CategoryContent category={activeCategory} reviews={reviews} />}
        </div>

        {/* Coming Soon Banner */}
        {(() => {
          const comingSoon = menuCategories.find((c) => c.id === 'coming-soon')
          if (!comingSoon) return null
          return (
            <div className="mt-14 fade-up">
              <div className="bg-gradient-to-r from-gold/5 via-cream to-gold/5 border border-gold/15 rounded-2xl p-5 sm:p-8 coming-soon-banner">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-gold" />
                  <h4 className="font-heading text-base sm:text-lg font-bold text-chocolate">Coming Soon</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {comingSoon.items.map((item) => (
                    <span key={item} className="inline-block bg-white border border-chocolate/6 text-chocolate-light text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                      {item}
                    </span>
                  ))}
                </div>
                {comingSoon.note && (
                  <p className="text-xs text-chocolate-light/50 italic mt-4">{comingSoon.note}</p>
                )}
              </div>
            </div>
          )
        })()}

        {/* Bottom CTA */}
        <div className="text-center mt-10 fade-up">
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
        </>
        )}
      </div>
    </section>
  )
}
