'use client'

import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionWrapper>{children}</PageTransitionWrapper>
}
