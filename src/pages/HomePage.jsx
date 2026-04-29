import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import FeaturedCakes from '../components/FeaturedCakes'
import WhyChooseUs from '../components/WhyChooseUs'

const Testimonials = lazy(() => import('../components/Testimonials'))
const InstagramSection = lazy(() => import('../components/InstagramSection'))

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCakes />
      <WhyChooseUs />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <InstagramSection />
      </Suspense>
    </>
  )
}
