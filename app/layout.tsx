import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meridian',
  description: 'Meridian Application',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
