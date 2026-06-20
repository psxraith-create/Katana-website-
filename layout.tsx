import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '刃の道 — The Way of the Blade | Hashinomichi',
  description:
    'Premium Japanese katana, forged in tradition since 1887. Tamahagane steel, folded seventy-two times, quenched once. A living philosophy, not a weapon.',
  keywords: ['katana', 'Japanese sword', 'premium', 'luxury', 'artisan', 'blade', 'tamahagane'],
  metadataBase: undefined,
  openGraph: {
    title: '刃の道 — The Way of the Blade',
    description: 'Premium Japanese katana, forged in tradition since 1887.',
    type: 'website',
    locale: 'ja_JP',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;500&family=Cormorant:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="video" href="/katana.mp4" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Film grain noise */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
