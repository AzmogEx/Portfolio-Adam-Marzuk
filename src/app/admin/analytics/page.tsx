'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Eye, Calendar, Award, Clock } from 'lucide-react'
import DashboardCard from '../components/DashboardCard'

const AnalyticsPage = () => {
  // Données statiques temporaires pour la démonstration
  const mockData = {
    views: {
      total: 1234,
      thisMonth: 89,
      change: +12.5
    },
    projects: {
      total: 8,
      featured: 3,
      recent: 2
    },
    technologies: [
      { name: 'React', count: 6, percentage: 75 },
      { name: 'TypeScript', count: 5, percentage: 62.5 },
      { name: 'Node.js', count: 4, percentage: 50 },
      { name: 'Next.js', count: 3, percentage: 37.5 },
      { name: 'Python', count: 2, percentage: 25 }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-white/70">Statistiques et métriques de votre portfolio</p>
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card p-6 border border-yellow-500/20 bg-yellow-500/5"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Clock className="text-yellow-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Fonctionnalité en développement</h3>
            <p className="text-yellow-400/80 text-sm">
              Les analytics détaillées seront bientôt disponibles
            </p>
          </div>
        </div>
        <p className="text-white/60 text-sm">
          Cette section contiendra des statistiques détaillées sur les visites, les interactions 
          avec vos projets, et d&apos;autres métriques utiles pour optimiser votre portfolio.
        </p>
      </motion.div>

      {/* Mock Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <DashboardCard
          title="Vues totales"
          description="Nombre de visites"
          icon={<Eye className="text-blue-400" size={24} />}
          stats={`${mockData.views.total.toLocaleString()}`}
          variant="primary"
        />

        <DashboardCard
          title="Ce mois"
          description="Nouvelles visites"
          icon={<TrendingUp className="text-green-400" size={24} />}
          stats={`+${mockData.views.thisMonth} (${mockData.views.change > 0 ? '+' : ''}${mockData.views.change}%)`}
          variant="success"
        />

        <DashboardCard
          title="Projets actifs"
          description="Projets publiés"
          icon={<Award className="text-purple-400" size={24} />}
          stats={`${mockData.projects.total} total`}
          variant="secondary"
        />

        <DashboardCard
          title="Engagement"
          description="Interactions moyennes"
          icon={<Users className="text-orange-400" size={24} />}
          stats="Bientôt disponible"
          variant="warning"
        />
      </motion.div>

      {/* Technology Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="text-blue-400" size={20} />
          Technologies utilisées
        </h2>
        
        <div className="space-y-4">
          {mockData.technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{tech.name}</span>
                  <span className="text-white/60 text-sm">{tech.count} projet{tech.count !== 1 ? 's' : ''}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Placeholder Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="text-green-400" size={18} />
            Visites par mois
          </h3>
          <div className="h-40 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 text-white/40" size={32} />
              <p className="text-white/40 text-sm">Graphique à venir</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={18} />
            Projets populaires
          </h3>
          <div className="h-40 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
            <div className="text-center">
              <Award className="mx-auto mb-2 text-white/40" size={32} />
              <p className="text-white/40 text-sm">Classement à venir</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Future Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Fonctionnalités prévues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm">Suivi des visites</h4>
              <p className="text-white/60 text-xs">Nombre de vues par page et projet</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm">Interactions utilisateur</h4>
              <p className="text-white/60 text-xs">Clics sur les projets et liens</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm">Géolocalisation</h4>
              <p className="text-white/60 text-xs">Origine géographique des visiteurs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm">Temps de session</h4>
              <p className="text-white/60 text-xs">Durée moyenne des visites</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsPage