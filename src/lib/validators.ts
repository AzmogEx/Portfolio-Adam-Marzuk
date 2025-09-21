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
  order: z.number().int().min(0).optional().default(0),
})

export const ExperienceUpdateSchema = ExperienceSchema.partial()

// ===== TOOL SCHEMAS =====

export const ToolSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  category: z.string().min(1, 'Category is required').max(50, 'Category is too long'),
  level: z.enum(['expert', 'advanced', 'intermediate', 'beginner'], { 
    message: 'Level must be expert, advanced, intermediate, or beginner' 
  }).optional().default('intermediate'),
  icon: z.string().min(1, 'Icon is required').max(10, 'Icon is too long'),
  description: z.string().max(500, 'Description is too long').optional().nullable(),
  order: z.number().int().min(0).optional().default(0),
})

export const ToolUpdateSchema = ToolSchema.partial()

// ===== SOFT SKILL SCHEMAS =====

export const SoftSkillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  category: z.string().min(1, 'Category is required').max(50, 'Category is too long'),
  level: z.enum(['expert', 'advanced', 'intermediate', 'beginner'], { 
    message: 'Level must be expert, advanced, intermediate, or beginner' 
  }).optional().default('intermediate'),
  icon: z.string().min(1, 'Icon is required').max(10, 'Icon is too long'),
  description: z.string().max(500, 'Description is too long').optional().nullable(),
  order: z.number().int().min(0).optional().default(0),
})

export const SoftSkillUpdateSchema = SoftSkillSchema.partial()

// ===== HERO CONTENT SCHEMAS =====

export const HeroContentSchema = z.object({
  greeting: z.string().min(1, 'Greeting is required').max(100, 'Greeting is too long'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  location: z.string().min(1, 'Location is required').max(100, 'Location is too long'),
  email: z.string().email('Invalid email format').max(254, 'Email is too long'),
  profileImage: z.string().nullable().optional().or(z.literal('')),
  ctaButton1: z.string().min(1, 'CTA Button 1 is required').max(50, 'CTA Button 1 is too long'),
  ctaButton2: z.string().min(1, 'CTA Button 2 is required').max(50, 'CTA Button 2 is too long'),
  scrollText: z.string().min(1, 'Scroll text is required').max(50, 'Scroll text is too long'),
})

export const HeroContentUpdateSchema = HeroContentSchema.partial()

// ===== ABOUT CONTENT SCHEMAS =====

export const AboutContentSchema = z.object({
  sectionTitle: z.string().min(1, 'Section title is required').max(100, 'Section title is too long'),
  sectionSubtitle: z.string().min(1, 'Section subtitle is required').max(300, 'Section subtitle is too long'),
  parcourTitle: z.string().min(1, 'Parcour title is required').max(100, 'Parcour title is too long'),
  parcourText1: z.string().min(1, 'First paragraph is required').max(1000, 'First paragraph is too long'),
  parcourText2: z.string().min(1, 'Second paragraph is required').max(1000, 'Second paragraph is too long'),
  skillsTitle: z.string().min(1, 'Skills title is required').max(100, 'Skills title is too long'),
})

export const AboutContentUpdateSchema = AboutContentSchema.partial()

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

// ===== FOOTER SCHEMAS =====

export const FooterContentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  email: z.string().email('Invalid email address'),
  githubUrl: z.string().url('Invalid GitHub URL'),
  linkedinUrl: z.string().url('Invalid LinkedIn URL'),
  copyrightText: z.string().min(1, 'Copyright text is required').max(200, 'Copyright text is too long'),
  quickLinks: z.array(z.object({
    name: z.string().min(1, 'Link name is required'),
    href: z.string().min(1, 'Link href is required')
  })).optional().default([])
})

export const FooterContentUpdateSchema = FooterContentSchema.partial()

// ===== SEO SETTINGS SCHEMAS =====

export const SeoSettingsSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  keywords: z.array(z.string().min(1, 'Keyword cannot be empty')).max(20, 'Too many keywords (max 20)'),
  ogTitle: z.string().max(200, 'OpenGraph title is too long').optional().nullable(),
  ogDescription: z.string().max(500, 'OpenGraph description is too long').optional().nullable(),
  ogImage: z.string().url('Invalid OpenGraph image URL').optional().nullable().or(z.literal('')),
  googleAnalyticsId: z.string().regex(/^G-[A-Z0-9]+$/, 'Invalid Google Analytics ID format (should be G-XXXXXXXXXX)').optional().nullable().or(z.literal('')),
  structuredData: z.string().optional().nullable(),
  robotsMeta: z.string().min(1, 'Robots meta is required').max(100, 'Robots meta is too long').default('index,follow'),
  canonicalUrl: z.string().url('Invalid canonical URL').optional().nullable().or(z.literal(''))
})

