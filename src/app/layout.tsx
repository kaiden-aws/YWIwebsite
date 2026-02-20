import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import { siteConfig, sharedOpenGraph } from '@/lib/metadata'
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
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | Yard Weasels Inc.',
    default: 'Professional Landscaping in Fergus, Ontario | Yard Weasels Inc.',
  },
  description: siteConfig.description,
  keywords: [
    'landscaping Fergus Ontario',
    'landscape design Centre Wellington',
    'snow removal Fergus',
    'irrigation Fergus Ontario',
    'landscaping materials Fergus',
  ],
  openGraph: {
    ...sharedOpenGraph,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Yard Weasels Inc. — Professional Landscaping',
      },
    ],
  },
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
