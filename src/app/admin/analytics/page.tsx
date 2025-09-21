'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Eye, Calendar, Award, Settings, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import DashboardCard from '../components/DashboardCard'

const AnalyticsPage = () => {
  const { stats, fetchStats, statsLoading, error } = useAnalytics()
  const [period, setPeriod] = useState(30)

  // Charger les stats au montage et quand la période change
  useEffect(() => {
    fetchStats(period)
  }, [period, fetchStats])

  const handleRefresh = () => {
    fetchStats(period)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-blue-400" size={32} />
              Analytics
            </h1>
            <p className="text-white/70">Statistiques et métriques de votre portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sélecteur de période */}
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            <option value={7}>7 derniers jours</option>
            <option value={30}>30 derniers jours</option>
            <option value={90}>3 derniers mois</option>
            <option value={365}>Dernière année</option>
          </select>

          <button
            onClick={handleRefresh}
            disabled={statsLoading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className={statsLoading ? 'animate-spin' : ''} />
            Actualiser
          </button>

          <Link
            href="/admin/analytics/settings"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Settings size={16} />
            Paramètres
          </Link>
        </div>
      </motion.div>

      {statsLoading && !stats && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-white text-xl">Chargement des statistiques...</div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-red-500/20 bg-red-500/5"
        >
          <p className="text-red-400">Erreur : {error}</p>
        </motion.div>
      )}

      {stats && (
        <>
          {/* Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <DashboardCard
              title="Vues totales"
              description={`${period} derniers jours`}
              icon={<Eye className="text-blue-400" size={24} />}
              stats={stats.overview.totalViews.toLocaleString()}
              variant="primary"
            />

            <DashboardCard
              title="Clics projets"
              description="Interactions"
              icon={<TrendingUp className="text-green-400" size={24} />}
              stats={stats.overview.totalProjectClicks.toLocaleString()}
              variant="success"
            />

            <DashboardCard
              title="Messages reçus"
              description="Formulaire de contact"
              icon={<Users className="text-purple-400" size={24} />}
              stats={stats.overview.totalContactForms.toLocaleString()}
              variant="secondary"
            />

            <DashboardCard
              title="Projets actifs"
              description="Portfolio"
              icon={<Award className="text-orange-400" size={24} />}
              stats={`${stats.overview.totalProjects} total`}
              variant="warning"
            />
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="text-blue-400" size={18} />
                Vues par jour
              </h3>

              {stats.dailyViews.length > 0 ? (
                <div className="space-y-2">
                  {stats.dailyViews.slice(-7).map((day, _index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">
                        {new Date(day.date).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                            style={{
                              width: `${Math.max(10, (day.views / Math.max(...stats.dailyViews.map(d => d.views))) * 100)}%`
                            }}
                          />
                        </div>
                        <span className="text-white text-sm w-8 text-right">{day.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <div className="text-center">
                    <Calendar className="mx-auto mb-2 text-white/40" size={32} />
                    <p className="text-white/40 text-sm">Aucune donnée pour cette période</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Top Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="text-purple-400" size={18} />
                Projets populaires
              </h3>

              {stats.topProjects.length > 0 ? (
                <div className="space-y-3">
                  {stats.topProjects.slice(0, 5).map((project, _index) => (
                    <div key={project.projectId} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs w-4">#{_index + 1}</span>
                        <span className="text-white text-sm truncate">{project.title}</span>
                      </div>
                      <span className="text-purple-400 text-sm font-medium">{project.clicks} clics</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <div className="text-center">
                    <Award className="mx-auto mb-2 text-white/40" size={32} />
                    <p className="text-white/40 text-sm">Aucun clic sur les projets</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Technology Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-400" size={20} />
              Technologies utilisées
            </h2>

            <div className="space-y-4">
              {stats.technologies.slice(0, 8).map((tech, _index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + _index * 0.1, duration: 0.6 }}
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
                        transition={{ delay: 0.6 + _index * 0.1, duration: 1, ease: "easeOut" }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Pages & Countries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Eye className="text-blue-400" size={18} />
                Pages populaires
              </h3>

              {stats.topPages.length > 0 ? (
                <div className="space-y-3">
                  {stats.topPages.slice(0, 5).map((page, _index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <span className="text-white text-sm truncate">{page.page || 'Page d\'accueil'}</span>
                      <span className="text-blue-400 text-sm font-medium">{page.views} vues</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <p className="text-white/40 text-sm">Aucune donnée de pages</p>
                </div>
              )}
            </motion.div>

            {/* Top Countries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="text-green-400" size={18} />
                Pays des visiteurs
              </h3>

              {stats.topCountries.length > 0 ? (
                <div className="space-y-3">
                  {stats.topCountries.slice(0, 5).map((country, _index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <span className="text-white text-sm">{country.country || 'Inconnu'}</span>
                      <span className="text-green-400 text-sm font-medium">{country.visits} visites</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <p className="text-white/40 text-sm">Aucune donnée géographique</p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}

      {!stats && !statsLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center"
        >
          <BarChart3 className="mx-auto mb-4 text-white/40" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Aucune donnée disponible</h3>
          <p className="text-white/70 mb-4">
            Commencez à collecter des données en activant le tracking analytics.
          </p>
          <Link
            href="/admin/analytics/settings"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Settings size={16} />
            Configurer les Analytics
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default AnalyticsPage