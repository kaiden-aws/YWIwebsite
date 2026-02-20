import { products } from '@/lib/data/products'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ProductCategoryGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-forest text-center mb-4">
          Our Products
        </h2>
        <p className="text-charcoal/70 text-center max-w-2xl mx-auto mb-12 md:mb-16">
          We carry a full range of bulk landscape materials, available for
          pickup or delivery across the region.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1}>
              <div className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Image area */}
                <div className="relative">
                  <ImagePlaceholder
                    label={product.image}
                    aspectRatio="square"
                  />
                  {/* Hover overlay — always visible on mobile, hover-reveal on desktop */}
                  <div className="absolute inset-0 flex items-center justify-center bg-forest/80 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <span className="text-cream font-medium text-lg">
                      Contact for Pricing
                    </span>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl text-forest mb-1">
                    {product.name}
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {product.description}
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
