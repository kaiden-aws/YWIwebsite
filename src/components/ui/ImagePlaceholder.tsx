import { cn } from '@/lib/utils/cn'

interface ImagePlaceholderProps {
  label: string
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide'
  className?: string
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
}

export default function ImagePlaceholder({
  label,
  aspectRatio = 'video',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-lg bg-sage/30',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <span className="text-sm font-medium text-forest/60 px-4 text-center">
        {label}
      </span>
    </div>
  )
}
