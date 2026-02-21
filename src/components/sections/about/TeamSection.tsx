import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { teamMembers } from '@/lib/data/about'

export default function TeamSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-forest mb-4 text-center">
          Meet the Team
        </h2>
        <p className="text-charcoal/70 text-center mb-12 max-w-2xl mx-auto">
          The people behind every project — bringing experience, care, and
          craftsmanship to your outdoor space.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.id} delay={index * 0.1}>
              <div className="text-center">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-lg text-forest">
                  {member.name}
                </h3>
                <p className="text-charcoal/70 text-sm">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
