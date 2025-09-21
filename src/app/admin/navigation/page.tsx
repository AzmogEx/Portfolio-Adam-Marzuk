'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation, Plus, Trash2, ArrowUp, ArrowDown, Save, ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import { useNavigation } from '@/hooks/useNavigation'
import DashboardCard from '../components/DashboardCard'

interface MenuItem {
  name: string
  href: string
  external?: boolean
  order: number
}

const NavigationPage = () => {
  const { settings, loading, error, updateSettings } = useNavigation()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [formData, setFormData] = useState<{
    brandName: string;
    logo: string;
    showLogo: boolean;
    menuItems: MenuItem[];
    ctaButton: string;
    ctaButtonLink: string;
    ctaButtonEnabled: boolean;
    mobileMenuEnabled: boolean;
    themeToggle: boolean;
  } | null>(null)

  // Initialiser le formulaire avec les données actuelles
  const initializeForm = () => {
    if (settings) {
      setFormData({
        brandName: settings.brandName,
        logo: settings.logo || '',
        showLogo: settings.showLogo,
        menuItems: [...settings.menuItems],
        ctaButton: settings.ctaButton || '',
        ctaButtonLink: settings.ctaButtonLink || '',
        ctaButtonEnabled: settings.ctaButtonEnabled,
        mobileMenuEnabled: settings.mobileMenuEnabled,
        themeToggle: settings.themeToggle
      })
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!formData) return

    try {
      setSaving(true)
      await updateSettings(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving navigation settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const addMenuItem = () => {
    if (!formData) return
    const newItem: MenuItem = {
      name: 'Nouveau lien',
      href: '#section',
      external: false,
      order: formData.menuItems.length
    }
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, newItem]
    })
  }

  const removeMenuItem = (index: number) => {
    if (!formData) return
    const newMenuItems = formData.menuItems.filter((_: MenuItem, i: number) => i !== index)
    // Réorganiser les ordres
    newMenuItems.forEach((item: MenuItem, i: number) => {
      item.order = i
    })
    setFormData({
      ...formData,
      menuItems: newMenuItems
    })
  }

  const moveMenuItem = (index: number, direction: 'up' | 'down') => {
    if (!formData) return
    const newMenuItems = [...formData.menuItems]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newMenuItems.length) {
      [newMenuItems[index], newMenuItems[targetIndex]] = [newMenuItems[targetIndex], newMenuItems[index]]
      // Mettre à jour les ordres
      newMenuItems.forEach((item, i) => {
        item.order = i
      })
      setFormData({
        ...formData,
        menuItems: newMenuItems
      })
    }
  }

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string | boolean | undefined) => {
    if (!formData) return
    const newMenuItems = [...formData.menuItems]
    newMenuItems[index] = { ...newMenuItems[index], [field]: value }
    setFormData({
      ...formData,
      menuItems: newMenuItems
    })
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
              <Navigation className="text-blue-400" size={32} />
              Navigation
            </h1>
            <p className="text-white/70">Gérez la navigation et l&apos;identité de votre site</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isEditing ? (
            <button
              onClick={initializeForm}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Settings size={16} />
              Modifier
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save size={16} />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </>
          )}
        </div>
      </motion.div>

      {loading && !settings && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-white text-xl">Chargement des paramètres...</div>
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

      {(settings || formData) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aperçu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Aperçu actuel</h2>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <DashboardCard
                title="Nom de marque"
                description={(isEditing ? formData?.brandName : settings?.brandName) || ''}
                stats=""
                variant="primary"
                icon={<Navigation className="text-blue-400" size={20} />}
              />
              <DashboardCard
                title="Éléments de menu"
                description="Navigation"
                stats={`${isEditing ? formData?.menuItems?.length : settings?.menuItems?.length} liens`}
                variant="success"
                icon={<Settings className="text-green-400" size={20} />}
              />
            </div>

            {/* Navigation Preview */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
              <div className="space-y-2">
                {(isEditing ? formData?.menuItems : settings?.menuItems)?.map((item: MenuItem, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{item.name}</span>
                      <span className="text-white/60 text-sm ml-2">→ {item.href}</span>
                      {item.external && <span className="text-blue-400 text-xs ml-2">(externe)</span>}
                    </div>
                    <span className="text-white/40 text-xs">#{item.order + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              {isEditing ? 'Configuration' : 'Paramètres actuels'}
            </h2>

            {isEditing && formData ? (
              <div className="space-y-6">
                {/* Identité */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Identité de marque</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">Nom de la marque</label>
                      <input
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">URL du logo (optionnel)</label>
                      <input
                        type="url"
                        value={formData.logo}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showLogo"
                        checked={formData.showLogo}
                        onChange={(e) => setFormData({ ...formData, showLogo: e.target.checked })}
                        className="mr-3 h-4 w-4"
                      />
                      <label htmlFor="showLogo" className="text-white/80">Afficher le logo</label>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Éléments de menu</h3>
                    <button
                      onClick={addMenuItem}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                    >
                      <Plus size={14} />
                      Ajouter
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.menuItems.map((item: MenuItem, index: number) => (
                      <div key={index} className="bg-white/5 p-4 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 font-medium">Élément #{index + 1}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => moveMenuItem(index, 'up')}
                              disabled={index === 0}
                              className="p-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded text-white/80"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => moveMenuItem(index, 'down')}
                              disabled={index === formData.menuItems.length - 1}
                              className="p-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded text-white/80"
                            >
                              <ArrowDown size={14} />
                            </button>
                            <button
                              onClick={() => removeMenuItem(index)}
                              className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-white/60 text-sm mb-1">Nom</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                              className="w-full px-2 py-1.5 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-white/60 text-sm mb-1">Lien</label>
                            <input
                              type="text"
                              value={item.href}
                              onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                              className="w-full px-2 py-1.5 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`external-${index}`}
                            checked={item.external}
                            onChange={(e) => updateMenuItem(index, 'external', e.target.checked)}
                            className="mr-2 h-3 w-3"
                          />
                          <label htmlFor={`external-${index}`} className="text-white/60 text-sm">Lien externe</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Options</h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="mobileMenu"
                        checked={formData.mobileMenuEnabled}
                        onChange={(e) => setFormData({ ...formData, mobileMenuEnabled: e.target.checked })}
                        className="mr-3 h-4 w-4"
                      />
                      <label htmlFor="mobileMenu" className="text-white/80">Menu mobile activé</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="themeToggle"
                        checked={formData.themeToggle}
                        onChange={(e) => setFormData({ ...formData, themeToggle: e.target.checked })}
                        className="mr-3 h-4 w-4"
                      />
                      <label htmlFor="themeToggle" className="text-white/80">Bouton de thème</label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Identité</h3>
                  <div className="space-y-2 text-white/80">
                    <p><strong>Marque:</strong> {settings?.brandName}</p>
                    <p><strong>Logo:</strong> {settings?.showLogo ? (settings?.logo || 'Aucun') : 'Masqué'}</p>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Options</h3>
                  <div className="space-y-2 text-white/80">
                    <p><strong>Menu mobile:</strong> {settings?.mobileMenuEnabled ? 'Activé' : 'Désactivé'}</p>
                    <p><strong>Bouton thème:</strong> {settings?.themeToggle ? 'Activé' : 'Désactivé'}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default NavigationPage