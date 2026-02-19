'use client'

import { useContext, useRef } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { useSelectedLayoutSegment } from 'next/navigation'

// Internal Next.js API — may change between versions.
// Community discussion: https://github.com/vercel/next.js/discussions/42658
// Stable from Next.js 13 through 16.x. If it breaks on upgrade, fallback
// is to remove FrozenRouter and use a simpler template.tsx-based fade.
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  const prev = ref.current
  ref.current = value
  return prev
}

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const segment = useSelectedLayoutSegment()
  const prevContext = usePreviousValue(context)
  const prevSegment = usePreviousValue(segment)

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext! : context!}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </m.div>
    </AnimatePresence>
  )
}
