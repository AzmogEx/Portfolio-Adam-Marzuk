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

export async function sendContactEmail(data: ContactFormData) {
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

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">Nouveau message de contact</h2>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3b82f6;">
        <h3>Message:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Ce message a été envoyé depuis le formulaire de contact de adam-marzuk.fr
      </p>
    </div>
  `

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'contact@adam-marzuk.fr',
    subject: `[Portfolio] ${escapeHtml(subject)}`,
    html: htmlContent,
    replyTo: email,
  }

  const result = await transporter.sendMail(mailOptions)
  return result
}