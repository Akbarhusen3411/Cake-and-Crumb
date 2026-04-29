# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cake & Crumb — "The Gourmet Chocolate & Berry Boutique"
Premium bakery e-commerce website with WhatsApp chatbot ordering, distance-based delivery pricing, customer review system with Google Sheets, and product-wise review display. Static frontend deployed to GitHub Pages — no backend server.

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

The site deploys from the `gh-pages` branch (not via GitHub Actions). Always use the two-step manual deploy above. Pushing to `master` alone does NOT deploy.

Note: `.github/workflows/deploy.yml` exists from a previous setup but is inactive — Pages is configured in repo settings to serve from the `gh-pages` branch, so the workflow's artifact upload is ignored.

Note: Scripts use `node ./node_modules/vite/bin/vite.js` instead of bare `vite` because the directory name contains `&` which breaks Windows path resolution via npx/node_modules/.bin.

## Architecture

- **React 19** + **Vite 7** + **Tailwind CSS 4** (via `@tailwindcss/postcss` in `postcss.config.js`)
- **React Router 7** with `HashRouter` (required for GitHub Pages — no server-side routing)
- **Zustand** for state management (cart persists to localStorage)
- **Lucide React** for icons
- **EmailJS** (`@emailjs/browser`) for order confirmation emails
- Google Fonts: Poppins (headings), Inter (body), Great Vibes (bakery script accents)

### Routing & Code Splitting

All pages are lazy-loaded via `React.lazy()` in `App.jsx`. Routes: `/`, `/menu`, `/about`, `/reviews`, `/contact`, `/faq`, `/review` (write review form), `*` (404). URLs look like `/#/menu`, `/#/review` due to HashRouter. The `PageTransition` component wraps routes for fade animations. `ScrollToTop` resets scroll position on navigation.

### Asset Path Handling

**Critical:** All image paths must use `assetUrl()` from `src/utils/assetPath.js` to work on both localhost (`/`) and GitHub Pages (`/Cake-and-Crumb/`). Never hardcode `/images/...` in JSX — always wrap with `assetUrl('/images/...')`. In data files (`products.js`, `cakes.js`), use the local `img()` helper that wraps `import.meta.env.BASE_URL`.

### Vite Base Path

`vite.config.js` uses conditional base: `process.env.GITHUB_PAGES ? '/Cake-and-Crumb/' : '/'`. Local dev uses `/`, production GitHub Pages build uses `/Cake-and-Crumb/`. Only the `react()` plugin is configured (Tailwind runs via PostCSS).

### State Architecture

- **useCartStore** — Cart items array `[{ productId, quantity }]` persisted to localStorage. Computed functions (`getCartItems`, `getSubtotal`, etc.) are exported as plain functions, NOT as Zustand selectors — this prevents infinite re-renders since they return new object references.
- **useCheckoutStore** — Checkout flow state including delivery distance/fee calculated from pincode. Not persisted.
- **useLocationStore** — Delivery location selection. Location dialog only auto-shows on homepage (`/`), not on other pages like `/review`.
- **useToastStore** — Toast notification queue.

### Customer Review System

Reviews are stored in **Firebase Firestore** (replaced Google Sheets for reliability). Orders still use Google Sheets via Apps Script:
- `src/config/firebase.js` — Firebase app config (Firestore + Storage). **Ships with empty placeholder strings**; the `isFirebaseConfigured()` guard makes review fetch/submit silently no-op until real values are filled in. Don't be surprised when reviews don't load on a fresh clone.
- `src/config/googleSheetOrders.js` — URL for saving orders with admin links (sheet tab: "Orders")

**Review submission** (`src/pages/WriteReviewPage.jsx`): Customer selects product from dropdown, gives star rating, writes text, optionally uploads photo. Photos are resized to 300px max, JPEG 0.5 quality, stored as base64 data URLs. Submission goes directly to Firestore via Firebase SDK (no CORS issues).

