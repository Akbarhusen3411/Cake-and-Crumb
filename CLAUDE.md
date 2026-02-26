# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cake & Crumb — "The Gourmet Chocolate & Berry Boutique"
A premium bakery brand website built with React + Tailwind CSS (Vite).
Static frontend only — no backend/MongoDB.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

Note: Scripts use `node ./node_modules/vite/bin/vite.js` instead of bare `vite` because the directory name contains `&` which breaks Windows path resolution via npx/node_modules/.bin.

## Architecture

- **React 19** + **Vite 7** + **Tailwind CSS 4** (via @tailwindcss/vite plugin)
- **Lucide React** for icons
- Google Fonts: Cormorant Garamond (headings), Inter (body)
- Single-page app with section-based navigation
- Static data in `src/data/cakes.js`
- Scroll animations via IntersectionObserver (`src/hooks/useScrollAnimation.js`)
- CSS animations defined in `src/index.css` (fade-up, slide-left, slide-right classes)

## Key Sections (in order)

Navbar > Hero > FeaturedCakes > WhyChooseUs > AboutUs > InstagramSection > Testimonials > Contact > Footer + WhatsAppButton (floating)

## Business Context

- Beginner bakery in Ahmedabad, India
- Orders via WhatsApp (+91 90816 68490) and Instagram DM (@cake_and_crumb_1)
- Two price tiers: Celebration (₹699–₹1299) and Premium (₹1399–₹1999)
- No e-commerce cart — all CTAs open WhatsApp or Instagram

## Color Palette (defined in index.css @theme)

- chocolate: #3E2723, cream: #F5E6D3, berry: #C62828, gold: #D4A574
