/** biome-ignore-all lint/style/noMagicNumbers: <time> */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getUserData } from '@/lib/api/user';
import { useUserActions } from '@/stores';
import type { IUserData } from '@/types';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser } = useUserActions();
  const { status } = useSession();

  const { data: userData } = useQuery<IUserData | null>({
    queryKey: ['user-profile'],
    queryFn: async () => getUserData(),
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      clearUser();
    }
  }, [status, clearUser]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  return <>{children}</>;
}
