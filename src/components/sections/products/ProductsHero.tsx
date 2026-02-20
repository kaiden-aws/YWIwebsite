import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ProductsHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="Products — Retail yard with bulk landscape materials"
          priority={true}
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Quality Materials, Delivered
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          Premium landscape supplies for every project — from aggregates and
          mulch to natural stone and seed.
        </p>
      </div>
    </section>
  )
}
