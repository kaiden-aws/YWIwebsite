'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function HeroParallax({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '50%']
  )

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Parallax background layer */}
      <m.div className="absolute inset-0 -z-10" style={{ y }}>
        <div className="h-full w-full">
          <ImagePlaceholder
            label="Hero — Completed landscape project"
            className="!aspect-auto h-full w-full !rounded-none"
          />
        </div>
      </m.div>

      {/* Foreground content */}
      <div className="relative z-20">{children}</div>
    </section>
  )
}
