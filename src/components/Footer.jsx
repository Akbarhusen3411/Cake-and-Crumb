import { Link } from 'react-router-dom'
import { Instagram, Phone, MessageCircle, Heart, ArrowUp } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

const INSTAGRAM_URL = 'https://instagram.com/cake_and_crumb_1'
const WHATSAPP_URL = 'https://wa.me/919081668490'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'About Us', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-cream border-t border-chocolate/5 relative overflow-hidden">
      {/* Marquee Ticker */}
      <div className="bg-chocolate overflow-hidden py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex shrink-0">
              {['Cheesecakes', 'Cookies', 'Milk Cakes', 'Dessert Cups', 'Brownies', 'Mojitos', 'Milkshakes', 'Custom Cakes', 'Cupcakes', 'Cakesicles'].map((item) => (
                <span key={`${setIdx}-${item}`} className="flex items-center gap-3 mx-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-heading text-sm text-cream/70 tracking-wider">{item}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-soft-pink/20 rounded-full blur-[60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={assetUrl('/images/logo.png')}
                alt="Cake & Crumb"
                className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-gold/20"
              />
              <div>
                <span className="font-script text-2xl text-chocolate block">
                  Cake <span className="text-berry">&</span> Crumb
                </span>
              </div>
            </div>
            <p className="font-heading text-sm text-chocolate-light/60 italic mb-4">
              The Gourmet Chocolate & Berry Boutique
            </p>
            <p className="text-sm text-chocolate-light/50 leading-relaxed">
              Handcrafted premium cakes in Ahmedabad. Made fresh, made with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-chocolate mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-chocolate-light/50 hover:text-berry transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-chocolate mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919081668490" className="flex items-center gap-2.5 text-sm text-chocolate-light/50 hover:text-berry transition-colors duration-300">
                  <Phone size={14} />
                  +91 90816 68490
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-chocolate-light/50 hover:text-green-600 transition-colors duration-300">
                  <MessageCircle size={14} />
                  WhatsApp Order
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-chocolate-light/50 hover:text-pink-500 transition-colors duration-300">
                  <Instagram size={14} />
                  @cake_and_crumb_1
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-base font-semibold text-chocolate mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-chocolate/5 flex items-center justify-center text-chocolate hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/15 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-chocolate/5 flex items-center justify-center text-chocolate hover:bg-green-500 hover:text-white transition-all duration-500 hover:shadow-lg hover:shadow-green-500/15 hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:+919081668490"
                className="w-10 h-10 rounded-xl bg-chocolate/5 flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-cream transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
            <p className="text-xs text-chocolate-light/35">
              Ahmedabad, Gujarat, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-chocolate/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-chocolate-light/35 flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Cake & Crumb. Baked with
            <Heart size={12} className="text-berry fill-berry" />
            in Ahmedabad.
          </p>
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-xl bg-chocolate/5 flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-cream transition-all duration-500 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}
