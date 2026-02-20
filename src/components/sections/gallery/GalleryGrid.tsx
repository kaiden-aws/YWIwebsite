'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { projects } from '@/lib/data/projects'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { cn } from '@/lib/utils/cn'
import GalleryLightbox from './GalleryLightbox'

const FILTERS = ['All', 'Residential', 'Commercial', 'Hardscaping', 'Irrigation'] as const

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const handleClose = useCallback(() => setLightboxIndex(null), [])
  const handlePrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + filtered.length) % filtered.length : null
      ),
    [filtered.length]
  )
  const handleNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % filtered.length : null
      ),
    [filtered.length]
  )

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
                activeFilter === filter
                  ? 'bg-forest text-cream'
                  : 'bg-sage/20 text-charcoal hover:bg-sage/40'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          <AnimatePresence mode="sync">
            {filtered.map((project, index) => (
              <m.div
                key={project.id}
                layout={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'group relative overflow-hidden rounded-lg cursor-pointer',
                  project.featured ? 'row-span-2' : 'row-span-1'
                )}
                onClick={() => setLightboxIndex(index)}
              >
                <ImagePlaceholder
                  label={project.image}
                  className="!aspect-auto h-full w-full !rounded-none"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/60 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 flex items-end p-4 md:p-6">
                  <div>
                    <span className="text-cream font-display text-lg md:text-xl">
                      {project.name}
                    </span>
                    <span className="text-cream/70 text-sm block">
                      {project.category}
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        <GalleryLightbox
          images={filtered}
          selectedIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  )
}
