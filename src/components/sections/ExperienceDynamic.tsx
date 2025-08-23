'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building, GraduationCap } from 'lucide-react'

// Interface pour les expériences récupérées de l'API
interface ExperienceAPI {
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

const ExperienceDynamic = () => {
  const [experiences, setExperiences] = useState<ExperienceAPI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fonction pour récupérer les expériences depuis l'API
  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences')
      const data = await response.json()
      
      if (response.ok) {
        setExperiences(data.experiences)
      } else {
        setError('Failed to load experiences')
      }
    } catch (err) {
      setError('Network error while loading experiences')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  // Séparer les expériences par type
  const workExperiences = experiences.filter(exp => exp.type === 'work')
  const educationExperiences = experiences.filter(exp => exp.type === 'education')

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    const monthNames = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
      'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  if (loading) {
    return (
      <section id="experiences" className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-white/70 text-lg">Loading experiences...</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mon <span className="gradient-text">Parcours</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez mes expériences professionnelles et ma formation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Expériences Professionnelles */}
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
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
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
                    
                    {exp.technologies.length > 0 && (
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
                    )}
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
              <GraduationCap className="inline" size={20} /> Formation
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
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                          </span>
                        </div>
                        <div className="flex items-center text-white/60 text-sm">
                          <MapPin size={14} className="mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {edu.description.length > 0 && edu.description[0] && (
                      <div className="space-y-2">
                        {edu.description.map((desc, i) => (
                          <p key={i} className="text-white/80 text-sm">{desc}</p>
                        ))}
                      </div>
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

export default ExperienceDynamic