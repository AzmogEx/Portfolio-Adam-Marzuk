import { NextRequest, NextResponse } from 'next/server'
import { authenticate, generateToken, setAuthCookie } from '@/lib/auth'
import { LoginSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
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

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}