'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  )
}
