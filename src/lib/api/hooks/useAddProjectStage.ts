import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { AppError, TStageFormData } from '@/types';
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
  } = useMutation<void, AppError, TStageFormData>({
    mutationFn: async (data: TStageFormData) => {
      try {
        await apiClient.patch(`/projects/${projectId}/add-stage`, data);
      } catch (error: unknown) {
        const appError = normalizeAppError(error);
        const message = resolveApiErrorMessage(appError);
        showAlert({
          message,
          severity: 'error',
        });
        throw appError;
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
    onError: (error: AppError) => {
      showAlert({
        message: resolveApiErrorMessage(error),
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
