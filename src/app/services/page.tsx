import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceCardGrid from '@/components/sections/services/ServiceCardGrid'
import ServicesContact from '@/components/sections/services/ServicesContact'

export const metadata: Metadata = {
  title: 'Our Services — Landscaping, Irrigation & Snow Removal',
  description:
    'Explore landscaping services from Yard Weasels Inc. in Fergus, Ontario — design & build, residential maintenance, commercial landscaping, municipal projects, irrigation, and snow removal.',
  openGraph: {
    ...sharedOpenGraph,
    title: 'Landscaping Services — Yard Weasels Inc., Fergus, Ontario',
    url: '/services',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Landscaping services by Yard Weasels Inc.',
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServiceCardGrid />
      <ServicesContact />
    </div>
  )
}
