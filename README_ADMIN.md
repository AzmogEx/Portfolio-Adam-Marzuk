# Portfolio Dynamique avec Panneau d'Administration

Ce projet transforme votre portfolio Next.js statique en site dynamique avec un panneau d'administration sécurisé.

## 📋 Fonctionnalités

### Page Publique
- **Portfolio classique** : Affiche vos projets avec titre, description, technologies et liens
- **Design responsive** : Fonctionne sur mobile, tablette et desktop
- **Animations fluides** : Powered by Framer Motion
- **Images optimisées** : Support des uploads avec preview

### Panneau d'Administration (`/admin`)
- **Authentification sécurisée** : Login avec username + mot de passe
- **Gestion des projets** :
  - ✅ Ajouter un nouveau projet
  - ✅ Modifier un projet existant
  - ✅ Supprimer un projet
  - ✅ Upload d'images
  - ✅ Gestion des technologies
  - ✅ Projets mis en avant
  - ✅ Ordre d'affichage

### Sécurité
- **Authentification JWT** : Sessions sécurisées avec cookies httpOnly
- **Middleware de protection** : Routes admin protégées
- **Validation des données** : Avec Zod schema validation
- **Upload sécurisé** : Types de fichiers et taille limitée

## 🚀 Installation et Configuration

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données
```bash
# Génération et application des migrations
npm run db:seed
```

### 3. Variables d'environnement
Configurez votre fichier `.env` :
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

⚠️ **Important** : Changez le mot de passe admin et la clé JWT en production !

### 4. Lancement du développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`
Le panneau admin sur `http://localhost:3000/admin`

## 🏗️ Architecture Technique

### Stack
- **Frontend** : Next.js 15 (App Router) + React 19 + TypeScript
- **Styling** : Tailwind CSS + Framer Motion
- **Base de données** : SQLite + Prisma ORM
- **Authentification** : JWT + httpOnly cookies
- **Validation** : Zod schemas

### Structure des fichiers
```
src/
├── app/
│   ├── admin/                 # Pages d'administration
│   │   ├── login/page.tsx     # Page de connexion
│   │   ├── page.tsx           # Dashboard principal
│   │   └── projects/          # Gestion des projets
│   │       ├── new/page.tsx   # Nouveau projet
│   │       └── [id]/page.tsx  # Édition projet
│   ├── api/                   # API Routes
│   │   ├── auth/              # Authentification
│   │   ├── projects/          # CRUD projets
│   │   └── upload/            # Upload images
│   └── page.tsx               # Page publique
├── components/
│   └── sections/
│       └── Projects.tsx       # Composant projets (dynamique)
├── lib/
│   ├── prisma.ts             # Configuration Prisma
│   ├── auth.ts               # Utilitaires auth
│   └── validators.ts         # Schémas Zod
└── middleware.ts             # Protection des routes
```

### Base de données
```sql
-- Utilisateurs admin
table User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String   -- Hash bcrypt
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

-- Projets
table Project {
  id           String   @id @default(cuid())
  title        String
  description  String
  image        String?  -- URL de l'image
  technologies String   -- JSON array
  githubUrl    String?
  liveUrl      String?
  featured     Boolean  @default(false)
  order        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 📖 Guide d'utilisation

### Accès au panneau admin

1. **Connexion** : Allez sur `/admin` → redirection vers `/admin/login`
2. **Credentials par défaut** :
   - Username : `admin`
   - Password : `admin123`

### Gestion des projets

#### Ajouter un projet
1. Cliquez sur "New Project" dans le dashboard
2. Remplissez le formulaire :
   - **Titre** et **description** (obligatoires)
   - **Technologies** : Ajoutez une par une
   - **URLs** : GitHub et/ou Live demo (optionnel)
   - **Image** : Upload depuis votre ordinateur
   - **Options** : Projet mis en avant, ordre d'affichage
3. Cliquez "Create Project"

#### Modifier un projet
1. Cliquez "Edit" sur un projet dans le dashboard
2. Modifiez les champs souhaités
3. Cliquez "Update Project"

#### Supprimer un projet
- Cliquez "Delete" et confirmez

### Upload d'images
- **Formats acceptés** : JPG, PNG, WebP, GIF
- **Taille maximale** : 5MB
- **Stockage** : `/public/uploads/`
- **URL publique** : `/uploads/filename.jpg`

## 🔧 Commandes utiles

```bash
# Développement
npm run dev          # Lance le serveur de dev

# Production  
npm run build        # Build production
npm start           # Lance le serveur prod

# Base de données
npm run db:seed     # Recrée admin + projets de demo

# Qualité de code
npm run lint        # ESLint
```

## 🌐 Déploiement

### Variables d'environnement production
```env
DATABASE_URL="file:./prod.db"
JWT_SECRET="votre-clé-super-secrète-de-production-très-longue"
ADMIN_USERNAME="votre-username"
ADMIN_PASSWORD="votre-mot-de-passe-sécurisé"
NODE_ENV="production"
```

### Étapes de déploiement
1. **Build** : `npm run build`
2. **Migrate DB** : `npm run db:seed`
3. **Start** : `npm start`

### Plateformes recommandées
- **Vercel** : Intégration native Next.js
- **Netlify** : Support SSR
- **Railway** : PostgreSQL inclus
- **DigitalOcean** : VPS avec contrôle total

## 🔐 Sécurité

### Bonnes pratiques implémentées
- ✅ Mots de passe hashés (bcrypt)
- ✅ JWT avec expiration (7 jours)
- ✅ Cookies httpOnly + secure
- ✅ Validation des données (Zod)
- ✅ Protection CSRF
- ✅ Validation des uploads
- ✅ Middleware de protection routes

### Recommandations production
- [ ] Utilisez HTTPS obligatoire
- [ ] Limitez les tentatives de connexion
- [ ] Monitoring des logs
- [ ] Mise à jour régulière des dépendances

### Reset complet
```bash
# Supprime tout et recrée
rm prisma/dev.db
npm run db:seed
```

## 🎯 Fonctionnalités avancées possibles

- [ ] **Multi-utilisateurs** : Plusieurs admins avec rôles
- [ ] **Categories** : Organiser les projets par catégorie  
- [ ] **SEO** : Meta tags dynamiques par projet
- [ ] **Analytics** : Suivi des vues des projets
- [ ] **Drag & Drop** : Réorganisation visuelle des projets