export const SeoSettingsUpdateSchema = SeoSettingsSchema.partial()

// ===== NAVIGATION SETTINGS SCHEMAS =====

export const NavigationSettingsSchema = z.object({
  brandName: z.string().min(1, "Le nom de la marque est requis").max(100, "Le nom de la marque est trop long"),
  logo: z.string().url("URL du logo invalide").optional().nullable().or(z.literal('')),
  showLogo: z.boolean().default(false),
  menuItems: z.array(z.object({
    name: z.string().min(1, "Le nom est requis").max(50, "Le nom est trop long"),
    href: z.string().min(1, "Le lien est requis").max(200, "Le lien est trop long"),
    external: z.boolean().optional().default(false),
    order: z.number().int().min(0).default(0)
  })).min(1, "Au moins un élément de menu est requis").max(10, "Trop d'éléments de menu (max 10)"),
  ctaButton: z.string().max(50, "Le texte du bouton CTA est trop long").optional().nullable(),
  ctaButtonLink: z.string().url("URL du bouton CTA invalide").optional().nullable().or(z.literal('')),
  ctaButtonEnabled: z.boolean().default(false),
  mobileMenuEnabled: z.boolean().default(true),
  themeToggle: z.boolean().default(true)
})

export const NavigationSettingsUpdateSchema = NavigationSettingsSchema.partial()

// ===== ANALYTICS SETTINGS SCHEMAS =====

export const AnalyticsSettingsSchema = z.object({
  enabled: z.boolean().default(true),
  trackPageViews: z.boolean().default(true),
  trackProjectClicks: z.boolean().default(true),
  trackContactForm: z.boolean().default(true),
  trackDownloads: z.boolean().default(true),
  customEvents: z.array(z.object({
    name: z.string().min(1, 'Event name is required'),
    description: z.string().optional(),
    selector: z.string().min(1, 'CSS selector is required'),
    eventType: z.enum(['click', 'submit', 'scroll', 'timer']).default('click')
  })).optional().default([]),
  retentionDays: z.number().int().min(1).max(3650).default(365),
  excludeAdminViews: z.boolean().default(true),
  heatmapEnabled: z.boolean().default(false),
  notificationEmail: z.string().email('Invalid email address').optional().nullable(),
  weeklyReports: z.boolean().default(false),
  monthlyReports: z.boolean().default(true)
})

export const AnalyticsSettingsUpdateSchema = AnalyticsSettingsSchema.partial()

export const AnalyticsEventSchema = z.object({
  eventType: z.enum(['page_view', 'project_click', 'contact_form', 'download', 'custom']),
  eventName: z.string().optional().nullable(),
  page: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable()
})

// ===== TYPE EXPORTS =====

export type LoginInput = z.infer<typeof LoginSchema>
export type ProjectInput = z.infer<typeof ProjectSchema>
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>
export type ExperienceInput = z.infer<typeof ExperienceSchema>
export type ExperienceUpdateInput = z.infer<typeof ExperienceUpdateSchema>
export type ToolInput = z.infer<typeof ToolSchema>
export type ToolUpdateInput = z.infer<typeof ToolUpdateSchema>
export type SoftSkillInput = z.infer<typeof SoftSkillSchema>
export type SoftSkillUpdateInput = z.infer<typeof SoftSkillUpdateSchema>
export type HeroContentInput = z.infer<typeof HeroContentSchema>
export type HeroContentUpdateInput = z.infer<typeof HeroContentUpdateSchema>
export type AboutContentInput = z.infer<typeof AboutContentSchema>
export type AboutContentUpdateInput = z.infer<typeof AboutContentUpdateSchema>
export type FooterContentInput = z.infer<typeof FooterContentSchema>
export type FooterContentUpdateInput = z.infer<typeof FooterContentUpdateSchema>
export type SeoSettingsInput = z.infer<typeof SeoSettingsSchema>
export type SeoSettingsUpdateInput = z.infer<typeof SeoSettingsUpdateSchema>
export type NavigationSettingsInput = z.infer<typeof NavigationSettingsSchema>
export type NavigationSettingsUpdateInput = z.infer<typeof NavigationSettingsUpdateSchema>
export type AnalyticsSettingsInput = z.infer<typeof AnalyticsSettingsSchema>
export type AnalyticsSettingsUpdateInput = z.infer<typeof AnalyticsSettingsUpdateSchema>
export type AnalyticsEventInput = z.infer<typeof AnalyticsEventSchema>
export type ContactFormData = z.infer<typeof ContactSchema>

// ===== LEGACY ALIASES (for backward compatibility) =====
export const contactSchema = ContactSchema