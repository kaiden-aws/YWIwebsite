import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import AboutTeaser from '@/components/sections/AboutTeaser'
import ProductsBanner from '@/components/sections/ProductsBanner'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import CTABanner from '@/components/sections/CTABanner'
import { testimonials } from '@/lib/data/testimonials'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <AboutTeaser />
      <ProductsBanner />
      <ProjectShowcase />
      <TestimonialCarousel testimonials={testimonials} />
      <CTABanner />
    </div>
  )
}
