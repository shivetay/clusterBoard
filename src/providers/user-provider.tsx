/** biome-ignore-all lint/style/noMagicNumbers: <time> */
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient, { setTokenGetter } from '@/lib/api/apiClient';
import { useUserActions } from '@/stores';
import type { IUserData } from '@/types';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserActions();
  const user = useUser();
  const { getToken } = useAuth();

  const userId = user.user?.id;

  // Set up the token getter for apiClient
  useEffect(() => {
    setTokenGetter(async () => {
      try {
        return await getToken();
      } catch (error) {
        console.error('Failed to get token:', error);
        return null;
      }
    });
  }, [getToken]);

  // Fetch user data using React Query
  const { data: userData } = useQuery<IUserData | null>({
    queryKey: ['user', userId],
    queryFn: async () => {
      // TODO: Replace hardcoded user ID with actual authentication
      const response = await apiClient.get(`/users/${userId}`);

      if (!response.data) {
        return null;
      }

      const rawUser =
        response.data.data?.user || response.data.user || response.data;

      if (!rawUser) {
        return null;
      }

      const transformedUserData: IUserData = {
        id: userId || rawUser.id || rawUser._id,
        name: rawUser.name || rawUser.user_name,
        email: rawUser.email,
        role: rawUser.role,
        cluster_projects: rawUser.cluster_projects || [],
        projects_limit: rawUser.projects_limit || 0,
      };

      return transformedUserData;
    },
    enabled: !!userId, // Only run query when userId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Sync React Query cache with Zustand store
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  return <>{children}</>;
}
