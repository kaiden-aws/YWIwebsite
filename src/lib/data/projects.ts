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
    image: 'Project — Riverside patio with cedar pergola',
    featured: true,
  },
  {
    id: 'elora-commercial-grounds',
    name: 'Elora Business Park Grounds',
    category: 'Commercial',
    image: 'Project — Commercial business park landscaping',
    featured: false,
  },
  {
    id: 'natural-stone-retaining-wall',
    name: 'Natural Stone Retaining Wall',
    category: 'Hardscaping',
    image: 'Project — Tiered natural stone retaining wall',
    featured: true,
  },
  {
    id: 'interlock-driveway-entrance',
    name: 'Interlock Driveway & Entrance',
    category: 'Hardscaping',
    image: 'Project — Interlocking paver driveway',
    featured: false,
  },
  {
    id: 'garden-irrigation-system',
    name: 'Automated Garden Irrigation',
    category: 'Irrigation',
    image: 'Project — Drip irrigation system installation',
    featured: false,
  },
  {
    id: 'backyard-retreat-fergus',
    name: 'Backyard Retreat & Fire Pit',
    category: 'Residential',
    image: 'Project — Backyard retreat with stone fire pit',
    featured: false,
  },
]
