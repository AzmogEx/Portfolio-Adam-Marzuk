import nodemailer from 'nodemailer'
import { ContactFormData } from './validators'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface ContactSettings {
  id: string
  successMessage: string
  errorMessage: string
  emailSubject: string
  emailTemplate: string
  autoReplyEnabled: boolean
  autoReplySubject?: string | null
  autoReplyTemplate?: string | null
  adminEmail: string
  ccEmails: string | null
}

export async function sendContactEmail(data: ContactFormData, settings?: ContactSettings | null) {
  const { name, email, subject, message } = data

  // Vérifier les variables d'environnement
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Configuration SMTP manquante. Vérifiez vos variables d\'environnement.')
  }

  // Échapper le HTML pour éviter les injections
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Parser les ccEmails si elles existent
  let ccEmails: string[] = []
  if (settings?.ccEmails && settings.ccEmails !== null) {
    try {
      ccEmails = JSON.parse(settings.ccEmails)
    } catch (e) {
      console.warn('Erreur parsing ccEmails:', e)
    }
  }

  // Utiliser le template des paramètres ou template par défaut
  let htmlContent = settings?.emailTemplate || `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">Nouveau message de contact</h2>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Sujet:</strong> {{subject}}</p>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3b82f6;">
        <h3>Message:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
      </div>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Ce message a été envoyé depuis le formulaire de contact de adam-marzuk.fr
      </p>
    </div>
  `

  // Remplacer les variables dans le template
  htmlContent = htmlContent
    .replace(/\{\{name\}\}/g, escapeHtml(name))
    .replace(/\{\{email\}\}/g, escapeHtml(email))
    .replace(/\{\{subject\}\}/g, escapeHtml(subject))
    .replace(/\{\{message\}\}/g, escapeHtml(message))

  // Email à l'admin
  const adminMailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: settings?.adminEmail || process.env.CONTACT_EMAIL || 'contact@adam-marzuk.fr',
    cc: ccEmails.length > 0 ? ccEmails : undefined,
    subject: settings?.emailSubject || `[Portfolio] ${escapeHtml(subject)}`,
    html: htmlContent,
    replyTo: email,
  }

  // Envoyer l'email à l'admin
  const adminResult = await transporter.sendMail(adminMailOptions)

  // Envoyer la réponse automatique si activée
  if (settings?.autoReplyEnabled && settings.autoReplyTemplate && settings.autoReplySubject) {
    let autoReplyHtml = settings.autoReplyTemplate
    autoReplyHtml = autoReplyHtml.replace(/\{\{name\}\}/g, escapeHtml(name))

    const autoReplyOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: settings.autoReplySubject,
      html: autoReplyHtml,
    }

    await transporter.sendMail(autoReplyOptions)
  }

  return adminResult
}