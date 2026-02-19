import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceCardGrid from '@/components/sections/services/ServiceCardGrid'
import ServicesContact from '@/components/sections/services/ServicesContact'

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServiceCardGrid />
      <ServicesContact />
    </div>
  )
}
