'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Experience as ExperienceType } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, LOADING_MESSAGES } from '@/lib/constants'

const Experience = () => {
  const router = useRouter()
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)
  const [_refreshing, _setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const fetchExperiences = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        _setRefreshing(true)
        setError('')
      }
      
      const result = await ApiService.getExperiences()
      
      if (result.success && result.data) {
        setExperiences(result.data.experiences)
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_EXPERIENCES_FAILED)
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
    await fetchExperiences(true)
  }, [fetchExperiences, router])

  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  // Auto-refresh when returning from admin
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchExperiences(true)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [fetchExperiences])

  // Separate work and education experiences
  const workExperiences = experiences.filter(exp => exp.type === 'work')
  const educationExperiences = experiences.filter(exp => exp.type === 'education')

  if (loading) {
    return (
      <section id="experiences" className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-white/70 text-lg">{LOADING_MESSAGES.LOADING_EXPERIENCES}</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="experiences" className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-red-400 text-lg">{error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experiences" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mon <span className="gradient-text">Parcours</span>
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez mes expériences professionnelles et ma formation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Expériences */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Building className="mr-3 text-blue-400" size={24} />
              Expériences
            </h3>
            
            <div className="space-y-8">
              {workExperiences.length === 0 ? (
                <div className="text-center text-white/70">
                  Aucune expérience disponible pour le moment.
                </div>
              ) : (
                workExperiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                        <p className="text-blue-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-white/60 text-sm mb-1">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit' })} - {' '}
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit' }) : 'Présent'}
                          </span>
                        </div>
                        <div className="flex items-center text-white/60 text-sm">
                          <MapPin size={14} className="mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-white/80 text-sm">
                          • {desc}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Formation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-purple-400" size={24} /> Formation
            </h3>
            
            <div className="space-y-8">
              {educationExperiences.length === 0 ? (
                <div className="text-center text-white/70">
                  Aucune formation disponible pour le moment.
                </div>
              ) : (
                educationExperiences.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{edu.title}</h4>
                        <p className="text-purple-400 font-medium">{edu.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-white/60 text-sm mb-1">
                          <Calendar size={14} className="mr-1" />
                          <span>
                            {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit' })} - {' '}
                            {edu.endDate ? new Date(edu.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit' }) : 'Présent'}
                          </span>
                        </div>
                        <div className="flex items-center text-white/60 text-sm">
                          <MapPin size={14} className="mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {edu.description && edu.description.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {edu.description.map((desc, i) => (
                          <li key={i} className="text-white/80 text-sm">
                            • {desc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience