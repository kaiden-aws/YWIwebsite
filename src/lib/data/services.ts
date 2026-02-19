export interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

export const services: Service[] = [
  {
    id: 'residential-landscaping',
    title: 'Residential Landscaping',
    description:
      'Transform your home with custom garden designs, patios, walkways, and year-round maintenance tailored to your lifestyle.',
    image: 'Residential — Custom garden and patio design',
    href: '/services',
  },
  {
    id: 'commercial-landscaping',
    title: 'Commercial Landscaping',
    description:
      'Professional grounds maintenance and landscape installations that elevate your business property and create lasting first impressions.',
    image: 'Commercial — Professional grounds maintenance',
    href: '/services',
  },
  {
    id: 'municipal-projects',
    title: 'Municipal Projects',
    description:
      'Large-scale public space improvements including parks, streetscapes, and community infrastructure built to endure.',
    image: 'Municipal — Public park and streetscape',
    href: '/services',
  },
]
