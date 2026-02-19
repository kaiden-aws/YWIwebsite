export interface Service {
  id: string
  title: string
  description: string
  details: string
  image: string
  imageLabel: string
  href: string
  featured: boolean
}

export const services: Service[] = [
  {
    id: 'landscape-design-build',
    title: 'Landscape Design & Build',
    description:
      'Custom hardscaping and landscape construction from concept to completion.',
    details:
      'From Pavestone patios and concrete work to retaining walls, pool scapes, and garden structures — we handle every stage from design consultation to final installation. Our design-to-build approach means one team manages your entire project seamlessly.',
    image: 'Design & Build — Custom patio installation',
    imageLabel: 'Landscape Design & Build — Pavestone patio with retaining wall',
    href: '/services',
    featured: false,
  },
  {
    id: 'residential-maintenance',
    title: 'Residential Maintenance',
    description:
      'Year-round lawn care, garden maintenance, and seasonal cleanup tailored to your home.',
    details:
      'Keep your property looking its best all year. We provide professional lawn care, garden maintenance, and seasonal cleanup services tailored to the unique needs of your home and landscape.',
    image: 'Residential — Custom garden and patio design',
    imageLabel: 'Residential Maintenance — Well-maintained home garden',
    href: '/services',
    featured: true,
  },
  {
    id: 'commercial-landscaping',
    title: 'Commercial Landscaping',
    description:
      'Professional grounds maintenance and landscape installations that elevate your business.',
    details:
      'Make a lasting first impression with professional grounds keeping, property maintenance, and landscape installations designed to enhance your business curb appeal and create welcoming commercial spaces.',
    image: 'Commercial — Professional grounds maintenance',
    imageLabel: 'Commercial Landscaping — Professional office grounds',
    href: '/services',
    featured: true,
  },
  {
    id: 'municipal-projects',
    title: 'Municipal Projects',
    description:
      'Large-scale public space improvements including parks, streetscapes, and community infrastructure.',
    details:
      'We partner with municipalities on community-level landscape projects, from public parks and streetscapes to recreational areas and civic spaces. Our team has the equipment and experience to deliver projects built to endure.',
    image: 'Municipal — Public park and streetscape',
    imageLabel: 'Municipal Projects — Community park landscape',
    href: '/services',
    featured: true,
  },
  {
    id: 'irrigation-lighting',
    title: 'Irrigation & Landscape Lighting',
    description:
      'Efficient irrigation systems and landscape lighting designed, installed, and maintained.',
    details:
      'We design, install, and maintain irrigation systems with programmable controllers for efficient water management. Our team holds the licence for backflow preventor testing — a credential required under Ontario regulations that many landscapers lack. We also offer landscape lighting design to showcase your property after dark.',
    image: 'Irrigation — Sprinkler system in action',
    imageLabel: 'Irrigation & Lighting — Sprinkler system with landscape lights',
    href: '/services',
    featured: false,
  },
  {
    id: 'snow-removal',
    title: 'Snow Removal',
    description:
      'Reliable snow clearing, salting, and hauling services to keep your property safe all winter.',
    details:
      'Keep your property safe and accessible all winter. We provide parking lot and driveway clearing, salting, walkway shovelling, and snow hauling services. Flexible pricing options available including contract, per-visit, and hourly rates to suit your needs.',
    image: 'Snow Removal — Parking lot clearing',
    imageLabel: 'Snow Removal — Commercial lot plowing',
    href: '/services',
    featured: false,
  },
]
