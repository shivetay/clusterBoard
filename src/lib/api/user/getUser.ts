import type { IUserData } from '@/types';
import apiClient from '../apiClient';

export const getUserData = async (): Promise<IUserData | null> => {
  const response = await apiClient.get('/auth/me', {
    headers: {
      'Cache-Control': 'no-store',
    },
  });

  return response.data.user ?? null;
};
