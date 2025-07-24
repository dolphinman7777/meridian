import type { Metadata } from 'next'
import { Inter, Quattrocento } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const quattrocento = Quattrocento({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quattrocento',
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${quattrocento.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
