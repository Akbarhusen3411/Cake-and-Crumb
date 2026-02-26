/**
 * Static menu data for Cake & Crumb
 * Built from the official Cake & Crumb menu
 *
 * Phase 2: Connect to MongoDB for dynamic product management
 * Phase 3: Add inventory tracking, availability status
 */

// ─── Full Menu Categories ────────────────────────────────
export const menuCategories = [
  {
    id: 'cheesecake',
    label: 'Cheesecake',
    image: '/images/real-cheesecake-top.jpg',
    priceLabel: '₹99 – ₹249 / slice  |  ₹399 – ₹699 / whole',
    note: '*Customisable — choose any flavour combo*',
    items: [
      'Strawberry', 'Blueberry', 'Raspberry', 'Cherry',
      'Mango', 'Passion Fruit', 'Lemon', 'Coconut',
      'Guava', 'Mango & Passion', 'Orange Creamsicle',
      'Chocolate Orange', 'Black Forest', 'Chocolate Chunk',
      'Chocolate (Milk & Dark)', 'Nutella', 'Biscoff',
      'Cookies & Cream', 'Caramel', 'Coffee', 'Pistachio',
    ],
  },
  {
    id: 'cakes',
    label: 'Cakes',
    image: '/images/real-chocolate-cake.jpg',
    priceLabel: '₹79 – ₹599',
    note: null,
    subcategories: [
      {
        title: 'Cupcakes',
        price: '₹79 – ₹129 each',
        items: ['Chocolate', 'Vanilla'],
      },
      {
        title: 'Milk Cake',
        price: '₹299 – ₹599',
        items: ['Biscoff', 'Tres Leches', 'Rose', 'Turkish', 'Chocolate', 'Pistachio', 'Raspberry'],
      },
      {
        title: 'More Treats',
        price: '₹99 – ₹499',
        items: ['Brownies', 'Blondies', 'Chocolate Covered Strawberries', 'Cakesicles (Square & Circle)', 'Cakepops', 'Pancakes', 'Crepes'],
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    image: '/images/real-pistachio-biscuits.jpg',
    priceLabel: '₹49 – ₹99 each  |  ₹299 – ₹499 / box',
    note: '*Customisable — mix & match your box*',
    items: [
      'Triple Choc', 'White Choc', 'Classic',
      'Red Velvet', 'Pistachio & Rose Biscuits',
      'Almond', 'Coconut',
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    image: '/images/real-rose-milkcake.jpg',
    priceLabel: '₹99 – ₹199 each',
    note: null,
    items: [
      'Custard Cups', 'Cheesecake Cups', 'Trifle Cups',
      'Jelly Cups', 'Grass Cups (Ghas)',
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    image: '/images/real-chocolate-pancakes.jpg',
    priceLabel: '₹79 – ₹199',
    note: null,
    subcategories: [
      {
        title: 'Mojitos',
        price: '₹99 – ₹149',
        items: ['Virgin Mojito', 'Blue Lagoon Mojito', 'Strawberry Mojito', 'Any Fruit Flavour'],
      },
      {
        title: 'Milkshakes',
        price: '₹129 – ₹199',
        items: ['Any Fruit Flavour', 'Biscoff', 'Nutella', 'Oreo', 'Any Chocolate Flavour'],
      },
      {
        title: 'Coffee',
        price: '₹79 – ₹149',
        items: ['Iced Coffee', 'Hot Coffee'],
      },
    ],
  },
  {
    id: 'coming-soon',
    label: 'Coming Soon',
    image: '/images/real-cakesicles.jpg',
    priceLabel: 'Prices revealed soon',
    note: 'Stay tuned — follow @cake_and_crumb_1 for launch updates!',
    items: [
      'Doughnuts', 'Bombolone', 'Cookie Dipping Box',
      'Brownie Dipping Box', 'Brookie Dipping Box',
      'Cookie Fries', 'Brownie Cheesecake', 'Blondies',
      'Dipped Cheesecake Slice', 'Rice Krispies Treats', 'Macarons',
    ],
  },
]

// ─── Featured Cards (for hero-like display) ──────────────
export const featuredItems = [
  {
    id: 1,
    name: 'Cheesecake Collection',
    description: '21 handcrafted flavours — from Strawberry to Pistachio. Customise your own!',
    image: '/images/real-strawberry-cheesecake.jpg',
    priceRange: 'From ₹99',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Fresh-Baked Cookies',
    description: 'Warm, gooey cookies in 7 irresistible flavours. Mix & match your box.',
    image: '/images/real-triple-choc-cookies.jpg',
    priceRange: 'From ₹49',
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Dessert Cups',
    description: 'Layered cups of creamy goodness — custard, cheesecake, trifle & more.',
    image: '/images/real-biscoff-cups.jpg',
    priceRange: 'From ₹99',
    badge: 'New',
  },
]

// ─── Testimonials ────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'Ahmedabad',
    text: 'The Biscoff cheesecake was absolutely divine! You can taste the difference when ingredients are fresh. Cake & Crumb is now my go-to for every celebration.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul M.',
    location: 'Ahmedabad',
    text: 'Ordered the cookie box for my wife\'s birthday and she was blown away. The Triple Choc cookies are dangerously good!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya K.',
    location: 'Ahmedabad',
    text: 'Finally a bakery in Ahmedabad that does premium cheesecakes properly! The Strawberry cheesecake was creamy, tangy, and absolutely perfect.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Deepak T.',
    location: 'Ahmedabad',
    text: 'What I love about Cake & Crumb is the personal touch. They customised my order exactly how I wanted. The dessert cups are a must-try!',
    rating: 5,
  },
]

// ─── Why Choose Us ───────────────────────────────────────
export const whyChooseUs = [
  {
    title: 'Handcrafted Daily',
    description: 'Every cake is made fresh to order — never mass-produced, always crafted with care.',
    icon: 'HandHeart',
  },
  {
    title: 'Premium Chocolate',
    description: 'We source the finest couverture chocolate for a rich, melt-in-your-mouth experience.',
    icon: 'Cookie',
  },
  {
    title: 'Fresh Berries',
    description: 'Seasonal, hand-picked berries that bring natural sweetness and vibrant colour.',
    icon: 'Cherry',
  },
  {
    title: 'Custom Orders',
    description: 'Your vision, our craft. DM us to design your dream cake for any occasion.',
    icon: 'Palette',
  },
]
