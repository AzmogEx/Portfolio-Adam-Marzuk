import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { NavigationSettingsSchema, NavigationSettingsUpdateSchema } from '@/lib/validators'

// GET /api/navigation-settings - Récupérer les paramètres de navigation
export async function GET(_request: NextRequest) {
  try {
    const navigationSettings = await prisma.navigationSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!navigationSettings) {
      // Retourner les paramètres par défaut
      const defaultSettings = {
        id: 'default',
        brandName: 'Adam Marzuk',
        logo: null,
        showLogo: false,
        menuItems: [
          { name: 'Accueil', href: '#hero', external: false, order: 0 },
          { name: 'À propos', href: '#about', external: false, order: 1 },
          { name: 'Projets', href: '#projects', external: false, order: 2 },
          { name: 'Parcours', href: '#experiences', external: false, order: 3 },
          { name: 'Contact', href: '#contact', external: false, order: 4 }
        ],
        ctaButton: null,
        ctaButtonLink: null,
        ctaButtonEnabled: false,
        mobileMenuEnabled: true,
        themeToggle: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      return NextResponse.json(defaultSettings)
    }

    // Parser le JSON des menuItems
    const parsedSettings = {
      ...navigationSettings,
      menuItems: JSON.parse(navigationSettings.menuItems)
    }

    return NextResponse.json(parsedSettings)
  } catch (error) {
    console.error('Error fetching navigation settings:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres de navigation' },
      { status: 500 }
    )
  }
}

// PUT /api/navigation-settings - Mettre à jour les paramètres de navigation (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Valider les données
    const validatedData = NavigationSettingsUpdateSchema.parse(body)

    // Convertir menuItems en JSON si présent
    const dataToSave = {
      ...validatedData,
      menuItems: validatedData.menuItems ? JSON.stringify(validatedData.menuItems) : undefined
    }

    // Récupérer les paramètres existants
    const existingSettings = await prisma.navigationSettings.findFirst()

    let navigationSettings
    if (existingSettings) {
      // Mettre à jour les paramètres existants
      navigationSettings = await prisma.navigationSettings.update({
        where: { id: existingSettings.id },
        data: dataToSave
      })
    } else {
      // Créer de nouveaux paramètres si aucun n'existe
      const fullData = NavigationSettingsSchema.parse({
        brandName: 'Adam Marzuk',
        logo: null,
        showLogo: false,
        menuItems: [
          { name: 'Accueil', href: '#hero', external: false, order: 0 },
          { name: 'À propos', href: '#about', external: false, order: 1 },
          { name: 'Projets', href: '#projects', external: false, order: 2 },
          { name: 'Parcours', href: '#experiences', external: false, order: 3 },
          { name: 'Contact', href: '#contact', external: false, order: 4 }
        ],
        ctaButton: null,
        ctaButtonLink: null,
        ctaButtonEnabled: false,
        mobileMenuEnabled: true,
        themeToggle: true,
        ...validatedData
      })

      navigationSettings = await prisma.navigationSettings.create({
        data: {
          ...fullData,
          menuItems: JSON.stringify(fullData.menuItems)
        }
      })
    }

    // Retourner avec menuItems parsé
    const responseSettings = {
      ...navigationSettings,
      menuItems: JSON.parse(navigationSettings.menuItems)
    }

    return NextResponse.json(responseSettings)
  } catch (error) {
    console.error('Error updating navigation settings:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des paramètres de navigation' },
      { status: 500 }
    )
  }
}