**Review display** (`src/components/Testimonials.jsx`): Reviews fetched via `useReviews` hook which caches in localStorage for instant display, then refreshes from Firestore in background. Reviews are filterable by product name. Product cards in the menu show star rating badges with hover popups (2-3 latest reviews). Clicking a badge navigates to `/#/reviews?product=ProductName` with that product's reviews highlighted.

**Review hook** (`src/hooks/useReviews.js`): Module-level cache + localStorage persistence + listener pattern. `submitReview()` writes to Firestore. `addReviewToCache()` for optimistic updates. `getProductReviews()` and `getAverageRating()` for product-specific review data.

### Delivery Fee Calculation

Distance-based pricing in `src/utils/deliveryCalculator.js`. Base location: Vaso, Gujarat (22.6678, 72.8989). Free within 5 km, ₹7/km beyond. Uses Haversine formula with coordinates from OpenStreetMap Nominatim geocoding API. Address step fetches location from India Post API (`api.postalpincode.in`) with 5-second AbortController timeout.

### WhatsApp Order Flow

1. Customer builds order (chatbot or cart checkout)
2. Clean order message sent to admin WhatsApp (9081668490) via `wa.me` URL — no admin links in the message
3. Order data + admin action links saved to Google Sheet "Orders" tab via Apps Script
4. Admin manages orders from the Google Sheet (clickable approve/ship/cancel links)
5. 30-minute cancellation window with live countdown timer in ConfirmationStep

### Order ID Format

Generated by `generateOrderId()` in `src/services/emailService.js`. Format: `CC-{INITIALS}-{DDMMYY}-{NNNN}` (e.g., `CC-AM-080426-0001`). Initials from first + last name. Sequential daily counter stored in localStorage (`cake-crumb-order-counter`), resets each day.

### ChatBot (`src/components/ChatBot.jsx`)

Standalone chat widget themed to match bakery palette (chocolate header, berry accents, cream backgrounds). Has its own order cart (`orderCart` state), separate from the main cart store. Menu data and orderable items are defined inline. Each orderable item has a `cat` field for category grouping in the WhatsApp order message. Accepts international phone numbers (7-15 digits with optional + prefix).

## Business Context

- Bakery located in Vaso, Kheda, Gujarat, India
- Orders via WhatsApp (+91 90816 68490, +91 91731 83440) and Instagram DM (@cake_and_crumb_1)
- 80+ products across 6 categories: Cheesecake (slice/banto), Cakes & Treats, Cookies, Desserts, Drinks, Coming Soon
- Prices from official 2026 menu (cheesecake slices ₹120–₹170, banto 4" cakes ₹350–₹500)
- Gujarat-only delivery with pincode validation
- Review link for customers: `/#/review`

## Color Palette (defined in index.css @theme)

- chocolate: #3E2723, cream: #F5E6D3, berry: #C62828, gold: #D4A574
- Additional: chocolate-light, cream-dark, cream-light, soft-pink, berry-light

## Key Patterns

- **Mobile menu:** Slide-in panel from right (85% width, max 360px) with blur backdrop. Staggered translateX entrance animations using inline `transition` + `transitionDelay`. Uses `menuVisible` state for mount/unmount + `menuOpen` for CSS transitions.
- **Cart on mobile:** Bottom sheet (slides up) with full-panel scrolling (items + summary + checkout all scroll together). Side drawer on desktop (sm+ breakpoint). Body scroll locked via `overflow: hidden` when cart is open.
- **Product cards:** Square aspect ratio on all screens. Grid gaps 12px mobile, 16px desktop. Touch-action: manipulation on all buttons for faster taps.
- **Product images:** All compressed to 500x500 q70 via sharp-cli. Stored in `public/images/`.
- **Accessibility:** `prefers-reduced-motion` media query in index.css disables all animations.
- **Checkout keyboard fix:** Form inputs use simple static labels (not floating labels) to prevent re-mount on mobile which closes the keyboard.
- **Homepage sections:** Hero → Full Menu → Why Choose Us → Customer Reviews → Instagram Feed.
