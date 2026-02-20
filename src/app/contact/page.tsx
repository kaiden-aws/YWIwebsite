import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import ContactHero from '@/components/sections/contact/ContactHero'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfoPanel from '@/components/sections/contact/ContactInfoPanel'
import ContactCallout from '@/components/sections/contact/ContactCallout'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Landscaping Quote in Fergus, Ontario',
  description:
    'Contact Yard Weasels Inc. for a free landscaping quote. Serving Fergus, Ontario and Centre Wellington — call 519-843-5489 or fill out our contact form.',
  openGraph: {
    ...sharedOpenGraph,
    title: 'Contact Yard Weasels Inc. — Fergus, Ontario',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div>
      <ContactHero />

      {/* Split layout section -- CONT-01 */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
            {/* Right: Info Panel */}
            <AnimatedSection delay={0.2}>
              <ContactInfoPanel />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ContactCallout />
    </div>
  )
}
