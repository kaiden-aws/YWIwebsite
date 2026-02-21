export interface Project {
  id: string
  name: string
  category: 'Residential' | 'Commercial' | 'Hardscaping' | 'Irrigation'
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'riverside-patio-pergola',
    name: 'Riverside Patio & Pergola',
    category: 'Residential',
    image: '/images/projects/riverside-patio-pergola.jpg',
    featured: true,
  },
  {
    id: 'elora-commercial-grounds',
    name: 'Elora Business Park Grounds',
    category: 'Commercial',
    image: '/images/projects/elora-commercial-grounds.jpg',
    featured: false,
  },
  {
    id: 'natural-stone-retaining-wall',
    name: 'Natural Stone Retaining Wall',
    category: 'Hardscaping',
    image: '/images/projects/natural-stone-retaining-wall.jpg',
    featured: true,
  },
  {
    id: 'interlock-driveway-entrance',
    name: 'Interlock Driveway & Entrance',
    category: 'Hardscaping',
    image: '/images/projects/interlock-driveway-entrance.jpg',
    featured: false,
  },
  {
    id: 'garden-irrigation-system',
    name: 'Automated Garden Irrigation',
    category: 'Irrigation',
    image: '/images/projects/garden-irrigation-system.jpg',
    featured: false,
  },
  {
    id: 'backyard-retreat-fergus',
    name: 'Backyard Retreat & Fire Pit',
    category: 'Residential',
    image: '/images/projects/backyard-retreat-fergus.jpg',
    featured: false,
  },
  {
    id: 'fergus-garden-redesign',
    name: 'Fergus Garden Redesign',
    category: 'Residential',
    image: '/images/projects/fergus-garden-redesign.jpg',
    featured: false,
  },
  {
    id: 'elora-plaza-maintenance',
    name: 'Elora Plaza Grounds',
    category: 'Commercial',
    image: '/images/projects/elora-plaza-maintenance.jpg',
    featured: false,
  },
  {
    id: 'outdoor-kitchen-patio',
    name: 'Outdoor Kitchen & Patio',
    category: 'Hardscaping',
    image: '/images/projects/outdoor-kitchen-patio.jpg',
    featured: false,
  },
  {
    id: 'sports-field-irrigation',
    name: 'Sports Field Irrigation System',
    category: 'Irrigation',
    image: '/images/projects/sports-field-irrigation.jpg',
    featured: false,
  },
]
