import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP du client pour le rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(/, /)[0] : request.ip || 'unknown'
    
    // Vérifier le rate limiting (5 messages par 15 minutes par IP)
    const rateLimitResult = rateLimit(ip, 5, 15 * 60 * 1000)
    
    if (!rateLimitResult.success) {
      const resetTime = rateLimitResult.resetTime || Date.now()
      const resetDate = new Date(resetTime)
      
      return NextResponse.json(
        { 
          error: 'Trop de tentatives. Veuillez réessayer plus tard.',
          resetTime: resetDate.toISOString()
        },
        { status: 429 }
      )
    }
    
    // Parser et valider les données
    const body = await request.json()
    const validatedData = contactSchema.parse(body)
    
    // Vérifications anti-spam supplémentaires
    const { name, email, subject, message } = validatedData
    
    // Détecter des patterns suspects
    const suspiciousPatterns = [
      /https?:\/\//gi, // URLs
      /\b(click here|buy now|free|winner|congratulations)\b/gi, // Mots spam
      /<script|javascript:|on\w+=/gi, // Tentatives de script
    ]
    
    const fullText = `${name} ${subject} ${message}`
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => 
      pattern.test(fullText)
    )
    
    if (hasSuspiciousContent) {
      return NextResponse.json(
        { error: 'Le message contient du contenu suspect et ne peut pas être envoyé.' },
        { status: 400 }
      )
    }
    
    // Envoyer l'email
    await sendContactEmail(validatedData)
    
    return NextResponse.json(
      { 
        message: 'Message envoyé avec succès !',
        remaining: rateLimitResult.remaining
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    
    // Erreur de validation Zod
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        { 
          error: 'Données invalides.',
          details: (error as any).issues.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }
    
    // Erreur générique
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}