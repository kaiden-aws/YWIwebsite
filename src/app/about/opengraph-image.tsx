import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'About Our Team',
    subtitle: 'Rooted in Fergus, Ontario',
  })
}
