import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

// biome-ignore lint/suspicious/noExplicitAny: <Clerk>
const handleMiddleware = async (auth: any, request: NextRequest) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
};

export default clerkMiddleware(handleMiddleware);

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
