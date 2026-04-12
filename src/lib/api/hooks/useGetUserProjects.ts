'use client';
import { useQuery } from '@tanstack/react-query';
import {
  emptyPaginationMeta,
  userProjectsPageSize,
} from '@/lib/pagination/constants';
import { useUser } from '@/stores';
import type {
  IInvestorData,
  IProjectData,
  IStageData,
  PaginationMeta,
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

type UserProjectsApiResponse = {
  status: string;
  data: { projects: IApiProject[] };
  pagination: PaginationMeta;
};

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

export const useGetUserProjects = (
  currentPage: number = 1,
): {
  data: IProjectData[];
  pagination: PaginationMeta;
  isLoading: boolean;
  error: Error | null;
} => {
  const user = useUser();
  const userId = user.userInfo?.id;

  const { data, isLoading, error } = useQuery<{
    projects: IProjectData[];
    pagination: PaginationMeta;
  }>({
    queryKey: ['user-projects', userId, currentPage],
    queryFn: async () => {
      const response = await apiClient.get<UserProjectsApiResponse>(
        `/projects/user/${userId}`,
        {
          params: {
            page: currentPage,
            limit: userProjectsPageSize,
          },
        },
      );

      const body = response.data;
      const projects = body?.data?.projects || [];
      const pagination = body?.pagination ?? emptyPaginationMeta;

      return {
        projects: projects.map((project: IApiProject) => ({
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
        })),
        pagination,
      };
    },
    enabled: !!userId,
  });

  return {
    data: data?.projects ?? [],
    pagination: data?.pagination ?? emptyPaginationMeta,
    isLoading,
    error: error || null,
  };
};
