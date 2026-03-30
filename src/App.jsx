import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import LocationDialog from './components/LocationDialog'
import CartDrawer from './components/cart/CartDrawer'
import CheckoutPage from './components/checkout/CheckoutPage'
import Toast from './components/ui/Toast'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import AboutPage from './pages/AboutPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'


function AppContent() {
  useScrollAnimation()

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
      <ChatBot />

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

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
