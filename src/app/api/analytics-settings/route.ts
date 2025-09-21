import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { AnalyticsSettingsUpdateSchema } from '@/lib/validators'

// GET - Récupérer les paramètres Analytics (admin uniquement)
export async function GET() {
  try {
    const analyticsSettings = await prisma.analyticsSettings.findFirst()

    // Si aucun paramètre n'existe, retourner les valeurs par défaut
    if (!analyticsSettings) {
      const defaultSettings = {
        id: 'default',
        enabled: true,
        trackPageViews: true,
        trackProjectClicks: true,
        trackContactForm: true,
        trackDownloads: true,
        customEvents: [],
        retentionDays: 365,
        excludeAdminViews: true,
        heatmapEnabled: false,
        notificationEmail: null,
        weeklyReports: false,
        monthlyReports: true
      }

      return NextResponse.json(defaultSettings)
    }

    // Parser les customEvents depuis JSON
    const response = {
      ...analyticsSettings,
      customEvents: analyticsSettings.customEvents ? JSON.parse(analyticsSettings.customEvents) : []
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching analytics settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres Analytics (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validatedData = AnalyticsSettingsUpdateSchema.parse(body)

    // Convertir customEvents en JSON string
    const dataToSave = {
      ...validatedData,
      customEvents: JSON.stringify(validatedData.customEvents || [])
    }

    let analyticsSettings = await prisma.analyticsSettings.findFirst()

    if (!analyticsSettings) {
      // Créer les premiers paramètres
      analyticsSettings = await prisma.analyticsSettings.create({
        data: {
          enabled: dataToSave.enabled ?? true,
          trackPageViews: dataToSave.trackPageViews ?? true,
          trackProjectClicks: dataToSave.trackProjectClicks ?? true,
          trackContactForm: dataToSave.trackContactForm ?? true,
          trackDownloads: dataToSave.trackDownloads ?? true,
          customEvents: dataToSave.customEvents || JSON.stringify([]),
          retentionDays: dataToSave.retentionDays ?? 365,
          excludeAdminViews: dataToSave.excludeAdminViews ?? true,
          heatmapEnabled: dataToSave.heatmapEnabled ?? false,
          notificationEmail: dataToSave.notificationEmail || null,
          weeklyReports: dataToSave.weeklyReports ?? false,
          monthlyReports: dataToSave.monthlyReports ?? true
        }
      })
    } else {
      // Mettre à jour les paramètres existants
      analyticsSettings = await prisma.analyticsSettings.update({
        where: { id: analyticsSettings.id },
        data: dataToSave
      })
    }

    // Retourner avec customEvents parsé
    const response = {
      ...analyticsSettings,
      customEvents: JSON.parse(analyticsSettings.customEvents || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating analytics settings:', error)
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