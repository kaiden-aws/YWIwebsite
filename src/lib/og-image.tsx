import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateOGImage({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a3a2a',
          position: 'relative',
        }}
      >
        {/* Terracotta accent bar */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '6px',
            backgroundColor: '#c4703f',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            padding: '60px 80px',
          }}
        >
          {/* Company name */}
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: '#f5f0e8',
              letterSpacing: '4px',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase' as const,
              marginBottom: '40px',
            }}
          >
            YARD WEASELS INC.
          </div>

          {/* Page title */}
          <div
            style={{
              display: 'flex',
              fontSize: '64px',
              fontWeight: 700,
              color: '#f5f0e8',
              fontFamily: 'serif',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>

          {/* Optional subtitle */}
          {subtitle && (
            <div
              style={{
                display: 'flex',
                fontSize: '28px',
                color: 'rgba(245, 240, 232, 0.6)',
                fontFamily: 'sans-serif',
                marginTop: '20px',
                textAlign: 'center',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: 'rgba(245, 240, 232, 0.4)',
              fontFamily: 'sans-serif',
            }}
          >
            yardweasels.ca
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
