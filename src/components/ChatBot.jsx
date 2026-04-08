import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight, Plus, Minus, ShoppingBag } from 'lucide-react'
import { assetUrl } from '../utils/assetPath'
import { saveOrderToSheet } from '../utils/orderSheet'
import { generateOrderId } from '../services/emailService'

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

// ─── Orderable items with prices + category labels ───
const ORDER_ITEMS = {
  cheesecake_slice: [
    { name: 'Strawberry Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Blueberry Slice', price: 140, cat: '🍰 Cheesecake' },
    { name: 'Raspberry Slice', price: 140, cat: '🍰 Cheesecake' },
    { name: 'Orange Creamsicle Slice', price: 130, cat: '🍰 Cheesecake' },
    { name: 'Lemon Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Rose Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Mango Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Passion Fruit Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Cherry Slice', price: 120, cat: '🍰 Cheesecake' },
    { name: 'Chocolate Slice', price: 130, cat: '🍰 Cheesecake' },
    { name: 'Nutella Slice', price: 160, cat: '🍰 Cheesecake' },
    { name: 'Biscoff Slice', price: 150, cat: '🍰 Cheesecake' },
    { name: 'Cookies & Cream Slice', price: 150, cat: '🍰 Cheesecake' },
    { name: 'Caramel Slice', price: 150, cat: '🍰 Cheesecake' },
    { name: 'Coffee Slice', price: 150, cat: '🍰 Cheesecake' },
    { name: 'Pistachio Slice', price: 160, cat: '🍰 Cheesecake' },
    { name: 'Dubai Special Slice', price: 170, cat: '🍰 Cheesecake' },
  ],
  cheesecake_banto: [
    { name: 'Strawberry Banto', price: 350, cat: '🍰 Cheesecake' },
    { name: 'Blueberry Banto', price: 410, cat: '🍰 Cheesecake' },
    { name: 'Raspberry Banto', price: 410, cat: '🍰 Cheesecake' },
    { name: 'Mango Banto', price: 350, cat: '🍰 Cheesecake' },
    { name: 'Chocolate Banto', price: 380, cat: '🍰 Cheesecake' },
    { name: 'Nutella Banto', price: 460, cat: '🍰 Cheesecake' },
    { name: 'Biscoff Banto', price: 430, cat: '🍰 Cheesecake' },
    { name: 'Cookies & Cream Banto', price: 430, cat: '🍰 Cheesecake' },
    { name: 'Pistachio Banto', price: 470, cat: '🍰 Cheesecake' },
    { name: 'Dubai Special Banto', price: 500, cat: '🍰 Cheesecake' },
  ],
  cookies: [
    { name: 'Triple Choc Cookie', price: 60, cat: '🍪 Cookies' },
    { name: 'White Choc Cookie', price: 50, cat: '🍪 Cookies' },
    { name: 'Classic Cookie', price: 50, cat: '🍪 Cookies' },
    { name: 'Red Velvet Cookie', price: 60, cat: '🍪 Cookies' },
    { name: 'Almond Cookie', price: 70, cat: '🍪 Cookies' },
    { name: 'Coconut Cookie', price: 60, cat: '🍪 Cookies' },
    { name: 'Pistachio Rose Cookie', price: 70, cat: '🍪 Cookies' },
    { name: 'Cookie Box (6)', price: 340, cat: '🍪 Cookies' },
    { name: 'Cookie Box (12)', price: 700, cat: '🍪 Cookies' },
  ],
  cakes: [
    { name: 'Choc Cupcake', price: 100, cat: '🧁 Cupcakes' },
    { name: 'Vanilla Cupcake', price: 100, cat: '🧁 Cupcakes' },
    { name: 'Brownie', price: 80, cat: '🎂 Bakes' },
    { name: 'Blondie', price: 80, cat: '🎂 Bakes' },
    { name: 'Cakesicle', price: 120, cat: '🎂 Bakes' },
    { name: 'Cake Pop', price: 90, cat: '🎂 Bakes' },
    { name: 'Biscoff Milk Cake (Whole)', price: 800, cat: '🥛 Milk Cake' },
    { name: 'Rose Milk Cake (Whole)', price: 800, cat: '🥛 Milk Cake' },
    { name: 'Pistachio Milk Cake (Whole)', price: 950, cat: '🥛 Milk Cake' },
  ],
  desserts: [
    { name: 'Custard Cup', price: 90, cat: '🍮 Dessert Cup' },
    { name: 'Cheesecake Cup', price: 150, cat: '🍮 Dessert Cup' },
    { name: 'Trifle Cup', price: 100, cat: '🍮 Dessert Cup' },
    { name: 'Jelly Cup', price: 80, cat: '🍮 Dessert Cup' },
  ],
  drinks: [
    { name: 'Virgin Mojito', price: 120, cat: '🍹 Mojito' },
    { name: 'Blue Lagoon', price: 120, cat: '🍹 Mojito' },
    { name: 'Strawberry Mojito', price: 120, cat: '🍹 Mojito' },
    { name: 'Biscoff Milkshake', price: 180, cat: '🥤 Milkshake' },
    { name: 'Nutella Milkshake', price: 180, cat: '🥤 Milkshake' },
    { name: 'Iced Coffee', price: 100, cat: '☕ Coffee' },
    { name: 'Hot Coffee', price: 90, cat: '☕ Coffee' },
  ],
}

