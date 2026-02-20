import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      aria-hidden="true"
    >
      <div className="animate-bounce motion-reduce:animate-none">
        <ChevronDown className="h-8 w-8 text-cream/60" />
      </div>
    </div>
  )
}
