import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'Professional Landscaping',
    subtitle: 'Fergus, Ontario & Centre Wellington',
  })
}
