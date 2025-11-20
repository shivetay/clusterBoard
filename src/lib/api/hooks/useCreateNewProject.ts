'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TFormData } from '@/types';
import apiClient from '../apiClient';

export const useCreateNewProject = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: TFormData) => {
      try {
        await apiClient.post('/projects/create', data);
      } catch (error: unknown) {
        const message =
          (error as AxiosError<{ message?: string }>).response?.data?.message ??
          (error as Error).message ??
          'Unexpected error';
        showAlert({
          message,
          severity: 'error',
        });
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      setIsOpen(false);
      showAlert({
        message: TRANSLATIONS.PROJECT_CREATED_SUCCESSFULLY,
        severity: 'success',
      });
    },
  });
  return { createProject, isPending, error };
};
