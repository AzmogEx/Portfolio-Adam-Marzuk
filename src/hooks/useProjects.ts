'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  description: string
  image: string | null
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()
      
      if (response.ok) {
        setProjects(data.projects)
        setError('')
      } else {
        setError('Failed to fetch projects')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ? Cette action est irréversible.`)) {
      return false
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchProjects() // Recharger la liste
        return true
      } else {
        alert('Failed to delete project')
        return false
      }
    } catch (err) {
      alert('Network error')
      return false
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

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