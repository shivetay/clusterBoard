import {
  type ClerkMiddlewareAuth,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

const handleMiddleware = async (
  auth: ClerkMiddlewareAuth,
  request: NextRequest,
) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
};

export default clerkMiddleware(handleMiddleware);
