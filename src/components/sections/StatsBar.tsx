'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: null, display: 'Southern ON', label: 'Service Area' },
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section className="py-14 md:py-20 px-6 bg-forest relative overflow-hidden">
      <GrainOverlay />
      <AnimatedSection>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-3 gap-8 md:gap-12 text-center">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.15}>
                <div>
                  <p className="font-display text-3xl md:text-4xl lg:text-5xl text-terracotta-light mb-2">
                    {stat.value !== null ? (
                      <CountUp value={stat.value} suffix={stat.suffix!} />
                    ) : (
                      stat.display
                    )}
                  </p>
                  <p className="text-cream/70 text-sm md:text-base font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
