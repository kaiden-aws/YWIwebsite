'use client'

import { AnimatePresence, m } from 'motion/react'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-charcoal/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <m.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 h-full w-[280px] bg-cream shadow-xl"
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-4 p-2"
            >
              <X className="h-6 w-6 text-charcoal" />
            </button>

            <nav className="mt-16 px-6">
              {children}
            </nav>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
