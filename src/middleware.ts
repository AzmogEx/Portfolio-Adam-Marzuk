import { NextRequest, NextResponse } from 'next/server'

// Enhanced JWT verification for Edge Runtime
function verifySimpleToken(token: string): boolean {
  try {
    if (!token) return false
    
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
    } catch (headerError) {
      return false
    }
    
    // Decode and validate payload
    try {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      const now = Math.floor(Date.now() / 1000)
      
      // Check required fields
      if (!payload.userId || !payload.username || !payload.exp || !payload.iat) {
        return false
      }
      
      // Check expiration
      if (payload.exp <= now) return false
      
      // Check issued at time (not too far in the future)
      if (payload.iat > now + 300) return false // Allow 5 minutes clock skew
      
      return true
    } catch (parseError) {
      return false
    }
  } catch (error) {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for auth token
    const token = request.cookies.get('admin-token')?.value
    
    if (!token || !verifySimpleToken(token)) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Check if it's a protected API route
  if (pathname.startsWith('/api/admin') || 
      (pathname.startsWith('/api/projects') && request.method !== 'GET') ||
      (pathname.startsWith('/api/experiences') && request.method !== 'GET') ||
      pathname.startsWith('/api/upload')) {
    const token = request.cookies.get('admin-token')?.value
    
    if (!token || !verifySimpleToken(token)) {
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
    '/api/upload/:path*'
  ]
}