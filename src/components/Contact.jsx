import { useState } from 'react'
import { Phone, Instagram, MessageCircle, MapPin, Send, Clock, ArrowUpRight, Sparkles, CheckCircle, Heart } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/919081668490?text=Hi%20Cake%20%26%20Crumb!%20I%27d%20like%20to%20place%20an%20order.'
const INSTAGRAM_URL = 'https://instagram.com/cake_and_crumb_1'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hi! I'm ${formData.name}. ${formData.message} (Phone: ${formData.phone})`
    window.open(`https://wa.me/919081668490?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background — warm cream with subtle accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-light via-cream to-soft-pink/40" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-berry/5 rounded-full blur-[120px]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3E2723 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-berry/5 border border-berry/10 rounded-full">
            <Sparkles size={14} className="text-berry" />
            <span className="text-xs font-medium text-berry tracking-widest uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
            Let's Create Something
            <span className="block text-gradient">Sweet Together</span>
          </h2>
          <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto text-sm leading-relaxed">
            Reach out via WhatsApp for the fastest response, or DM us on Instagram.
          </p>
        </div>

        {/* Contact Icons with Details — simple inline row */}
        <div className="fade-up flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-14 mb-14">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:-translate-y-1 transition-all duration-400">
            <div className="w-11 h-11 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-all duration-400 group-hover:shadow-lg group-hover:shadow-green-500/20">
              <MessageCircle size={20} className="text-green-600 group-hover:text-white transition-colors duration-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-chocolate leading-tight">WhatsApp</p>
              <p className="text-xs text-chocolate-light/50">Fastest reply</p>
            </div>
          </a>

          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:-translate-y-1 transition-all duration-400">
            <div className="w-11 h-11 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-400 group-hover:shadow-lg group-hover:shadow-pink-500/20">
              <Instagram size={20} className="text-pink-600 group-hover:text-white transition-colors duration-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-chocolate leading-tight">Instagram</p>
              <p className="text-xs text-chocolate-light/50">@cake_and_crumb_1</p>
            </div>
          </a>

          <a href="tel:+919081668490" className="group flex items-center gap-3 hover:-translate-y-1 transition-all duration-400">
            <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-all duration-400 group-hover:shadow-lg group-hover:shadow-gold/20">
              <Phone size={20} className="text-gold group-hover:text-white transition-colors duration-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-chocolate leading-tight">Call Us</p>
              <p className="text-xs text-chocolate-light/50">+91 90816 68490</p>
            </div>
          </a>

          <a href="tel:+919173183440" className="group flex items-center gap-3 hover:-translate-y-1 transition-all duration-400">
            <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-all duration-400 group-hover:shadow-lg group-hover:shadow-gold/20">
              <Phone size={20} className="text-gold group-hover:text-white transition-colors duration-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-chocolate leading-tight">Alternate</p>
              <p className="text-xs text-chocolate-light/50">+91 91731 83440</p>
            </div>
          </a>
        </div>

        {/* Bottom Section — Info Strip + Form */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left — Info + Map-like visual */}
          <div className="fade-up space-y-6">
            {/* Info banner */}
            <div className="bg-white rounded-2xl border border-chocolate/5 overflow-hidden">
              <div className="bg-gradient-to-r from-chocolate to-chocolate-light p-5">
                <h3 className="font-heading text-base font-semibold text-cream mb-1">Order Information</h3>
                <p className="text-xs text-cream/60">Everything you need to know before ordering</p>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { icon: MapPin, label: 'Delivery Area', value: 'Ahmedabad, Gujarat, India', color: 'text-berry' },
                  { icon: Clock, label: 'Order Notice', value: 'Please order 24 hours in advance', color: 'text-gold' },
                  { icon: Heart, label: 'Custom Cakes', value: "DM us your vision — we'll bring it to life", color: 'text-pink-500' },
                  { icon: MessageCircle, label: 'WhatsApp (India)', value: '+91 90816 68490', color: 'text-green-500' },
                  { icon: MessageCircle, label: 'WhatsApp (UK)', value: '+44 7862 154461', color: 'text-green-500' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-cream flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={item.color} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-chocolate-light/50 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-chocolate font-medium">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick response badge */}
            <div className="flex items-center gap-6 px-5 py-4 bg-white rounded-2xl border border-chocolate/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-chocolate-light/70">We reply in minutes</span>
              </div>
              <div className="w-px h-4 bg-chocolate/10" />
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                <span className="text-xs font-medium text-chocolate-light/70">No spam, ever</span>
              </div>
              <div className="w-px h-4 bg-chocolate/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-berry" />
                <span className="text-xs font-medium text-chocolate-light/70">24hr advance</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="fade-up">
            <div className="bg-white rounded-2xl border border-chocolate/5 overflow-hidden">
              <div className="bg-gradient-to-r from-berry to-berry-light p-5">
                <h3 className="font-heading text-base font-semibold text-white mb-1">
                  Send Us a Message
                </h3>
                <p className="text-xs text-white/70">
                  Fill in the details — opens WhatsApp with your pre-filled message
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? 'top-1.5 text-[10px] text-berry font-medium'
                        : 'top-3 text-sm text-chocolate-light/35'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream/50 border border-chocolate/8 rounded-xl px-4 pt-5 pb-2 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'phone' || formData.phone
                        ? 'top-1.5 text-[10px] text-berry font-medium'
                        : 'top-3 text-sm text-chocolate-light/35'
                    }`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream/50 border border-chocolate/8 rounded-xl px-4 pt-5 pb-2 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? 'top-1.5 text-[10px] text-berry font-medium'
                      : 'top-3 text-sm text-chocolate-light/35'
                  }`}>
                    Cake type, occasion, date...
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-cream/50 border border-chocolate/8 rounded-xl px-4 pt-6 pb-3 text-chocolate text-sm focus:outline-none focus:border-berry/30 focus:bg-cream/80 focus:ring-2 focus:ring-berry/10 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitted}
                  className={`btn-shimmer w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-medium text-sm transition-all duration-500 ${
                    submitted
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                      : 'bg-gradient-to-r from-chocolate via-chocolate-light to-chocolate text-cream hover:shadow-xl hover:shadow-chocolate/20 hover:-translate-y-0.5'
                  }`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={18} />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send via WhatsApp
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
