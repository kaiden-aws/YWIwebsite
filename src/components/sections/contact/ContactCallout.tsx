import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { companyInfo } from '@/lib/data/navigation'

export default function ContactCallout() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Prefer to Talk?
          </h2>
          <p className="text-cream/80 text-lg mb-4">
            Call us directly at{' '}
            <a
              href={companyInfo.phoneHref}
              className="text-cream underline font-medium hover:text-cream/80 transition-colors"
            >
              {companyInfo.phone}
            </a>
          </p>
          <p className="text-cream/70">
            We&apos;re available {companyInfo.hours}
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
