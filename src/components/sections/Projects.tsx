'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Rocket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, LOADING_MESSAGES } from '@/lib/constants'

const Projects = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [_refreshing, _setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const fetchProjects = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        _setRefreshing(true)
        setError('')
      }
      
      const result = await ApiService.getProjects()
      
      if (result.success && result.data) {
        setProjects(result.data.projects)
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_PROJECTS_FAILED)
      }
    } catch (_err) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
      _setRefreshing(false)
    }
  }, [])

  const _handleRefresh = useCallback(async () => {
    router.refresh()
    await fetchProjects(true)
  }, [fetchProjects, router])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Auto-refresh when returning from admin
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProjects(true)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [fetchProjects])

  if (loading) {
    return (
      <section id="projects" className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-white/70 text-lg">{LOADING_MESSAGES.LOADING_PROJECTS}</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-red-400 text-lg">{error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mes <span className="gradient-text">Projets</span>
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations et projets personnels
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center text-white/70">
            No projects available at the moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card group hover:scale-105"
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-6 overflow-hidden">
                  {project.image ? (
                    <div className="w-full h-full relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Rocket className="text-blue-400" size={48} />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 text-white/90 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 text-white/80 hover:text-white"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                  )}
                  
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-300 text-white"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects