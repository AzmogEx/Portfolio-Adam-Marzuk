import { z } from 'zod'

// ===== AUTHENTICATION SCHEMAS =====

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

// ===== PROJECT SCHEMAS =====

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
  image: z.string().nullable().optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  githubUrl: z.string().url('Invalid GitHub URL').nullable().optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid live URL').nullable().optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  order: z.number().int().min(0).optional().default(0),
})

export const ProjectUpdateSchema = ProjectSchema.partial()

// ===== EXPERIENCE SCHEMAS =====

export const ExperienceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  company: z.string().min(1, 'Company/School is required').max(200, 'Company name is too long'),
  location: z.string().min(1, 'Location is required').max(100, 'Location is too long'),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in format YYYY-MM'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'End date must be in format YYYY-MM').nullable().optional().or(z.literal('')),
  description: z.array(z.string().min(1, 'Description cannot be empty')).min(1, 'At least one description is required'),
  technologies: z.array(z.string()).optional().default([]),
  type: z.enum(['work', 'education'], { message: 'Type must be either work or education' }),
  featured: z.boolean().optional().default(false),
  order: z.number().int().min(0).optional().default(0),
})

export const ExperienceUpdateSchema = ExperienceSchema.partial()

// ===== CONTACT SCHEMAS =====

export const ContactSchema = z.object({
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

// ===== TYPE EXPORTS =====

export type LoginInput = z.infer<typeof LoginSchema>
export type ProjectInput = z.infer<typeof ProjectSchema>
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>
export type ExperienceInput = z.infer<typeof ExperienceSchema>
export type ExperienceUpdateInput = z.infer<typeof ExperienceUpdateSchema>
export type ContactFormData = z.infer<typeof ContactSchema>

// ===== LEGACY ALIASES (for backward compatibility) =====
export const contactSchema = ContactSchema