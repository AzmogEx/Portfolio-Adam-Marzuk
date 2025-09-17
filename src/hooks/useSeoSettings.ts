import { useState, useEffect } from 'react'

interface SeoSettings {
  id: string
  title: string
  description: string
  keywords: string[]
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: string | null
  googleAnalyticsId?: string | null
  structuredData?: string | null
  robotsMeta: string
  canonicalUrl?: string | null
}

export const useSeoSettings = () => {
  const [seoSettings, setSeoSettings] = useState<SeoSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeoSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/seo-settings?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setSeoSettings(data)
          setError(null)
        } else if (response.status === 404) {
          // Pas de paramètres trouvés, utiliser les valeurs par défaut
          const defaultSettings: SeoSettings = {
            id: 'default',
            title: 'Adam Marzuk - Portfolio',
            description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
            keywords: ['Adam Marzuk', 'Portfolio', 'Développeur', 'Full-Stack', 'React', 'Next.js', 'TypeScript'],
            ogTitle: 'Adam Marzuk - Portfolio | Développeur Full-Stack',
            ogDescription: 'Développeur Full-Stack spécialisé en React, Next.js et TypeScript.',
            ogImage: null,
            googleAnalyticsId: null,
            structuredData: null,
            robotsMeta: 'index,follow',
            canonicalUrl: 'https://adam-marzuk.fr'
          }
          setSeoSettings(defaultSettings)
          setError(null)
        } else {
          setError('Erreur lors du chargement des paramètres SEO')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching SEO settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSeoSettings()
  }, [])

  const updateSeoSettings = async (settings: Partial<SeoSettings>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/seo-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        const updatedSettings = await response.json()
        setSeoSettings(updatedSettings)
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

  return {
    seoSettings,
    loading,
    error,
    updateSeoSettings
  }
}