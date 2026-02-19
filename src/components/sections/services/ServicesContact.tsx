import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ServicesContact() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Not sure what you need?
          </h2>
          <p className="font-display text-xl md:text-2xl text-cream/80 mb-8">
            Let&apos;s talk.
          </p>
          <p className="text-cream/70 mb-10 max-w-xl mx-auto">
            Every property is different. Tell us about your space and
            we&apos;ll help you figure out the right approach.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </AnimatedSection>
    </section>
  )
}
