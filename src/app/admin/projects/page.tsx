'use client'

import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink, Github, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useProjects } from '@/hooks/useProjects'

const ProjectsPage = () => {
  const { projects, loading, error, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return
    
    const success = await deleteProject(id)
    if (!success) {
      alert('Erreur lors de la suppression du projet')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement des projets...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Projets</h1>
          <p className="text-white/70">
            {projects.length} projet{projects.length !== 1 ? 's' : ''} • 
            {projects.filter(p => p.featured).length} mis en avant
          </p>
        </div>
        
        <Link href="/admin/projects/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300"
          >
            <Plus size={16} />
            <span>Nouveau Projet</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card p-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
          <input
            type="text"
            placeholder="Rechercher par titre, description ou technologie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="glass-card group hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 overflow-hidden">
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
                    <span className="text-4xl">🚀</span>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded flex-shrink-0 ml-2">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-white/70 text-sm mb-3 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/10 text-white/90 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-white/10 text-white/90 text-xs rounded">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <Link href={`/admin/projects/${project.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm rounded transition-colors"
                  >
                    <Edit2 size={12} />
                    Modifier
                  </motion.button>
                </Link>
                
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white/80 text-sm rounded transition-colors"
                  >
                    <Github size={12} />
                    Code
                  </motion.a>
                )}
                
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm rounded transition-colors"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </motion.a>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteProject(project.id, project.title)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors ml-auto"
                >
                  <Trash2 size={12} />
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : searchTerm ? (
        // No Search Results
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-white/50 text-lg mb-2">
            Aucun projet trouvé pour "{searchTerm}"
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Effacer la recherche
          </button>
        </motion.div>
      ) : (
        // No Projects
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-white/50 text-lg mb-4">Aucun projet trouvé</div>
          <Link href="/admin/projects/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300"
            >
              <Plus size={16} />
              Créer votre premier projet
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Search Results Info */}
      {searchTerm && filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white/60 text-sm"
        >
          {filteredProjects.length} résultat{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''} pour "{searchTerm}"
        </motion.div>
      )}
    </div>
  )
}

export default ProjectsPage