'use client';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/stores';
import type { IProjectData } from '@/types';
import apiClient from '../apiClient';

interface IApiProject {
  id?: string;
  project_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  investors: string[];
  project_status: 'planning' | 'active' | 'completed' | 'finished';
}

// Map API status to frontend status format
const mapStatus = (
  status: string,
): 'zakończony' | 'w toku' | 'w przygotowaniu' => {
  switch (status) {
    case 'active':
      return 'w toku';
    case 'planning':
      return 'w przygotowaniu';
    case 'completed':
    case 'finished':
      return 'zakończony';
    default:
      return 'w przygotowaniu';
  }
};

export const useGetUserProjects = () => {
  const user = useUser();
  const userId = user.userInfo?.id;

  const { data, isLoading, error } = useQuery<IProjectData[]>({
    queryKey: ['user-projects', userId],
    queryFn: async () => {
      const response = await apiClient.get<{
        status: string;
        results: number;
        data: { projects: IApiProject[] };
      }>(`/projects/user/${userId}`);
      const projects = response.data?.data?.projects || [];

      return projects.map((project: IApiProject) => ({
        id: project.id || '',
        project_name: project.project_name || '',
        description: project.description || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        investors: project.investors || [],
        project_status: mapStatus(project.project_status || 'planning'),
      }));
    },
    enabled: !!userId,
  });

  return { data: data || [], isLoading, error };
};
