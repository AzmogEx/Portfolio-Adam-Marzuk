#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('🔧 Starting Vercel build process...');

try {
  // 1. Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // 2. Deploy migrations
  console.log('🗄️  Deploying database migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // 3. Seed database
  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  
  // 4. Build Next.js
  console.log('🚀 Building Next.js application...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}