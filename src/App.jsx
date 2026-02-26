import { useState } from 'react'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCakes from './components/FeaturedCakes'
import WhyChooseUs from './components/WhyChooseUs'
import AboutUs from './components/AboutUs'
import InstagramSection from './components/InstagramSection'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LocationDialog from './components/LocationDialog'
import CartDrawer from './components/cart/CartDrawer'
import CheckoutPage from './components/checkout/CheckoutPage'
import Toast from './components/ui/Toast'

export default function App() {
  useScrollAnimation()

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Hero />
      <FeaturedCakes />
      <WhyChooseUs />
      <AboutUs />
      <InstagramSection />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />

      <LocationDialog />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <CheckoutPage
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
      <Toast />
    </div>
  )
}
