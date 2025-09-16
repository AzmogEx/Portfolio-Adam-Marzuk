import { NextRequest, NextResponse } from 'next/server'

// Secure JWT verification with signature validation for Edge Runtime
async function verifyJWTToken(token: string): Promise<boolean> {
  try {
    if (!token) return false
    
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      console.error('JWT_SECRET not found in middleware')
      return false
    }
    
    // Check JWT structure (header.payload.signature)
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    // Validate each part is base64url encoded
    for (const part of parts) {
      if (!/^[A-Za-z0-9_-]+$/.test(part)) return false
    }
    
    // Decode and validate header
    try {
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
      if (!header.alg || !header.typ || header.typ !== 'JWT') return false
      if (header.alg !== 'HS256') return false // Ensure correct algorithm
    } catch (_headerError) {
      return false
    }
    
    // Decode and validate payload
    let payload
    try {
      payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      const now = Math.floor(Date.now() / 1000)
      
      // Check required fields
      if (!payload.userId || !payload.username || !payload.exp || !payload.iat) {
        return false
      }
      
      // Check expiration
      if (payload.exp <= now) return false
      
      // Check issued at time (not too far in the future)
      if (payload.iat > now + 300) return false // Allow 5 minutes clock skew
    } catch (_parseError) {
      return false
    }
    
    // CRITICAL: Verify signature using Web Crypto API (Edge Runtime compatible)
    const header = parts[0]
    const payloadPart = parts[1]
    const signature = parts[2]
    
    // Create expected signature using Web Crypto API
    const data = `${header}.${payloadPart}`
    const encoder = new TextEncoder()
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
    const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
    
    // Constant-time comparison to prevent timing attacks
    if (signature.length !== expectedSignature.length) return false
    
    let result = 0
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i)
    }
    
    return result === 0
  } catch (error) {
    console.error('JWT verification error:', error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for auth token
    const token = request.cookies.get('admin-token')?.value
    
    if (!token || !(await verifyJWTToken(token))) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Check if it's a protected API route
  if (pathname.startsWith('/api/admin') ||
      (pathname.startsWith('/api/projects') && request.method !== 'GET') ||
      (pathname.startsWith('/api/experiences') && request.method !== 'GET') ||
      (pathname.startsWith('/api/hero') && request.method !== 'GET') ||
      (pathname.startsWith('/api/about') && request.method !== 'GET') ||
      (pathname.startsWith('/api/footer') && request.method !== 'GET') ||
      (pathname.startsWith('/api/skills') && request.method !== 'GET') ||
      (pathname.startsWith('/api/contact-settings') && request.method !== 'GET') ||
      (pathname.startsWith('/api/seo-settings') && request.method !== 'GET') ||
      pathname.startsWith('/api/upload')) {
    const token = request.cookies.get('admin-token')?.value
    
    if (!token || !(await verifyJWTToken(token))) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/projects/:path*',
    '/api/experiences/:path*',
    '/api/hero/:path*',
    '/api/about/:path*',
    '/api/footer/:path*',
    '/api/skills/:path*',
    '/api/contact-settings/:path*',
    '/api/seo-settings/:path*',
    '/api/upload/:path*'
  ]
}