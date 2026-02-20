import AnimatedSection from '@/components/ui/AnimatedSection'
import { values } from '@/lib/data/about'

export default function ValuesGrid() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-forest mb-4 text-center">
          What We Stand For
        </h2>
        <p className="text-charcoal/70 text-center mb-12 max-w-2xl mx-auto">
          These values guide every project we take on — from the first
          consultation to the final walkthrough.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.name} delay={index * 0.1}>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/20 mb-4">
                  <value.icon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-display text-lg text-forest mb-2">
                  {value.name}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
