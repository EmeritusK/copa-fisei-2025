import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const validUser = process.env.ADMIN_USER || 'admin'
    const validPass = process.env.ADMIN_PASSWORD || 'admin'

    if (username === validUser && password === validPass) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Usuario o contraseña incorrectos' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 })
  }
}
