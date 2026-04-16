import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { AppError, TTaskData } from '@/types';
import apiClient from '../apiClient';

export const useEditTask = (taskId: string) => {
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: editTask,
    isPending,
    error,
  } = useMutation<unknown, AppError, TTaskData>({
    mutationFn: async (taskData: TTaskData) => {
      try {
        return await apiClient.patch(`/tasks/${taskId}`, taskData);
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
        message: TRANSLATION_GROUPS.TASKS.TASK_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
  });

  return {
    editTask,
    isPending,
    error,
  };
};
