import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig.js';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/auth/error'];

// Routes that should redirect to home if already authenticated
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an API route
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!accessToken;

  // Check if the route is public (including i18n paths)
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  // Check if it's an auth route (login/register)
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

  // If user is authenticated and trying to access auth routes, redirect to home
  if (isAuthenticated && isAuthRoute) {
    const response = i18nRouter(request, i18nConfig);
    const locale = response.headers.get('x-middleware-request-x-nextjs-data')
      ? ''
      : pathname.split('/')[1];
    const homeUrl = new URL(locale ? `/${locale}` : '/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && !isPublicRoute) {
    const response = i18nRouter(request, i18nConfig);
    const locale = response.headers.get('x-middleware-request-x-nextjs-data')
      ? ''
      : pathname.split('/')[1];
    const loginUrl = new URL(
      locale ? `/${locale}/login` : '/login',
      request.url,
    );
    return NextResponse.redirect(loginUrl);
  }

  // Continue with i18n routing
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
