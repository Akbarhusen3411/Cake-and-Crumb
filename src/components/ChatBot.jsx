import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'

const WHATSAPP_NUMBER = '919081668490'

// ─── Category images ───
const CAT_IMAGES = {
  cheesecake: [
    { src: '/images/real-strawberry-cheesecake.jpg', label: 'Strawberry' },
    { src: '/images/blueberry-cheesecake.jpg', label: 'Blueberry' },
    { src: '/images/chocolate-cake-rich.jpg', label: 'Chocolate' },
    { src: '/images/biscoff-cake.jpg', label: 'Biscoff' },
    { src: '/images/pistachio-dessert.jpg', label: 'Pistachio' },
    { src: '/images/caramel-dessert.jpg', label: 'Caramel' },
  ],
  cookies: [
    { src: '/images/real-triple-choc-cookies.jpg', label: 'Triple Choc' },
    { src: '/images/red-velvet-cookie.jpg', label: 'Red Velvet' },
    { src: '/images/real-pistachio-biscuits.jpg', label: 'Pistachio Rose' },
    { src: '/images/almond-cookie.jpg', label: 'Almond' },
  ],
  cakes: [
    { src: '/images/real-cupcakes-pink.jpg', label: 'Cupcakes' },
    { src: '/images/rose-cake.jpg', label: 'Rose Milk Cake' },
    { src: '/images/real-brownies.jpg', label: 'Brownies' },
    { src: '/images/real-cakesicles.jpg', label: 'Cakesicles' },
    { src: '/images/cake-pop.jpg', label: 'Cake Pops' },
  ],
  desserts: [
    { src: '/images/real-biscoff-cups.jpg', label: 'Cheesecake Cup' },
    { src: '/images/custard-cup.jpg', label: 'Custard Cup' },
    { src: '/images/trifle-cup.jpg', label: 'Trifle Cup' },
    { src: '/images/jelly-cup.jpg', label: 'Jelly Cup' },
  ],
  drinks: [
    { src: '/images/mojito-drink.jpg', label: 'Mojito' },
    { src: '/images/blue-lagoon.jpg', label: 'Blue Lagoon' },
    { src: '/images/milkshake-drink.jpg', label: 'Milkshake' },
    { src: '/images/iced-coffee.jpg', label: 'Iced Coffee' },
    { src: '/images/hot-coffee.jpg', label: 'Hot Coffee' },
  ],
}

