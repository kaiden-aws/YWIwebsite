import { generateOGImage, size, contentType } from '@/lib/og-image'

export { size, contentType }

export default function Image() {
  return generateOGImage({
    title: 'Project Gallery',
    subtitle: 'Our Work Across Centre Wellington',
  })
}
