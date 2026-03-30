import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Sparkles, Star } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-soft-pink/30 to-cream-light" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(248,232,224,0.8)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,165,116,0.15)_0%,transparent_50%)]" />

      {/* Animated floating shapes */}
      <div className="absolute top-[15%] right-[8%] w-80 h-80 bg-soft-pink/30 rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-gold/10 rounded-full blur-[100px] animate-float-reverse" />
      <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-berry/5 rounded-full blur-[60px] animate-float" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 mb-7 px-4 py-2 bg-chocolate/5 border border-chocolate/10 rounded-full transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-medium text-chocolate-light tracking-widest uppercase">
                Handcrafted in Ahmedabad
              </span>
            </div>

            <h1
              className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-chocolate leading-[1.15] mb-4 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <span className="font-script text-4xl sm:text-5xl lg:text-6xl">Cake</span> <span className="text-gradient">&</span> <span className="font-script text-4xl sm:text-5xl lg:text-6xl">Crumb</span>
            </h1>

            <p
              className={`font-heading text-base sm:text-lg lg:text-xl text-chocolate-light/80 italic mb-3 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              The Gourmet Chocolate & Berry Boutique
            </p>

            <div
              className={`w-16 h-[2px] bg-gradient-to-r from-berry to-gold mx-auto lg:mx-0 mb-6 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            />

            <p
              className={`text-sm sm:text-base text-chocolate-light/70 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Small-batch, handcrafted cakes made with premium chocolate and the freshest seasonal
              berries. Every creation is made to order — limited daily, so each one stays special.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer btn-glow group inline-flex items-center justify-center gap-2 bg-chocolate text-cream px-7 py-3 rounded-full font-medium text-sm hover:bg-chocolate-light transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                <ShoppingBag size={18} />
                Order Now
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-500" />
              </a>
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-2 border-2 border-chocolate/15 text-chocolate px-7 py-3 rounded-full font-medium text-sm hover:border-berry/40 hover:text-berry hover:bg-berry/5 transition-all duration-500"
              >
                View Menu
                <Star size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div
              className={`flex flex-wrap gap-8 mt-12 justify-center lg:justify-start transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {[
                { label: 'Fresh Daily', icon: '~' },
                { label: 'Made to Order', icon: '~' },
                { label: 'Premium Ingredients', icon: '~' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2.5 text-sm text-chocolate-light/60">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-berry to-gold" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Composition */}
          <div
            className={`relative transition-all duration-1200 delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background decorative ring */}
              <div className="absolute inset-0 -m-8 rounded-full border border-chocolate/5 animate-[spin_30s_linear_infinite]" />

              {/* Main image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] group" data-parallax="0.06">
                <img
                  src={assetUrl('/images/strawberry-cheesecake.jpg')}
                  alt="Strawberry Cheesecake by Cake & Crumb"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/25 via-transparent to-cream/10" />
              </div>

              {/* Floating secondary image - top right */}
              <div
                className="absolute -top-6 -right-6 lg:-right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl animate-float hidden sm:block"
                data-parallax="-0.1"
              >
                <img
                  src={assetUrl('/images/real-mint-cupcakes.jpg')}
                  alt="Mint cupcakes with gold leaf"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 to-transparent" />
              </div>

              {/* Floating secondary image - bottom left */}
              <div
                className="absolute -bottom-4 -left-6 lg:-left-10 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl animate-float-reverse hidden sm:block"
                data-parallax="-0.08"
              >
                <img
                  src={assetUrl('/images/real-biscoff-cups.jpg')}
                  alt="Biscoff dessert cups"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 to-transparent" />
              </div>

              {/* Glass card - Limited Daily */}
              <div
                className="absolute bottom-8 -left-4 sm:-left-12 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-white/50 animate-float-slow"
              >
                <p className="font-heading text-sm font-bold text-chocolate">Limited Daily</p>
                <p className="text-[10px] text-chocolate-light/60">Only a few cakes each day</p>
              </div>

              {/* Price badge */}
              <div className="absolute -top-3 right-8 sm:right-16 bg-berry text-white px-4 py-2 rounded-full shadow-xl animate-float-reverse badge-glow">
                <p className="text-xs font-semibold">From ₹55</p>
              </div>

              {/* Rating badge */}
              <div className="absolute top-[40%] -right-2 sm:-right-6 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 hidden sm:block animate-float">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[10px] text-chocolate-light/60 font-medium">Loved by 500+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-light to-transparent" />
    </section>
  )
}
