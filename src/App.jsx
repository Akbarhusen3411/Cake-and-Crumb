import { useState, useEffect, lazy, Suspense } from 'react'
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
import ErrorBoundary from './components/ErrorBoundary'
import useCartStore, { getItemCount } from './store/useCartStore'
import useToastStore from './store/useToastStore'

function PageFallback() {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-8 w-48 bg-cream-dark/40 rounded-lg mx-auto mb-3" />
      <div className="h-4 w-64 bg-cream-dark/30 rounded mx-auto mb-10" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-chocolate/5 overflow-hidden">
            <div className="aspect-square bg-cream-dark/30" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-3/4 bg-cream-dark/30 rounded" />
              <div className="h-3 w-1/2 bg-cream-dark/20 rounded" />
              <div className="h-8 bg-cream-dark/20 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ChatBot = lazy(() => import('./components/ChatBot'))

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const WriteReviewPage = lazy(() => import('./pages/WriteReviewPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))


function AppContent() {
  useScrollAnimation()

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  // Cart abandonment reminder — fires once per session if items sit in the cart for 2 min
  const items = useCartStore((s) => s.items)
  const itemCount = getItemCount(items)
  const addToast = useToastStore((s) => s.addToast)
  useEffect(() => {
    if (itemCount === 0 || cartOpen || checkoutOpen) return
    if (sessionStorage.getItem('cake-crumb-cart-nudge-shown') === '1') return
    const timer = setTimeout(() => {
      addToast('Your cake is waiting — finish your order? 🎂', 'info')
      sessionStorage.setItem('cake-crumb-cart-nudge-shown', '1')
    }, 120000)
    return () => clearTimeout(timer)
  }, [itemCount, cartOpen, checkoutOpen, addToast])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/review" element={<WriteReviewPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </ErrorBoundary>
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
