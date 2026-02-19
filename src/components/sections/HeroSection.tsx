import Link from 'next/link'
import HeroParallax from '@/components/sections/HeroParallax'
import ScrollIndicator from '@/components/sections/ScrollIndicator'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function HeroSection() {
  return (
    <HeroParallax>
      <GrainOverlay />

      {/* Hero content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream mb-6 max-w-4xl">
            Crafting Outdoor Spaces That Inspire
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-2xl mx-auto">
            Premium landscaping design, build, and maintenance serving Fergus,
            Ontario and surrounding communities
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 border-2 border-cream text-cream hover:bg-cream/10 font-medium rounded-lg transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </HeroParallax>
  )
}
