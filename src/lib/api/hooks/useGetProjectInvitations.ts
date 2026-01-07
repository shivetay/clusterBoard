'use client';
import { useQuery } from '@tanstack/react-query';
import type { IInvitationData } from '@/types';
import apiClient from '../apiClient';

export const useGetProjectInvitations = (projectId: string) => {
  const { data, isLoading, error } = useQuery<IInvitationData[]>({
    queryKey: ['project-invitations', projectId],
    queryFn: async () => {
      const response = await apiClient.get<{
        status: string;
        results: number;
        data: { invitations: IInvitationData[] };
      }>(`/projects/${projectId}/invitations`);
      return response.data?.data?.invitations || [];
    },
    enabled: !!projectId,
  });

  return { data: data || [], isLoading, error: error || null };
};
