import { Instagram, ExternalLink, Sparkles } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import { INSTAGRAM_URL } from '../config/constants'

const galleryItems = [
  { src: assetUrl('/images/real-strawberry-cheesecake.jpg'), alt: 'Strawberry Cheesecake' },
  { src: assetUrl('/images/real-cupcakes-pink.jpg'),         alt: 'Pink Strawberry Cupcakes' },
  { src: assetUrl('/images/real-chocolate-cake.jpg'),        alt: 'Rich Chocolate Cake' },
  { src: assetUrl('/images/real-rose-eclairs.jpg'),          alt: 'Rose Pistachio Eclairs' },
  { src: assetUrl('/images/real-biscoff-cups.jpg'),          alt: 'Biscoff Dessert Cups' },
  { src: assetUrl('/images/real-lemon-cheesecake.jpg'),      alt: 'Lemon Drip Cheesecake' },
  { src: assetUrl('/images/real-mint-cupcakes.jpg'),         alt: 'Mint Cupcakes with Gold Leaf' },
  { src: assetUrl('/images/real-thankyou-cupcakes.jpg'),     alt: 'Thank You Cupcakes Box' },
  { src: assetUrl('/images/real-cupcakes-rose-box.jpg'),     alt: 'Rose Cupcakes Gift Box' },
  { src: assetUrl('/images/real-cupcakes-boxes.jpg'),        alt: 'Cupcake Gift Boxes' },
  { src: assetUrl('/images/real-cakesicles.jpg'),            alt: 'Cakesicles' },
  { src: assetUrl('/images/real-cheesecake-top.jpg'),        alt: 'Cheesecake Top View' },
  { src: assetUrl('/images/real-chocolate-pancakes.jpg'),    alt: 'Chocolate Pancakes' },
  { src: assetUrl('/images/real-crepes.jpg'),                alt: 'Chocolate Berry Crepes' },
  { src: assetUrl('/images/real-tiramisu.jpg'),              alt: 'Classic Tiramisu' },
  { src: assetUrl('/images/real-brownies.jpg'),              alt: 'Fudgy Brownies' },
  { src: assetUrl('/images/real-cream-horns.jpg'),           alt: 'Cream Horns' },
  { src: assetUrl('/images/real-strawberry-slices.jpg'),     alt: 'Strawberry Cream Slices' },
  { src: assetUrl('/images/real-pistachio-biscuits.jpg'),    alt: 'Pistachio Rose Biscuits' },
  { src: assetUrl('/images/real-triple-choc-cookies.jpg'),   alt: 'Triple Chocolate Cookies' },
  { src: assetUrl('/images/real-rose-milkcake.jpg'),         alt: 'Rose Milk Cake' },
  { src: assetUrl('/images/real-rose-milkcake-bulk.jpg'),    alt: 'Rose Milk Cake (whole)' },
]

// Split into two rows for opposing-direction marquees
const half = Math.ceil(galleryItems.length / 2)
const row1 = galleryItems.slice(0, half)
const row2 = galleryItems.slice(half)

function MarqueeRow({ items, reverse = false }) {
  // Duplicate the array twice for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden group/row">
      {/* Left/right fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-cream-dark via-cream-dark/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-cream-dark via-cream-dark/80 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-3 sm:gap-4 ${reverse ? 'gallery-marquee-reverse' : 'gallery-marquee'} group-hover/row:[animation-play-state:paused]`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${item.alt} on Instagram`}
            className="group/card relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shrink-0 ring-1 ring-gold/25 hover:ring-gold/70 shadow-md hover:shadow-2xl hover:shadow-chocolate/25 transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/85 via-chocolate/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            {/* Instagram icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 scale-75 group-hover/card:scale-100">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl ring-2 ring-white/40">
                <Instagram size={17} className="text-white" />
              </div>
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-5 translate-y-1 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500">
              <p className="text-[11px] text-white font-semibold leading-tight line-clamp-2 drop-shadow">{item.alt}</p>
            </div>
            {/* Subtle bottom gradient always visible */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function InstagramSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-br from-cream-dark via-[#E8D2B0] to-cream-dark">
      {/* Decorative ornaments */}
      <span className="absolute top-10 left-[5%] text-gold/30 text-3xl gallery-float pointer-events-none" aria-hidden="true">✦</span>
      <span className="absolute top-8 right-[8%] text-berry/20 text-2xl gallery-float-slow pointer-events-none" aria-hidden="true">✦</span>
      <span className="absolute bottom-12 right-[5%] text-gold/30 text-3xl gallery-float-reverse pointer-events-none" aria-hidden="true">✦</span>

      {/* Soft warm blurs */}
      <div className="absolute top-0 left-1/3 w-96 h-72 bg-soft-pink/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-72 bg-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header — contained */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="fade-up text-[10px] sm:text-xs font-semibold text-berry tracking-[0.3em] uppercase mb-3">
            Follow Our Journey
          </p>
          <h2 className="fade-up font-script text-4xl sm:text-5xl lg:text-6xl text-chocolate">
            Our <span className="text-gold">Gallery</span>
          </h2>
          <div className="fade-up mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold" />
            <Sparkles size={11} className="text-gold" />
            <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="fade-up text-sm text-chocolate-light/65 italic mt-4 max-w-md mx-auto">
            A glimpse into our daily creations — hover to pause, tap to view on Instagram.
          </p>
        </div>
      </div>

      {/* Marquee rows — full width, edge to edge */}
      <div className="relative space-y-3 sm:space-y-4 mb-10">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      {/* Follow CTA — contained */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-up">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:shadow-2xl hover:shadow-pink-500/35 hover:-translate-y-0.5 transition-all duration-500 ring-2 ring-white/20"
          >
            <Instagram size={18} />
            @cake_and_crumb_1
            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </a>
          <p className="text-xs text-chocolate-light/65 mt-4 italic">
            DM us on Instagram for custom orders & daily fresh bakes
          </p>
        </div>
      </div>
    </section>
  )
}
