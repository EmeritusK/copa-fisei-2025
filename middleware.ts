import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isApiAdminRoute = request.nextUrl.pathname.startsWith('/api/admin') && !request.nextUrl.pathname.startsWith('/api/admin/login')
  const isLoginRoute = request.nextUrl.pathname === '/admin/login'

  if (isAdminRoute || isApiAdminRoute) {
    const token = request.cookies.get('admin_session')?.value
    
    // If NOT authenticated
    if (token !== 'authenticated') {
      if (isApiAdminRoute) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
      }
      if (!isLoginRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } else {
      // If AUTHENTICATED but trying to access login page, redirect to admin dashboard
      if (isLoginRoute) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
