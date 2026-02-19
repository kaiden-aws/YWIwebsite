import { projects } from '@/lib/data/projects'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'

export default function ProjectShowcase() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-forest text-center mb-4">
            Our Work
          </h2>
          <p className="text-charcoal/70 text-center max-w-2xl mx-auto mb-12">
            Browse a selection of our recent landscaping, hardscaping, and outdoor living projects across Centre Wellington.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                delay={index * 0.1}
                className={project.featured ? 'col-span-2 row-span-2' : ''}
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <ImagePlaceholder
                    label={project.image}
                    aspectRatio="square"
                  />
                  <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                    <div>
                      <span className="text-cream font-display text-lg md:text-xl">
                        {project.name}
                      </span>
                      <span className="text-cream/70 text-sm block">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-light transition-colors"
            >
              View All Projects &rarr;
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
