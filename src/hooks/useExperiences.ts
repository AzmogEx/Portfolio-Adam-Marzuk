'use client'

import { useState, useEffect } from 'react'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string | null
  description: string[]
  technologies: string[]
  type: 'work' | 'education'
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/experiences')
      const data = await response.json()
      
      if (response.ok) {
        setExperiences(data.experiences)
        setError('')
      } else {
        setError('Failed to fetch experiences')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const deleteExperience = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ? Cette action est irréversible.`)) {
      return false
    }

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchExperiences() // Recharger la liste
        return true
      } else {
        alert('Failed to delete experience')
        return false
      }
    } catch (err) {
      alert('Network error')
      return false
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  // Statistiques dérivées
  const stats = {
    total: experiences.length,
    work: experiences.filter(exp => exp.type === 'work').length,
    education: experiences.filter(exp => exp.type === 'education').length,
    featured: experiences.filter(exp => exp.featured).length,
    recent: experiences.filter(exp => {
      const created = new Date(exp.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return created > weekAgo
    }).length
  }

  return {
    experiences,
    loading,
    error,
    stats,
    fetchExperiences,
    deleteExperience
  }
}