// ─── Chat Flow Data ───
const MENU_DATA = {
  cheesecake: {
    title: 'Cheesecake',
    subtitle: '6" cake · 8 slices',
    groups: [
      { name: 'Classic', items: [
        { n: 'Strawberry', s: '₹90', w: '₹700' },
        { n: 'Blueberry', s: '₹90', w: '₹700' },
        { n: 'Raspberry', s: '₹90', w: '₹700' },
        { n: 'Cherry', s: '₹90', w: '₹700' },
        { n: 'Lemon', s: '₹90', w: '₹700' },
      ]},
      { name: 'Exotic', items: [
        { n: 'Mango', s: '₹100', w: '₹800' },
        { n: 'Passion Fruit', s: '₹100', w: '₹800' },
        { n: 'Coconut', s: '₹100', w: '₹800' },
        { n: 'Guava', s: '₹100', w: '₹800' },
      ]},
      { name: 'Chocolate', items: [
        { n: 'Chocolate Orange', s: '₹115', w: '₹900' },
        { n: 'Black Forest', s: '₹115', w: '₹900' },
        { n: 'Nutella', s: '₹120', w: '₹950' },
        { n: 'Biscoff', s: '₹120', w: '₹950' },
      ]},
      { name: 'Premium', items: [
        { n: 'Cookies & Cream', s: '₹125', w: '₹1,000' },
        { n: 'Caramel', s: '₹125', w: '₹1,000' },
        { n: 'Coffee', s: '₹125', w: '₹1,000' },
        { n: 'Pistachio', s: '₹140', w: '₹1,100' },
      ]},
    ],
  },
  cookies: {
    title: 'Cookies',
    subtitle: 'Per piece',
    items: [
      { n: 'Triple Chocolate', p: '₹65' },
      { n: 'White Chocolate', p: '₹65' },
      { n: 'Classic Choc Chip', p: '₹55' },
      { n: 'Red Velvet', p: '₹70' },
      { n: 'Almond', p: '₹70' },
      { n: 'Coconut', p: '₹65' },
      { n: 'Pistachio & Rose', p: '₹90' },
      { n: 'Box of 6', p: '₹360' },
      { n: 'Box of 12', p: '₹680' },
    ],
  },
  cakes: {
    title: 'Cakes & Treats',
    subtitle: 'Per piece / whole',
    groups: [
      { name: 'Cupcakes', items: [
        { n: 'Chocolate', p: '₹100' },
        { n: 'Vanilla', p: '₹100' },
      ]},
      { name: 'Bakes', items: [
        { n: 'Brownie', p: '₹80' },
        { n: 'Blondie', p: '₹80' },
        { n: 'Cakesicle', p: '₹120' },
        { n: 'Cake Pop', p: '₹90' },
        { n: 'Choc Strawberry', p: '₹70' },
      ]},
      { name: 'Milk Cake 6"', items: [
        { n: 'Biscoff', s: '₹100', w: '₹800' },
        { n: 'Tres Leches', s: '₹100', w: '₹800' },
        { n: 'Rose', s: '₹100', w: '₹800' },
        { n: 'Turkish', s: '₹110', w: '₹850' },
        { n: 'Chocolate', s: '₹110', w: '₹850' },
        { n: 'Raspberry', s: '₹115', w: '₹900' },
        { n: 'Pistachio', s: '₹120', w: '₹950' },
      ]},
    ],
  },
  desserts: {
    title: 'Dessert Cups',
    subtitle: 'Per cup',
    items: [
      { n: 'Custard Cup', p: '₹90' },
      { n: 'Cheesecake Cup', p: '₹150' },
      { n: 'Trifle Cup', p: '₹100' },
      { n: 'Jelly Cup', p: '₹80' },
      { n: 'Grass Cup', p: '₹90' },
    ],
  },
  drinks: {
    title: 'Drinks',
    subtitle: 'Per glass / cup',
    groups: [
      { name: 'Mojitos', items: [
        { n: 'Virgin Mojito', p: '₹120' },
        { n: 'Blue Lagoon', p: '₹120' },
        { n: 'Strawberry', p: '₹120' },
        { n: 'Any Fruit', p: '₹130' },
      ]},
      { name: 'Milkshakes', items: [
        { n: 'Fruit Flavour', p: '₹160' },
        { n: 'Biscoff', p: '₹180' },
        { n: 'Nutella', p: '₹180' },
        { n: 'Oreo', p: '₹180' },
      ]},
      { name: 'Coffee', items: [
        { n: 'Iced Coffee', p: '₹100' },
        { n: 'Hot Coffee', p: '₹90' },
      ]},
    ],
  },
}

const INITIAL_MESSAGES = [
  { from: 'bot', text: "Hello! Welcome to *Cake & Crumb* — The Gourmet Chocolate & Berry Boutique! 🎂", delay: 0 },
  { from: 'bot', text: "I'm here to help you explore our menu, check prices, or place an order. How can I help you today?", delay: 600 },
]

const MAIN_OPTIONS = [
  { label: '📋 View Menu', action: 'menu' },
  { label: '🛒 Place Order', action: 'order' },
  { label: '⏰ Delivery Info', action: 'delivery' },
  { label: '📍 Location', action: 'location' },
  { label: '📞 Contact Us', action: 'contact' },
]

const MENU_CATEGORIES = [
  { label: '🍰 Cheesecake', action: 'cat_cheesecake' },
  { label: '🍪 Cookies', action: 'cat_cookies' },
  { label: '🎂 Cakes & Treats', action: 'cat_cakes' },
  { label: '🍮 Dessert Cups', action: 'cat_desserts' },
  { label: '🥤 Drinks', action: 'cat_drinks' },
  { label: '◀️ Back to Main', action: 'home' },
]

