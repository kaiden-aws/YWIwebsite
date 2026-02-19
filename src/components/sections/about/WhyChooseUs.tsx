import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { CheckCircle } from 'lucide-react'
import { differentiators } from '@/lib/data/about'

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-cream mb-4 text-center">
          Why Choose Yard Weasels
        </h2>
        <p className="text-cream/70 text-center mb-12 max-w-2xl mx-auto">
          What sets us apart from the rest — the credentials, commitment, and
          quality that make the difference.
        </p>
        <div className="space-y-6">
          {differentiators.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg text-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="text-cream/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