// Find category label for an item name
function getItemCat(name) {
  for (const items of Object.values(ORDER_ITEMS)) {
    const found = items.find((i) => i.name === name)
    if (found) return found.cat
  }
  return ''
}

// ─── Menu price display data ───
const MENU_DATA = {
  cheesecake: {
    title: 'Cheesecake', subtitle: 'Banto 4" · 3 slices | Per slice',
    groups: [
      { name: 'Classic', items: [
        { n: 'Strawberry', s: '₹120', w: '₹350' }, { n: 'Blueberry', s: '₹140', w: '₹410' },
        { n: 'Raspberry', s: '₹140', w: '₹410' }, { n: 'Orange Creamsicle', s: '₹130', w: '₹380' },
        { n: 'Lemon', s: '₹120', w: '₹350' }, { n: 'Rose', s: '₹120', w: '₹350' },
      ]},
      { name: 'Exotic', items: [
        { n: 'Mango', s: '₹120', w: '₹350' }, { n: 'Passion Fruit', s: '₹120', w: '₹350' },
        { n: 'Cherry', s: '₹120', w: '₹350' }, { n: 'Guava', s: '₹120', w: '₹350' },
        { n: 'Mango & Passion', s: '₹130', w: '₹380' }, { n: 'Coconut', s: '₹130', w: '₹380' },
      ]},
      { name: 'Chocolate', items: [
        { n: 'Chocolate', s: '₹130', w: '₹380' }, { n: 'Chocolate Orange', s: '₹130', w: '₹380' },
        { n: 'Black Forest', s: '₹130', w: '₹380' }, { n: 'Chocolate Chunk', s: '₹130', w: '₹380' },
        { n: 'Nutella', s: '₹160', w: '₹460' }, { n: 'Biscoff', s: '₹150', w: '₹430' },
      ]},
      { name: 'Premium', items: [
        { n: 'Cookies & Cream', s: '₹150', w: '₹430' }, { n: 'Caramel', s: '₹150', w: '₹430' },
        { n: 'Coffee', s: '₹150', w: '₹430' }, { n: 'Pistachio', s: '₹160', w: '₹470' },
        { n: 'Dubai Special', s: '₹170', w: '₹500' },
      ]},
    ],
  },
  cookies: {
    title: 'Cookies', subtitle: 'Per piece | Box of 6 | Box of 12',
    items: [
      { n: 'Triple Choc', p: '₹60 · ₹340 · ₹700' }, { n: 'White Choc', p: '₹50 · ₹280 · ₹580' },
      { n: 'Classic', p: '₹50 · ₹280 · ₹580' }, { n: 'Red Velvet', p: '₹60 · ₹340 · ₹700' },
      { n: 'Almond', p: '₹70 · ₹400 · ₹820' }, { n: 'Coconut', p: '₹60 · ₹340 · ₹700' },
      { n: 'Pistachio & Rose', p: '₹70 · ₹400 · ₹820' },
    ],
  },
  cakes: {
    title: 'Cakes & Treats', subtitle: 'Per piece / whole',
    groups: [
      { name: 'Cupcakes', items: [{ n: 'Chocolate', p: '₹100' }, { n: 'Vanilla', p: '₹100' }] },
      { name: 'Bakes', items: [
        { n: 'Brownie', p: '₹80' }, { n: 'Blondie', p: '₹80' }, { n: 'Cakesicle', p: '₹120' },
        { n: 'Cake Pop', p: '₹90' }, { n: 'Choc Strawberry', p: '₹70' },
      ]},
      { name: 'Milk Cake 6"', items: [
        { n: 'Biscoff', s: '₹100', w: '₹800' }, { n: 'Rose', s: '₹100', w: '₹800' },
        { n: 'Chocolate', s: '₹110', w: '₹850' }, { n: 'Pistachio', s: '₹120', w: '₹950' },
      ]},
    ],
  },
  desserts: {
    title: 'Dessert Cups', subtitle: 'Per cup',
    items: [
      { n: 'Custard Cup', p: '₹90' }, { n: 'Cheesecake Cup', p: '₹150' },
      { n: 'Trifle Cup', p: '₹100' }, { n: 'Jelly Cup', p: '₹80' }, { n: 'Grass Cup', p: '₹90' },
    ],
  },
  drinks: {
    title: 'Drinks', subtitle: 'Per glass / cup',
    groups: [
      { name: 'Mojitos', items: [
        { n: 'Virgin Mojito', p: '₹120' }, { n: 'Blue Lagoon', p: '₹120' }, { n: 'Strawberry', p: '₹120' },
      ]},
      { name: 'Milkshakes', items: [
        { n: 'Biscoff', p: '₹180' }, { n: 'Nutella', p: '₹180' }, { n: 'Oreo', p: '₹180' },
      ]},
      { name: 'Coffee', items: [{ n: 'Iced Coffee', p: '₹100' }, { n: 'Hot Coffee', p: '₹90' }] },
    ],
  },
}

