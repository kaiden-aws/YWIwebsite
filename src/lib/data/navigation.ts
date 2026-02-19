export interface NavItem {
  label: string
  href: string
}

export const navLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const companyInfo = {
  name: 'Yard Weasels Inc.',
  phone: '519-843-5489',
  phoneHref: 'tel:5198435489',
  hours: 'Mon-Fri 8:00 AM - 5:00 PM',
  officeAddress: {
    label: 'Office',
    street: '8146 Sideroad 15',
    city: 'Fergus, Ontario',
  },
  retailYardAddress: {
    label: 'Retail Yard',
    street: '6470 Beatty Line N',
    city: 'Fergus, Ontario',
  },
  social: {
    facebook: 'https://facebook.com/yardweasels',
    instagram: 'https://instagram.com/yardweasels',
  },
  copyright: 2026,
} as const
