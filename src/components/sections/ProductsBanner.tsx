import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { companyInfo } from '@/lib/data/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ProductsBanner() {
  return (
    <section className="py-20 md:py-28 px-6 bg-forest relative overflow-hidden">
      <GrainOverlay />
      <AnimatedSection>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-cream text-center mb-4">
            Quality Materials
          </h2>
          <p className="text-cream/70 text-center max-w-2xl mx-auto mb-12">
            Our retail yard carries premium landscape supplies — everything you
            need for your next project, from aggregates to seed.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1}>
                <div className="group rounded-lg overflow-hidden bg-cream/10 backdrop-blur-sm hover:bg-cream/20 transition-colors">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="p-3 text-center text-cream font-medium text-sm">
                    {product.name}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-cream/70 text-sm">Visit our retail yard</p>
            <p className="text-cream font-medium">
              {companyInfo.retailYardAddress.street},{' '}
              {companyInfo.retailYardAddress.city}
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 px-8 py-3 bg-terracotta text-cream rounded-lg font-medium hover:bg-terracotta/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
