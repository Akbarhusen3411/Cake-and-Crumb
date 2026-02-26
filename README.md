# Cake & Crumb

**The Gourmet Chocolate & Berry Boutique**

A premium bakery e-commerce website for a boutique bakery in Ahmedabad, India. Built with React 19, Tailwind CSS 4, and Vite 7.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

---

## Features

### Showcase
- Hero section with animated elements and floating CTAs
- Full menu with 5 categories — Cheesecake, Cakes & Treats, Cookies, Desserts, Drinks
- Featured product hero cards with hover effects
- "Why Choose Us" section with brand story
- Instagram feed integration and testimonials carousel
- Contact section with WhatsApp form integration
- Floating WhatsApp button for instant ordering

### E-Commerce
- **Product Catalog** — 63 products with individual pricing, bestseller badges, and stock status
- **Shopping Cart** — Add/remove items, quantity controls, persistent via localStorage (Zustand)
- **Cart Drawer** — Slide-in panel with item list, subtotal, delivery fee calculation (free above ₹499)
- **4-Step Checkout Flow**:
  1. **Address** — Name, phone (Indian format validation), email, delivery area, full address, pincode
  2. **Schedule** — Next 7 days date picker + 5 time slots (24hr advance notice)
  3. **Payment** — Razorpay (UPI, cards, wallets, netbanking) or Cash on Delivery (under ₹1000)
  4. **Confirmation** — Order ID, summary, auto-sends to WhatsApp + email via EmailJS
- **Location Dialog** — Auto-popup for Ahmedabad delivery confirmation with area selection
- **Toast Notifications** — "Added to cart" / "Removed" with auto-dismiss

### Design & UX
- Fully responsive — optimized from 375px mobile to desktop
- Smooth scroll animations (fade-up, slide-left, slide-right) via IntersectionObserver
- GPU-accelerated CSS transitions and keyframe animations
- Custom color palette — Chocolate, Cream, Berry, Gold
- Google Fonts — Poppins (headings) + Inter (body)
- Mobile drawer navigation with staggered animations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 (via @tailwindcss/vite) |
| State Management | Zustand (localStorage persist) |
| Payment | Razorpay (checkout.js) |
| Email | EmailJS (free tier — 200/month) |
| Icons | Lucide React |
| Fonts | Google Fonts (Poppins, Inter) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Akbarhusen3411/Cake-and-Crumb.git

# Navigate to project
cd Cake-and-Crumb

# Install dependencies
npm install
```

### Development

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

> **Note:** Scripts use `node ./node_modules/vite/bin/vite.js` instead of bare `vite` because the directory name contains `&` which breaks Windows path resolution.

---

## Configuration

### Razorpay (Payment Gateway)

1. Sign up at [razorpay.com](https://razorpay.com) and get your test API key
2. Update `src/config/razorpay.js`:
```js
export const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_HERE'
```

### EmailJS (Order Confirmation Emails)

1. Sign up at [emailjs.com](https://emailjs.com) (free tier: 200 emails/month)
2. Create an email service and two templates (customer confirmation + bakery notification)
3. Update `src/services/emailService.js`:
```js
const SERVICE_ID = 'service_YOUR_ID'
const CUSTOMER_TEMPLATE_ID = 'template_YOUR_ID'
const BAKERY_TEMPLATE_ID = 'template_YOUR_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
```

---

## Project Structure

```
src/
├── components/
│   ├── cart/                  # CartDrawer, CartItem, CartSummary
│   ├── checkout/              # CheckoutPage, AddressStep, ScheduleStep,
│   │                          # PaymentStep, ConfirmationStep
│   ├── ui/                    # Toast, QuantitySelector
│   ├── Navbar.jsx             # Navigation with cart badge
│   ├── Hero.jsx               # Hero section
│   ├── FeaturedCakes.jsx      # Menu with product cards
│   ├── LocationDialog.jsx     # Delivery area popup
│   ├── WhyChooseUs.jsx        # Brand highlights
│   ├── AboutUs.jsx            # About section
│   ├── InstagramSection.jsx   # Instagram feed
│   ├── Testimonials.jsx       # Customer reviews
│   ├── Contact.jsx            # Contact form (WhatsApp)
│   ├── Footer.jsx             # Footer
│   └── WhatsAppButton.jsx     # Floating WhatsApp CTA
├── store/                     # Zustand stores
│   ├── useCartStore.js        # Cart state + localStorage
│   ├── useLocationStore.js    # Delivery location
│   ├── useCheckoutStore.js    # Checkout flow
│   └── useToastStore.js       # Toast notifications
├── data/
│   ├── products.js            # 63-product catalog
│   └── cakes.js               # Menu categories + testimonials
├── config/
│   └── razorpay.js            # Razorpay configuration
├── services/
│   └── emailService.js        # EmailJS integration
├── hooks/
│   └── useScrollAnimation.js  # IntersectionObserver scroll reveals
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Tailwind + custom animations
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Chocolate | `#3E2723` | Primary text, buttons, navbar |
| Cream | `#F5E6D3` | Backgrounds, cards |
| Berry | `#C62828` | Accents, CTAs, badges |
| Gold | `#D4A574` | Highlights, bestseller badges |

---

## Business Info

- **Location:** Ahmedabad, Gujarat, India
- **WhatsApp:** +91 90816 68490
- **Instagram:** [@cake_and_crumb_1](https://instagram.com/cake_and_crumb_1)
- **Ordering:** Online checkout + WhatsApp + Instagram DM

---

## License

This project is private and proprietary to Cake & Crumb.
