'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'
import { experiences, education } from '@/data/experiences'

const Experience = () => {
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
              {experiences.map((exp, index) => (
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
                        <span>{exp.startDate} - {exp.endDate || 'Présent'}</span>
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
              ))}
            </div>
          </motion.div>

          {/* Formation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              🎓 Formation
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                      <p className="text-purple-400 font-medium">{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white/60 text-sm mb-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{edu.startDate} - {edu.endDate || 'Présent'}</span>
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin size={14} className="mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-white/80 text-sm">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience