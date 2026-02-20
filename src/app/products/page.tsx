import type { Metadata } from 'next'
import { sharedOpenGraph } from '@/lib/metadata'
import ProductsHero from '@/components/sections/products/ProductsHero'
import ProductCategoryGrid from '@/components/sections/products/ProductCategoryGrid'
import MaterialCalculator from '@/components/sections/products/MaterialCalculator'
import RetailYardCallout from '@/components/sections/products/RetailYardCallout'

export const metadata: Metadata = {
  title: 'Quality Landscaping Materials — Aggregates, Mulch, Stone & More',
  description:
    'Browse quality landscaping materials from Yard Weasels Inc. in Fergus, Ontario — aggregates, mulch, fertilizer, natural stone, topsoil, interlock, and seed. Use our Material Calculator to estimate your needs.',
  openGraph: {
    ...sharedOpenGraph,
    title: 'Landscaping Materials — Yard Weasels Inc., Fergus, Ontario',
    url: '/products',
  },
}

export default function ProductsPage() {
  return (
    <div>
      <ProductsHero />
      <ProductCategoryGrid />
      <MaterialCalculator />
      <RetailYardCallout />
    </div>
  )
}
