/**
 * Constants for error messages, success messages, and other UI text
 * All messages are in French for consistency
 */

// Error Messages
export const ERROR_MESSAGES = {
  // Network and API errors
  NETWORK_ERROR: 'Erreur de réseau. Veuillez réessayer.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNEXPECTED_ERROR: 'Une erreur inattendue s\'est produite.',
  
  // Authentication errors  
  LOGIN_FAILED: 'Échec de la connexion. Vérifiez vos identifiants.',
  AUTH_REQUIRED: 'Authentification requise.',
  SESSION_EXPIRED: 'Session expirée. Veuillez vous reconnecter.',
  
  // Project errors
  FETCH_PROJECTS_FAILED: 'Impossible de charger les projets.',
  CREATE_PROJECT_FAILED: 'Impossible de créer le projet.',
  UPDATE_PROJECT_FAILED: 'Impossible de mettre à jour le projet.',
  DELETE_PROJECT_FAILED: 'Impossible de supprimer le projet.',
  PROJECT_NOT_FOUND: 'Projet introuvable.',
  
  // Experience errors
  FETCH_EXPERIENCES_FAILED: 'Impossible de charger les expériences.',
  CREATE_EXPERIENCE_FAILED: 'Impossible de créer l\'expérience.',
  UPDATE_EXPERIENCE_FAILED: 'Impossible de mettre à jour l\'expérience.',
  DELETE_EXPERIENCE_FAILED: 'Impossible de supprimer l\'expérience.',
  EXPERIENCE_NOT_FOUND: 'Expérience introuvable.',
  
  // Tool errors
  FETCH_TOOLS_FAILED: 'Impossible de charger les outils.',
  CREATE_TOOL_FAILED: 'Impossible de créer l\'outil.',
  UPDATE_TOOL_FAILED: 'Impossible de mettre à jour l\'outil.',
  DELETE_TOOL_FAILED: 'Impossible de supprimer l\'outil.',
  TOOL_NOT_FOUND: 'Outil introuvable.',
  
  // Soft Skill errors
  FETCH_SOFT_SKILLS_FAILED: 'Impossible de charger les compétences.',
  CREATE_SOFT_SKILL_FAILED: 'Impossible de créer la compétence.',
  UPDATE_SOFT_SKILL_FAILED: 'Impossible de mettre à jour la compétence.',
  DELETE_SOFT_SKILL_FAILED: 'Impossible de supprimer la compétence.',
  SOFT_SKILL_NOT_FOUND: 'Compétence introuvable.',
  
  // File upload errors
  UPLOAD_FAILED: 'Échec du téléversement du fichier.',
  UPLOAD_ERROR: 'Erreur lors du téléversement.',
  FILE_TOO_LARGE: 'Le fichier est trop volumineux.',
  INVALID_FILE_TYPE: 'Type de fichier non autorisé.',
  
  // Validation errors
  REQUIRED_FIELD: 'Ce champ est obligatoire.',
  INVALID_EMAIL: 'Adresse email invalide.',
  INVALID_URL: 'URL invalide.',
  INVALID_DATA: 'Données invalides.',
  
  // Generic errors
  NOT_FOUND: 'Élément introuvable.',
  ACCESS_DENIED: 'Accès refusé.',
  OPERATION_FAILED: 'Opération échouée.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  // Authentication success
  LOGIN_SUCCESS: 'Connexion réussie.',
  LOGOUT_SUCCESS: 'Déconnexion réussie.',
  
  // Project success
  PROJECT_CREATED: 'Projet créé avec succès.',
  PROJECT_UPDATED: 'Projet mis à jour avec succès.',
  PROJECT_DELETED: 'Projet supprimé avec succès.',
  
  // Experience success
  EXPERIENCE_CREATED: 'Expérience créée avec succès.',
  EXPERIENCE_UPDATED: 'Expérience mise à jour avec succès.',
  EXPERIENCE_DELETED: 'Expérience supprimée avec succès.',
  
  // Tool success
  TOOL_CREATED: 'Outil créé avec succès.',
  TOOL_UPDATED: 'Outil mis à jour avec succès.',
  TOOL_DELETED: 'Outil supprimé avec succès.',
  
  // Soft Skill success
  SOFT_SKILL_CREATED: 'Compétence créée avec succès.',
  SOFT_SKILL_UPDATED: 'Compétence mise à jour avec succès.',
  SOFT_SKILL_DELETED: 'Compétence supprimée avec succès.',
  
  // File upload success
  UPLOAD_SUCCESS: 'Fichier téléversé avec succès.',
  
  // Generic success
  OPERATION_SUCCESS: 'Opération réussie.',
  CHANGES_SAVED: 'Modifications enregistrées.',
} as const

// Confirmation Messages
export const CONFIRMATION_MESSAGES = {
  DELETE_PROJECT: (title: string) => `Êtes-vous sûr de vouloir supprimer le projet "${title}" ? Cette action est irréversible.`,
  DELETE_EXPERIENCE: (title: string) => `Êtes-vous sûr de vouloir supprimer l'expérience "${title}" ? Cette action est irréversible.`,
  DELETE_TOOL: (name: string) => `Êtes-vous sûr de vouloir supprimer l'outil "${name}" ? Cette action est irréversible.`,
  DELETE_SOFT_SKILL: (name: string) => `Êtes-vous sûr de vouloir supprimer la compétence "${name}" ? Cette action est irréversible.`,
  LOGOUT_CONFIRM: 'Êtes-vous sûr de vouloir vous déconnecter ?',
  DISCARD_CHANGES: 'Voulez-vous ignorer les modifications non sauvegardées ?',
} as const

// Loading Messages  
export const LOADING_MESSAGES = {
  LOADING_PROJECTS: 'Chargement des projets...',
  LOADING_EXPERIENCES: 'Chargement des expériences...',
  LOADING_TOOLS: 'Chargement des outils...',
  LOADING_SOFT_SKILLS: 'Chargement des compétences...',
  LOADING_DASHBOARD: 'Chargement du tableau de bord...',
  UPLOADING: 'Téléversement en cours...',
  SAVING: 'Enregistrement...',
  DELETING: 'Suppression...',
  PROCESSING: 'Traitement...',
} as const

// Empty State Messages
export const EMPTY_STATE_MESSAGES = {
  NO_PROJECTS: 'Aucun projet trouvé.',
  NO_EXPERIENCES: 'Aucune expérience trouvée.',
  NO_TOOLS: 'Aucun outil trouvé.',
  NO_SOFT_SKILLS: 'Aucune compétence trouvée.',
  NO_RESULTS: 'Aucun résultat trouvé.',
  FIRST_PROJECT: 'Créer votre premier projet',
  FIRST_EXPERIENCE: 'Ajouter votre première expérience',
  FIRST_TOOL: 'Ajouter votre premier outil',
  FIRST_SOFT_SKILL: 'Ajouter votre première compétence',
} as const