import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import PopularCategories from '../components/PopularCategories'
import FeaturedCakes from '../components/FeaturedCakes'
import WhyChooseUs from '../components/WhyChooseUs'

const ClientReviewsSlider = lazy(() => import('../components/ClientReviewsSlider'))
const InstagramSection = lazy(() => import('../components/InstagramSection'))

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <FeaturedCakes />
      <WhyChooseUs />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ClientReviewsSlider />
      </Suspense>
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <InstagramSection />
      </Suspense>
    </>
  )
}
