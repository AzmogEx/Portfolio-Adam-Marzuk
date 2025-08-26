import { Project, Experience } from '@/types'
import { ERROR_MESSAGES } from './constants'

/**
 * Centralized API service for projects and other resources
 */
export class ApiService {
  private static baseURL = ''

  /**
   * Generic fetch with error handling
   */
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: string; success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        cache: 'no-store',
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        }
      }

      const data = await response.json()
      return {
        success: true,
        data
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
      }
    }
  }

  // Projects API
  static async getProjects(): Promise<{ data?: { projects: Project[] }; error?: string; success: boolean }> {
    return this.request<{ projects: Project[] }>('/api/projects')
  }

  static async getProject(id: string): Promise<{ data?: { project: Project }; error?: string; success: boolean }> {
    return this.request<{ project: Project }>(`/api/projects/${id}`)
  }

  static async createProject(projectData: Partial<Project>): Promise<{ data?: { project: Project }; error?: string; success: boolean }> {
    return this.request<{ project: Project }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
  }

  static async updateProject(id: string, projectData: Partial<Project>): Promise<{ data?: { project: Project }; error?: string; success: boolean }> {
    return this.request<{ project: Project }>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    })
  }

  static async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE',
    })
  }

  // File upload
  static async uploadFile(file: File): Promise<{ data?: { url: string }; error?: string; success: boolean }> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
        return {
          success: false,
          error: errorData.error || `Upload failed with status ${response.status}`
        }
      }

      const data = await response.json()
      return {
        success: true,
        data
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.UPLOAD_ERROR
      }
    }
  }

  // Auth API
  static async login(username: string, password: string): Promise<{ data?: { success: boolean }; error?: string; success: boolean }> {
    return this.request<{ success: boolean }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  static async logout(): Promise<{ success: boolean; error?: string }> {
    return this.request('/api/auth/logout', {
      method: 'POST',
    })
  }

  static async getCurrentUser(): Promise<{ data?: { user: { username: string; id: string } }; error?: string; success: boolean }> {
    return this.request<{ user: { username: string; id: string } }>('/api/auth/me')
  }

  // Experiences API
  static async getExperiences(): Promise<{ data?: { experiences: Experience[] }; error?: string; success: boolean }> {
    return this.request<{ experiences: Experience[] }>('/api/experiences')
  }

  static async getExperience(id: string): Promise<{ data?: { experience: Experience }; error?: string; success: boolean }> {
    return this.request<{ experience: Experience }>(`/api/experiences/${id}`)
  }

  static async createExperience(experienceData: Partial<Experience>): Promise<{ data?: { experience: Experience }; error?: string; success: boolean }> {
    return this.request<{ experience: Experience }>('/api/experiences', {
      method: 'POST',
      body: JSON.stringify(experienceData),
    })
  }

  static async updateExperience(id: string, experienceData: Partial<Experience>): Promise<{ data?: { experience: Experience }; error?: string; success: boolean }> {
    return this.request<{ experience: Experience }>(`/api/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData),
    })
  }

  static async deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
    return this.request(`/api/experiences/${id}`, {
      method: 'DELETE',
    })
  }
}

// Convenience functions for backwards compatibility
export const fetchProjects = () => ApiService.getProjects()
export const fetchProject = (id: string) => ApiService.getProject(id)
export const createProject = (data: Partial<Project>) => ApiService.createProject(data)
export const updateProject = (id: string, data: Partial<Project>) => ApiService.updateProject(id, data)
export const deleteProject = (id: string) => ApiService.deleteProject(id)
export const uploadFile = (file: File) => ApiService.uploadFile(file)

// Experiences convenience functions
export const fetchExperiences = () => ApiService.getExperiences()
export const fetchExperience = (id: string) => ApiService.getExperience(id)
export const createExperience = (data: Partial<Experience>) => ApiService.createExperience(data)
export const updateExperience = (id: string, data: Partial<Experience>) => ApiService.updateExperience(id, data)
export const deleteExperience = (id: string) => ApiService.deleteExperience(id)