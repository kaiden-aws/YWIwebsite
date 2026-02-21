import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import AboutHero from '@/components/sections/about/AboutHero'
import CompanyStory from '@/components/sections/about/CompanyStory'
import ValuesGrid from '@/components/sections/about/ValuesGrid'
import WhyChooseUs from '@/components/sections/about/WhyChooseUs'

export const metadata: Metadata = {
  title: 'About Us — Our Story in Fergus, Ontario',
  description:
    'Meet the Yard Weasels Inc. team. Rooted in Fergus, Ontario, we bring quality craftsmanship to residential, commercial, and municipal landscaping across Centre Wellington.',
  openGraph: {
    ...sharedOpenGraph,
    title: 'About Yard Weasels Inc. — Fergus, Ontario',
    url: '/about',
  },
}

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <CompanyStory />
      <ValuesGrid />
      <WhyChooseUs />
    </div>
  )
}
