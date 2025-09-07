# Portfolio Adam Marzuk

Un portfolio personnel moderne et interactif construit avec Next.js 15, React 19, TypeScript et Tailwind CSS. Ce portfolio présente mes projets, expériences et compétences avec un design responsive et un système de thème sombre/clair.

## ✨ Fonctionnalités

- **Design Moderne** : Interface utilisateur épurée et professionnelle
- **Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Mode Sombre/Clair** : Basculement de thème avec persistance localStorage
- **Animations Fluides** : Transitions et animations avec Framer Motion
- **Panel d'Administration** : Interface complète pour gérer le contenu
- **Formulaire de Contact** : Envoi d'emails avec validation
- **Performance Optimisée** : Next.js App Router avec optimisations SSR/SSG

## 🚀 Démo

- **Portfolio Public** : https://adam-marzuk.fr
- **Panel Admin** : https://localhost:3000/admin

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des schemas

### Backend & Base de Données
- **Prisma** - ORM moderne pour TypeScript
- **PostgreSQL** - Base de données relationnelle
- **NextAuth.js** - Authentification
- **Nodemailer** - Envoi d'emails
- **JWT** - Gestion des tokens

### Icônes & UI
- **Lucide React** - Icônes modernes
- **React Icons** - Collection d'icônes populaires

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- PostgreSQL

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/AzmogEx/portfolio-adam-marzuk.git
cd portfolio-adam-marzuk
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
Créer un fichier `.env.local` à la racine du projet :
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# JWT Secret
JWT_SECRET="votre-secret-jwt-très-sécurisé"

# Configuration Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-app"
```

4. **Configuration de la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Peupler la base de données (optionnel)
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Build pour la production
npm run start        # Lance le serveur de production

# Qualité de Code
npm run lint         # Vérifie le code avec ESLint

# Base de données
npm run db:seed      # Peuple la base de données avec des données de test
```

## 🏗️ Structure du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Panel d'administration
│   ├── api/               # Routes API
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/
│   ├── layout/            # Composants de layout (Header, Footer)
│   └── sections/          # Sections du portfolio
├── hooks/                 # Hooks React personnalisés
├── lib/                   # Utilitaires et configurations
├── types/                 # Définitions TypeScript
└── data/                  # Données statiques
```

## 🎨 Thème et Design

### Palette de Couleurs
- **Primaire** : Bleu (du ciel clair au bleu profond)
- **Secondaire** : Violet (du lavande au violet foncé)
- **Mode Sombre** : Support complet avec Tailwind CSS

### Animations
- **Fade-in** : Apparition en fondu
- **Slide-up** : Glissement vers le haut
- **Float** : Animation flottante continue

## 👨‍💼 Panel d'Administration

Le panel d'administration permet de gérer facilement le contenu du portfolio :

### Fonctionnalités Admin
- **Projets** : Ajouter, modifier, supprimer des projets
- **Expériences** : Gérer les expériences professionnelles et formations
- **Outils** : Administrer la liste des technologies et outils
- **Compétences Soft** : Gérer les soft skills
- **Analytics** : Statistiques et métriques (à venir)

### Accès Admin
1. Aller sur `/admin`
2. Se connecter avec les identifiants configurés
3. Gérer le contenu via l'interface intuitive

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement à chaque push

### Variables d'environnement pour la production
```env
DATABASE_URL="votre-url-postgresql-production"
JWT_SECRET="votre-jwt-secret-production"
EMAIL_HOST="votre-smtp-host"
EMAIL_PORT=587
EMAIL_USER="votre-email"
EMAIL_PASS="votre-mot-de-passe"
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📋 Roadmap

- [ ] **Analytics Dashboard** - Métriques détaillées dans l'admin
- [ ] **Blog Integration** - Section blog avec articles
- [ ] **Multi-language Support** - Support français/anglais
- [ ] **SEO Optimization** - Amélioration du référencement
- [ ] **Performance Monitoring** - Monitoring des performances
- [ ] **Contact Form Enhancement** - Captcha et validation avancée

## 🐛 Résolution de Problèmes

### Problèmes courants

**Erreur de connexion à la base de données**
```bash
# Vérifier que PostgreSQL est en cours d'exécution
sudo service postgresql status

# Régénérer le client Prisma
npx prisma generate
```

**Erreurs de build**
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

**Problèmes d'authentification**
- Vérifier la variable `JWT_SECRET` dans `.env.local`
- S'assurer que le mot de passe admin est correctement hashé

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**Adam Marzuk**
- Email : contact@adam-marzuk.fr
- LinkedIn : https://www.linkedin.com/in/adam-marzuk-93804828a/
- Portfolio : https://adam-marzuk.fr

---

⭐ N'oubliez pas de mettre une étoile au projet si vous l'aimez !
