import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Adam Marzuk - Portfolio',
  description: '2nd-year BUT Computer Science student specializing in application development. Explore my projects, skills, and experience.',
  keywords: ['Adam Marzuk', 'Portfolio', 'Developer', 'Computer Science', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Adam Marzuk' }],
  openGraph: {
    title: 'Adam Marzuk - Portfolio',
    description: '2nd-year BUT Computer Science student specializing in application development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}