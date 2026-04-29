import { Component } from 'react'
import { WHATSAPP_NUMBER } from '../config/constants'

const ERROR_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Cake & Crumb! The website isn't working for me.")}`

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream-light px-4">
          <div className="text-center max-w-md">
            <span className="font-script text-5xl text-berry block mb-4">Oh crumbs!</span>
            <h1 className="font-heading text-xl font-bold text-chocolate mb-2">Something broke</h1>
            <p className="text-sm text-chocolate-light/60 mb-6">
              We couldn't load this page. Please refresh, or message us on WhatsApp and we'll take your order directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-chocolate text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-colors"
              >
                Refresh Page
              </button>
              <a
                href={ERROR_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-chocolate/15 text-chocolate px-6 py-3 rounded-xl font-medium text-sm hover:bg-cream transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
