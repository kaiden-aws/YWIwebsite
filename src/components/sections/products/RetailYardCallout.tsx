import Link from 'next/link'
import { companyInfo } from '@/lib/data/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function RetailYardCallout() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Visit Our Retail Yard
          </h2>
          <p className="text-cream/80 text-lg mb-2">
            {companyInfo.retailYardAddress.street},{' '}
            {companyInfo.retailYardAddress.city}
          </p>
          <p className="text-cream/60 mb-10">{companyInfo.hours}</p>

          <div className="bg-cream/10 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8">
            <p className="font-display text-xl text-cream mb-2">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <p className="text-cream/70">
              We source hard-to-find materials. Contact us with your project
              needs and we&apos;ll track down exactly what you need.
            </p>
          </div>

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
