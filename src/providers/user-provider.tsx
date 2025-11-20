/** biome-ignore-all lint/style/noMagicNumbers: <time> */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession as useNextAuthSession } from 'next-auth/react';
import { useEffect } from 'react';
import apiClient from '@/lib/api/apiClient';
import { useUser, useUserActions } from '@/stores';
import type { IUserData } from '@/types';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserActions();
  const user = useUser();
  const { data: session, status } = useNextAuthSession();

  // Fetch user data using React Query
  const { data: userData } = useQuery<IUserData | null>({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      // Don't fetch if not authenticated
      if (!session?.user?.id) {
        return null;
      }

      try {
        // Fetch user data from your API
        const response = await apiClient.get(`/users/${session.user.id}`);

        if (!response.data) {
          return null;
        }

        const rawUser =
          response.data.data?.user || response.data.user || response.data;

        if (!rawUser) {
          return null;
        }

        const transformedUserData: IUserData = {
          id: rawUser.id || rawUser._id,
          name: rawUser.name || rawUser.user_name,
          email: rawUser.email,
          role: rawUser.role,
          cluster_projects: rawUser.cluster_projects || [],
          projects_limit: rawUser.projects_limit || 0,
        };

        return transformedUserData;
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Fallback to session data if API fails
        return {
          id: session.user.id,
          name: session.user.name || '',
          email: session.user.email || '',
          role: (session.user as any).role || 'user',
          cluster_projects: [],
          projects_limit: 5,
        };
      }
    },
    enabled: !!session?.user?.id && status === 'authenticated',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Sync React Query cache with Zustand store
  useEffect(() => {
    if (userData && (!user.userInfo || user.userInfo.id !== userData.id)) {
      setUser(userData);
    } else if (!session?.user && user.userInfo) {
      // Clear user data when logged out
      setUser(null as any);
    }
  }, [userData, user.userInfo, session, setUser]);

  return <>{children}</>;
}
