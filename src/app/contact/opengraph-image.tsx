import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'Contact Us',
    subtitle: 'Get a Free Landscaping Quote',
  })
}
