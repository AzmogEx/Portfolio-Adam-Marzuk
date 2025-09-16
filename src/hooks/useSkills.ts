import { useState, useEffect } from 'react'

interface Skill {
  id: string
  name: string
  category: 'language' | 'framework' | 'tool' | 'other'
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner'
  icon: string
  description?: string | null
  type: 'main' | 'workflow' | 'soft'
  order: number
}

export const useSkills = (type?: 'main' | 'workflow' | 'soft', category?: string) => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (category) params.append('category', category)

        const url = `/api/skills?${params.toString()}&t=${Date.now()}`
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setSkills(data.skills || [])
          setError(null)
        } else {
          setError('Erreur lors du chargement des compétences')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching skills:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [type, category])

  return {
    skills,
    loading,
    error
  }
}