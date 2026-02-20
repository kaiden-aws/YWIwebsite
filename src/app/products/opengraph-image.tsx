import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'Quality Materials',
    subtitle: 'Aggregates, Mulch, Stone & More',
  })
}
