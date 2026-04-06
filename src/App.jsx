import { useState, lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LocationDialog from './components/LocationDialog'
import CartDrawer from './components/cart/CartDrawer'
import CheckoutPage from './components/checkout/CheckoutPage'
import Toast from './components/ui/Toast'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

const ChatBot = lazy(() => import('./components/ChatBot'))

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))


function AppContent() {
  useScrollAnimation()

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>

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
