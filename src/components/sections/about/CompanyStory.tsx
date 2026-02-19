import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CompanyStory() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-8">
              Rooted in Fergus, Built on Trust
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Yard Weasels Inc. started right here in Fergus, born from a
              genuine passion for transforming outdoor spaces. What began as a
              small operation driven by a love for landscaping has grown into a
              trusted name across Centre Wellington — one project, one satisfied
              client, and one well-laid stone at a time.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Over the years, we have expanded from residential gardens and
              patios to taking on commercial properties and municipal contracts.
              Whether it is a backyard retreat for a family in Elora, grounds
              maintenance for a local business, or a public park improvement for
              the township, we bring the same dedication and attention to every
              job.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Being part of this community is not just where we work — it is who
              we are. Our neighbours are our clients. We see them at the hardware
              store, at the rink, and at the farmers market. That is why every
              project we take on is personal. Our reputation is built one
              handshake at a time, and we intend to keep it that way.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              We also opened our materials yard at 6470 Beatty Line N to serve
              both professionals and homeowners directly. It is stocked with the
              same premium products we use on our own projects — aggregates,
              soils, mulch, and natural stone — so you can get exactly what you
              need for your next outdoor project.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
