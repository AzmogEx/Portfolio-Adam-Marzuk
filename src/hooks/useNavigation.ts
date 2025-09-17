import { useState, useEffect, useCallback } from 'react'

interface MenuItem {
  name: string
  href: string
  external?: boolean
  order: number
}

interface NavigationSettings {
  id: string
  brandName: string
  logo: string | null
  showLogo: boolean
  menuItems: MenuItem[]
  ctaButton: string | null
  ctaButtonLink: string | null
  ctaButtonEnabled: boolean
  mobileMenuEnabled: boolean
  themeToggle: boolean
}

export const useNavigation = () => {
  const [settings, setSettings] = useState<NavigationSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les paramètres de navigation
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/navigation-settings?t=${Date.now()}`, {
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
          setError('Erreur lors du chargement des paramètres de navigation')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching navigation settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Mettre à jour les paramètres
  const updateSettings = useCallback(async (newSettings: Partial<NavigationSettings>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/navigation-settings', {
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
  }, [])

  return {
    settings,
    loading,
    error,
    updateSettings
  }
}