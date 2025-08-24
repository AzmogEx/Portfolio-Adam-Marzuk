'use client'

import { useState, useEffect, useCallback } from 'react'
import { Project } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, CONFIRMATION_MESSAGES } from '@/lib/constants'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const result = await ApiService.getProjects()
      
      if (result.success && result.data) {
        setProjects(result.data.projects)
        setError('')
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_PROJECTS_FAILED)
      }
    } catch (_err) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(CONFIRMATION_MESSAGES.DELETE_PROJECT(title))) {
      return false
    }

    const result = await ApiService.deleteProject(id)

    if (result.success) {
      await fetchProjects() // Recharger la liste
      return true
    } else {
      alert(result.error || ERROR_MESSAGES.DELETE_PROJECT_FAILED)
      return false
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Statistiques dérivées
  const stats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    recent: projects.filter(p => {
      const created = new Date(p.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return created > weekAgo
    }).length
  }

  return {
    projects,
    loading,
    error,
    stats,
    fetchProjects,
    deleteProject
  }
}