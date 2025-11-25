'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
      showAlert({
        message: TRANSLATIONS.PROJECT_CREATED_SUCCESSFULLY,
        severity: 'success',
      });
    },
  });
  return { createProject, isPending, error };
};
