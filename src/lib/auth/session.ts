import { auth } from './auth';
import type { ISessionUser } from '@/types';

/**
 * Get current session on server side
 */
export async function getSession() {
  return await auth();
}

/**
 * Get current user from session
 */
export async function getCurrentUser(): Promise<ISessionUser | null> {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id!,
    name: session.user.name!,
    email: session.user.email!,
    role: (session.user as any).role || 'user',
    cluster_projects: [],
    projects_limit: 5,
    accessToken: (session as any).accessToken,
  };
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Require authentication (throws if not authenticated)
 */
export async function requireAuth(): Promise<ISessionUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
