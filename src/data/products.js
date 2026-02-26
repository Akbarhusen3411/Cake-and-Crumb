/**
 * Product catalog for Cake & Crumb e-commerce
 * Each product has a fixed individual price (no ranges)
 */

export const productCategories = [
  { id: 'cheesecake', label: 'Cheesecake' },
  { id: 'cakes', label: 'Cakes & Treats' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const products = [
  // ─── Cheesecake — Slices ───
  { id: 'cs-strawberry', name: 'Strawberry Cheesecake Slice', shortName: 'Strawberry', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-strawberry-cheesecake.jpg', description: 'Classic NY-style with fresh strawberry compote', inStock: true, isBestseller: true },
  { id: 'cs-blueberry', name: 'Blueberry Cheesecake Slice', shortName: 'Blueberry', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Creamy cheesecake topped with blueberry sauce', inStock: true, isBestseller: false },
  { id: 'cs-raspberry', name: 'Raspberry Cheesecake Slice', shortName: 'Raspberry', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-strawberry-cheesecake.jpg', description: 'Tangy raspberry coulis on velvety cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-cherry', name: 'Cherry Cheesecake Slice', shortName: 'Cherry', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Rich cherry compote over smooth cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-mango', name: 'Mango Cheesecake Slice', shortName: 'Mango', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Tropical Alphonso mango on creamy base', inStock: true, isBestseller: true },
  { id: 'cs-passionfruit', name: 'Passion Fruit Cheesecake Slice', shortName: 'Passion Fruit', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Exotic passion fruit with a tangy twist', inStock: true, isBestseller: false },
  { id: 'cs-lemon', name: 'Lemon Cheesecake Slice', shortName: 'Lemon', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-lemon-cheesecake.jpg', description: 'Bright lemon curd on a buttery biscuit base', inStock: true, isBestseller: false },
  { id: 'cs-coconut', name: 'Coconut Cheesecake Slice', shortName: 'Coconut', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Creamy coconut-infused cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-guava', name: 'Guava Cheesecake Slice', shortName: 'Guava', category: 'cheesecake', subcategory: 'slice', price: 149, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Sweet Indian guava topping on smooth base', inStock: true, isBestseller: false },
  { id: 'cs-mango-passion', name: 'Mango & Passion Cheesecake Slice', shortName: 'Mango & Passion', category: 'cheesecake', subcategory: 'slice', price: 169, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'The best of both tropical worlds', inStock: true, isBestseller: false },
  { id: 'cs-orange', name: 'Orange Creamsicle Cheesecake Slice', shortName: 'Orange Creamsicle', category: 'cheesecake', subcategory: 'slice', price: 169, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Nostalgic orange-vanilla swirl', inStock: true, isBestseller: false },
  { id: 'cs-choc-orange', name: 'Chocolate Orange Cheesecake Slice', shortName: 'Chocolate Orange', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Dark chocolate meets zesty orange', inStock: true, isBestseller: false },
  { id: 'cs-blackforest', name: 'Black Forest Cheesecake Slice', shortName: 'Black Forest', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Chocolate, cherry & cream classic reimagined', inStock: true, isBestseller: false },
  { id: 'cs-choc-chunk', name: 'Chocolate Chunk Cheesecake Slice', shortName: 'Choc Chunk', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Loaded with premium chocolate chunks', inStock: true, isBestseller: false },
  { id: 'cs-chocolate', name: 'Chocolate Cheesecake Slice', shortName: 'Chocolate', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Milk & dark chocolate double layer', inStock: true, isBestseller: true },
  { id: 'cs-nutella', name: 'Nutella Cheesecake Slice', shortName: 'Nutella', category: 'cheesecake', subcategory: 'slice', price: 199, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Swirled with real Nutella throughout', inStock: true, isBestseller: true },
  { id: 'cs-biscoff', name: 'Biscoff Cheesecake Slice', shortName: 'Biscoff', category: 'cheesecake', subcategory: 'slice', price: 199, unit: 'slice', image: '/images/real-biscoff-cups.jpg', description: 'Lotus Biscoff cookie butter bliss', inStock: true, isBestseller: true },
  { id: 'cs-cookies-cream', name: 'Cookies & Cream Cheesecake Slice', shortName: 'Cookies & Cream', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Crushed Oreo cookies in every bite', inStock: true, isBestseller: false },
  { id: 'cs-caramel', name: 'Caramel Cheesecake Slice', shortName: 'Caramel', category: 'cheesecake', subcategory: 'slice', price: 179, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Salted caramel drizzle on buttery base', inStock: true, isBestseller: false },
  { id: 'cs-coffee', name: 'Coffee Cheesecake Slice', shortName: 'Coffee', category: 'cheesecake', subcategory: 'slice', price: 169, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Real espresso-infused cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-pistachio', name: 'Pistachio Cheesecake Slice', shortName: 'Pistachio', category: 'cheesecake', subcategory: 'slice', price: 199, unit: 'slice', image: '/images/real-cheesecake-top.jpg', description: 'Premium pistachio paste swirl', inStock: true, isBestseller: false },

  // ─── Cheesecake — Whole ───
  { id: 'cw-strawberry', name: 'Strawberry Cheesecake (Whole)', shortName: 'Strawberry Whole', category: 'cheesecake', subcategory: 'whole', price: 549, unit: 'whole', image: '/images/real-strawberry-cheesecake.jpg', description: 'Full 6-inch strawberry cheesecake', inStock: true, isBestseller: true },
  { id: 'cw-biscoff', name: 'Biscoff Cheesecake (Whole)', shortName: 'Biscoff Whole', category: 'cheesecake', subcategory: 'whole', price: 649, unit: 'whole', image: '/images/real-biscoff-cups.jpg', description: 'Full 6-inch Biscoff cheesecake', inStock: true, isBestseller: true },
  { id: 'cw-nutella', name: 'Nutella Cheesecake (Whole)', shortName: 'Nutella Whole', category: 'cheesecake', subcategory: 'whole', price: 649, unit: 'whole', image: '/images/real-cheesecake-top.jpg', description: 'Full 6-inch Nutella cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-chocolate', name: 'Chocolate Cheesecake (Whole)', shortName: 'Chocolate Whole', category: 'cheesecake', subcategory: 'whole', price: 599, unit: 'whole', image: '/images/real-cheesecake-top.jpg', description: 'Full 6-inch chocolate cheesecake', inStock: true, isBestseller: false },

  // ─── Cakes & Treats ───
  { id: 'ck-cupcake-choc', name: 'Chocolate Cupcake', shortName: 'Choc Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 99, unit: 'piece', image: '/images/real-cupcakes-pink.jpg', description: 'Rich chocolate cupcake with swirled frosting', inStock: true, isBestseller: false },
  { id: 'ck-cupcake-van', name: 'Vanilla Cupcake', shortName: 'Vanilla Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 89, unit: 'piece', image: '/images/real-cupcakes-rose-box.jpg', description: 'Classic vanilla cupcake with buttercream', inStock: true, isBestseller: false },
  { id: 'ck-milk-biscoff', name: 'Biscoff Milk Cake', shortName: 'Biscoff Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 449, unit: 'piece', image: '/images/real-rose-milkcake.jpg', description: 'Moist milk cake soaked in Biscoff goodness', inStock: true, isBestseller: true },
  { id: 'ck-milk-tres', name: 'Tres Leches Cake', shortName: 'Tres Leches', category: 'cakes', subcategory: 'milk-cake', price: 399, unit: 'piece', image: '/images/real-rose-milkcake-bulk.jpg', description: 'Three-milk soaked sponge, silky smooth', inStock: true, isBestseller: false },
  { id: 'ck-milk-rose', name: 'Rose Milk Cake', shortName: 'Rose Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 399, unit: 'piece', image: '/images/real-rose-milkcake.jpg', description: 'Delicate rose-infused milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-turkish', name: 'Turkish Milk Cake', shortName: 'Turkish Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 449, unit: 'piece', image: '/images/real-rose-milkcake.jpg', description: 'Exotic Turkish-style drenched cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-choc', name: 'Chocolate Milk Cake', shortName: 'Choc Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 449, unit: 'piece', image: '/images/real-chocolate-cake.jpg', description: 'Chocolate milk-soaked indulgence', inStock: true, isBestseller: false },
  { id: 'ck-milk-pistachio', name: 'Pistachio Milk Cake', shortName: 'Pistachio Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 499, unit: 'piece', image: '/images/real-rose-milkcake.jpg', description: 'Premium pistachio cream milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-raspberry', name: 'Raspberry Milk Cake', shortName: 'Raspberry Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 399, unit: 'piece', image: '/images/real-rose-milkcake.jpg', description: 'Berry-topped milk cake delight', inStock: true, isBestseller: false },
  { id: 'ck-brownie', name: 'Fudge Brownie', shortName: 'Brownie', category: 'cakes', subcategory: 'treats', price: 149, unit: 'piece', image: '/images/real-brownies.jpg', description: 'Dense, fudgy chocolate brownie', inStock: true, isBestseller: true },
  { id: 'ck-blondie', name: 'Blondie', shortName: 'Blondie', category: 'cakes', subcategory: 'treats', price: 149, unit: 'piece', image: '/images/real-brownies.jpg', description: 'Buttery vanilla brownie with white choc', inStock: true, isBestseller: false },
  { id: 'ck-choc-strawberry', name: 'Chocolate Covered Strawberries', shortName: 'Choc Strawberries', category: 'cakes', subcategory: 'treats', price: 299, unit: 'box of 6', image: '/images/real-strawberry-slices.jpg', description: 'Fresh strawberries dipped in couverture', inStock: true, isBestseller: false },
  { id: 'ck-cakesicle', name: 'Cakesicles', shortName: 'Cakesicle', category: 'cakes', subcategory: 'treats', price: 129, unit: 'piece', image: '/images/real-cakesicles.jpg', description: 'Cake on a stick, dipped in chocolate', inStock: true, isBestseller: false },
  { id: 'ck-cakepop', name: 'Cake Pops', shortName: 'Cake Pop', category: 'cakes', subcategory: 'treats', price: 99, unit: 'piece', image: '/images/real-cakesicles.jpg', description: 'Bite-size cake balls on a stick', inStock: true, isBestseller: false },
  { id: 'ck-pancakes', name: 'Fluffy Pancakes', shortName: 'Pancakes', category: 'cakes', subcategory: 'treats', price: 199, unit: 'stack', image: '/images/real-chocolate-pancakes.jpg', description: 'Stack of fluffy pancakes with toppings', inStock: true, isBestseller: false },
  { id: 'ck-crepes', name: 'French Crepes', shortName: 'Crepes', category: 'cakes', subcategory: 'treats', price: 179, unit: 'plate', image: '/images/real-crepes.jpg', description: 'Thin crepes with Nutella & berries', inStock: true, isBestseller: false },

  // ─── Cookies ───
  { id: 'co-triple-choc', name: 'Triple Chocolate Cookie', shortName: 'Triple Choc', category: 'cookies', subcategory: 'single', price: 79, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Dark, milk & white chocolate loaded', inStock: true, isBestseller: true },
  { id: 'co-white-choc', name: 'White Chocolate Cookie', shortName: 'White Choc', category: 'cookies', subcategory: 'single', price: 69, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Creamy white chocolate chunks', inStock: true, isBestseller: false },
  { id: 'co-classic', name: 'Classic Choc Chip Cookie', shortName: 'Classic', category: 'cookies', subcategory: 'single', price: 59, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Timeless chocolate chip perfection', inStock: true, isBestseller: false },
  { id: 'co-red-velvet', name: 'Red Velvet Cookie', shortName: 'Red Velvet', category: 'cookies', subcategory: 'single', price: 69, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Red velvet with white choc chips', inStock: true, isBestseller: false },
  { id: 'co-pistachio', name: 'Pistachio & Rose Biscuits', shortName: 'Pistachio Rose', category: 'cookies', subcategory: 'single', price: 89, unit: 'piece', image: '/images/real-pistachio-biscuits.jpg', description: 'Elegant pistachio cookies with rose', inStock: true, isBestseller: true },
  { id: 'co-almond', name: 'Almond Cookie', shortName: 'Almond', category: 'cookies', subcategory: 'single', price: 69, unit: 'piece', image: '/images/real-pistachio-biscuits.jpg', description: 'Crunchy almond butter cookie', inStock: true, isBestseller: false },
  { id: 'co-coconut', name: 'Coconut Cookie', shortName: 'Coconut', category: 'cookies', subcategory: 'single', price: 59, unit: 'piece', image: '/images/real-pistachio-biscuits.jpg', description: 'Toasted coconut flavour in every bite', inStock: true, isBestseller: false },
  { id: 'co-box-6', name: 'Cookie Box (6 pcs)', shortName: 'Cookie Box 6', category: 'cookies', subcategory: 'box', price: 349, unit: 'box', image: '/images/real-triple-choc-cookies.jpg', description: 'Mix & match 6 cookies of your choice', inStock: true, isBestseller: true },
  { id: 'co-box-12', name: 'Cookie Box (12 pcs)', shortName: 'Cookie Box 12', category: 'cookies', subcategory: 'box', price: 599, unit: 'box', image: '/images/real-triple-choc-cookies.jpg', description: 'Mix & match 12 cookies — great for gifting', inStock: true, isBestseller: false },

  // ─── Desserts ───
  { id: 'ds-custard', name: 'Custard Cup', shortName: 'Custard Cup', category: 'desserts', subcategory: 'cups', price: 129, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Creamy vanilla custard layered cup', inStock: true, isBestseller: false },
  { id: 'ds-cheesecake-cup', name: 'Cheesecake Cup', shortName: 'Cheesecake Cup', category: 'desserts', subcategory: 'cups', price: 149, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Mini cheesecake in a cup with topping', inStock: true, isBestseller: true },
  { id: 'ds-trifle', name: 'Trifle Cup', shortName: 'Trifle Cup', category: 'desserts', subcategory: 'cups', price: 139, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Layered sponge, cream & fruit trifle', inStock: true, isBestseller: false },
  { id: 'ds-jelly', name: 'Jelly Cup', shortName: 'Jelly Cup', category: 'desserts', subcategory: 'cups', price: 109, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Wobbly fruity jelly with cream topping', inStock: true, isBestseller: false },
  { id: 'ds-grass', name: 'Grass Cup (Ghas)', shortName: 'Grass Cup', category: 'desserts', subcategory: 'cups', price: 129, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Unique grass-themed layered dessert', inStock: true, isBestseller: false },

  // ─── Drinks — Mojitos ───
  { id: 'dr-virgin-mojito', name: 'Virgin Mojito', shortName: 'Virgin Mojito', category: 'drinks', subcategory: 'mojitos', price: 109, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Classic lime & mint refresher', inStock: true, isBestseller: false },
  { id: 'dr-blue-lagoon', name: 'Blue Lagoon Mojito', shortName: 'Blue Lagoon', category: 'drinks', subcategory: 'mojitos', price: 129, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Electric blue citrus cooler', inStock: true, isBestseller: true },
  { id: 'dr-strawberry-mojito', name: 'Strawberry Mojito', shortName: 'Strawberry Mojito', category: 'drinks', subcategory: 'mojitos', price: 129, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Berry-infused minty freshness', inStock: true, isBestseller: false },

  // ─── Drinks — Milkshakes ───
  { id: 'dr-shake-biscoff', name: 'Biscoff Milkshake', shortName: 'Biscoff Shake', category: 'drinks', subcategory: 'milkshakes', price: 179, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Thick Biscoff cookie butter shake', inStock: true, isBestseller: true },
  { id: 'dr-shake-nutella', name: 'Nutella Milkshake', shortName: 'Nutella Shake', category: 'drinks', subcategory: 'milkshakes', price: 179, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Rich Nutella blended to perfection', inStock: true, isBestseller: false },
  { id: 'dr-shake-oreo', name: 'Oreo Milkshake', shortName: 'Oreo Shake', category: 'drinks', subcategory: 'milkshakes', price: 169, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Cookies & cream milkshake bliss', inStock: true, isBestseller: false },
  { id: 'dr-shake-mango', name: 'Mango Milkshake', shortName: 'Mango Shake', category: 'drinks', subcategory: 'milkshakes', price: 149, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Fresh Alphonso mango shake', inStock: true, isBestseller: false },

  // ─── Drinks — Coffee ───
  { id: 'dr-iced-coffee', name: 'Iced Coffee', shortName: 'Iced Coffee', category: 'drinks', subcategory: 'coffee', price: 99, unit: 'glass', image: '/images/real-chocolate-pancakes.jpg', description: 'Chilled coffee with cream', inStock: true, isBestseller: false },
  { id: 'dr-hot-coffee', name: 'Hot Coffee', shortName: 'Hot Coffee', category: 'drinks', subcategory: 'coffee', price: 79, unit: 'cup', image: '/images/real-chocolate-pancakes.jpg', description: 'Freshly brewed hot coffee', inStock: true, isBestseller: false },
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
