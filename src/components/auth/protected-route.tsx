'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/api';
import { Loader } from '@/components/ui/loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

/**
 * Client-side route protection component
 * Wraps content that requires authentication
 */
export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, isLoading, error } = useSession();

  useEffect(() => {
    if (!isLoading) {
      // If no session or error, redirect to login
      if (!session?.user || error) {
        router.push('/login');
        return;
      }

      // Check role if required
      if (requiredRole && session.user.role !== requiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [session, isLoading, error, requiredRole, router]);

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Loader />
      </div>
    );
  }

  // Show nothing if no session (will redirect)
  if (!session?.user || error) {
    return null;
  }

  // Show nothing if role doesn't match
  if (requiredRole && session.user.role !== requiredRole) {
    return null;
  }

  // Render children if authenticated and authorized
  return <>{children}</>;
}
