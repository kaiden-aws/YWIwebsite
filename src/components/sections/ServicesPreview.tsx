import Link from 'next/link'
import { services } from '@/lib/data/services'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-forest text-center mb-4">
            Our Services
          </h2>
          <p className="text-charcoal/70 text-center max-w-2xl mx-auto mb-12">
            From design and build to year-round maintenance, we bring
            craftsmanship to every project.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.filter(s => s.featured).map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.15}>
                <Link
                  href={service.href}
                  className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 block"
                >
                  <ImagePlaceholder
                    label={service.image}
                    aspectRatio="video"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl text-forest mb-2">
                      {service.title}
                    </h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <span className="text-terracotta-dark font-medium text-sm group-hover:translate-x-1 transition-transform inline-block mt-4">
                      Learn More &rarr;
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
