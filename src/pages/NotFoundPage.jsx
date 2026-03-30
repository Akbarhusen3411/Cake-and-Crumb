import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-cream-light">
      <div className="text-center max-w-md mx-auto">
        {/* Decorative number */}
        <div className="relative mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-heading font-bold text-chocolate/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-script text-4xl sm:text-5xl text-berry">Oops!</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-chocolate mb-3">
          Page Not Found
        </h1>
        <p className="text-chocolate-light/60 text-sm sm:text-base mb-8 leading-relaxed">
          Looks like this page crumbled away. The page you are looking for
          does not exist or has been moved.
        </p>

        {/* Decorative divider */}
        <div className="ornament-line text-gold mb-8 mx-auto max-w-[200px]">
          <span className="text-xs tracking-widest text-gold/60 uppercase">Cake &amp; Crumb</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="btn-shimmer inline-flex items-center gap-2 bg-chocolate text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-chocolate-light transition-all duration-300"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-chocolate/15 text-chocolate px-6 py-3 rounded-xl font-medium text-sm hover:bg-cream transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
