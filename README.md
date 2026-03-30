# Cake & Crumb

**The Gourmet Chocolate & Berry Boutique**

A premium bakery e-commerce website with WhatsApp chatbot, distance-based delivery, and complete order management. Built with React 19, Tailwind CSS 4, and Vite 7.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

**Live:** [akbarhusen3411.github.io/Cake-and-Crumb](https://akbarhusen3411.github.io/Cake-and-Crumb/)

---

## Features

### Multi-Page Routing
- 5 separate pages: Home, Menu, About, Reviews, Contact
- Route-based code splitting with React.lazy (each page loads separately)
- Smooth page transition animations (fade + slide)
- 404 "Not Found" page with bakery theme
- HashRouter for GitHub Pages compatibility

### WhatsApp Auto-Chat Bot
- WhatsApp-style green UI with typing indicator
- Full menu browsing with product images per category
- Interactive ordering: select items with +/- quantity buttons
- Order items grouped by category (Cheesecake, Cookies, etc.)
- Collects customer name, phone, address, delivery date
- Sends formatted order receipt to admin WhatsApp
- Smart text replies: type "menu", "order", "cheesecake", "delivery" etc.
- Keywords: hi, menu, price, order, delivery, contact, location, thanks

### Order Management (WhatsApp-Based)
- **Customer places order** -> admin receives full order on WhatsApp with:
  - Items grouped by category with quantities and prices
  - Subtotal, distance-based delivery fee, grand total
  - Customer name, phone, address, delivery date/time, payment method
- **Admin action links** at bottom of order message:
  - Confirm -> sends confirmation to customer's WhatsApp
  - Shipped -> sends shipping notification to customer
  - Cancel -> sends cancellation to customer
  - Reject -> sends rejection with contact info
- **30-minute cancellation window**:
  - Customer gets cancel button with live countdown timer
  - Auto-disables after 30 minutes
  - Customer can also cancel via chatbot within 30 min

### Distance-Based Delivery Pricing
- Bakery base location: Vaso, Kheda, Gujarat
- 0-5 km from Vaso: FREE delivery
- Above 5 km: Rs.7 per km (full distance)
- Auto-calculated when customer enters pincode:
  1. India Post API fetches district/state/areas
  2. OpenStreetMap Nominatim geocodes pincode to coordinates
  3. Haversine formula calculates distance from Vaso
  4. Fee shown instantly with distance breakdown

### E-Commerce
- **Product Catalog** - 70+ products with unique images, bestseller badges, stock status
- **Shopping Cart** - Bottom sheet on mobile, side drawer on desktop
  - Inline quantity controls, compact item cards
  - WhatsApp quick order button in cart
  - Persistent via localStorage (Zustand)
- **Pincode-Based Address** - Enter pincode, auto-detects district/state/area
  - Gujarat pincodes: delivery available with fee calculation
  - Outside Gujarat: shows "not available" with WhatsApp contact link
  - 5-second timeout on API calls
- **4-Step Checkout**:
  1. Address - Name, phone, email, pincode-based location, full address
  2. Schedule - Next 7 days + 5 time slots (24hr advance)
  3. Payment - Razorpay or Cash on Delivery
  4. Confirmation - Order ID, summary, 30-min cancel countdown

### Design & UX
- Bakery-themed design with Great Vibes script font
- Custom logo throughout (navbar, footer, chatbot)
- Full-screen mobile menu with CSS keyframe staggered animations
- Product cards: 4:3 aspect on mobile, hover zoom on desktop
- Responsive: optimized from 375px mobile to desktop
- Scroll animations (fade-up, slide-left/right) via IntersectionObserver
- GPU-accelerated transitions
- `prefers-reduced-motion` support for accessibility
- Custom color palette: Chocolate, Cream, Berry, Gold

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router 7 (HashRouter) |
| Styling | Tailwind CSS 4 (@tailwindcss/vite) |
| State | Zustand (localStorage persist) |
| Payment | Razorpay |
| Email | EmailJS |
| Icons | Lucide React |
| Fonts | Google Fonts (Poppins, Inter, Great Vibes) |
| Geocoding | OpenStreetMap Nominatim API |
| Postal Data | India Post Pincode API |
| Deployment | GitHub Pages (gh-pages) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Akbarhusen3411/Cake-and-Crumb.git
cd Cake-and-Crumb
npm install
```

### Development

```bash
npm run dev        # Start dev server (localhost:5173) with hot reload
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

> **Note:** Scripts use `node ./node_modules/vite/bin/vite.js` instead of bare `vite` because the directory name contains `&` which breaks Windows path resolution.

### Deployment

```bash
# Build for GitHub Pages
GITHUB_PAGES=true npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

---

## Project Structure

```
src/
├── pages/                       # Route pages (lazy-loaded)
│   ├── HomePage.jsx             # Hero + Featured + WhyChooseUs
│   ├── MenuPage.jsx             # Full menu with product cards
│   ├── AboutPage.jsx            # About Us + Instagram
│   ├── ReviewsPage.jsx          # Testimonials
│   ├── ContactPage.jsx          # Contact form + info
│   └── NotFoundPage.jsx         # 404 page
├── components/
│   ├── cart/                    # CartDrawer, CartItem, CartSummary
│   ├── checkout/                # CheckoutPage, AddressStep, ScheduleStep,
│   │                            # PaymentStep, ConfirmationStep
│   ├── ui/                      # Toast, QuantitySelector
│   ├── ChatBot.jsx              # WhatsApp auto-chat bot
│   ├── Navbar.jsx               # Navigation + full-screen mobile menu
│   ├── Hero.jsx                 # Hero section
│   ├── FeaturedCakes.jsx        # Menu with product grid
│   ├── Footer.jsx               # Footer with links
│   ├── PageTransition.jsx       # Route transition animation
│   ├── ScrollToTop.jsx          # Scroll to top on navigate
│   └── ...                      # About, Contact, Instagram, etc.
├── store/                       # Zustand stores
│   ├── useCartStore.js          # Cart state + computed helpers
│   ├── useCheckoutStore.js      # Checkout flow + delivery fee
│   ├── useLocationStore.js      # Delivery location
│   └── useToastStore.js         # Toast notifications
├── data/
│   ├── products.js              # 70+ products with images & prices
│   ├── cakes.js                 # Menu categories + testimonials
│   └── gujaratLocations.js      # Gujarat districts/talukas/cities
├── utils/
│   ├── assetPath.js             # BASE_URL prefix for GitHub Pages
│   └── deliveryCalculator.js    # Haversine distance + fee calculation
├── config/
│   └── razorpay.js              # Razorpay configuration
├── services/
│   └── emailService.js          # EmailJS integration
├── hooks/
│   └── useScrollAnimation.js    # Scroll reveal animations
├── App.jsx                      # Router + layout + lazy loading
├── main.jsx                     # Entry point
└── index.css                    # Tailwind + animations + reduced motion
```

---

## Configuration

### Razorpay (Payment Gateway)

```js
// src/config/razorpay.js
export const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_HERE'
```

### EmailJS (Order Confirmation Emails)

```js
// src/services/emailService.js
const SERVICE_ID = 'service_YOUR_ID'
const CUSTOMER_TEMPLATE_ID = 'template_YOUR_ID'
const BAKERY_TEMPLATE_ID = 'template_YOUR_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
```

### Delivery Settings

```js
// src/utils/deliveryCalculator.js
const BAKERY_LAT = 22.6678    // Vaso latitude
const BAKERY_LNG = 72.8989    // Vaso longitude
const FREE_RADIUS_KM = 5      // Free delivery radius
const RATE_PER_KM = 7         // Rs. per km after free radius
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

- **Bakery Location:** Vaso, Kheda, Gujarat, India
- **WhatsApp (India):** +91 90816 68490
- **Instagram:** [@cake_and_crumb_1](https://instagram.com/cake_and_crumb_1)
- **Ordering:** Website checkout + WhatsApp chatbot + Instagram DM

---

## License

This project is private and proprietary to Cake & Crumb.
