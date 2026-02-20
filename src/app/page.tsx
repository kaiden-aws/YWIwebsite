import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import AboutTeaser from '@/components/sections/AboutTeaser'
import ProductsBanner from '@/components/sections/ProductsBanner'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import CTABanner from '@/components/sections/CTABanner'
import { testimonials } from '@/lib/data/testimonials'

export const metadata: Metadata = {
  title: {
    absolute:
      'Professional Landscaping in Fergus, Ontario | Yard Weasels Inc.',
  },
  description:
    'Premium landscaping design, build, maintenance, irrigation, snow removal, and quality materials serving Fergus, Ontario and Centre Wellington.',
  openGraph: {
    ...sharedOpenGraph,
    title:
      'Yard Weasels Inc. — Professional Landscaping in Fergus, Ontario',
    description:
      'Premium landscaping design, build, maintenance, irrigation, snow removal, and quality materials serving Fergus, Ontario and Centre Wellington.',
    url: '/',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Yard Weasels Inc. — Professional Landscaping in Fergus, Ontario',
      },
    ],
  },
}

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
