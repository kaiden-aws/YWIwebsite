import Image from 'next/image'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function GalleryHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/heroes/gallery-hero.jpg"
          alt="Stunning completed landscape design project"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={80}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-forest/60" />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Our Work
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          Browse our portfolio of completed residential, commercial,
          hardscaping, and irrigation projects across Centre Wellington.
        </p>
      </div>
    </section>
  )
}
