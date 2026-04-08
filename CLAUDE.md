# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cake & Crumb — "The Gourmet Chocolate & Berry Boutique"
Premium bakery e-commerce website with WhatsApp chatbot ordering, distance-based delivery pricing, and admin order management. Static frontend deployed to GitHub Pages — no backend server.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173) with HMR
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

No test runner or linter is configured.

**GitHub Pages deployment:**
```bash
GITHUB_PAGES=true npm run build   # Build with /Cake-and-Crumb/ base path
npx gh-pages -d dist              # Deploy dist/ to gh-pages branch
```

Auto-deploy: pushing to `master` triggers `.github/workflows/deploy.yml` which builds (without `GITHUB_PAGES` env) and deploys via GitHub Pages Actions. The manual `gh-pages` branch method above is the alternative.

Note: Scripts use `node ./node_modules/vite/bin/vite.js` instead of bare `vite` because the directory name contains `&` which breaks Windows path resolution via npx/node_modules/.bin.

## Architecture

- **React 19** + **Vite 7** + **Tailwind CSS 4** (via @tailwindcss/vite plugin)
- **React Router 7** with `HashRouter` (required for GitHub Pages — no server-side routing)
- **Zustand** for state management (cart persists to localStorage)
- **Lucide React** for icons
- **EmailJS** (`@emailjs/browser`) for order confirmation emails
- Google Fonts: Poppins (headings), Inter (body), Great Vibes (bakery script accents)

### Routing & Code Splitting

All pages are lazy-loaded via `React.lazy()` in `App.jsx`. Routes: `/`, `/menu`, `/about`, `/reviews`, `/contact`, `/faq`, `*` (404). URLs look like `/#/menu`, `/#/about` due to HashRouter. The `PageTransition` component wraps routes for fade animations. `ScrollToTop` resets scroll position on navigation.

### Asset Path Handling

**Critical:** All image paths must use `assetUrl()` from `src/utils/assetPath.js` to work on both localhost (`/`) and GitHub Pages (`/Cake-and-Crumb/`). Never hardcode `/images/...` in JSX — always wrap with `assetUrl('/images/...')`. In data files (`products.js`, `cakes.js`), use the local `img()` helper that wraps `import.meta.env.BASE_URL`.

### Vite Base Path

`vite.config.js` uses conditional base: `process.env.GITHUB_PAGES ? '/Cake-and-Crumb/' : '/'`. Local dev uses `/`, production GitHub Pages build uses `/Cake-and-Crumb/`.

### State Architecture

- **useCartStore** — Cart items array `[{ productId, quantity }]` persisted to localStorage. Computed functions (`getCartItems`, `getSubtotal`, etc.) are exported as plain functions, NOT as Zustand selectors — this prevents infinite re-renders since they return new object references.
- **useCheckoutStore** — Checkout flow state including delivery distance/fee calculated from pincode. Not persisted.
- **useLocationStore** — Delivery location selection.
- **useToastStore** — Toast notification queue.

### Delivery Fee Calculation

Distance-based pricing in `src/utils/deliveryCalculator.js`. Base location: Vaso, Gujarat (22.6678, 72.8989). Free within 5 km, ₹7/km beyond. Uses Haversine formula with coordinates from OpenStreetMap Nominatim geocoding API. Address step fetches location from India Post API (`api.postalpincode.in`) with 5-second AbortController timeout.

### WhatsApp Order Flow

1. Customer builds order (chatbot or cart checkout)
2. Order message sent to admin WhatsApp (9081668490) via `wa.me` URL
3. Admin manages orders manually via WhatsApp (no automated admin links — the message is sent from the customer's phone so only the customer sees it)
4. 30-minute cancellation window with live countdown timer in ConfirmationStep; customer can cancel via button or chatbot

### ChatBot (`src/components/ChatBot.jsx`)

Standalone WhatsApp-style chat widget. Has its own order cart (`orderCart` state), separate from the main cart store. Menu data and orderable items are defined inline. Each orderable item has a `cat` field for category grouping in the WhatsApp order message.

## Business Context

- Bakery located in Vaso, Kheda, Gujarat, India
- Orders via WhatsApp (+91 90816 68490, +91 91731 83440) and Instagram DM (@cake_and_crumb_1)
- 80+ products across 6 categories: Cheesecake (slice/banto), Cakes & Treats, Cookies, Desserts, Drinks, Coming Soon
- Prices from official 2026 menu (cheesecake slices ₹120–₹170, banto 4" cakes ₹350–₹500)
- Gujarat-only delivery with pincode validation

## Color Palette (defined in index.css @theme)

- chocolate: #3E2723, cream: #F5E6D3, berry: #C62828, gold: #D4A574
- Additional: chocolate-light, cream-dark, cream-light, soft-pink, berry-light

## Key Patterns

- **Mobile menu:** Full-screen overlay with CSS `@keyframes` animations (`menu-overlay-in/out`, `menu-item-slide-up`) using `--menu-delay` CSS custom property for staggered entry.
- **Cart on mobile:** Bottom sheet (slides up) via conditional CSS classes. Side drawer on desktop (sm+ breakpoint).
- **Product images:** All compressed to 500x500 q70 via sharp-cli. Stored in `public/images/`.
- **Accessibility:** `prefers-reduced-motion` media query in index.css disables all animations.
- **Checkout keyboard fix:** Form inputs use simple static labels (not floating labels) to prevent re-mount on mobile which closes the keyboard.
