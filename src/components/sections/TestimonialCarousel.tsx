'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { cn } from '@/lib/utils/cn'

interface TestimonialCarouselProps {
  testimonials: {
    id: number
    quote: string
    author: string
    role: string
    rating: number
  }[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={cn('w-5 h-5', i < rating ? 'text-terracotta' : 'text-charcoal/20')}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setTimeout(next, 5000)
    return () => clearTimeout(timer)
  }, [current, isPaused, next])

  const testimonial = testimonials[current]

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl text-forest mb-16">
          What Our Clients Say
        </h2>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span
            className="font-display text-7xl md:text-8xl text-terracotta/20 leading-none select-none block mb-4"
            aria-hidden="true"
          >
            {'\u201C'}
          </span>

          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="text-lg md:text-xl text-charcoal leading-relaxed mb-6 max-w-2xl mx-auto">
                {testimonial.quote}
              </blockquote>
              <StarRating rating={testimonial.rating} />
              <p className="font-display text-forest mt-4">
                {testimonial.author}
              </p>
              <p className="text-charcoal/70 text-sm">
                {testimonial.role}
              </p>
            </m.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i)
                  setIsPaused(false)
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={cn(
                    'w-3 h-3 rounded-full transition-colors',
                    current === i
                      ? 'bg-terracotta'
                      : 'bg-charcoal/20 hover:bg-charcoal/40'
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
