#!/bin/bash

# Générer Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Appliquer les migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Créer l'utilisateur admin et les données de seed
echo "Seeding database..."
npm run db:seed

echo "Build completed!"