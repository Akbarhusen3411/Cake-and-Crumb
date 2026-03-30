/**
 * Product catalog for Cake & Crumb e-commerce
 * Updated prices from official 2026 menu
 * Each product has a unique image matching its name/flavour
 */

export const productCategories = [
  { id: 'cheesecake', label: 'Cheesecake' },
  { id: 'cakes', label: 'Cakes & Treats' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const products = [
  // ─── Cheesecake — Slices (6 inch · 8 slices) ───

  // Classic
  { id: 'cs-strawberry', name: 'Strawberry Cheesecake Slice', shortName: 'Strawberry', category: 'cheesecake', subcategory: 'slice', price: 90, unit: 'slice', image: '/images/real-strawberry-cheesecake.jpg', description: 'Classic NY-style with fresh strawberry compote', inStock: true, isBestseller: true },
  { id: 'cs-blueberry', name: 'Blueberry Cheesecake Slice', shortName: 'Blueberry', category: 'cheesecake', subcategory: 'slice', price: 90, unit: 'slice', image: '/images/blueberry-cheesecake.jpg', description: 'Creamy cheesecake topped with blueberry sauce', inStock: true, isBestseller: false },
  { id: 'cs-raspberry', name: 'Raspberry Cheesecake Slice', shortName: 'Raspberry', category: 'cheesecake', subcategory: 'slice', price: 90, unit: 'slice', image: '/images/raspberry-cake.jpg', description: 'Tangy raspberry coulis on velvety cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-cherry', name: 'Cherry Cheesecake Slice', shortName: 'Cherry', category: 'cheesecake', subcategory: 'slice', price: 90, unit: 'slice', image: '/images/cherry-dessert.jpg', description: 'Rich cherry compote over smooth cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-lemon', name: 'Lemon Cheesecake Slice', shortName: 'Lemon', category: 'cheesecake', subcategory: 'slice', price: 90, unit: 'slice', image: '/images/real-lemon-cheesecake.jpg', description: 'Bright lemon curd on a buttery biscuit base', inStock: true, isBestseller: false },

  // Exotic
  { id: 'cs-mango', name: 'Mango Cheesecake Slice', shortName: 'Mango', category: 'cheesecake', subcategory: 'slice', price: 100, unit: 'slice', image: '/images/mango-dessert.jpg', description: 'Tropical Alphonso mango on creamy base', inStock: true, isBestseller: true },
  { id: 'cs-passionfruit', name: 'Passion Fruit Cheesecake Slice', shortName: 'Passion Fruit', category: 'cheesecake', subcategory: 'slice', price: 100, unit: 'slice', image: '/images/passion-fruit.jpg', description: 'Exotic passion fruit with a tangy twist', inStock: true, isBestseller: false },
  { id: 'cs-coconut', name: 'Coconut Cheesecake Slice', shortName: 'Coconut', category: 'cheesecake', subcategory: 'slice', price: 100, unit: 'slice', image: '/images/coconut-dessert.jpg', description: 'Creamy coconut-infused cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-guava', name: 'Guava Cheesecake Slice', shortName: 'Guava', category: 'cheesecake', subcategory: 'slice', price: 100, unit: 'slice', image: '/images/guava-dessert.jpg', description: 'Sweet Indian guava topping on smooth base', inStock: true, isBestseller: false },
  { id: 'cs-mango-passion', name: 'Mango & Passion Cheesecake Slice', shortName: 'Mango & Passion', category: 'cheesecake', subcategory: 'slice', price: 110, unit: 'slice', image: '/images/mango-dessert.jpg', description: 'The best of both tropical worlds', inStock: true, isBestseller: false },
  { id: 'cs-orange', name: 'Orange Creamsicle Cheesecake Slice', shortName: 'Orange Creamsicle', category: 'cheesecake', subcategory: 'slice', price: 110, unit: 'slice', image: '/images/orange-dessert.jpg', description: 'Nostalgic orange-vanilla swirl', inStock: true, isBestseller: false },

  // Chocolate
  { id: 'cs-choc-orange', name: 'Chocolate Orange Cheesecake Slice', shortName: 'Chocolate Orange', category: 'cheesecake', subcategory: 'slice', price: 115, unit: 'slice', image: '/images/chocolate-cake-rich.jpg', description: 'Dark chocolate meets zesty orange', inStock: true, isBestseller: false },
  { id: 'cs-blackforest', name: 'Black Forest Cheesecake Slice', shortName: 'Black Forest', category: 'cheesecake', subcategory: 'slice', price: 115, unit: 'slice', image: '/images/black-forest-cake.jpg', description: 'Chocolate, cherry & cream classic reimagined', inStock: true, isBestseller: false },
  { id: 'cs-choc-chunk', name: 'Chocolate Chunk Cheesecake Slice', shortName: 'Choc Chunk', category: 'cheesecake', subcategory: 'slice', price: 115, unit: 'slice', image: '/images/chocolate-cake-rich.jpg', description: 'Loaded with premium chocolate chunks', inStock: true, isBestseller: false },
  { id: 'cs-chocolate', name: 'Chocolate Cheesecake Slice', shortName: 'Chocolate', category: 'cheesecake', subcategory: 'slice', price: 115, unit: 'slice', image: '/images/real-chocolate-cake.jpg', description: 'Milk & dark chocolate double layer', inStock: true, isBestseller: true },
  { id: 'cs-nutella', name: 'Nutella Cheesecake Slice', shortName: 'Nutella', category: 'cheesecake', subcategory: 'slice', price: 120, unit: 'slice', image: '/images/nutella-dessert.jpg', description: 'Swirled with real Nutella throughout', inStock: true, isBestseller: true },
  { id: 'cs-biscoff', name: 'Biscoff Cheesecake Slice', shortName: 'Biscoff', category: 'cheesecake', subcategory: 'slice', price: 120, unit: 'slice', image: '/images/biscoff-cake.jpg', description: 'Lotus Biscoff cookie butter bliss', inStock: true, isBestseller: true },

  // Premium
  { id: 'cs-cookies-cream', name: 'Cookies & Cream Cheesecake Slice', shortName: 'Cookies & Cream', category: 'cheesecake', subcategory: 'slice', price: 125, unit: 'slice', image: '/images/cookies-cream-cake.jpg', description: 'Crushed Oreo cookies in every bite', inStock: true, isBestseller: false },
  { id: 'cs-caramel', name: 'Caramel Cheesecake Slice', shortName: 'Caramel', category: 'cheesecake', subcategory: 'slice', price: 125, unit: 'slice', image: '/images/caramel-dessert.jpg', description: 'Salted caramel drizzle on buttery base', inStock: true, isBestseller: false },
  { id: 'cs-coffee', name: 'Coffee Cheesecake Slice', shortName: 'Coffee', category: 'cheesecake', subcategory: 'slice', price: 125, unit: 'slice', image: '/images/coffee-cake.jpg', description: 'Real espresso-infused cheesecake', inStock: true, isBestseller: false },
  { id: 'cs-pistachio', name: 'Pistachio Cheesecake Slice', shortName: 'Pistachio', category: 'cheesecake', subcategory: 'slice', price: 140, unit: 'slice', image: '/images/pistachio-dessert.jpg', description: 'Premium pistachio paste swirl', inStock: true, isBestseller: false },

  // ─── Cheesecake — Whole (6 inch) ───
  { id: 'cw-strawberry', name: 'Strawberry Cheesecake (Whole)', shortName: 'Strawberry Whole', category: 'cheesecake', subcategory: 'whole', price: 700, unit: 'whole', image: '/images/real-strawberry-cheesecake.jpg', description: 'Full 6-inch strawberry cheesecake', inStock: true, isBestseller: true },
  { id: 'cw-blueberry', name: 'Blueberry Cheesecake (Whole)', shortName: 'Blueberry Whole', category: 'cheesecake', subcategory: 'whole', price: 700, unit: 'whole', image: '/images/blueberry-cheesecake.jpg', description: 'Full 6-inch blueberry cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-mango', name: 'Mango Cheesecake (Whole)', shortName: 'Mango Whole', category: 'cheesecake', subcategory: 'whole', price: 800, unit: 'whole', image: '/images/mango-dessert.jpg', description: 'Full 6-inch mango cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-chocolate', name: 'Chocolate Cheesecake (Whole)', shortName: 'Chocolate Whole', category: 'cheesecake', subcategory: 'whole', price: 900, unit: 'whole', image: '/images/chocolate-cake-rich.jpg', description: 'Full 6-inch chocolate cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-nutella', name: 'Nutella Cheesecake (Whole)', shortName: 'Nutella Whole', category: 'cheesecake', subcategory: 'whole', price: 950, unit: 'whole', image: '/images/nutella-dessert.jpg', description: 'Full 6-inch Nutella cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-biscoff', name: 'Biscoff Cheesecake (Whole)', shortName: 'Biscoff Whole', category: 'cheesecake', subcategory: 'whole', price: 950, unit: 'whole', image: '/images/biscoff-cake.jpg', description: 'Full 6-inch Biscoff cheesecake', inStock: true, isBestseller: true },
  { id: 'cw-cookies-cream', name: 'Cookies & Cream Cheesecake (Whole)', shortName: 'Cookies & Cream Whole', category: 'cheesecake', subcategory: 'whole', price: 1000, unit: 'whole', image: '/images/cookies-cream-cake.jpg', description: 'Full 6-inch Cookies & Cream cheesecake', inStock: true, isBestseller: false },
  { id: 'cw-pistachio', name: 'Pistachio Cheesecake (Whole)', shortName: 'Pistachio Whole', category: 'cheesecake', subcategory: 'whole', price: 1100, unit: 'whole', image: '/images/pistachio-dessert.jpg', description: 'Full 6-inch premium pistachio cheesecake', inStock: true, isBestseller: false },

  // ─── Cakes & Treats ───
  // Cupcakes
  { id: 'ck-cupcake-choc', name: 'Chocolate Cupcake', shortName: 'Choc Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 100, unit: 'piece', image: '/images/real-cupcakes-pink.jpg', description: 'Rich chocolate cupcake with swirled frosting', inStock: true, isBestseller: false },
  { id: 'ck-cupcake-van', name: 'Vanilla Cupcake', shortName: 'Vanilla Cupcake', category: 'cakes', subcategory: 'cupcakes', price: 100, unit: 'piece', image: '/images/real-cupcakes-rose-box.jpg', description: 'Classic vanilla cupcake with buttercream', inStock: true, isBestseller: false },

  // Milk Cake 6" — Whole
  { id: 'ck-milk-biscoff', name: 'Biscoff Milk Cake', shortName: 'Biscoff Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: '/images/biscoff-cake.jpg', description: 'Moist milk cake soaked in Biscoff goodness', inStock: true, isBestseller: true },
  { id: 'ck-milk-tres', name: 'Tres Leches Cake', shortName: 'Tres Leches', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: '/images/real-rose-milkcake-bulk.jpg', description: 'Three-milk soaked sponge, silky smooth', inStock: true, isBestseller: false },
  { id: 'ck-milk-rose', name: 'Rose Milk Cake', shortName: 'Rose Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 800, unit: 'whole', image: '/images/rose-cake.jpg', description: 'Delicate rose-infused milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-turkish', name: 'Turkish Milk Cake', shortName: 'Turkish Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 850, unit: 'whole', image: '/images/turkish-dessert.jpg', description: 'Exotic Turkish-style drenched cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-choc', name: 'Chocolate Milk Cake', shortName: 'Choc Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 850, unit: 'whole', image: '/images/real-chocolate-cake.jpg', description: 'Chocolate milk-soaked indulgence', inStock: true, isBestseller: false },
  { id: 'ck-milk-raspberry', name: 'Raspberry Milk Cake', shortName: 'Raspberry Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 900, unit: 'whole', image: '/images/raspberry-cake.jpg', description: 'Berry-topped milk cake delight', inStock: true, isBestseller: false },
  { id: 'ck-milk-pistachio', name: 'Pistachio Milk Cake', shortName: 'Pistachio Milk Cake', category: 'cakes', subcategory: 'milk-cake', price: 950, unit: 'whole', image: '/images/pistachio-dessert.jpg', description: 'Premium pistachio cream milk cake', inStock: true, isBestseller: false },

  // Milk Cake 6" — Slices
  { id: 'ck-milk-biscoff-sl', name: 'Biscoff Milk Cake Slice', shortName: 'Biscoff Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: '/images/biscoff-cake.jpg', description: 'Single slice of Biscoff milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-tres-sl', name: 'Tres Leches Slice', shortName: 'Tres Leches Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: '/images/real-rose-milkcake-bulk.jpg', description: 'Single slice of Tres Leches', inStock: true, isBestseller: false },
  { id: 'ck-milk-rose-sl', name: 'Rose Milk Cake Slice', shortName: 'Rose Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 100, unit: 'slice', image: '/images/rose-cake.jpg', description: 'Single slice of Rose milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-turkish-sl', name: 'Turkish Milk Cake Slice', shortName: 'Turkish Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 110, unit: 'slice', image: '/images/turkish-dessert.jpg', description: 'Single slice of Turkish milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-choc-sl', name: 'Chocolate Milk Cake Slice', shortName: 'Choc Milk Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 110, unit: 'slice', image: '/images/real-chocolate-cake.jpg', description: 'Single slice of Chocolate milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-raspberry-sl', name: 'Raspberry Milk Cake Slice', shortName: 'Raspberry Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 115, unit: 'slice', image: '/images/raspberry-cake.jpg', description: 'Single slice of Raspberry milk cake', inStock: true, isBestseller: false },
  { id: 'ck-milk-pistachio-sl', name: 'Pistachio Milk Cake Slice', shortName: 'Pistachio Slice', category: 'cakes', subcategory: 'milk-cake-slice', price: 120, unit: 'slice', image: '/images/pistachio-dessert.jpg', description: 'Single slice of Pistachio milk cake', inStock: true, isBestseller: false },

  // Bakes & Treats
  { id: 'ck-brownie', name: 'Fudge Brownie', shortName: 'Brownie', category: 'cakes', subcategory: 'treats', price: 80, unit: 'piece', image: '/images/real-brownies.jpg', description: 'Dense, fudgy chocolate brownie', inStock: true, isBestseller: true },
  { id: 'ck-blondie', name: 'Blondie', shortName: 'Blondie', category: 'cakes', subcategory: 'treats', price: 80, unit: 'piece', image: '/images/blondie.jpg', description: 'Buttery vanilla brownie with white choc', inStock: true, isBestseller: false },
  { id: 'ck-cakesicle-sq', name: 'Cakesicle (Square)', shortName: 'Cakesicle Sq', category: 'cakes', subcategory: 'treats', price: 120, unit: 'piece', image: '/images/real-cakesicles.jpg', description: 'Square cake on a stick, dipped in chocolate', inStock: true, isBestseller: false },
  { id: 'ck-cakesicle-cr', name: 'Cakesicle (Circle)', shortName: 'Cakesicle Circle', category: 'cakes', subcategory: 'treats', price: 120, unit: 'piece', image: '/images/real-cakesicles.jpg', description: 'Round cake on a stick, dipped in chocolate', inStock: true, isBestseller: false },
  { id: 'ck-cakepop', name: 'Cake Pops', shortName: 'Cake Pop', category: 'cakes', subcategory: 'treats', price: 90, unit: 'piece', image: '/images/cake-pop.jpg', description: 'Bite-size cake balls on a stick', inStock: true, isBestseller: false },
  { id: 'ck-choc-strawberry', name: 'Choc Covered Strawberry', shortName: 'Choc Strawberry', category: 'cakes', subcategory: 'treats', price: 70, unit: 'piece', image: '/images/real-strawberry-slices.jpg', description: 'Fresh strawberry dipped in couverture', inStock: true, isBestseller: false },

  // Platters
  { id: 'ck-pancakes', name: 'Fluffy Pancakes', shortName: 'Pancakes', category: 'cakes', subcategory: 'platters', price: 170, unit: 'stack of 3', image: '/images/real-chocolate-pancakes.jpg', description: 'Stack of 3 fluffy pancakes with toppings', inStock: true, isBestseller: false },
  { id: 'ck-crepes', name: 'French Crepes', shortName: 'Crepes', category: 'cakes', subcategory: 'platters', price: 170, unit: 'stack of 3', image: '/images/real-crepes.jpg', description: 'Stack of 3 thin crepes with Nutella & berries', inStock: true, isBestseller: false },

  // ─── Cookies ───
  { id: 'co-triple-choc', name: 'Triple Chocolate Cookie', shortName: 'Triple Choc', category: 'cookies', subcategory: 'single', price: 65, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Dark, milk & white chocolate loaded', inStock: true, isBestseller: true },
  { id: 'co-white-choc', name: 'White Chocolate Cookie', shortName: 'White Choc', category: 'cookies', subcategory: 'single', price: 65, unit: 'piece', image: '/images/coconut-cookie.jpg', description: 'Creamy white chocolate chunks', inStock: true, isBestseller: false },
  { id: 'co-classic', name: 'Classic Choc Chip Cookie', shortName: 'Classic', category: 'cookies', subcategory: 'single', price: 55, unit: 'piece', image: '/images/real-triple-choc-cookies.jpg', description: 'Timeless chocolate chip perfection', inStock: true, isBestseller: false },
  { id: 'co-red-velvet', name: 'Red Velvet Cookie', shortName: 'Red Velvet', category: 'cookies', subcategory: 'single', price: 70, unit: 'piece', image: '/images/red-velvet-cookie.jpg', description: 'Red velvet with white choc chips', inStock: true, isBestseller: false },
  { id: 'co-pistachio', name: 'Pistachio & Rose Biscuits', shortName: 'Pistachio Rose', category: 'cookies', subcategory: 'single', price: 90, unit: 'piece', image: '/images/real-pistachio-biscuits.jpg', description: 'Elegant pistachio cookies with rose', inStock: true, isBestseller: true },
  { id: 'co-almond', name: 'Almond Cookie', shortName: 'Almond', category: 'cookies', subcategory: 'single', price: 70, unit: 'piece', image: '/images/almond-cookie.jpg', description: 'Crunchy almond butter cookie', inStock: true, isBestseller: false },
  { id: 'co-coconut', name: 'Coconut Cookie', shortName: 'Coconut', category: 'cookies', subcategory: 'single', price: 65, unit: 'piece', image: '/images/coconut-cookie.jpg', description: 'Toasted coconut flavour in every bite', inStock: true, isBestseller: false },
  { id: 'co-box-6', name: 'Cookie Box (6 pcs)', shortName: 'Cookie Box 6', category: 'cookies', subcategory: 'box', price: 360, unit: 'box', image: '/images/real-triple-choc-cookies.jpg', description: 'Mix & match 6 cookies of your choice', inStock: true, isBestseller: true },
  { id: 'co-box-12', name: 'Cookie Box (12 pcs)', shortName: 'Cookie Box 12', category: 'cookies', subcategory: 'box', price: 680, unit: 'box', image: '/images/real-triple-choc-cookies.jpg', description: 'Mix & match 12 cookies — great for gifting', inStock: true, isBestseller: false },

  // ─── Desserts ───
  { id: 'ds-custard', name: 'Custard Cup', shortName: 'Custard Cup', category: 'desserts', subcategory: 'cups', price: 90, unit: 'cup', image: '/images/custard-cup.jpg', description: 'Creamy vanilla custard layered cup', inStock: true, isBestseller: false },
  { id: 'ds-cheesecake-cup', name: 'Cheesecake Cup', shortName: 'Cheesecake Cup', category: 'desserts', subcategory: 'cups', price: 150, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Mini cheesecake in a cup with topping', inStock: true, isBestseller: true },
  { id: 'ds-trifle', name: 'Trifle Cup', shortName: 'Trifle Cup', category: 'desserts', subcategory: 'cups', price: 100, unit: 'cup', image: '/images/trifle-cup.jpg', description: 'Layered sponge, cream & fruit trifle', inStock: true, isBestseller: false },
  { id: 'ds-jelly', name: 'Jelly Cup', shortName: 'Jelly Cup', category: 'desserts', subcategory: 'cups', price: 80, unit: 'cup', image: '/images/jelly-cup.jpg', description: 'Wobbly fruity jelly with cream topping', inStock: true, isBestseller: false },
  { id: 'ds-grass', name: 'Grass Cup (Ghas)', shortName: 'Grass Cup', category: 'desserts', subcategory: 'cups', price: 90, unit: 'cup', image: '/images/real-biscoff-cups.jpg', description: 'Unique grass-themed layered dessert', inStock: true, isBestseller: false },

  // ─── Drinks — Mojitos ───
  { id: 'dr-virgin-mojito', name: 'Virgin Mojito', shortName: 'Virgin Mojito', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: '/images/mojito-drink.jpg', description: 'Classic lime & mint refresher', inStock: true, isBestseller: false },
  { id: 'dr-blue-lagoon', name: 'Blue Lagoon Mojito', shortName: 'Blue Lagoon', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: '/images/blue-lagoon.jpg', description: 'Electric blue citrus cooler', inStock: true, isBestseller: true },
  { id: 'dr-strawberry-mojito', name: 'Strawberry Mojito', shortName: 'Strawberry Mojito', category: 'drinks', subcategory: 'mojitos', price: 120, unit: 'glass', image: '/images/strawberry-mojito.jpg', description: 'Berry-infused minty freshness', inStock: true, isBestseller: false },
  { id: 'dr-fruit-mojito', name: 'Any Fruit Mojito', shortName: 'Fruit Mojito', category: 'drinks', subcategory: 'mojitos', price: 130, unit: 'glass', image: '/images/mojito-drink.jpg', description: 'Pick your favourite fruit flavour', inStock: true, isBestseller: false },

  // ─── Drinks — Milkshakes ───
  { id: 'dr-shake-fruit', name: 'Fruit Milkshake', shortName: 'Fruit Shake', category: 'drinks', subcategory: 'milkshakes', price: 160, unit: 'glass', image: '/images/milkshake-drink.jpg', description: 'Any fruit flavour milkshake', inStock: true, isBestseller: false },
  { id: 'dr-shake-biscoff', name: 'Biscoff Milkshake', shortName: 'Biscoff Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: '/images/milkshake-drink.jpg', description: 'Thick Biscoff cookie butter shake', inStock: true, isBestseller: true },
  { id: 'dr-shake-nutella', name: 'Nutella Milkshake', shortName: 'Nutella Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: '/images/nutella-dessert.jpg', description: 'Rich Nutella blended to perfection', inStock: true, isBestseller: false },
  { id: 'dr-shake-oreo', name: 'Oreo Milkshake', shortName: 'Oreo Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: '/images/cookies-cream-cake.jpg', description: 'Cookies & cream milkshake bliss', inStock: true, isBestseller: false },
  { id: 'dr-shake-choc', name: 'Chocolate Milkshake', shortName: 'Choc Shake', category: 'drinks', subcategory: 'milkshakes', price: 180, unit: 'glass', image: '/images/chocolate-cake-rich.jpg', description: 'Any chocolate flavour shake', inStock: true, isBestseller: false },

  // ─── Drinks — Coffee ───
  { id: 'dr-iced-coffee', name: 'Iced Coffee', shortName: 'Iced Coffee', category: 'drinks', subcategory: 'coffee', price: 100, unit: 'glass', image: '/images/iced-coffee.jpg', description: 'Chilled coffee with cream', inStock: true, isBestseller: false },
  { id: 'dr-hot-coffee', name: 'Hot Coffee', shortName: 'Hot Coffee', category: 'drinks', subcategory: 'coffee', price: 90, unit: 'cup', image: '/images/hot-coffee.jpg', description: 'Freshly brewed hot coffee', inStock: true, isBestseller: false },
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
