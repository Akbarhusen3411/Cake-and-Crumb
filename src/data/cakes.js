/**
 * Static menu data for Cake & Crumb
 * Updated from official 2026 menu
 */

// ─── Full Menu Categories ────────────────────────────────
export const menuCategories = [
  {
    id: 'cheesecake',
    label: 'Cheesecake',
    image: '/images/real-cheesecake-top.jpg',
    priceLabel: '₹90 – ₹140 / slice  |  ₹700 – ₹1,100 / whole',
    note: '*Customisable flavours available on request*',
    items: [
      'Strawberry', 'Blueberry', 'Raspberry', 'Cherry', 'Lemon',
      'Mango', 'Passion Fruit', 'Coconut', 'Guava',
      'Mango & Passion', 'Orange Creamsicle',
      'Chocolate Orange', 'Black Forest', 'Chocolate Chunk',
      'Chocolate (Milk & Dark)', 'Nutella', 'Biscoff',
      'Cookies & Cream', 'Caramel', 'Coffee', 'Pistachio',
    ],
  },
  {
    id: 'cakes',
    label: 'Cakes',
    image: '/images/real-chocolate-cake.jpg',
    priceLabel: '₹70 – ₹950',
    note: null,
    subcategories: [
      {
        title: 'Cupcakes',
        price: '₹100 each',
        items: ['Chocolate', 'Vanilla'],
      },
      {
        title: 'Milk Cake 6"',
        price: '₹100 – ₹120 / slice  |  ₹800 – ₹950 / whole',
        items: ['Biscoff', 'Tres Leches', 'Rose', 'Turkish', 'Chocolate', 'Raspberry', 'Pistachio'],
      },
      {
        title: 'Bakes',
        price: '₹70 – ₹120 per piece',
        items: ['Brownie', 'Blondie', 'Cakesicle (Square)', 'Cakesicle (Circle)', 'Cake Pop', 'Choc Covered Strawberry'],
      },
      {
        title: 'Platters',
        price: '₹170 per stack',
        items: ['Pancakes (stack of 3)', 'Crepes (stack of 3)'],
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    image: '/images/real-pistachio-biscuits.jpg',
    priceLabel: '₹55 – ₹90 each  |  ₹360 – ₹680 / box',
    note: '*Mixed or single flavour boxes*',
    items: [
      'Triple Chocolate', 'White Chocolate', 'Classic',
      'Red Velvet', 'Almond', 'Coconut',
      'Pistachio & Rose',
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    image: '/images/real-rose-milkcake.jpg',
    priceLabel: '₹80 – ₹150 each',
    note: null,
    items: [
      'Custard Cup', 'Cheesecake Cup', 'Trifle Cup',
      'Jelly Cup', 'Grass Cup (Ghas)',
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    image: '/images/real-chocolate-pancakes.jpg',
    priceLabel: '₹90 – ₹180',
    note: null,
    subcategories: [
      {
        title: 'Mojitos',
        price: '₹120 – ₹130 per glass',
        items: ['Virgin Mojito', 'Blue Lagoon Mojito', 'Strawberry Mojito', 'Any Fruit Flavour'],
      },
      {
        title: 'Milkshakes',
        price: '₹160 – ₹180 per glass',
        items: ['Any Fruit Flavour', 'Biscoff', 'Nutella', 'Oreo', 'Any Chocolate Flavour'],
      },
      {
        title: 'Coffee',
        price: '₹90 – ₹100',
        items: ['Iced Coffee', 'Hot Coffee'],
      },
    ],
  },
  {
    id: 'coming-soon',
    label: 'Coming Soon',
    image: '/images/real-cakesicles.jpg',
    priceLabel: 'New additions coming soon!',
    note: 'Stay tuned — follow @cake_and_crumb_1 for launch updates!',
    items: [
      'Doughnuts', 'Bombolone',
      'Cookie Fries — ₹200', 'Brownie Cheesecake — ₹1,100',
      'Dipped Cheesecake Slice — ₹200', 'Rice Krispies Treats — ₹90',
      'Macarons — ₹120',
      'Cookie Dipping Box — ₹420', 'Brownie Dipping Box — ₹450',
      'Brookie Dipping Box — ₹470',
    ],
  },
]

// ─── Featured Cards (for hero-like display) ──────────────
export const featuredItems = [
  {
    id: 1,
    name: 'Cheesecake Collection',
    description: '21 handcrafted flavours — from Strawberry to Pistachio. Whole cakes & slices!',
    image: '/images/real-strawberry-cheesecake.jpg',
    priceRange: 'From ₹90',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Fresh-Baked Cookies',
    description: 'Warm, gooey cookies in 7 irresistible flavours. Mix & match your box.',
    image: '/images/real-triple-choc-cookies.jpg',
    priceRange: 'From ₹55',
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Dessert Cups',
    description: 'Layered cups of creamy goodness — custard, cheesecake, trifle & more.',
    image: '/images/real-biscoff-cups.jpg',
    priceRange: 'From ₹80',
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
