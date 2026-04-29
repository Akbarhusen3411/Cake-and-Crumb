import { useState, useMemo } from 'react'
import { Sparkles, MessageCircle, ExternalLink, ChevronRight, Clock, Plus, Star, Search, X, Quote } from 'lucide-react'
import { menuCategories } from '../data/cakes'
import { getProductsByCategory, productCategories, cheesecakeSubgroups, products } from '../data/products'
import useCartStore from '../store/useCartStore'
import useToastStore from '../store/useToastStore'
import QuantitySelector from './ui/QuantitySelector'
import useReviews, { getProductReviews, getAverageRating } from '../hooks/useReviews'
import { WHATSAPP_URL } from '../config/constants'

const SHOP_CATEGORY_IDS = productCategories.map((c) => c.id)

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  } catch { return '' }
}

/* ─── Review Badge with hover popup (2-3 reviews) + click to reviews page ─── */
function ReviewBadge({ count, avg, productReviews, productName }) {
  if (!count) return null
  const topReviews = (productReviews || []).slice(0, 3)
  return (
    <div className="absolute bottom-2 left-2 z-[2] group/badge">
      <a
        href={`#/reviews?product=${encodeURIComponent(productName)}`}
        className="bg-white/90 backdrop-blur-sm text-chocolate text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm cursor-pointer hover:bg-white transition-colors"
      >
        <Star size={10} className="fill-gold text-gold" />
        {avg} <span className="font-normal text-chocolate-light/50">({count})</span>
      </a>
      {topReviews.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-56 sm:w-64 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-chocolate/8 p-3 opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 z-[3]">
          <div className="space-y-2.5">
            {topReviews.map((review, i) => (
              <div key={i} className={i > 0 ? 'pt-2.5 border-t border-cream-dark/15' : ''}>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: Number(review.rating) }).map((_, j) => (
                    <Star key={j} size={9} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[11px] text-chocolate-light/70 leading-relaxed line-clamp-2">"{review.text}"</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-medium text-chocolate">— {review.name}</span>
                  {review.date && <span className="text-[10px] text-chocolate-light/55">{formatDate(review.date)}</span>}
                </div>
              </div>
            ))}
          </div>
          {count > 3 && (
            <a
              href={`#/reviews?product=${encodeURIComponent(productName)}`}
              className="block text-center text-[10px] font-semibold text-berry mt-2.5 pt-2 border-t border-cream-dark/15 hover:underline"
            >
              See all {count} reviews →
            </a>
          )}
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-r border-b border-chocolate/8 rotate-45" />
        </div>
      )}
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
    <div
      className={`product-card group/card bg-white rounded-2xl overflow-hidden relative transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-chocolate/12 ${
        product.isBestseller
          ? 'border border-gold/35 shadow-md shadow-gold/10 ring-1 ring-gold/15'
          : 'border border-chocolate/6 shadow-sm'
      } ${!product.inStock ? 'opacity-50' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[900ms] ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/25 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        {product.isBestseller && (
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-br from-gold to-[#B8915F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-gold/25 ring-1 ring-white/30">
            <Sparkles size={10} className="fill-white" /> Best
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-xs font-bold text-berry bg-white border border-berry/20 px-4 py-1.5 rounded-full shadow-sm">Out of Stock</span>
          </div>
        )}
        <ReviewBadge count={productReviews.length} avg={avgRating} productReviews={productReviews} productName={product.shortName} />
      </div>

      {/* Caption — left-aligned bakery-template style */}
      <div className="px-4 pt-4 pb-4">
        <h4 className="font-heading text-base sm:text-lg font-bold text-chocolate leading-tight truncate">
          {product.shortName}
        </h4>
        <p className="text-[10px] text-chocolate-light/55 italic mt-0.5 truncate">
          {product.description}
        </p>
        <p className="text-[13px] sm:text-sm text-chocolate font-semibold mt-2 tabular-nums">
          ₹{product.price}
          <span className="text-[11px] text-chocolate-light/55 font-normal italic"> / {product.unit}</span>
        </p>

        <div className="mt-3">
          {!product.inStock ? (
            <button disabled className="px-4 py-2 rounded-full bg-cream text-chocolate-light/30 text-[10px] font-bold tracking-[0.18em] uppercase cursor-not-allowed">
              Unavailable
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={handleAdd}
              aria-label={`Add ${product.shortName} to cart`}
              className="btn-ripple group/add inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-soft-pink text-chocolate text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-berry hover:text-white active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-berry/20"
            >
              <Plus size={10} className="group-hover/add:rotate-90 transition-transform duration-300" />
              Add to Cart
            </button>
          ) : (
            <div className="count-animate">
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

  // Show the lower (slice) price as the headline; banto is the upgrade
  const displayPrice = sliceProduct?.price || bantoProduct?.price

  return (
    <div
      className={`product-card group/card bg-white rounded-2xl overflow-hidden relative transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-chocolate/12 ${
        product.isBestseller
          ? 'border border-gold/35 shadow-md shadow-gold/10 ring-1 ring-gold/15'
          : 'border border-chocolate/6 shadow-sm'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.shortName}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[900ms] ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/25 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        {product.isBestseller && (
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-br from-gold to-[#B8915F] text-white text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-gold/25 ring-1 ring-white/30">
            <Sparkles size={10} className="fill-white" /> Best
          </span>
        )}
        <ReviewBadge count={productReviews.length} avg={avgRating} productReviews={productReviews} productName={product.shortName} />
      </div>

      {/* Info — left-aligned bakery-template style */}
      <div className="px-4 pt-4 pb-4">
        <h4 className="font-heading text-base sm:text-lg font-bold text-chocolate leading-tight truncate">
          {sliceProduct?.shortName || bantoProduct?.shortName}
        </h4>
        <p className="text-[10px] text-chocolate-light/55 italic mt-0.5">
          Cheesecake · slice & banto
        </p>
        <p className="text-[13px] sm:text-sm text-chocolate font-semibold mt-2 tabular-nums">
          ₹{displayPrice}
          <span className="text-[11px] text-chocolate-light/55 font-normal italic"> / slice</span>
        </p>

        {/* Two compact add buttons — left-aligned, soft-pink primary */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {sliceProduct && (
            sliceQty === 0 ? (
              <button
                onClick={() => { addItem(sliceProduct.id); addToast(`${sliceProduct.shortName} slice added!`) }}
                className="group/add inline-flex items-center gap-1 px-3 py-2 rounded-full bg-soft-pink text-chocolate text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-berry hover:text-white active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-berry/20"
                aria-label="Add slice"
              >
                <Plus size={10} className="group-hover/add:rotate-90 transition-transform duration-300" />
                Slice ₹{sliceProduct.price}
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
            )
          )}
          {bantoProduct && (
            bantoQty === 0 ? (
              <button
                onClick={() => { addItem(bantoProduct.id); addToast(`${bantoProduct.shortName} added!`) }}
                className="group/add inline-flex items-center gap-1 px-3 py-2 rounded-full bg-gold/15 border border-gold/40 text-chocolate text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-gold hover:text-white hover:border-gold active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-gold/20"
                aria-label="Add banto cake"
              >
                <Sparkles size={9} className="group-hover/add:text-white" />
                Banto ₹{bantoProduct.price}
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
            )
          )}
        </div>
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
          <div key={subgroup.id} className="mb-12 cheesecake-subgroup">
            {/* Subgroup Header — refined */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className={`text-sm leading-none ${subgroup.id === 'premium' ? 'text-gold' : 'text-berry'}`}>✦</span>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-chocolate tracking-tight">
                  {subgroup.label}
                </h4>
                <span className="text-[10px] font-semibold text-chocolate-light/55 tracking-[0.2em] uppercase italic">
                  {subgroup.label === 'Premium' ? 'Limited' : 'Collection'}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 via-chocolate/10 to-transparent" />
            </div>

            {/* Flavour Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 card-grid">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 card-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} reviews={reviews} />
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
    <section id="cakes" className="py-20 bg-gradient-to-b from-cream-light to-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="fade-up flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/60" />
            <span className="text-[10px] sm:text-xs font-semibold text-berry tracking-[0.3em] uppercase">
              Our Menu
            </span>
            <span className="w-8 h-px bg-gold/60" />
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate leading-tight">
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl">Handcrafted</span> with Love
          </h2>
          <div className="fade-up mx-auto mt-5 w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="fade-up text-chocolate-light/60 max-w-2xl mx-auto leading-relaxed mt-5 text-sm sm:text-base">
            From 23 cheesecake flavours to fresh-baked cookies, creamy dessert cups and refreshing drinks —
            everything is made to order using premium ingredients.
          </p>
        </div>

        {/* Full Menu Title */}
        <div className="text-center mb-10 fade-up">
          <h3 className="font-script text-3xl sm:text-4xl text-chocolate leading-none">
            Full Menu
          </h3>
          <div className="mt-3 mx-auto w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Search Bar — gold accented */}
        <div className="max-w-md mx-auto mb-10 fade-up">
          <div className="relative group">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gold transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu… try Nutella, Biscoff, Mojito"
              className="w-full bg-white border border-gold/25 rounded-full pl-12 pr-11 py-3.5 text-sm text-chocolate placeholder:text-chocolate-light/55 italic focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 hover:border-gold/40 shadow-sm focus:shadow-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream-dark/30 flex items-center justify-center text-chocolate-light/60 hover:bg-chocolate hover:text-cream transition-all"
              >
                <X size={13} />
              </button>
            )}
          </div>
          {searchResults && (
            <p className="text-xs text-chocolate-light/50 text-center mt-3 italic">
              {searchResults.length === 0
                ? 'No items found — try a different term'
                : `${searchResults.length} ${searchResults.length === 1 ? 'delicious item' : 'delicious items'} found`}
            </p>
          )}
        </div>

        {/* Search Results OR Category View */}
        {searchResults ? (
          <div className="mb-10">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 card-grid">
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
                  ? 'bg-gradient-to-br from-chocolate to-chocolate-light text-cream shadow-xl shadow-chocolate/25 ring-2 ring-gold/40 scale-105'
                  : 'bg-white text-chocolate-light border border-gold/20 hover:border-gold/50 hover:shadow-md hover:text-chocolate'
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
