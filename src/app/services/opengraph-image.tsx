import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'Our Services',
    subtitle: 'Design, Build, Maintain & More',
  })
}
