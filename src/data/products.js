/**
 * Product catalog for Cake & Crumb e-commerce
 * Updated prices from official 2026 menu
 * Each product has a unique image matching its name/flavour
 */

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const img = (path) => `${BASE}${path}`

export const productCategories = [
  { id: 'cheesecake', label: 'Cheesecake' },
  { id: 'cakes', label: 'Cakes & Treats' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

// Cheesecake subgroup definitions for section display
export const cheesecakeSubgroups = [
  { id: 'classic', label: 'Classic' },
  { id: 'exotic', label: 'Exotic' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'premium', label: 'Premium' },
]

export const products = [
  // ─── Cheesecake — Per Slice ───

  // Classic
  { id: 'cs-strawberry', name: 'Strawberry Cheesecake Slice', shortName: 'Strawberry', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'strawberry', price: 120, unit: 'slice', image: img('/images/real-strawberry-cheesecake.jpg'), description: 'Classic NY-style with fresh strawberry compote', inStock: true, isBestseller: true },
  { id: 'cs-blueberry', name: 'Blueberry Cheesecake Slice', shortName: 'Blueberry', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'blueberry', price: 140, unit: 'slice', image: img('/images/blueberry-cheesecake.jpg'), description: 'Creamy cheesecake topped with blueberry sauce', inStock: true, isBestseller: false },
  { id: 'cs-raspberry', name: 'Raspberry Cheesecake Slice', shortName: 'Raspberry', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'raspberry', price: 140, unit: 'slice', image: img('/images/raspberry-cake.jpg'), description: 'Tangy raspberry coulis on velvety cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-orange', name: 'Orange Creamsicle Cheesecake Slice', shortName: 'Orange Creamsicle', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'orange', price: 130, unit: 'slice', image: img('/images/orange-dessert.jpg'), description: 'Nostalgic orange-vanilla swirl', inStock: true, isBestseller: false },
  { id: 'cs-lemon', name: 'Lemon Cheesecake Slice', shortName: 'Lemon', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'lemon', price: 120, unit: 'slice', image: img('/images/real-lemon-cheesecake.jpg'), description: 'Bright lemon curd on a buttery biscuit base', inStock: true, isBestseller: false },
  { id: 'cs-rose', name: 'Rose Cheesecake Slice', shortName: 'Rose', category: 'cheesecake', subcategory: 'slice', subgroup: 'classic', flavourKey: 'rose', price: 120, unit: 'slice', image: img('/images/rose-cake.jpg'), description: 'Delicate rose-infused cheesecake', inStock: true, isBestseller: false },

  // Exotic
  { id: 'cs-mango', name: 'Mango Cheesecake Slice', shortName: 'Mango', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'mango', price: 120, unit: 'slice', image: img('/images/mango-dessert.jpg'), description: 'Tropical Alphonso mango on creamy base', inStock: true, isBestseller: true },
  { id: 'cs-passionfruit', name: 'Passion Fruit Cheesecake Slice', shortName: 'Passion Fruit', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'passionfruit', price: 120, unit: 'slice', image: img('/images/passion-fruit.jpg'), description: 'Exotic passion fruit with a tangy twist', inStock: true, isBestseller: false },
  { id: 'cs-cherry', name: 'Cherry Cheesecake Slice', shortName: 'Cherry', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'cherry', price: 120, unit: 'slice', image: img('/images/cherry-dessert.jpg'), description: 'Rich cherry compote over smooth cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-guava', name: 'Guava Cheesecake Slice', shortName: 'Guava', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'guava', price: 120, unit: 'slice', image: img('/images/guava-dessert.jpg'), description: 'Sweet Indian guava topping on smooth base', inStock: true, isBestseller: false },
  { id: 'cs-mango-passion', name: 'Mango & Passion Cheesecake Slice', shortName: 'Mango & Passion', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'mango-passion', price: 130, unit: 'slice', image: img('/images/mango-dessert.jpg'), description: 'The best of both tropical worlds', inStock: true, isBestseller: false },
  { id: 'cs-coconut', name: 'Coconut Cheesecake Slice', shortName: 'Coconut', category: 'cheesecake', subcategory: 'slice', subgroup: 'exotic', flavourKey: 'coconut', price: 130, unit: 'slice', image: img('/images/coconut-dessert.jpg'), description: 'Creamy coconut-infused cheesecake', inStock: true, isBestseller: false },

  // Chocolate
  { id: 'cs-chocolate', name: 'Chocolate Cheesecake Slice', shortName: 'Chocolate', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'chocolate', price: 130, unit: 'slice', image: img('/images/real-chocolate-cake.jpg'), description: 'Milk & dark chocolate double layer', inStock: true, isBestseller: true },
  { id: 'cs-choc-orange', name: 'Chocolate Orange Cheesecake Slice', shortName: 'Chocolate Orange', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'choc-orange', price: 130, unit: 'slice', image: img('/images/chocolate-cake-rich.jpg'), description: 'Dark chocolate meets zesty orange', inStock: true, isBestseller: false },
  { id: 'cs-blackforest', name: 'Black Forest Cheesecake Slice', shortName: 'Black Forest', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'blackforest', price: 130, unit: 'slice', image: img('/images/black-forest-cake.jpg'), description: 'Chocolate, cherry & cream classic reimagined', inStock: true, isBestseller: false },
  { id: 'cs-choc-chunk', name: 'Chocolate Chunk Cheesecake Slice', shortName: 'Choc Chunk', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'choc-chunk', price: 130, unit: 'slice', image: img('/images/chocolate-cake-rich.jpg'), description: 'Loaded with premium chocolate chunks', inStock: true, isBestseller: false },
  { id: 'cs-nutella', name: 'Nutella Cheesecake Slice', shortName: 'Nutella', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'nutella', price: 160, unit: 'slice', image: img('/images/nutella-dessert.jpg'), description: 'Swirled with real Nutella throughout', inStock: true, isBestseller: true },
  { id: 'cs-biscoff', name: 'Biscoff Cheesecake Slice', shortName: 'Biscoff', category: 'cheesecake', subcategory: 'slice', subgroup: 'chocolate', flavourKey: 'biscoff', price: 150, unit: 'slice', image: img('/images/biscoff-cake.jpg'), description: 'Lotus Biscoff cookie butter bliss', inStock: true, isBestseller: true },

  // Premium
  { id: 'cs-cookies-cream', name: 'Cookies & Cream Cheesecake Slice', shortName: 'Cookies & Cream', category: 'cheesecake', subcategory: 'slice', subgroup: 'premium', flavourKey: 'cookies-cream', price: 150, unit: 'slice', image: img('/images/cookies-cream-cake.jpg'), description: 'Crushed Oreo cookies in every bite', inStock: true, isBestseller: false },
  { id: 'cs-caramel', name: 'Caramel Cheesecake Slice', shortName: 'Caramel', category: 'cheesecake', subcategory: 'slice', subgroup: 'premium', flavourKey: 'caramel', price: 150, unit: 'slice', image: img('/images/caramel-dessert.jpg'), description: 'Salted caramel drizzle on buttery base', inStock: true, isBestseller: false },
  { id: 'cs-coffee', name: 'Coffee Cheesecake Slice', shortName: 'Coffee', category: 'cheesecake', subcategory: 'slice', subgroup: 'premium', flavourKey: 'coffee', price: 150, unit: 'slice', image: img('/images/coffee-cake.jpg'), description: 'Real espresso-infused cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-pistachio', name: 'Pistachio Cheesecake Slice', shortName: 'Pistachio', category: 'cheesecake', subcategory: 'slice', subgroup: 'premium', flavourKey: 'pistachio', price: 160, unit: 'slice', image: img('/images/pistachio-dessert.jpg'), description: 'Premium pistachio paste swirl', inStock: true, isBestseller: false },
  { id: 'cs-dubai', name: 'Dubai Special Cheesecake Slice', shortName: 'Dubai Special', category: 'cheesecake', subcategory: 'slice', subgroup: 'premium', flavourKey: 'dubai', price: 170, unit: 'slice', image: img('/images/caramel-dessert.jpg'), description: 'Luxurious Dubai-inspired special cheesecake', inStock: true, isBestseller: false },

  // ─── Cheesecake — Banto Cake (4" · 3 slices · 300–350 gm) ───
  { id: 'cb-strawberry', name: 'Strawberry Banto Cake', shortName: 'Strawberry Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'strawberry', price: 350, unit: 'banto', image: img('/images/real-strawberry-cheesecake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: true },
  { id: 'cb-blueberry', name: 'Blueberry Banto Cake', shortName: 'Blueberry Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'blueberry', price: 410, unit: 'banto', image: img('/images/blueberry-cheesecake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-raspberry', name: 'Raspberry Banto Cake', shortName: 'Raspberry Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'raspberry', price: 410, unit: 'banto', image: img('/images/raspberry-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-orange', name: 'Orange Creamsicle Banto Cake', shortName: 'Orange Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'orange', price: 380, unit: 'banto', image: img('/images/orange-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-lemon', name: 'Lemon Banto Cake', shortName: 'Lemon Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'lemon', price: 350, unit: 'banto', image: img('/images/real-lemon-cheesecake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-rose', name: 'Rose Banto Cake', shortName: 'Rose Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'classic', flavourKey: 'rose', price: 350, unit: 'banto', image: img('/images/rose-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },

  { id: 'cb-mango', name: 'Mango Banto Cake', shortName: 'Mango Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'mango', price: 350, unit: 'banto', image: img('/images/mango-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-passionfruit', name: 'Passion Fruit Banto Cake', shortName: 'Passion Fruit Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'passionfruit', price: 350, unit: 'banto', image: img('/images/passion-fruit.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-cherry', name: 'Cherry Banto Cake', shortName: 'Cherry Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'cherry', price: 350, unit: 'banto', image: img('/images/cherry-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-guava', name: 'Guava Banto Cake', shortName: 'Guava Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'guava', price: 350, unit: 'banto', image: img('/images/guava-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-mango-passion', name: 'Mango & Passion Banto Cake', shortName: 'Mango & Passion Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'mango-passion', price: 380, unit: 'banto', image: img('/images/mango-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-coconut', name: 'Coconut Banto Cake', shortName: 'Coconut Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'exotic', flavourKey: 'coconut', price: 380, unit: 'banto', image: img('/images/coconut-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },

  { id: 'cb-chocolate', name: 'Chocolate Banto Cake', shortName: 'Chocolate Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'chocolate', price: 380, unit: 'banto', image: img('/images/real-chocolate-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-choc-orange', name: 'Chocolate Orange Banto Cake', shortName: 'Choc Orange Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'choc-orange', price: 380, unit: 'banto', image: img('/images/chocolate-cake-rich.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-blackforest', name: 'Black Forest Banto Cake', shortName: 'Black Forest Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'blackforest', price: 380, unit: 'banto', image: img('/images/black-forest-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-choc-chunk', name: 'Chocolate Chunk Banto Cake', shortName: 'Choc Chunk Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'choc-chunk', price: 380, unit: 'banto', image: img('/images/chocolate-cake-rich.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-nutella', name: 'Nutella Banto Cake', shortName: 'Nutella Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'nutella', price: 460, unit: 'banto', image: img('/images/nutella-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: true },
  { id: 'cb-biscoff', name: 'Biscoff Banto Cake', shortName: 'Biscoff Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'chocolate', flavourKey: 'biscoff', price: 430, unit: 'banto', image: img('/images/biscoff-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: true },

  { id: 'cb-cookies-cream', name: 'Cookies & Cream Banto Cake', shortName: 'Cookies & Cream Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'premium', flavourKey: 'cookies-cream', price: 430, unit: 'banto', image: img('/images/cookies-cream-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-caramel', name: 'Caramel Banto Cake', shortName: 'Caramel Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'premium', flavourKey: 'caramel', price: 430, unit: 'banto', image: img('/images/caramel-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-coffee', name: 'Coffee Banto Cake', shortName: 'Coffee Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'premium', flavourKey: 'coffee', price: 430, unit: 'banto', image: img('/images/coffee-cake.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-pistachio', name: 'Pistachio Banto Cake', shortName: 'Pistachio Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'premium', flavourKey: 'pistachio', price: 470, unit: 'banto', image: img('/images/pistachio-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },
  { id: 'cb-dubai', name: 'Dubai Special Banto Cake', shortName: 'Dubai Banto', category: 'cheesecake', subcategory: 'banto', subgroup: 'premium', flavourKey: 'dubai', price: 500, unit: 'banto', image: img('/images/caramel-dessert.jpg'), description: 'Banto 4" · 3 slices · 300–350 gm', inStock: true, isBestseller: false },

  // ─── Cakes & Treats ───
  // Cupcakes
  { id: 'ck-cupcake-choc', name: 'Chocolate Cupcake', shortName: 'Choc Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 100, unit: 'piece', image: img('/images/real-cupcakes-pink.jpg'), description: 'Rich chocolate cupcake with swirled frosting', inStock: true, isBestseller: false },
  { id: 'ck-cupcake-van', name: 'Vanilla Cupcake', shortName: 'Vanilla Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 100, unit: 'piece', image: img('/images/real-cupcakes-rose-box.jpg'), description: 'Classic vanilla cupcake with buttercream', inStock: true, isBestseller: false },

  // Milk Cake 6" — Whole
  { id: 'ck-milk-biscoff', name: 'Biscoff Milk Cake', shortName: 'Biscoff Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: img('/images/biscoff-cake.jpg'), description: 'Moist milk cake soaked in Biscoff goodness', inStock: true, isBestseller: true },
  { id: 'ck-milk-tres', name: 'Tres Leches Cake', shortName: 'Tres Leches', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: img('/images/real-rose-milkcake-bulk.jpg'), description: 'Three-milk soaked sponge, silky smooth', inStock: true, isBestseller: false },
  { id: 'ck-milk-rose', name: 'Rose Milk Cake', shortName: 'Rose Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: img('/images/rose-cake.jpg'), description: 'Delicate rose-infused milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-turkish', name: 'Turkish Milk Cake', shortName: 'Turkish Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 850, unit: 'whole', image: img('/images/turkish-dessert.jpg'), description: 'Exotic Turkish-style drenched cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-choc', name: 'Chocolate Milk Cake', shortName: 'Choc Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 850, unit: 'whole', image: img('/images/real-chocolate-cake.jpg'), description: 'Chocolate milk-soaked indulgence', inStock: true, isBestseller: false },
  { id: 'ck-milk-raspberry', name: 'Raspberry Milk Cake', shortName: 'Raspberry Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 900, unit: 'whole', image: img('/images/raspberry-cake.jpg'), description: 'Berry-topped milk cake delight', inStock: true, isBestseller: false },
  { id: 'ck-milk-pistachio', name: 'Pistachio Milk Cake', shortName: 'Pistachio Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 950, unit: 'whole', image: img('/images/pistachio-dessert.jpg'), description: 'Premium pistachio cream milk cake', inStock: true, isBestseller: false },

  // Milk Cake 6" — Slices
  { id: 'ck-milk-biscoff-sl', name: 'Biscoff Milk Cake Slice', shortName: 'Biscoff Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: img('/images/biscoff-cake.jpg'), description: 'Single slice of Biscoff milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-tres-sl', name: 'Tres Leches Slice', shortName: 'Tres Leches Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: img('/images/real-rose-milkcake-bulk.jpg'), description: 'Single slice of Tres Leches', inStock: true, isBestseller: false },
  { id: 'ck-milk-rose-sl', name: 'Rose Milk Cake Slice', shortName: 'Rose Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: img('/images/rose-cake.jpg'), description: 'Single slice of Rose milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-turkish-sl', name: 'Turkish Milk Cake Slice', shortName: 'Turkish Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 110, unit: 'slice', image: img('/images/turkish-dessert.jpg'), description: 'Single slice of Turkish milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-choc-sl', name: 'Chocolate Milk Cake Slice', shortName: 'Choc Milk Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 110, unit: 'slice', image: img('/images/real-chocolate-cake.jpg'), description: 'Single slice of Chocolate milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-raspberry-sl', name: 'Raspberry Milk Cake Slice', shortName: 'Raspberry Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 115, unit: 'slice', image: img('/images/raspberry-cake.jpg'), description: 'Single slice of Raspberry milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-pistachio-sl', name: 'Pistachio Milk Cake Slice', shortName: 'Pistachio Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 120, unit: 'slice', image: img('/images/pistachio-dessert.jpg'), description: 'Single slice of Pistachio milk cake', inStock: true, isBestseller: false },

  // Bakes & Treats
  { id: 'ck-brownie', name: 'Fudge Brownie', shortName: 'Brownie', category: 'cakes', subcategory: 'treats', price: 80, unit: 'piece', image: img('/images/real-brownies.jpg'), description: 'Dense, fudgy chocolate brownie', inStock: true, isBestseller: true },
  { id: 'ck-blondie', name: 'Blondie', shortName: 'Blondie', category: 'cakes', subcategory: 'treats', price: 80, unit: 'piece', image: img('/images/blondie.jpg'), description: 'Buttery vanilla brownie with white choc', inStock: true, isBestseller: false },
  { id: 'ck-cakesicle-sq', name: 'Cakesicle (Square)', shortName: 'Cakesicle Sq', category: 'cakes', subcategory: 'treats', price: 120, unit: 'piece', image: img('/images/real-cakesicles.jpg'), description: 'Square cake on a stick, dipped in chocolate', inStock: true, isBestseller: false },
  { id: 'ck-cakesicle-cr', name: 'Cakesicle (Circle)', shortName: 'Cakesicle Circle', category: 'cakes', subcategory: 'treats', price: 120, unit: 'piece', image: img('/images/real-cakesicles.jpg'), description: 'Round cake on a stick, dipped in chocolate', inStock: true, isBestseller: false },
  { id: 'ck-cakepop', name: 'Cake Pops', shortName: 'Cake Pop', category: 'cakes', subcategory: 'treats', price: 90, unit: 'piece', image: img('/images/cake-pop.jpg'), description: 'Bite-size cake balls on a stick', inStock: true, isBestseller: false },
  { id: 'ck-choc-strawberry', name: 'Choc Covered Strawberry', shortName: 'Choc Strawberry', category: 'cakes', subcategory: 'treats', price: 70, unit: 'piece', image: img('/images/real-strawberry-slices.jpg'), description: 'Fresh strawberry dipped in couverture', inStock: true, isBestseller: false },

  // Platters
  { id: 'ck-pancakes', name: 'Fluffy Pancakes', shortName: 'Pancakes', category: 'cakes', subcategory: 'platters', price: 170, unit: 'stack of 3', image: img('/images/real-chocolate-pancakes.jpg'), description: 'Stack of 3 fluffy pancakes with toppings', inStock: true, isBestseller: false },
  { id: 'ck-crepes', name: 'French Crepes', shortName: 'Crepes', category: 'cakes', subcategory: 'platters', price: 170, unit: 'stack of 3', image: img('/images/real-crepes.jpg'), description: 'Stack of 3 thin crepes with Nutella & berries', inStock: true, isBestseller: false },

  // ─── Cookies ───
  { id: 'co-triple-choc', name: 'Triple Chocolate Cookie', shortName: 'Triple Choc', category: 'cookies', subcategory: 'single', price: 60, unit: 'piece', image: img('/images/real-triple-choc-cookies.jpg'), description: 'Dark, milk & white chocolate loaded', inStock: true, isBestseller: true },
  { id: 'co-white-choc', name: 'White Chocolate Cookie', shortName: 'White Choc', category: 'cookies', subcategory: 'single', price: 50, unit: 'piece', image: img('/images/coconut-cookie.jpg'), description: 'Creamy white chocolate chunks', inStock: true, isBestseller: false },
  { id: 'co-classic', name: 'Classic Choc Chip Cookie', shortName: 'Classic', category: 'cookies', subcategory: 'single', price: 50, unit: 'piece', image: img('/images/real-triple-choc-cookies.jpg'), description: 'Timeless chocolate chip perfection', inStock: true, isBestseller: false },
  { id: 'co-red-velvet', name: 'Red Velvet Cookie', shortName: 'Red Velvet', category: 'cookies', subcategory: 'single', price: 60, unit: 'piece', image: img('/images/red-velvet-cookie.jpg'), description: 'Red velvet with white choc chips', inStock: true, isBestseller: false },
  { id: 'co-almond', name: 'Almond Cookie', shortName: 'Almond', category: 'cookies', subcategory: 'single', price: 70, unit: 'piece', image: img('/images/almond-cookie.jpg'), description: 'Crunchy almond butter cookie', inStock: true, isBestseller: false },
  { id: 'co-coconut', name: 'Coconut Cookie', shortName: 'Coconut', category: 'cookies', subcategory: 'single', price: 60, unit: 'piece', image: img('/images/coconut-cookie.jpg'), description: 'Toasted coconut flavour in every bite', inStock: true, isBestseller: false },
  { id: 'co-pistachio', name: 'Pistachio & Rose Cookie', shortName: 'Pistachio Rose', category: 'cookies', subcategory: 'single', price: 70, unit: 'piece', image: img('/images/real-pistachio-biscuits.jpg'), description: 'Elegant pistachio cookies with rose', inStock: true, isBestseller: true },
  { id: 'co-box-6', name: 'Cookie Box (6 pcs)', shortName: 'Cookie Box 6', category: 'cookies', subcategory: 'box', price: 340, unit: 'box', image: img('/images/real-triple-choc-cookies.jpg'), description: 'Mix & match 6 cookies (₹280–₹400 by flavour)', inStock: true, isBestseller: true },
  { id: 'co-box-12', name: 'Cookie Box (12 pcs)', shortName: 'Cookie Box 12', category: 'cookies', subcategory: 'box', price: 700, unit: 'box', image: img('/images/real-triple-choc-cookies.jpg'), description: 'Mix & match 12 cookies (₹580–₹820 by flavour)', inStock: true, isBestseller: false },

  // ─── Desserts ───
  { id: 'ds-custard', name: 'Custard Cup', shortName: 'Custard Cup', category: 'desserts', subcategory: 'cups', price: 90, unit: 'cup', image: img('/images/custard-cup.jpg'), description: 'Creamy vanilla custard layered cup', inStock: true, isBestseller: false },
  { id: 'ds-cheesecake-cup', name: 'Cheesecake Cup', shortName: 'Cheesecake Cup', category: 'desserts', subcategory: 'cups', price: 150, unit: 'cup', image: img('/images/real-biscoff-cups.jpg'), description: 'Mini cheesecake in a cup with topping', inStock: true, isBestseller: true },
  { id: 'ds-trifle', name: 'Trifle Cup', shortName: 'Trifle Cup', category: 'desserts', subcategory: 'cups', price: 100, unit: 'cup', image: img('/images/trifle-cup.jpg'), description: 'Layered sponge, cream & fruit trifle', inStock: true, isBestseller: false },
  { id: 'ds-jelly', name: 'Jelly Cup', shortName: 'Jelly Cup', category: 'desserts', subcategory: 'cups', price: 80, unit: 'cup', image: img('/images/jelly-cup.jpg'), description: 'Wobbly fruity jelly with cream topping', inStock: true, isBestseller: false },
  { id: 'ds-grass', name: 'Grass Cup (Ghas)', shortName: 'Grass Cup', category: 'desserts', subcategory: 'cups', price: 90, unit: 'cup', image: img('/images/real-biscoff-cups.jpg'), description: 'Unique grass-themed layered dessert', inStock: true, isBestseller: false },

  // ─── Drinks — Mojitos ───
  { id: 'dr-virgin-mojito', name: 'Virgin Mojito', shortName: 'Virgin Mojito', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: img('/images/mojito-drink.jpg'), description: 'Classic lime & mint refresher', inStock: true, isBestseller: false },
  { id: 'dr-blue-lagoon', name: 'Blue Lagoon Mojito', shortName: 'Blue Lagoon', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: img('/images/blue-lagoon.jpg'), description: 'Electric blue citrus cooler', inStock: true, isBestseller: true },
  { id: 'dr-strawberry-mojito', name: 'Strawberry Mojito', shortName: 'Strawberry Mojito', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: img('/images/strawberry-mojito.jpg'), description: 'Berry-infused minty freshness', inStock: true, isBestseller: false },
  { id: 'dr-fruit-mojito', name: 'Any Fruit Mojito', shortName: 'Fruit Mojito', category: 'drinks', subcategory: 'mojitos', price: 130, unit: 'glass', image: img('/images/mojito-drink.jpg'), description: 'Pick your favourite fruit flavour', inStock: true, isBestseller: false },

  // ─── Drinks — Milkshakes ───
  { id: 'dr-shake-fruit', name: 'Fruit Milkshake', shortName: 'Fruit Shake', category: 'drinks', subcategory: 'milkshakes', price: 160, unit: 'glass', image: img('/images/milkshake-drink.jpg'), description: 'Any fruit flavour milkshake', inStock: true, isBestseller: false },
  { id: 'dr-shake-biscoff', name: 'Biscoff Milkshake', shortName: 'Biscoff Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: img('/images/milkshake-drink.jpg'), description: 'Thick Biscoff cookie butter shake', inStock: true, isBestseller: true },
  { id: 'dr-shake-nutella', name: 'Nutella Milkshake', shortName: 'Nutella Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: img('/images/nutella-dessert.jpg'), description: 'Rich Nutella blended to perfection', inStock: true, isBestseller: false },
  { id: 'dr-shake-oreo', name: 'Oreo Milkshake', shortName: 'Oreo Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: img('/images/cookies-cream-cake.jpg'), description: 'Cookies & cream milkshake bliss', inStock: true, isBestseller: false },
  { id: 'dr-shake-choc', name: 'Chocolate Milkshake', shortName: 'Choc Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: img('/images/chocolate-cake-rich.jpg'), description: 'Any chocolate flavour shake', inStock: true, isBestseller: false },

  // ─── Drinks — Coffee ───
  { id: 'dr-iced-coffee', name: 'Iced Coffee', shortName: 'Iced Coffee', category: 'drinks', subcategory: 'coffee', price: 100, unit: 'glass', image: img('/images/iced-coffee.jpg'), description: 'Chilled coffee with cream', inStock: true, isBestseller: false },
  { id: 'dr-hot-coffee', name: 'Hot Coffee', shortName: 'Hot Coffee', category: 'drinks', subcategory: 'coffee', price: 90, unit: 'cup', image: img('/images/hot-coffee.jpg'), description: 'Freshly brewed hot coffee', inStock: true, isBestseller: false },
]

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId)
}

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export const deliveryAreas = [
  'Satellite', 'Prahlad Nagar', 'Vastrapur', 'Bodakdev', 'Thaltej',
  'S.G. Highway', 'Bopal', 'South Bopal', 'Ambli', 'Shilaj',
  'Navrangpura', 'Paldi', 'Ellis Bridge', 'C.G. Road', 'Ashram Road',
  'Maninagar', 'Naranpura', 'Gota', 'Chandkheda', 'Motera',
  'Memnagar', 'Gurukul', 'Drive-In', 'Sola', 'Science City',
  'Nehru Nagar', 'Jodhpur', 'Vejalpur', 'Jivraj Park', 'Other Area',
]
