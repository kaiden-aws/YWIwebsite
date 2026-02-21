export interface Product {
  id: string
  name: string
  description: string
  image: string
}

export const products: Product[] = [
  {
    id: 'aggregates',
    name: 'Aggregates',
    description: 'Gravel, crushed stone, and drainage materials for every project',
    image: '/images/products/aggregates.jpg',
  },
  {
    id: 'mulch',
    name: 'Mulch',
    description: 'Premium bark mulch and wood chips for beds and pathways',
    image: '/images/products/mulch.jpg',
  },
  {
    id: 'fertilizer',
    name: 'Fertilizer',
    description: 'Professional-grade lawn and garden fertilizers',
    image: '/images/products/fertilizer.jpg',
  },
  {
    id: 'natural-stone',
    name: 'Natural Stone',
    description: 'Flagstone, armour stone, and decorative boulders',
    image: '/images/products/natural-stone.jpg',
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    description: 'Screened topsoil and garden soil blends',
    image: '/images/products/topsoil.jpg',
  },
  {
    id: 'interlock',
    name: 'Interlock',
    description: 'Interlocking pavers for driveways, patios, and walkways',
    image: '/images/products/interlock.jpg',
  },
  {
    id: 'seed',
    name: 'Seed',
    description: 'Grass seed mixes for lawns, sports fields, and restoration',
    image: '/images/products/seed.jpg',
  },
]
