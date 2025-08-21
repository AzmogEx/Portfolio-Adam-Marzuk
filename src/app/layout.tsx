import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}