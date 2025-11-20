import type { IUserData } from '@/types';
import apiClient from '../apiClient';

export const getUserData = async (): Promise<IUserData | null> => {
  const response = await apiClient.get('/users/6919058568c55331a48e4314');

  if (!response.data) {
    return null;
  }

  const rawUser =
    response.data.data?.user || response.data.user || response.data;

  if (!rawUser) {
    return null;
  }

  const userData: IUserData = {
    id: rawUser.id || rawUser._id,
    name: rawUser.name || rawUser.user_name,
    email: rawUser.email,
    role: rawUser.role,
    cluster_projects: rawUser.cluster_projects || [],
    projects_limit: rawUser.projects_limit || 0,
  };

  return userData;
};
