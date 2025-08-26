'use client'

import { motion } from 'framer-motion'
import { FolderOpen, User, BarChart3, Plus, ExternalLink, Star, Wrench, Heart } from 'lucide-react'
import Link from 'next/link'
import DashboardCard from './components/DashboardCard'
import { useProjects } from '@/hooks/useProjects'
import { useExperiences } from '@/hooks/useExperiences'

const AdminDashboard = () => {
  const { projects, loading: projectsLoading, stats: projectStats } = useProjects()
  const { experiences: _experiences, loading: experiencesLoading, stats: experienceStats } = useExperiences()

  const isLoading = projectsLoading || experiencesLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement du dashboard...</div>
      </div>
    )
  }

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/70">Vue d&apos;ensemble de votre portfolio</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        <DashboardCard
          title="Projets"
          description={`${projectStats.total} projet${projectStats.total !== 1 ? 's' : ''} total`}
          icon={<FolderOpen className="text-blue-400" size={24} />}
          action={{
            label: "Gérer",
            href: "/admin/projects"
          }}
          variant="primary"
        />

        <DashboardCard
          title="Expériences"
          description={`${experienceStats.total} expérience${experienceStats.total !== 1 ? 's' : ''} total`}
          icon={<User className="text-purple-400" size={24} />}
          action={{
            label: "Gérer",
            href: "/admin/experiences"
          }}
          variant="secondary"
        />

        <DashboardCard
          title="Outils"
          description="Technologies et méthodes"
          icon={<Wrench className="text-yellow-400" size={24} />}
          action={{
            label: "Gérer",
            href: "/admin/tools"
          }}
          variant="warning"
        />

        <DashboardCard
          title="Soft Skills"
          description="Compétences personnelles"
          icon={<Heart className="text-pink-400" size={24} />}
          action={{
            label: "Gérer",
            href: "/admin/soft-skills"
          }}
          variant="secondary"
        />

        <DashboardCard
          title="Analytics"
          description="Statistiques et métriques"
          icon={<BarChart3 className="text-green-400" size={24} />}
          action={{
            label: "Voir",
            href: "/admin/analytics"
          }}
          variant="success"
        />

        <DashboardCard
          title="Actions rapides"
          description="Créer du contenu"
          icon={<Plus className="text-orange-400" size={24} />}
          stats="Nouveau projet"
          action={{
            label: "Créer",
            href: "/admin/projects/new"
          }}
          variant="warning"
        />
      </motion.div>

      {/* Main Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FolderOpen className="text-blue-400" size={20} />
            Actions Projets
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 text-blue-400 hover:text-blue-300 transition-all duration-300"
            >
              <Plus size={16} />
              <div>
                <div className="font-medium">Nouveau projet</div>
                <div className="text-sm text-blue-400/70">Ajouter une nouvelle réalisation</div>
              </div>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
            >
              <FolderOpen size={16} />
              <div>
                <div className="font-medium">Gérer les projets</div>
                <div className="text-sm text-white/60">Modifier, supprimer ou réorganiser</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ExternalLink className="text-purple-400" size={20} />
            Liens rapides
          </h2>
          <div className="space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/20 text-purple-400 hover:text-purple-300 transition-all duration-300"
            >
              <ExternalLink size={16} />
              <div>
                <div className="font-medium">Voir le site</div>
                <div className="text-sm text-purple-400/70">Aperçu du portfolio public</div>
              </div>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
            >
              <BarChart3 size={16} />
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-sm text-white/60">Statistiques et métriques</div>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              Projets récents
            </h2>
            <Link
              href="/admin/projects"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Voir tous les projets →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white text-sm truncate pr-2">{project.title}</h3>
                </div>
                <p className="text-white/60 text-xs mb-3 line-clamp-2 break-words">{project.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                  >
                    Modifier
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs transition-colors"
                    >
                      Voir
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AdminDashboard