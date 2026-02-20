import { cn } from '@/lib/utils/cn'

interface ImagePlaceholderProps {
  label: string
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide'
  priority?: boolean
  className?: string
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
}

/**
 * ImagePlaceholder — Temporary placeholder for real images.
 *
 * Migration guide (SEO-07):
 * When replacing with next/image:
 * 1. The `label` prop maps to the `alt` attribute
 * 2. Add `sizes` prop for responsive loading:
 *    - Hero images: sizes="100vw"
 *    - Grid cards (3-col): sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *    - Gallery items: sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 * 3. Hero images: add priority={true} (only above-fold hero, not all images)
 * 4. Use fill={true} with object-cover for background-style images
 */
export default function ImagePlaceholder({
  label,
  aspectRatio = 'video',
  priority,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-lg bg-sage/30',
        aspectClasses[aspectRatio],
        className
      )}
      data-priority={priority || undefined}
    >
      <span className="text-sm font-medium text-forest/60 px-4 text-center">
        {label}
      </span>
    </div>
  )
}
