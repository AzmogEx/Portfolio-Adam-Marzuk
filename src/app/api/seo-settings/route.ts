import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { SeoSettingsUpdateSchema } from '@/lib/validators'

// GET - Récupérer les paramètres SEO (public)
export async function GET() {
  try {
    let seoSettings = await prisma.seoSettings.findFirst()

    // Si aucun paramètre n'existe, retourner les valeurs par défaut
    if (!seoSettings) {
      const defaultSettings = {
        id: 'default',
        title: 'Adam Marzuk - Portfolio',
        description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes. Découvrez mes projets, compétences et expériences.',
        keywords: ['Adam Marzuk', 'Portfolio', 'Développeur', 'Full-Stack', 'React', 'Next.js', 'TypeScript', 'JavaScript'],
        ogTitle: 'Adam Marzuk - Portfolio | Développeur Full-Stack',
        ogDescription: 'Développeur Full-Stack spécialisé en React, Next.js et TypeScript. Découvrez mes projets et compétences.',
        ogImage: null,
        googleAnalyticsId: null,
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Adam Marzuk",
          "jobTitle": "Développeur Full-Stack",
          "url": "https://adam-marzuk.fr",
          "sameAs": [
            "https://github.com/AzmogEx",
            "https://www.linkedin.com/in/adam-marzuk-93804828a/"
          ]
        }),
        robotsMeta: 'index,follow',
        canonicalUrl: 'https://adam-marzuk.fr'
      }

      return NextResponse.json(defaultSettings)
    }

    // Parser les keywords depuis JSON
    const response = {
      ...seoSettings,
      keywords: JSON.parse(seoSettings.keywords || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching SEO settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres SEO (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validatedData = SeoSettingsUpdateSchema.parse(body)

    // Convertir keywords en JSON string
    const dataToSave = {
      ...validatedData,
      keywords: JSON.stringify(validatedData.keywords || [])
    }

    let seoSettings = await prisma.seoSettings.findFirst()

    if (!seoSettings) {
      // Créer les premiers paramètres
      seoSettings = await prisma.seoSettings.create({
        data: {
          title: dataToSave.title || 'Adam Marzuk - Portfolio',
          description: dataToSave.description || 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
          keywords: dataToSave.keywords || JSON.stringify([]),
          ogTitle: dataToSave.ogTitle || null,
          ogDescription: dataToSave.ogDescription || null,
          ogImage: dataToSave.ogImage || null,
          googleAnalyticsId: dataToSave.googleAnalyticsId || null,
          structuredData: dataToSave.structuredData || null,
          robotsMeta: dataToSave.robotsMeta || 'index,follow',
          canonicalUrl: dataToSave.canonicalUrl || null
        }
      })
    } else {
      // Mettre à jour les paramètres existants
      seoSettings = await prisma.seoSettings.update({
        where: { id: seoSettings.id },
        data: dataToSave
      })
    }

    // Retourner avec keywords parsé
    const response = {
      ...seoSettings,
      keywords: JSON.parse(seoSettings.keywords || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating SEO settings:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}