import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="font-body text-charcoal bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}
