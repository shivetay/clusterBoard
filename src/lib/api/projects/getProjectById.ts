import type { IProjectData } from '@/types';
import apiClient from '../apiClient';

export const getProjectById = async (
  id: string,
): Promise<IProjectData | null> => {
  const projectData = await apiClient.get(`/projects/${id}`);

  if (!projectData.data) {
    return null;
  }

  return projectData.data.data.project;
};
