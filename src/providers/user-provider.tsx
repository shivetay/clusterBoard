/** biome-ignore-all lint/style/noMagicNumbers: <time> */
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Loader } from '@/components';
import apiClient, { setTokenGetter } from '@/lib/api/apiClient';
import { TRANSLATIONS } from '@/locales';
import { useUserActions } from '@/stores';
import type { IUserData } from '@/types';
import { useAlert } from './alert';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserActions();
  const user = useUser();
  const { getToken, isLoaded } = useAuth();
  const { showAlert } = useAlert();

  const userId = user.user?.id;

  // Use refs to store the latest values so the token getter always has access to them
  const getTokenRef = useRef(getToken);
  const isLoadedRef = useRef(isLoaded);
  const showAlertRef = useRef(showAlert);
  const isTokenGetterSetRef = useRef(false);

  // Update refs on every render to ensure they always have the latest values
  getTokenRef.current = getToken;
  isLoadedRef.current = isLoaded;
  showAlertRef.current = showAlert;

  // Set up the token getter for apiClient synchronously to avoid race conditions
  // This ensures the token getter is available before any API calls are made
  // The getter uses refs to access the latest values, avoiding stale closures
  // Only set it once to avoid recreating the function on every render
  if (!isTokenGetterSetRef.current) {
    setTokenGetter(async () => {
      // Only attempt to get token if Clerk is loaded
      if (!isLoadedRef.current) {
        return null;
      }
      try {
        return await getTokenRef.current();
      } catch (error) {
        console.error('Failed to get token:', error);
        showAlertRef.current({
          message: TRANSLATIONS.AUTHENTICATION_ERROR,
          severity: 'error',
        });
        return null;
      }
    });
    isTokenGetterSetRef.current = true;
  }

  // Fetch user data using React Query
  const { data: userData, isLoading } = useQuery<IUserData | null>({
    queryKey: ['user', userId],
    queryFn: async () => {
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

  const loading = isLoading || !isLoaded;

  return <>{loading ? <Loader /> : children}</>;
}
