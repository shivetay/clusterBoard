'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { AppError, TFormData } from '@/types';
import apiClient from '../apiClient';

export const useCreateNewProject = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation<void, AppError, TFormData>({
    mutationFn: async (data: TFormData) => {
      try {
        await apiClient.post('/projects/create', data);
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
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
      showAlert({
        message: TRANSLATION_GROUPS.PROJECTS.PROJECT_CREATED_SUCCESSFULLY,
        severity: 'success',
      });
    },
  });
  return { createProject, isPending, error };
};
