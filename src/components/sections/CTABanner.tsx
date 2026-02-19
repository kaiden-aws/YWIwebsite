import { companyInfo } from '@/lib/data/navigation'
import GrainOverlay from '@/components/ui/GrainOverlay'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-terracotta overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-cream/80 text-lg mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss your vision. Get a free consultation and quote for your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-forest hover:bg-forest-light text-cream font-medium rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href={companyInfo.phoneHref}
              className="inline-flex items-center px-8 py-4 border-2 border-cream text-cream hover:bg-cream/10 font-medium rounded-lg transition-colors"
            >
              Call {companyInfo.phone}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
