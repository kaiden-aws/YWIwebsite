import ContactHero from '@/components/sections/contact/ContactHero'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfoPanel from '@/components/sections/contact/ContactInfoPanel'
import ContactCallout from '@/components/sections/contact/ContactCallout'
import AnimatedSection from '@/components/ui/AnimatedSection'

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
