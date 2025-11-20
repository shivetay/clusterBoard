/** biome-ignore-all lint/style/noMagicNumbers: <time> */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient from '@/lib/api/apiClient';
import { useUser, useUserActions } from '@/stores';
import type { IUserData } from '@/types';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserActions();
  const user = useUser();

  // Fetch user data using React Query
  const { data: userData } = useQuery<IUserData | null>({
    queryKey: ['user'],
    queryFn: async () => {
      // TODO: Replace hardcoded user ID with actual authentication
      const response = await apiClient.get('/users/6919058568c55331a48e4314');

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
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Sync React Query cache with Zustand store
  useEffect(() => {
    if (userData && (!user.userInfo || user.userInfo.id !== userData.id)) {
      setUser(userData);
    }
  }, [userData, user.userInfo, setUser]);

  return <>{children}</>;
}
