'use client'

import { useState, useEffect } from 'react'
import { ApiService } from '@/lib/api'

interface User {
  id: string
  username: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCurrentUser = async () => {
    try {
      setLoading(true)
      const result = await ApiService.getCurrentUser()
      
      if (result.success && result.data) {
        setUser(result.data.user)
        setError('')
      } else {
        // User not authenticated, this is normal
        setUser(null)
        setError('')
      }
    } catch (err) {
      setUser(null)
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des informations utilisateur')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const logout = async () => {
    const result = await ApiService.logout()
    if (result.success) {
      setUser(null)
      return true
    }
    return false
  }

  return {
    user,
    loading,
    error,
    logout,
    refetch: fetchCurrentUser,
    isAuthenticated: !!user
  }
}