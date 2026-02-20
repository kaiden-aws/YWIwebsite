import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import GalleryHero from '@/components/sections/gallery/GalleryHero'
import GalleryGrid from '@/components/sections/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Project Gallery — Our Landscaping Work in Fergus & Centre Wellington',
  description:
    'View completed landscaping projects by Yard Weasels Inc. — residential, commercial, hardscaping, and irrigation work across Fergus, Ontario and Centre Wellington.',
  openGraph: {
    ...sharedOpenGraph,
    title: 'Project Gallery — Yard Weasels Inc., Fergus, Ontario',
    url: '/gallery',
  },
}

export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <GalleryGrid />
    </div>
  )
}
