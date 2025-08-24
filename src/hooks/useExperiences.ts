'use client'

import { useState, useEffect, useCallback } from 'react'
import { Experience } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, CONFIRMATION_MESSAGES } from '@/lib/constants'

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true)
      const result = await ApiService.getExperiences()
      
      if (result.success && result.data) {
        setExperiences(result.data.experiences)
        setError('')
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_EXPERIENCES_FAILED)
      }
    } catch (_err) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteExperience = async (id: string, title: string) => {
    if (!confirm(CONFIRMATION_MESSAGES.DELETE_EXPERIENCE(title))) {
      return false
    }

    const result = await ApiService.deleteExperience(id)

    if (result.success) {
      await fetchExperiences() // Recharger la liste
      return true
    } else {
      alert(result.error || ERROR_MESSAGES.DELETE_EXPERIENCE_FAILED)
      return false
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

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