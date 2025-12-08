import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token and trying to access protected route, redirect handled by withAuth
    if (!token) {
      return NextResponse.next();
    }

    const role = token.role as string;

    // Role-based route protection
    const protectedRoutes: Record<string, string[]> = {
      '/users': ['ADMIN'],
      '/employees': ['ADMIN', 'OWNER'],
      '/settings': ['ADMIN', 'OWNER'],
    };

    // Check if route requires specific roles
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (path.startsWith(route) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Mechanic can only access /my-orders and assigned work orders
    if (role === 'MECHANIC') {
      const allowedPaths = ['/dashboard', '/my-orders', '/work-orders/'];
      const isAllowed = allowedPaths.some(p => path.startsWith(p)) || path === '/';
      
      // Block mechanics from creating new orders
      if (path === '/work-orders/new') {
        return NextResponse.redirect(new URL('/my-orders', req.url));
      }
      
      // Block mechanics from vehicles/owners/settings
      if (path.startsWith('/vehicles') || path.startsWith('/owners') || path.startsWith('/settings')) {
        return NextResponse.redirect(new URL('/my-orders', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/work-orders/:path*',
    '/my-orders/:path*',
    '/vehicles/:path*',
    '/owners/:path*',
    '/employees/:path*',
    '/settings/:path*',
    '/users/:path*',
  ],
};
