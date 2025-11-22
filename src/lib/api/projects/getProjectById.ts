import type { IProjectData } from '@/types';
import apiClient from '../apiClient';

export const getProjectById = async (
  id: string,
  token?: string | null,
): Promise<IProjectData | null> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;

  const projectData = await apiClient.get(`/projects/${id}`, config);

  if (!projectData.data) {
    return null;
  }

  return projectData.data.data.project;
};
