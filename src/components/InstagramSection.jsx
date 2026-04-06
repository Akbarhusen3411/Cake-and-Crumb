import { Instagram, ExternalLink, Sparkles, Heart } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

const INSTAGRAM_URL = 'https://instagram.com/cake.and.crumb_1'

const img = (p) => assetUrl(p)

// Row 1 — scrolls left
const row1 = [
  { src: img('/images/real-cupcakes-pink.jpg'), alt: 'Pink & Purple Cupcakes' },
  { src: img('/images/real-strawberry-cheesecake.jpg'), alt: 'Strawberry Cheesecake' },
  { src: img('/images/real-rose-eclairs.jpg'), alt: 'Rose Pistachio Eclairs' },
  { src: img('/images/real-chocolate-cake.jpg'), alt: 'Rich Chocolate Cake' },
  { src: img('/images/real-thankyou-cupcakes.jpg'), alt: 'Thank You Cupcakes Box' },
  { src: img('/images/real-biscoff-cups.jpg'), alt: 'Biscoff Dessert Cups' },
  { src: img('/images/real-lemon-cheesecake.jpg'), alt: 'Lemon Drip Cheesecake' },
  { src: img('/images/real-mint-cupcakes.jpg'), alt: 'Mint Cupcakes with Gold Leaf' },
]

// Row 2 — scrolls right (reverse)
const row2 = [
  { src: img('/images/real-cupcakes-rose-box.jpg'), alt: 'Rose Cupcakes Gift Box' },
  { src: img('/images/real-triple-choc-cookies.jpg'), alt: 'Triple Chocolate Cookies' },
  { src: img('/images/real-crepes.jpg'), alt: 'Chocolate Berry Crepes' },
  { src: img('/images/real-pistachio-biscuits.jpg'), alt: 'Pistachio Rose Biscuits' },
  { src: img('/images/real-tiramisu.jpg'), alt: 'Classic Tiramisu' },
  { src: img('/images/real-brownies.jpg'), alt: 'Fudgy Brownies' },
  { src: img('/images/real-cream-horns.jpg'), alt: 'Cream Horns' },
  { src: img('/images/real-strawberry-slices.jpg'), alt: 'Strawberry Cream Slices' },
]

function MarqueeRow({ images, reverse = false }) {
  // Duplicate the array for seamless loop
  const doubled = [...images, ...images]

  return (
    <div className="relative overflow-hidden group/row">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-3 sm:gap-4 ${reverse ? 'insta-scroll-reverse' : 'insta-scroll'} group-hover/row:[animation-play-state:paused]`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((img, i) => (
          <a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shrink-0"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-4">
              <Heart size={20} className="text-white mb-1.5 animate-bounce" />
              <span className="flex items-center gap-1.5 text-white text-xs font-medium">
                <Instagram size={14} />
                View on Instagram
              </span>
            </div>
            {/* Subtle bottom gradient always visible */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function InstagramSection() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden wave-divider">
      {/* Background blurs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-soft-pink/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-[100px]" />

      {/* Header — contained */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full">
            <Instagram size={14} className="text-purple-500" />
            <span className="text-xs font-medium text-purple-600 tracking-widest uppercase">
              Follow Our Journey
            </span>
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
            @cake.and.crumb_1
          </h2>
          <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto leading-relaxed text-sm">
            Fresh bakes, behind-the-scenes, and your orders — all on our Instagram.
            Follow us for daily temptation.
          </p>
        </div>
      </div>

      {/* Scrolling Rows — full width, edge to edge */}
      <div className="relative space-y-3 sm:space-y-4 mb-14">
        <MarqueeRow images={row1} />
        <MarqueeRow images={row2} reverse />
      </div>

      {/* CTA — contained */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-up">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-1 transition-all duration-500"
          >
            <Instagram size={18} />
            Follow @cake.and.crumb_1
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
          </a>
          <p className="text-sm text-chocolate-light/45 mt-4">
            DM us on Instagram to place your order or customise your cake
          </p>
        </div>
      </div>
    </section>
  )
}
