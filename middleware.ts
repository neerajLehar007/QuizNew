import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if it's an admin dashboard route
  if (path.startsWith('/admin/dashboard')) {
    // Check for admin authentication
    const isAuthenticated = request.cookies.get('adminAuth')?.value

    if (!isAuthenticated) {
      // Redirect to admin login if not authenticated
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: '/admin/dashboard/:path*',
}
