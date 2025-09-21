'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Save, Plus, Trash2, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useContactSettings } from '@/hooks/useContactSettings'

const ContactSettingsPage = () => {
  const router = useRouter()
  const { contactSettings, loading, updateContactSettings } = useContactSettings()

  const [formData, setFormData] = useState({
    successMessage: '',
    errorMessage: '',
    emailSubject: '',
    emailTemplate: '',
    autoReplyEnabled: false,
    autoReplySubject: '',
    autoReplyTemplate: '',
    adminEmail: '',
    ccEmails: [] as string[]
  })

  const [newCcEmail, setNewCcEmail] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (contactSettings) {
      setFormData({
        successMessage: contactSettings.successMessage || '',
        errorMessage: contactSettings.errorMessage || '',
        emailSubject: contactSettings.emailSubject || '',
        emailTemplate: contactSettings.emailTemplate || '',
        autoReplyEnabled: contactSettings.autoReplyEnabled || false,
        autoReplySubject: contactSettings.autoReplySubject || '',
        autoReplyTemplate: contactSettings.autoReplyTemplate || '',
        adminEmail: contactSettings.adminEmail || '',
        ccEmails: contactSettings.ccEmails || []
      })
    }
  }, [contactSettings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateContactSettings(formData)

      // Toast notification et redirection
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = 'Paramètres de contact mis à jour avec succès !'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
        router.push('/admin')
      }, 2000)
    } catch {
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = 'Erreur lors de la mise à jour'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
      }, 3000)
    } finally {
      setSaving(false)
    }
  }

  const addCcEmail = () => {
    if (newCcEmail && !formData.ccEmails.includes(newCcEmail)) {
      setFormData(prev => ({
        ...prev,
        ccEmails: [...prev.ccEmails, newCcEmail]
      }))
      setNewCcEmail('')
    }
  }

  const removeCcEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      ccEmails: prev.ccEmails.filter(e => e !== email)
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement des paramètres...</div>
      </div>
    )
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
              <Mail className="text-blue-400" size={32} />
              Paramètres Contact
            </h1>
            <p className="text-white/70">Configuration du formulaire de contact et des emails</p>
          </div>
        </div>
      </motion.div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Messages utilisateur */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Messages utilisateur</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="successMessage" className="block text-sm font-medium text-white/90 mb-2">
                Message de succès
              </label>
              <textarea
                id="successMessage"
                value={formData.successMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, successMessage: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                rows={3}
                placeholder="Message affiché après envoi réussi"
                required
              />
            </div>

            <div>
              <label htmlFor="errorMessage" className="block text-sm font-medium text-white/90 mb-2">
                Message d&apos;erreur
              </label>
              <textarea
                id="errorMessage"
                value={formData.errorMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, errorMessage: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                rows={3}
                placeholder="Message affiché en cas d'erreur"
                required
              />
            </div>
          </div>
        </div>

        {/* Configuration email */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Configuration email</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-white/90 mb-2">
                Email administrateur
              </label>
              <input
                type="email"
                id="adminEmail"
                value={formData.adminEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, adminEmail: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="emailSubject" className="block text-sm font-medium text-white/90 mb-2">
                Objet de l&apos;email
              </label>
              <input
                type="text"
                id="emailSubject"
                value={formData.emailSubject}
                onChange={(e) => setFormData(prev => ({ ...prev, emailSubject: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Objet des emails reçus"
                required
              />
            </div>

            <div>
              <label htmlFor="emailTemplate" className="block text-sm font-medium text-white/90 mb-2">
                Template de l&apos;email
              </label>
              <textarea
                id="emailTemplate"
                value={formData.emailTemplate}
                onChange={(e) => setFormData(prev => ({ ...prev, emailTemplate: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-mono text-sm"
                rows={8}
                placeholder="Template HTML avec variables : {{name}}, {{email}}, {{subject}}, {{message}}"
                required
              />
              <p className="text-white/60 text-xs mt-1">
                Variables disponibles : &#123;&#123;name&#125;&#125;, &#123;&#123;email&#125;&#125;, &#123;&#123;subject&#125;&#125;, &#123;&#123;message&#125;&#125;
              </p>
            </div>

            {/* Emails en copie */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Emails en copie (CC)
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newCcEmail}
                    onChange={(e) => setNewCcEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="email@example.com"
                  />
                  <button
                    type="button"
                    onClick={addCcEmail}
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Ajouter
                  </button>
                </div>

                {formData.ccEmails.length > 0 && (
                  <div className="space-y-2">
                    {formData.ccEmails.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg">
                        <span className="text-white/90">{email}</span>
                        <button
                          type="button"
                          onClick={() => removeCcEmail(email)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Réponse automatique */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Réponse automatique</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autoReplyEnabled"
                checked={formData.autoReplyEnabled}
                onChange={(e) => setFormData(prev => ({ ...prev, autoReplyEnabled: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-white/5 border border-white/20 rounded focus:ring-blue-500"
              />
              <label htmlFor="autoReplyEnabled" className="text-white/90">
                Activer la réponse automatique
              </label>
            </div>

            {formData.autoReplyEnabled && (
              <>
                <div>
                  <label htmlFor="autoReplySubject" className="block text-sm font-medium text-white/90 mb-2">
                    Objet de la réponse automatique
                  </label>
                  <input
                    type="text"
                    id="autoReplySubject"
                    value={formData.autoReplySubject}
                    onChange={(e) => setFormData(prev => ({ ...prev, autoReplySubject: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="Objet de la réponse automatique"
                  />
                </div>

                <div>
                  <label htmlFor="autoReplyTemplate" className="block text-sm font-medium text-white/90 mb-2">
                    Template de réponse automatique
                  </label>
                  <textarea
                    id="autoReplyTemplate"
                    value={formData.autoReplyTemplate}
                    onChange={(e) => setFormData(prev => ({ ...prev, autoReplyTemplate: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-mono text-sm"
                    rows={6}
                    placeholder="Template HTML de réponse automatique"
                  />
                  <p className="text-white/60 text-xs mt-1">
                    Variable disponible : &#123;&#123;name&#125;&#125;
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            <Save size={20} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ContactSettingsPage