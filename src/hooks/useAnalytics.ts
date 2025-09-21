import { useState, useEffect, useCallback } from 'react'

interface AnalyticsSettings {
  id: string
  enabled: boolean
  trackPageViews: boolean
  trackProjectClicks: boolean
  trackContactForm: boolean
  trackDownloads: boolean
  customEvents: Array<{
    name: string
    description?: string
    selector: string
    eventType: 'click' | 'submit' | 'scroll' | 'timer'
  }>
  retentionDays: number
  excludeAdminViews: boolean
  heatmapEnabled: boolean
  notificationEmail?: string | null
  weeklyReports: boolean
  monthlyReports: boolean
}

interface AnalyticsStats {
  period: number
  overview: {
    totalViews: number
    totalProjectClicks: number
    totalContactForms: number
    totalProjects: number
  }
  dailyViews: Array<{
    date: string
    views: number
  }>
  topPages: Array<{
    page: string
    views: number
  }>
  topProjects: Array<{
    projectId: string
    title: string
    clicks: number
  }>
  technologies: Array<{
    name: string
    count: number
    percentage: number
  }>
  topCountries: Array<{
    country: string
    visits: number
  }>
}

export const useAnalytics = () => {
  const [settings, setSettings] = useState<AnalyticsSettings | null>(null)
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Charger les paramètres analytics
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics-settings?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setSettings(data)
          setError(null)
        } else {
          setError('Erreur lors du chargement des paramètres')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching analytics settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Charger les statistiques
  const fetchStats = useCallback(async (period: number = 30) => {
    try {
      setStatsLoading(true)
      const response = await fetch(`/api/analytics/stats?period=${period}&t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setError(null)
      } else {
        setError('Erreur lors du chargement des statistiques')
      }
    } catch (err) {
      setError('Erreur de connexion')
      console.error('Error fetching analytics stats:', err)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  // Mettre à jour les paramètres
  const updateSettings = async (newSettings: Partial<AnalyticsSettings>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      })

      if (response.ok) {
        const updatedSettings = await response.json()
        setSettings(updatedSettings)
        setError(null)
        return updatedSettings
      } else {
        throw new Error('Erreur lors de la mise à jour')
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour tracker un événement
  const trackEvent = useCallback(async (eventData: {
    eventType: 'page_view' | 'project_click' | 'contact_form' | 'download' | 'custom'
    eventName?: string
    page?: string
    projectId?: string
    sessionId?: string
    metadata?: Record<string, unknown>
  }) => {
    try {
      // Ne pas tracker si les analytics sont désactivés
      if (!settings?.enabled) return

      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
    } catch (err) {
      console.error('Error tracking event:', err)
      // Ne pas lever d'erreur pour le tracking pour ne pas casser l'UX
    }
  }, [settings?.enabled])

  return {
    settings,
    stats,
    loading,
    statsLoading,
    error,
    updateSettings,
    fetchStats,
    trackEvent
  }
}