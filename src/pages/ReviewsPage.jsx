import { useSearchParams } from 'react-router-dom'
import Testimonials from '../components/Testimonials'

export default function ReviewsPage() {
  const [searchParams] = useSearchParams()
  const highlightProduct = searchParams.get('product') || ''

  return (
    <div className="pt-20">
      <Testimonials highlightProduct={highlightProduct} />
    </div>
  )
}
