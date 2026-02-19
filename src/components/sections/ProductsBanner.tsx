import { products } from '@/lib/data/products'
import { companyInfo } from '@/lib/data/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
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
                  <ImagePlaceholder
                    label={product.image}
                    aspectRatio="square"
                    className="!bg-sage/20"
                  />
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
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
