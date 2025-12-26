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

interface UserProviderClientProps {
  children: React.ReactNode;
  initialUserData?: IUserData | null;
}

export function UserProviderClient({
  children,
  initialUserData,
}: UserProviderClientProps) {
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

  // Initialize store with server data if available
  useEffect(() => {
    if (initialUserData) {
      setUser(initialUserData);
    }
  }, [initialUserData, setUser]);

  // Fetch user data using React Query (for client-side updates/refreshes)
  const { data: userData, isLoading } = useQuery<IUserData | null>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await apiClient.get<{ data: { user: IUserData } }>(
        `/users/${userId}`,
      );

      if (!response.data) {
        return null;
      }

      // apiClient.get returns AxiosResponse, so response.data is the API response
      const apiResponse = response.data;
      const rawUser = apiResponse.data?.user || apiResponse.data || apiResponse;

      if (!rawUser) {
        return null;
      }

      const transformedUserData: IUserData = {
        id: userId || rawUser.id,
        user_name: rawUser.user_name,
        email: rawUser.email,
        role: rawUser.role,
        cluster_projects: rawUser.cluster_projects || [],
        projects_limit: rawUser.projects_limit || 0,
      };

      return transformedUserData;
    },
    enabled: !!userId && !initialUserData, // Only run if no initial data
    initialData: initialUserData || undefined, // Use server data as initial
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

// Keep the old export for backward compatibility
export function UserProvider({ children }: { children: React.ReactNode }) {
  return <UserProviderClient>{children}</UserProviderClient>;
}
