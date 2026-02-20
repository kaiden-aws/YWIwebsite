import ProductsHero from '@/components/sections/products/ProductsHero'
import ProductCategoryGrid from '@/components/sections/products/ProductCategoryGrid'
import MaterialCalculator from '@/components/sections/products/MaterialCalculator'
import RetailYardCallout from '@/components/sections/products/RetailYardCallout'

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