function formatBold(text) {
  return text.split('*').map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const scrollRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
  }

  const addBotMessage = (text, delay = 0, images = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTyping(true)
        scrollToBottom()
        setTimeout(() => {
          setTyping(false)
          setMessages((prev) => [...prev, { from: 'bot', text, images }])
          scrollToBottom()
          resolve()
        }, 300 + Math.min(text.length * 3, 600))
      }, delay)
    })
  }

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'user', text }])
    scrollToBottom()
  }

  const showMainMenu = async () => {
    setOptions([])
    await addBotMessage("What would you like to do?")
    setOptions(MAIN_OPTIONS)
  }

  const showCategoryMenu = async () => {
    setOptions([])
    await addBotMessage("Choose a category to view prices:")
    setOptions(MENU_CATEGORIES)
  }

  const showCategoryPrices = async (catKey) => {
    setOptions([])
    const cat = MENU_DATA[catKey]
    const images = CAT_IMAGES[catKey]
    if (!cat) return

    // Show images first
    if (images) {
      await addBotMessage(`Here's our *${cat.title}* collection! 😍`, 0, images)
    }

    let priceText = `*${cat.title} — Price List*\n${cat.subtitle}\n\n`

    if (cat.groups) {
      cat.groups.forEach((g) => {
        priceText += `*${g.name}*\n`
        g.items.forEach((item) => {
          if (item.s && item.w) {
            priceText += `  ${item.n} — ${item.s}/slice · ${item.w}/whole\n`
          } else {
            priceText += `  ${item.n} — ${item.p}\n`
          }
        })
        priceText += '\n'
      })
    } else {
      cat.items.forEach((item) => {
        priceText += `  ${item.n} — ${item.p}\n`
      })
    }

    await addBotMessage(priceText.trim())
    await addBotMessage("Would you like to see another category or place an order?")
    setOptions([
      { label: '📋 More Categories', action: 'menu' },
      { label: '🛒 Place Order', action: 'order' },
      { label: '🏠 Main Menu', action: 'home' },
    ])
  }

  const handleAction = async (action, label) => {
    if (label) addUserMessage(label.replace(/^[^\s]+ /, ''))

    switch (action) {
      case 'home':
        await showMainMenu()
        break
      case 'menu':
        await showCategoryMenu()
        break
      case 'cat_cheesecake':
      case 'cat_cookies':
      case 'cat_cakes':
      case 'cat_desserts':
      case 'cat_drinks':
        await showCategoryPrices(action.replace('cat_', ''))
        break
      case 'order': {
        setOptions([])
        await addBotMessage("To place an order, I'll redirect you to WhatsApp where our team will assist you personally! 💬")
        await addBotMessage("You can tell them:\n• What you'd like to order\n• Delivery date & time\n• Your address in Gujarat")
        setOptions([
          { label: '💬 Open WhatsApp', action: 'whatsapp' },
          { label: '📋 View Menu First', action: 'menu' },
          { label: '🏠 Main Menu', action: 'home' },
        ])
        break
      }
      case 'whatsapp': {
        setOptions([])
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Cake & Crumb! I'd like to place an order.")}`, '_blank')
        await addBotMessage("WhatsApp opened! Our team typically replies within minutes. 😊")
        setOptions([{ label: '🏠 Main Menu', action: 'home' }])
        break
      }
      case 'delivery': {
        setOptions([])
        await addBotMessage("*Delivery Information*\n\n📍 *Area:* All Gujarat districts\n⏰ *Notice:* Please order 24 hours in advance\n🚗 *Delivery:* Free on orders above ₹499\n💰 *Delivery fee:* ₹49 (under ₹499)\n📦 *Packaging:* Included in price")
        setOptions([
          { label: '🛒 Place Order', action: 'order' },
          { label: '🏠 Main Menu', action: 'home' },
        ])
        break
      }
      case 'location': {
        setOptions([])
        await addBotMessage("*Our Location*\n\n📍 Ahmedabad, Gujarat, India\n🏠 Home bakery — we deliver across Gujarat!\n\n*Major Areas:* Ahmedabad, Gandhinagar, Surat, Vadodara, Rajkot & more!")
        setOptions([
          { label: '🛒 Place Order', action: 'order' },
          { label: '🏠 Main Menu', action: 'home' },
        ])
        break
      }
      case 'contact': {
        setOptions([])
        await addBotMessage("*Contact Us*\n\n📱 *WhatsApp (India):* +91 90816 68490\n📱 *WhatsApp (UK):* +44 7862 154461\n📞 *Call:* +91 90816 68490\n📷 *Instagram:* @cake_and_crumb_1\n\nWe reply within minutes! 💨")
        setOptions([
          { label: '💬 Open WhatsApp', action: 'whatsapp' },
          { label: '🏠 Main Menu', action: 'home' },
        ])
        break
      }
      default:
        break
    }
  }

  const handleTextInput = async (text) => {
    const lower = text.toLowerCase().trim()
    addUserMessage(text)
    setInput('')

    if (['hi', 'hello', 'hey', 'hii', 'hiii'].some((w) => lower.includes(w))) {
      await addBotMessage("Hi there! Welcome to *Cake & Crumb*! 😊")
      await showMainMenu()
    } else if (['menu', 'price', 'rate', 'list'].some((w) => lower.includes(w))) {
      await showCategoryMenu()
    } else if (['order', 'buy', 'want'].some((w) => lower.includes(w))) {
      await handleAction('order')
    } else if (['cheesecake', 'cheese'].some((w) => lower.includes(w))) {
      await showCategoryPrices('cheesecake')
    } else if (['cookie', 'biscuit'].some((w) => lower.includes(w))) {
      await showCategoryPrices('cookies')
    } else if (['cake', 'brownie', 'cupcake'].some((w) => lower.includes(w))) {
      await showCategoryPrices('cakes')
    } else if (['dessert', 'cup', 'custard', 'trifle'].some((w) => lower.includes(w))) {
      await showCategoryPrices('desserts')
    } else if (['drink', 'mojito', 'shake', 'coffee', 'milkshake'].some((w) => lower.includes(w))) {
      await showCategoryPrices('drinks')
    } else if (['delivery', 'deliver', 'area', 'time'].some((w) => lower.includes(w))) {
      await handleAction('delivery')
    } else if (['contact', 'phone', 'number', 'call', 'whatsapp'].some((w) => lower.includes(w))) {
      await handleAction('contact')
    } else if (['location', 'address', 'where'].some((w) => lower.includes(w))) {
      await handleAction('location')
    } else if (['thank', 'thanks', 'bye'].some((w) => lower.includes(w))) {
      await addBotMessage("Thank you for visiting *Cake & Crumb*! We hope to serve you soon. Have a sweet day! 🎂❤️")
      setOptions([{ label: '🏠 Main Menu', action: 'home' }])
    } else {
      await addBotMessage("I'm not sure I understood that. Let me show you the main menu! 😊")
      await showMainMenu()
    }
  }

  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true)
      const init = async () => {
        for (const msg of INITIAL_MESSAGES) {
          await addBotMessage(msg.text, msg.delay)
        }
        setOptions(MAIN_OPTIONS)
      }
      init()
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 active:scale-90 ${
          open
            ? 'bg-chocolate text-cream'
            : 'bg-[#25D366] text-white hover:shadow-2xl hover:shadow-green-500/30'
        }`}
        style={{ boxShadow: open ? undefined : '0 0 20px rgba(37, 211, 102, 0.4)' }}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-[90] transition-all duration-300 ease-out
          bottom-0 right-0 left-0 sm:bottom-24 sm:right-6 sm:left-auto
          ${open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 sm:translate-y-4 pointer-events-none'
          }`}
      >
        <div className="bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[100dvh] sm:h-[520px] sm:w-[380px] border border-chocolate/5">

          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shrink-0">
            <img
              src={assetUrl('/images/logo.png')}
              alt="Cake & Crumb"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div className="flex-1">
              <h3 className="text-white text-sm font-semibold">Cake & Crumb</h3>
              <p className="text-[11px] text-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · Replies instantly
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white sm:hidden">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
            style={{ background: '#ECE5DD url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8bfb0\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] shadow-sm overflow-hidden ${
                    msg.from === 'user'
                      ? 'bg-[#DCF8C6] rounded-2xl rounded-tr-sm'
                      : 'bg-white rounded-2xl rounded-tl-sm'
                  }`}
                  style={{ animation: 'chat-msg-in 0.25s ease-out' }}
                >
                  {/* Image gallery */}
                  {msg.images && (
                    <div className="flex overflow-x-auto gap-1 p-1 scrollbar-hide">
                      {msg.images.map((img, j) => (
                        <div key={j} className="shrink-0 w-28 rounded-lg overflow-hidden relative">
                          <img
                            src={assetUrl(img.src)}
                            alt={img.label}
                            className="w-28 h-28 object-cover"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                            <p className="text-[10px] text-white font-medium truncate">{img.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Text */}
                  <div className="px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line text-gray-800">
                    {formatBold(msg.text)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Quick Reply Options */}
            {options.length > 0 && !typing && (
              <div className="flex flex-wrap gap-1.5 pt-2" style={{ animation: 'chat-msg-in 0.3s ease-out' }}>
                {options.map((opt) => (
                  <button
                    key={opt.action}
                    onClick={() => handleAction(opt.action, opt.label)}
                    className="bg-white border border-[#25D366]/30 text-[#075E54] text-[12px] font-medium px-3 py-2 rounded-full hover:bg-[#25D366]/5 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                  >
                    {opt.label}
                    <ChevronRight size={12} className="text-[#25D366]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-2 bg-[#F0F0F0] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) handleTextInput(input)
              }}
              placeholder="Type a message..."
              className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-gray-800 outline-none border border-gray-200 focus:border-[#25D366]/50 transition-colors"
            />
            <button
              onClick={() => { if (input.trim()) handleTextInput(input) }}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-90 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
