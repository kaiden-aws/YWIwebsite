import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import MotionProvider from '@/providers/MotionProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yard Weasels Inc. | Professional Landscaping in Fergus, Ontario',
  description: 'Premium landscaping services in Fergus, Ontario. Design, build, maintenance, irrigation, snow removal, and quality materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body text-charcoal bg-cream antialiased">
        <MotionProvider>
          <Header />
          <PageTransitionWrapper>
            <main>{children}</main>
          </PageTransitionWrapper>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  )
}