const INITIAL_MESSAGES = [
  { from: 'bot', text: "Hello! Welcome to *Cake & Crumb* — The Gourmet Chocolate & Berry Boutique! 🎂", delay: 0 },
  { from: 'bot', text: "I'm here to help you explore our menu, check prices, or place an order. How can I help?", delay: 600 },
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

const ORDER_CATEGORIES = [
  { label: '🍰 Cheesecake Slices', action: 'ord_cheesecake_slice' },
  { label: '🎂 Cheesecake Banto', action: 'ord_cheesecake_banto' },
  { label: '🍪 Cookies', action: 'ord_cookies' },
  { label: '🧁 Cakes & Treats', action: 'ord_cakes' },
  { label: '🍮 Dessert Cups', action: 'ord_desserts' },
  { label: '🥤 Drinks', action: 'ord_drinks' },
  { label: '✅ Review My Order', action: 'review_order' },
  { label: '🏠 Main Menu', action: 'home' },
]

function formatBold(text) {
  return text.split('*').map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

// ─── Order Item Selector Component ───
function OrderItemSelector({ items, cart, onUpdate, onDone }) {
  return (
    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm overflow-hidden max-w-[90%]" style={{ animation: 'chat-msg-in 0.25s ease-out' }}>
      <div className="px-3 py-2 bg-cream/60 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-chocolate">Tap + to add items</p>
      </div>
      <div className="max-h-[250px] overflow-y-auto">
        {items.map((item) => {
          const qty = cart[item.name] || 0
          return (
            <div key={item.name} className="flex items-center justify-between px-3 py-2 border-b border-gray-50 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-[11px] text-[#25D366] font-semibold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {qty > 0 && (
                  <>
                    <button
                      onClick={() => onUpdate(item.name, item.price, qty - 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-5 text-center text-[12px] font-bold text-gray-800">{qty}</span>
                  </>
                )}
                <button
                  onClick={() => onUpdate(item.name, item.price, qty + 1)}
                  className="w-6 h-6 rounded-full bg-berry flex items-center justify-center text-white active:scale-90"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={onDone}
        className="w-full py-2.5 bg-chocolate text-cream text-[12px] font-semibold flex items-center justify-center gap-1.5 active:bg-chocolate-light rounded-b-xl"
      >
        <ShoppingBag size={13} />
        Done — Add More or Review Order
      </button>
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [orderCart, setOrderCart] = useState({}) // { itemName: { qty, price } }
  const [activeOrderCat, setActiveOrderCat] = useState(null) // which category selector is open
  const [orderStep, setOrderStep] = useState(null) // 'name', 'phone', 'address', 'date'
  const [lastOrderId, setLastOrderId] = useState(null)
  const [lastOrderTime, setLastOrderTime] = useState(null)
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', date: '' })
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
        }, 250 + Math.min(text.length * 2, 500))
      }, delay)
    })
  }

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'user', text }])
    scrollToBottom()
  }

  const getCartTotal = () => {
    return Object.values(orderCart).reduce((sum, item) => sum + item.price * item.qty, 0)
  }

  const getCartSummary = () => {
    const items = Object.entries(orderCart).filter(([, v]) => v.qty > 0)
    if (items.length === 0) return 'No items yet'
    return items.map(([name, { qty, price }]) => `• ${name} x${qty} = ₹${price * qty}`).join('\n')
  }

  const updateCartItem = (name, price, qty) => {
    setOrderCart((prev) => {
      const updated = { ...prev }
      if (qty <= 0) {
        delete updated[name]
      } else {
        updated[name] = { qty, price }
      }
      return updated
    })
  }

  const showMainMenu = async () => {
    setOptions([])
    setActiveOrderCat(null)
    setOrderStep(null)
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

    if (images) await addBotMessage(`Here's our *${cat.title}* collection! 😍`, 0, images)

    let priceText = `*${cat.title} — Price List*\n${cat.subtitle}\n\n`
    if (cat.groups) {
      cat.groups.forEach((g) => {
        priceText += `*${g.name}*\n`
        g.items.forEach((item) => {
          priceText += item.s ? `  ${item.n} — ${item.s}/slice · ${item.w}/whole\n` : `  ${item.n} — ${item.p}\n`
        })
        priceText += '\n'
      })
    } else {
      cat.items.forEach((item) => { priceText += `  ${item.n} — ${item.p}\n` })
    }

    await addBotMessage(priceText.trim())
    await addBotMessage("Would you like to see another category or place an order?")
    setOptions([
      { label: '📋 More Categories', action: 'menu' },
      { label: '🛒 Place Order', action: 'order' },
      { label: '🏠 Main Menu', action: 'home' },
    ])
  }

  const showOrderCategories = async () => {
    setOptions([])
    setActiveOrderCat(null)
    const total = getCartTotal()
    if (total > 0) {
      await addBotMessage(`*Your cart so far:* ₹${total}\n\nSelect a category to add items, or review your order:`)
    } else {
      await addBotMessage("Select a category to start adding items to your order:")
    }
    setOptions(ORDER_CATEGORIES)
  }

  const sendOrderToWhatsApp = () => {
    const items = Object.entries(orderCart).filter(([, v]) => v.qty > 0)
    const total = getCartTotal()
    const deliveryFee = total >= 499 ? 0 : 49
    const grandTotal = total + deliveryFee
    const orderId = generateOrderId(orderInfo.name)
    setLastOrderId(orderId)
    setLastOrderTime(Date.now())

    // Group items by category
    const grouped = {}
    items.forEach(([name, { qty, price }]) => {
      const cat = getItemCat(name) || '📦 Other'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push({ name, qty, price })
    })
    let orderLines = ''
    Object.entries(grouped).forEach(([cat, catItems]) => {
      orderLines += `\n*${cat}*\n`
      catItems.forEach(({ name, qty, price }) => {
        orderLines += `  • ${name} × ${qty} = ₹${price * qty}\n`
      })
    })

    // Simple order list for user message
    const userItemsList = items.map(([name, { qty, price }]) => `• ${name} × ${qty} = ₹${price * qty}`).join('\n')

    const phone = orderInfo.phone.replace(/[\s\-()]/g, '')
    const customerWa = phone.startsWith('+') ? phone.replace('+', '') : (phone.length === 10 ? `91${phone}` : phone)
    const orderTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    // Admin action links
    const confirmLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(`✅ Hi ${orderInfo.name}! Your order *${orderId}* is *APPROVED*! Total: ₹${grandTotal}. Delivery: ${orderInfo.date}. — Cake & Crumb 🎂`)}`
    const shippedLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(`📦 Hi ${orderInfo.name}! Order *${orderId}* is *SHIPPED*! Expected: ${orderInfo.date}. Enjoy! — Cake & Crumb 🚗`)}`
    const cancelLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(`🚫 Hi ${orderInfo.name}, order *${orderId}* has been *CANCELLED*. Contact: +91 90816 68490 — Cake & Crumb`)}`
    const rejectLink = `https://wa.me/${customerWa}?text=${encodeURIComponent(`❌ Hi ${orderInfo.name}, sorry we cannot fulfill order *${orderId}*. Contact: +91 90816 68490 — Cake & Crumb`)}`

    // Order message with admin links at bottom
    const msg = `🎂 *NEW ORDER — ${orderId}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*👤 Customer:* ${orderInfo.name}\n` +
      `*📞 Phone:* ${orderInfo.phone}\n` +
      `*📍 Address:* ${orderInfo.address}\n` +
      `*📅 Delivery:* ${orderInfo.date}\n` +
      `*🕐 Order Time:* ${orderTime}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*📋 Order Items:*${orderLines}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*Subtotal:* ₹${total}\n` +
      `*Delivery:* ${deliveryFee === 0 ? 'FREE ✅' : '₹' + deliveryFee}\n` +
      `*💰 Total: ₹${grandTotal}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⚠️ *Cancel window:* 30 min from order time.\n\n` +
      `Please confirm my order. Thank you! 🙏\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*ADMIN — Tap to reply customer:*\n\n` +
      `✅ *Approve Order:*\n${confirmLink}\n\n` +
      `📦 *Order Shipped:*\n${shippedLink}\n\n` +
      `🚫 *Cancel Order:*\n${cancelLink}\n\n` +
      `❌ *Reject Order:*\n${rejectLink}`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')

    saveOrderToSheet({
      orderId,
      customerName: orderInfo.name,
      phone: orderInfo.phone,
      items: userItemsList,
      total: `₹${grandTotal}`,
      delivery: orderInfo.date,
      date: orderTime,
      confirmLink,
      shippedLink,
      cancelLink,
      rejectLink,
    })
  }

  const handleAction = async (action, label) => {
    if (label) addUserMessage(label.replace(/^[^\s]+ /, ''))

    // Order category selection
    if (action.startsWith('ord_')) {
      const catKey = action.replace('ord_', '')
      const items = ORDER_ITEMS[catKey]
      if (items) {
        setOptions([])
        await addBotMessage(`Tap *+* to add items. Tap *Done* when finished.`)
        setActiveOrderCat(catKey)
        scrollToBottom()
      }
      return
    }

    switch (action) {
      case 'home':
        setOrderCart({})
        setOrderStep(null)
        setOrderInfo({ name: '', phone: '', address: '', date: '' })
        await showMainMenu()
        break
      case 'menu':
        await showCategoryMenu()
        break
      case 'cat_cheesecake': case 'cat_cookies': case 'cat_cakes': case 'cat_desserts': case 'cat_drinks':
        await showCategoryPrices(action.replace('cat_', ''))
        break
      case 'order':
        setOptions([])
        await addBotMessage("Let's build your order! 🛒\n\nSelect a category, add items with quantities, then review & checkout.")
        await showOrderCategories()
        break
      case 'review_order': {
        setOptions([])
        const items = Object.entries(orderCart).filter(([, v]) => v.qty > 0)
        if (items.length === 0) {
          await addBotMessage("Your cart is empty! Please add some items first. 🛒")
          await showOrderCategories()
          return
        }
        const total = getCartTotal()
        const fee = total >= 499 ? 0 : 49
        let summary = `*🛒 Your Order:*\n\n`
        summary += getCartSummary()
        summary += `\n\n*Subtotal:* ₹${total}\n*Delivery:* ${fee === 0 ? 'FREE ✅' : '₹' + fee}\n*Total: ₹${total + fee}*`
        await addBotMessage(summary)
        await addBotMessage("Looks good? Let's proceed with your details, or go back to add more items.")
        setOptions([
          { label: '✅ Confirm & Enter Details', action: 'collect_info' },
          { label: '➕ Add More Items', action: 'order' },
          { label: '🗑️ Clear Cart', action: 'clear_cart' },
          { label: '🏠 Cancel', action: 'home' },
        ])
        break
      }
      case 'clear_cart':
        setOrderCart({})
        setOptions([])
        await addBotMessage("Cart cleared! 🗑️")
        await showOrderCategories()
        break
      case 'collect_info':
        setOptions([])
        setActiveOrderCat(null)
        await addBotMessage("Great! I need a few details for delivery.\n\nPlease type your *full name*:")
        setOrderStep('name')
        break
      case 'confirm_send':
        setOptions([])
        sendOrderToWhatsApp()
        await addBotMessage("✅ *Order sent to WhatsApp!*\n\nOur team will confirm your order within minutes.\n\n⚠️ *Cancellation:* You can cancel within 30 minutes. After that, cancellation is not available.")
        setOrderCart({})
        setOrderStep(null)
        setOptions([
          { label: '🚫 Cancel My Order', action: 'user_cancel' },
          { label: '🏠 Main Menu', action: 'home' },
        ])
        break
      case 'user_cancel': {
        setOptions([])
        // Check if within 30 minutes
        if (lastOrderTime && (Date.now() - lastOrderTime) > 30 * 60 * 1000) {
          await addBotMessage("⏰ Sorry! The 30-minute cancellation window has expired. This order can no longer be cancelled.\n\nFor help, contact: +91 90816 68490")
          setOptions([{ label: '🏠 Main Menu', action: 'home' }])
        } else {
          const cancelRequest = `🚫 *CANCEL REQUEST*\n\n` +
            `Order ID: *${lastOrderId || 'Recent Order'}*\n` +
            `Customer: ${orderInfo.name || 'Customer'}\n` +
            `Phone: ${orderInfo.phone || ''}\n\n` +
            `I would like to cancel my order. Please confirm cancellation.`
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(cancelRequest)}`, '_blank')
          await addBotMessage("🚫 *Cancel request sent!*\n\nOur team will confirm the cancellation on WhatsApp shortly.\n\nNote: Cancellation is final only after admin confirms it.")
          setOptions([{ label: '🏠 Main Menu', action: 'home' }])
        }
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
        await addBotMessage("*Delivery Information*\n\n📍 *Area:* All Gujarat districts\n⏰ *Notice:* Please order 24 hours in advance\n🚗 *Free delivery* on orders above ₹499\n💰 *Delivery fee:* ₹49 (under ₹499)\n📦 *Packaging:* Included in price")
        setOptions([{ label: '🛒 Place Order', action: 'order' }, { label: '🏠 Main Menu', action: 'home' }])
        break
      }
      case 'location': {
        setOptions([])
        await addBotMessage("*Our Location*\n\n📍 Vaso, Kheda, Gujarat 387380\n🏠 Home bakery — we deliver across Gujarat!")
        setOptions([{ label: '🛒 Place Order', action: 'order' }, { label: '🏠 Main Menu', action: 'home' }])
        break
      }
      case 'contact': {
        setOptions([])
        await addBotMessage("*Contact Us*\n\n📱 *WhatsApp:* +91 90816 68490\n📱 *WhatsApp:* +91 91731 83440\n📞 *Call:* +91 90816 68490\n📷 *Instagram:* @cake_and_crumb_1")
        setOptions([{ label: '💬 Open WhatsApp', action: 'whatsapp' }, { label: '🏠 Main Menu', action: 'home' }])
        break
      }
      default: break
    }
  }

  const handleTextInput = async (text) => {
    const lower = text.toLowerCase().trim()
    addUserMessage(text)
    setInput('')

    // Handle order info collection steps
    if (orderStep === 'name') {
      setOrderInfo((prev) => ({ ...prev, name: text }))
      setOrderStep('phone')
      await addBotMessage(`Thanks *${text}*! Now enter your *phone number*:`)
      return
    }
    if (orderStep === 'phone') {
      const cleaned = text.replace(/[\s\-()]/g, '')
      if (!/^\+?\d{7,15}$/.test(cleaned)) {
        await addBotMessage("Please enter a valid phone number (with country code for international):")
        return
      }
      setOrderInfo((prev) => ({ ...prev, phone: text }))
      setOrderStep('address')
      await addBotMessage("Enter your *full delivery address*\n(House/Flat, Street, Area, City, Pincode):")
      return
    }
    if (orderStep === 'address') {
      setOrderInfo((prev) => ({ ...prev, address: text }))
      setOrderStep('date')
      await addBotMessage("When would you like it delivered?\n(e.g., *Tomorrow 4 PM*, *31 March Evening*):")
      return
    }
    if (orderStep === 'date') {
      setOrderInfo((prev) => ({ ...prev, date: text }))
      setOrderStep(null)

      const total = getCartTotal()
      const fee = total >= 499 ? 0 : 49
      let finalSummary = `*📋 Order Summary*\n\n`
      finalSummary += getCartSummary()
      finalSummary += `\n\n*Subtotal:* ₹${total}\n*Delivery:* ${fee === 0 ? 'FREE ✅' : '₹' + fee}\n*💰 Total: ₹${total + fee}*`
      finalSummary += `\n\n*👤* ${orderInfo.name}\n*📞* ${orderInfo.phone}\n*📍* ${text}\n*📅* ${text}`

      await addBotMessage(finalSummary)
      await addBotMessage("Ready to send this order to our bakery on WhatsApp? 🎂")
      setOptions([
        { label: '✅ Send Order via WhatsApp', action: 'confirm_send' },
        { label: '✏️ Edit Details', action: 'collect_info' },
        { label: '🏠 Cancel', action: 'home' },
      ])
      return
    }

    // Normal text handling
    if (['hi', 'hello', 'hey', 'hii'].some((w) => lower.includes(w))) {
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
    } else if (['dessert', 'cup', 'custard'].some((w) => lower.includes(w))) {
      await showCategoryPrices('desserts')
    } else if (['drink', 'mojito', 'shake', 'coffee'].some((w) => lower.includes(w))) {
      await showCategoryPrices('drinks')
    } else if (['delivery', 'deliver'].some((w) => lower.includes(w))) {
      await handleAction('delivery')
    } else if (['contact', 'phone', 'whatsapp'].some((w) => lower.includes(w))) {
      await handleAction('contact')
    } else if (['thank', 'thanks', 'bye'].some((w) => lower.includes(w))) {
      await addBotMessage("Thank you! Have a sweet day! 🎂❤️")
      setOptions([{ label: '🏠 Main Menu', action: 'home' }])
    } else {
      await addBotMessage("I didn't understand that. Let me show you the menu! 😊")
      await showMainMenu()
    }
  }

  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true)
      const init = async () => {
        for (const msg of INITIAL_MESSAGES) await addBotMessage(msg.text, msg.delay)
        setOptions(MAIN_OPTIONS)
      }
      init()
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 active:scale-90 ${
          open ? 'bg-chocolate text-cream rotate-90' : 'bg-berry text-white wa-btn-bounce'
        }`}
        style={{ boxShadow: open ? undefined : '0 4px 20px rgba(198, 40, 40, 0.35)' }}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-[90] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          bottom-0 right-0 left-0 sm:bottom-24 sm:right-6 sm:left-auto
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        <div className="bg-cream-light sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[100dvh] sm:h-[520px] sm:w-[380px] border border-chocolate/10">

          {/* Header */}
          <div className="bg-gradient-to-r from-chocolate to-chocolate-light px-4 py-3 flex items-center gap-3 shrink-0">
            <img src={assetUrl('/images/logo.png')} alt="Cake & Crumb" className="w-10 h-10 rounded-full object-cover border-2 border-gold/30 shadow-md" />
            <div className="flex-1">
              <h3 className="text-cream text-sm font-heading font-bold">Cake & Crumb</h3>
              <p className="text-[11px] text-gold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse" />
                Online · Replies instantly
              </p>
            </div>
            {/* Cart badge */}
            {Object.keys(orderCart).length > 0 && (
              <div className="bg-berry text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <ShoppingBag size={11} />
                ₹{getCartTotal()}
              </div>
            )}
            <button onClick={() => setOpen(false)} className="text-cream/60 hover:text-cream sm:hidden">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-cream"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] shadow-sm overflow-hidden ${
                    msg.from === 'user'
                      ? 'bg-berry/10 border border-berry/10 rounded-2xl rounded-tr-sm'
                      : 'bg-white border border-chocolate/5 rounded-2xl rounded-tl-sm'
                  }`}
                  style={{ animation: 'chat-msg-in 0.25s ease-out' }}
                >
                  {msg.images && (
                    <div className="flex overflow-x-auto gap-1 p-1 scrollbar-hide">
                      {msg.images.map((img, j) => (
                        <div key={j} className="shrink-0 w-28 rounded-lg overflow-hidden relative">
                          <img src={assetUrl(img.src)} alt={img.label} className="w-28 h-28 object-cover" loading="lazy" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                            <p className="text-[10px] text-white font-medium truncate">{img.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line text-chocolate">
                    {formatBold(msg.text)}
                  </div>
                </div>
              </div>
            ))}

            {/* Active order item selector */}
            {activeOrderCat && ORDER_ITEMS[activeOrderCat] && (
              <div className="flex justify-start">
                <OrderItemSelector
                  items={ORDER_ITEMS[activeOrderCat]}
                  cart={Object.fromEntries(Object.entries(orderCart).map(([k, v]) => [k, v.qty]))}
                  onUpdate={updateCartItem}
                  onDone={async () => {
                    setActiveOrderCat(null)
                    const total = getCartTotal()
                    if (total > 0) {
                      await addBotMessage(`*Cart updated!* 🛒\nTotal so far: *₹${total}*`)
                    }
                    await showOrderCategories()
                  }}
                />
              </div>
            )}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-chocolate/5 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-berry animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {options.length > 0 && !typing && !activeOrderCat && (
              <div className="flex flex-wrap gap-1.5 pt-2" style={{ animation: 'chat-msg-in 0.3s ease-out' }}>
                {options.map((opt) => (
                  <button
                    key={opt.action}
                    onClick={() => handleAction(opt.action, opt.label)}
                    className="bg-white border border-chocolate/10 text-chocolate text-[12px] font-medium px-3 py-2 rounded-full hover:bg-berry/5 hover:border-berry/20 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                  >
                    {opt.label}
                    <ChevronRight size={12} className="text-berry" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 bg-white border-t border-chocolate/5 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) handleTextInput(input) }}
              placeholder={orderStep ? 'Type here...' : 'Type a message...'}
              className="flex-1 bg-cream/50 rounded-full px-4 py-2.5 text-sm text-chocolate outline-none border border-chocolate/10 focus:border-berry/30 focus:ring-1 focus:ring-berry/10 transition-all placeholder:text-chocolate-light/35"
            />
            <button
              onClick={() => { if (input.trim()) handleTextInput(input) }}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-chocolate text-cream flex items-center justify-center shrink-0 disabled:opacity-30 active:scale-90 transition-all hover:bg-chocolate-light"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
