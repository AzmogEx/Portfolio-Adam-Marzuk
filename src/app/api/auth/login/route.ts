import { NextRequest, NextResponse } from 'next/server'
import { authenticate, generateToken } from '@/lib/auth'
import { LoginSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting to prevent brute force attacks
    const ip = request.headers.get('X-Forwarded-For') || request.headers.get('X-Real-IP') || 'unknown'
    const rateLimitResult = rateLimit(ip, 5, 15 * 60 * 1000) // 5 attempts per 15 minutes
    
    if (!rateLimitResult.success) {
      const resetTime = rateLimitResult.resetTime || Date.now()
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Remaining': '0'
          }
        }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validation = LoginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { username, password } = validation.data

    // Authenticate user
    const user = await authenticate(username, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({ userId: user.id, username: user.username })
    
    // Set cookie
    const response = NextResponse.json(
      { 
        success: true, 
        user: { id: user.id, username: user.username } 
      },
      { status: 200 }
    )

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // Add rate limit headers for successful requests
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}