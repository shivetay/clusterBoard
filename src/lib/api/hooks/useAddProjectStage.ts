import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TStageFormData } from '@/types';
import apiClient from '../apiClient';

export const useAddProjectStage = (projectId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();

  const {
    mutate: addStage,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: TStageFormData) => {
      try {
        await apiClient.patch(`/projects/${projectId}/add-stage`, data);
      } catch (error: any) {
        showAlert({
          message: error?.response?.data?.message,
          severity: 'error',
        });
        throw new Error(error?.response?.data?.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });

      router.refresh();

      setIsOpen(false);
      showAlert({
        message: TRANSLATION_GROUPS.PROJECTS.PROJECT_STAGE_ADDED_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: any) => {
      showAlert({
        message: error?.response?.data?.message,
        severity: 'error',
      });
    },
  });

  return {
    addStage,
    isPending,
    error,
  };
};
