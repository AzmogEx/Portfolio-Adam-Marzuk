import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { prisma } from '@/lib/prisma'
import Analytics from '@/components/Analytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Récupérer les paramètres SEO depuis la base de données
    const seoSettings = await prisma.seoSettings.findFirst()

    if (seoSettings) {
      // Parser les keywords
      const keywords = JSON.parse(seoSettings.keywords || '[]')

      return {
        title: seoSettings.title,
        description: seoSettings.description,
        keywords,
        authors: [{ name: 'Adam Marzuk' }],
        robots: seoSettings.robotsMeta,
        alternates: seoSettings.canonicalUrl ? {
          canonical: seoSettings.canonicalUrl
        } : undefined,
        openGraph: {
          title: seoSettings.ogTitle || seoSettings.title,
          description: seoSettings.ogDescription || seoSettings.description,
          type: 'website',
          images: seoSettings.ogImage ? [{ url: seoSettings.ogImage }] : undefined,
        },
        other: seoSettings.structuredData ? {
          'application/ld+json': seoSettings.structuredData
        } : undefined
      }
    }
  } catch (error) {
    console.error('Error loading SEO settings:', error)
  }

  // Fallback vers les métadonnées par défaut si erreur ou pas de settings
  return {
    title: 'Adam Marzuk - Portfolio',
    description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes. Découvrez mes projets, compétences et expériences.',
    keywords: ['Adam Marzuk', 'Portfolio', 'Développeur', 'Full-Stack', 'React', 'Next.js', 'TypeScript'],
    authors: [{ name: 'Adam Marzuk' }],
    robots: 'index,follow',
    openGraph: {
      title: 'Adam Marzuk - Portfolio',
      description: 'Développeur Full-Stack spécialisé en React, Next.js et TypeScript.',
      type: 'website',
    },
  }
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
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}