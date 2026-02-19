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
    image: 'Product — Aggregates and crushed stone',
  },
  {
    id: 'mulch',
    name: 'Mulch',
    description: 'Premium bark mulch and wood chips for beds and pathways',
    image: 'Product — Premium bark mulch',
  },
  {
    id: 'fertilizer',
    name: 'Fertilizer',
    description: 'Professional-grade lawn and garden fertilizers',
    image: 'Product — Lawn and garden fertilizer',
  },
  {
    id: 'natural-stone',
    name: 'Natural Stone',
    description: 'Flagstone, armour stone, and decorative boulders',
    image: 'Product — Natural flagstone and armour stone',
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    description: 'Screened topsoil and garden soil blends',
    image: 'Product — Screened topsoil',
  },
  {
    id: 'interlock',
    name: 'Interlock',
    description: 'Interlocking pavers for driveways, patios, and walkways',
    image: 'Product — Interlocking pavers',
  },
  {
    id: 'seed',
    name: 'Seed',
    description: 'Grass seed mixes for lawns, sports fields, and restoration',
    image: 'Product — Grass seed mix',
  },
]
