import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/lib/data/services'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ServiceCardGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.1}>
              <div className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-video">
                  <Image
                    src={service.image}
                    alt={service.imageLabel}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display text-xl md:text-2xl text-forest mb-3">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed mb-6 flex-1">
                    {service.details}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
