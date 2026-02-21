import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function AboutTeaser() {
  return (
    <section className="py-20 md:py-28 px-6">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0}>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/team/team-project.jpg"
                  alt="YWI team on a residential project site"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl text-forest mb-6">
                Rooted in Fergus
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4">
                For over two decades, Yard Weasels Inc. has been shaping outdoor
                spaces across Centre Wellington and the surrounding communities.
                What started as a small residential operation has grown into a
                trusted name serving homeowners, businesses, and municipalities
                alike.
              </p>
              <p className="text-charcoal/70 leading-relaxed mb-4">
                Our crew takes pride in every project — from intimate backyard
                retreats to large-scale public installations. We combine local
                knowledge with professional craftsmanship to deliver results that
                stand the test of time.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-terracotta-dark font-medium hover:text-terracotta transition-colors"
              >
                Our Story &rarr;
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
