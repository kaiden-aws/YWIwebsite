'use client'

import { useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import type { Project } from '@/lib/data/projects'

interface GalleryLightboxProps {
  images: Project[]
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Keyboard handler
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
        case 'Tab': {
          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [tabindex]:not([tabindex="-1"])'
          )
          if (!focusable || focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onClose, onPrev, onNext])

  // Body scroll lock + focus management
  useEffect(() => {
    if (selectedIndex !== null) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => modalRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  const current = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <AnimatePresence>
      {current && selectedIndex !== null && (
        <m.div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} — ${current.category}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/90"
            onClick={onClose}
          />

          {/* Content */}
          <m.div
            className="relative z-10 w-full max-w-5xl mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              className="absolute -top-12 right-0 text-cream/80 hover:text-cream p-2"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <ImagePlaceholder
              label={current.image}
              aspectRatio="video"
              className="!rounded-lg w-full"
            />

            {/* Caption */}
            <div className="mt-4 text-center">
              <span className="text-cream font-display text-xl">
                {current.name}
              </span>
              <span className="text-cream/60 text-sm block">
                {current.category}
              </span>
              <span className="text-cream/40 text-xs mt-1 block">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>

            {/* Prev button */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-14 text-cream/80 hover:text-cream p-2"
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Next button */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-14 text-cream/80 hover:text-cream p-2"
              onClick={onNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
