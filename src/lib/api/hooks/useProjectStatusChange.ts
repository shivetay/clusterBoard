import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { useAlert, useModal } from '@/providers';
import type { AppError } from '@/types';
import apiClient from '../apiClient';

type TProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';

export const useProjectStatusChange = (
  projectId: string,
  successMessage: string,
) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();

  const {
    mutate: changeStatus,
    isPending,
    error,
  } = useMutation<unknown, AppError, TProjectStatus>({
    mutationFn: async (project_status: TProjectStatus) => {
      try {
        return await apiClient.patch(`projects/${projectId}/status`, {
          project_status,
        });
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
        message: successMessage,
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
    changeStatus,
    isPending,
    error,
  };
};
