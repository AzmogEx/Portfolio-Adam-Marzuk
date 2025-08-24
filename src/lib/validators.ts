import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

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

export type LoginInput = z.infer<typeof LoginSchema>
export type ProjectInput = z.infer<typeof ProjectSchema>
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>
export type ExperienceInput = z.infer<typeof ExperienceSchema>
export type ExperienceUpdateInput = z.infer<typeof ExperienceUpdateSchema>