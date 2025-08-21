'use client'

import { useState, useEffect } from 'react'
import type { Theme } from '@/types'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Initialize theme from localStorage on client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      setTheme(savedTheme || 'dark')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      const body = window.document.body
      
      if (theme === 'dark') {
        root.classList.add('dark')
        body.classList.remove('light')
      } else {
        root.classList.remove('dark')
        body.classList.add('light')
      }
      
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}