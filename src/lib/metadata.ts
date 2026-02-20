export const siteConfig = {
  name: 'Yard Weasels Inc.',
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://yardweasels.ca',
  description:
    'Premium landscaping design, build, maintenance, irrigation, snow removal, and quality materials serving Fergus, Ontario and Centre Wellington.',
} as const

export const sharedOpenGraph = {
  siteName: siteConfig.name,
  locale: 'en_CA',
  type: 'website' as const,
} as const
