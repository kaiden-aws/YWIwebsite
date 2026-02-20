'use client'

import { AnimatePresence, m } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
