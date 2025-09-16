import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const ContactSettingsUpdateSchema = z.object({
  successMessage: z.string().min(1, 'Message de succès requis'),
  errorMessage: z.string().min(1, 'Message d\'erreur requis'),
  emailSubject: z.string().min(1, 'Objet de l\'email requis'),
  emailTemplate: z.string().min(1, 'Template de l\'email requis'),
  autoReplyEnabled: z.boolean().default(false),
  autoReplySubject: z.string().optional(),
  autoReplyTemplate: z.string().optional(),
  adminEmail: z.string().email('Email admin invalide'),
  ccEmails: z.array(z.string().email()).optional()
})

// GET - Récupérer les paramètres de contact (public pour le formulaire)
export async function GET() {
  try {
    let contactSettings = await prisma.contactSettings.findFirst()

    // Si aucun paramètre n'existe, retourner les valeurs par défaut
    if (!contactSettings) {
      const defaultSettings = {
        id: 'default',
        successMessage: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
        errorMessage: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou me contacter directement.',
        emailSubject: 'Nouveau message depuis votre portfolio',
        emailTemplate: `
<h2>Nouveau message de contact</h2>
<p><strong>Nom :</strong> {{name}}</p>
<p><strong>Email :</strong> {{email}}</p>
<p><strong>Objet :</strong> {{subject}}</p>
<p><strong>Message :</strong></p>
<div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #007bff;">
  {{message}}
</div>
<p><small>Message envoyé depuis adam-marzuk.fr</small></p>
        `.trim(),
        autoReplyEnabled: false,
        autoReplySubject: 'Merci pour votre message',
        autoReplyTemplate: `
<h2>Merci pour votre message !</h2>
<p>Bonjour {{name}},</p>
<p>J'ai bien reçu votre message et je vous remercie pour votre intérêt.</p>
<p>Je vous répondrai dans les plus brefs délais.</p>
<p>Cordialement,<br>Adam Marzuk</p>
        `.trim(),
        adminEmail: 'contact@adam-marzuk.fr',
        ccEmails: []
      }

      return NextResponse.json(defaultSettings)
    }

    // Parser les ccEmails depuis JSON
    const response = {
      ...contactSettings,
      ccEmails: contactSettings.ccEmails ? JSON.parse(contactSettings.ccEmails) : []
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching contact settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres de contact (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validatedData = ContactSettingsUpdateSchema.parse(body)

    // Convertir ccEmails en JSON string
    const dataToSave = {
      ...validatedData,
      ccEmails: JSON.stringify(validatedData.ccEmails || [])
    }

    let contactSettings = await prisma.contactSettings.findFirst()

    if (!contactSettings) {
      // Créer les premiers paramètres
      contactSettings = await prisma.contactSettings.create({
        data: {
          successMessage: dataToSave.successMessage,
          errorMessage: dataToSave.errorMessage,
          emailSubject: dataToSave.emailSubject,
          emailTemplate: dataToSave.emailTemplate,
          autoReplyEnabled: dataToSave.autoReplyEnabled,
          autoReplySubject: dataToSave.autoReplySubject || null,
          autoReplyTemplate: dataToSave.autoReplyTemplate || null,
          adminEmail: dataToSave.adminEmail,
          ccEmails: dataToSave.ccEmails
        }
      })
    } else {
      // Mettre à jour les paramètres existants
      contactSettings = await prisma.contactSettings.update({
        where: { id: contactSettings.id },
        data: dataToSave
      })
    }

    // Retourner avec ccEmails parsé
    const response = {
      ...contactSettings,
      ccEmails: JSON.parse(contactSettings.ccEmails || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating contact settings:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}