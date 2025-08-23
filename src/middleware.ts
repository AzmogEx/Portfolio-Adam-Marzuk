import { NextRequest, NextResponse } from 'next/server'

// Simple JWT verification without external libraries for Edge Runtime
function verifySimpleToken(token: string): boolean {
  try {
    if (!token) return false
    
    // Simple check - in production you'd want more robust verification
    // For now, we check if token has the expected structure
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]))
    const now = Math.floor(Date.now() / 1000)
    
    if (!payload.exp || payload.exp <= now) return false
    
    return true
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
    '/api/upload/:path*'
  ]
}