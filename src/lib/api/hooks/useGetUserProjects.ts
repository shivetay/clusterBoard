'use client';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/stores';
import type {
  IInvestorData,
  IProjectData,
  IStageData,
  TUserAccess,
} from '@/types';
import apiClient from '../apiClient';

interface IApiProject {
  id?: string;
  project_name: string;
  project_description: string;
  start_date?: string;
  end_date?: string;
  investors: string[];
  investors_name?: IInvestorData[];
  project_stages: IStageData[];
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
  user_access: TUserAccess;
  is_owner: boolean;
  is_investor: boolean;
  owner_name?: string;
}

// Map API status to frontend status format
const mapStatus = (
  status: string,
): 'zakończony' | 'w toku' | 'w przygotowaniu' => {
  switch (status?.toLowerCase()) {
    case 'zakończony':
      return 'zakończony';
    case 'w toku':
      return 'w toku';
    case 'w przygotowaniu':
      return 'w przygotowaniu';
    default:
      return 'w przygotowaniu';
  }
};

export const useGetUserProjects = (): {
  data: IProjectData[];
  isLoading: boolean;
  error: Error | null;
} => {
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
        project_description: project.project_description || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        investors: project.investors || [],
        investors_name: project.investors_name || [],
        project_stages: project.project_stages || [],
        project_status: mapStatus(project.project_status || 'planning'),
        user_access: project.user_access || 'none',
        is_owner: project.is_owner || false,
        is_investor: project.is_investor || false,
        owner_name: project.owner_name,
      }));
    },
    enabled: !!userId,
  });

  return { data: data || [], isLoading, error: error || null };
};
