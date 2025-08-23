import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  
  email: z
    .string()
    .email('Veuillez entrer une adresse email valide')
    .max(254, 'L\'adresse email est trop longue'),
  
  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères')
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-_.,!?]+$/, 'Le sujet contient des caractères invalides'),
  
  message: z
    .string()
    .min(20, 'Le message doit contenir au moins 20 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
})

export type ContactFormData = z.infer<typeof contactSchema>