import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meridian - Staked-Access Protocol for x402 Payments',
  description: 'The staked-access protocol for x402 payments. Stake tokens to access the facilitator and earn yield from protocol usage.',
  generator: 'Next.js',
  keywords: ['meridian', 'x402', 'payments', 'protocol', 'staking', 'yield', 'blockchain'],
  authors: [{ name: 'Meridian Protocol' }],
  creator: 'Meridian Protocol',
  publisher: 'Meridian Protocol',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://meridian.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Meridian - Staked-Access Protocol for x402 Payments',
    description: 'The staked-access protocol for x402 payments. Stake tokens to access the facilitator and earn yield from protocol usage.',
    url: 'https://meridian.vercel.app',
    siteName: 'Meridian Protocol',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meridian - Staked-Access Protocol for x402 Payments',
    description: 'The staked-access protocol for x402 payments. Stake tokens to access the facilitator and earn yield from protocol usage.',
    creator: '@meridianprotocol',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#27F293' },
    { media: '(prefers-color-scheme: dark)', color: '#27F293' }
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon links for broader compatibility */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#27F293" />
        
        {/* Mobile-specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Meridian" />
        
        {/* Microsoft tiles */}
        <meta name="msapplication-TileColor" content="#27F293" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Prevent automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
