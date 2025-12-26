'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import apiClient from '../apiClient';

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.post('/invitations/accept', { token });
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      queryClient.invalidateQueries({ queryKey: ['invitation'] });

      const message = data?.data?.alreadyInvestor
        ? t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR_ALREADY_INVESTOR_MESSAGE)
        : t(TRANSLATIONS.INVITATION_ACCEPTED_SUCCESSFULLY);

      showAlert({ message, severity: 'success' });

      if (data?.data?.project?._id) {
        router.push(`/project/${data.data.project._id}`);
      } else {
        router.push('/projects');
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR);

      // Handle specific error cases
      if (errorMessage.includes('EXPIRED')) {
        showAlert({
          message: t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR_EXPIRED),
          severity: 'error',
        });
      } else if (errorMessage.includes('EMAIL_MISMATCH')) {
        showAlert({
          message: t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR_EMAIL_MISMATCH),
          severity: 'error',
        });
      } else if (errorMessage.includes('ALREADY_ACCEPTED')) {
        showAlert({
          message: t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR_ALREADY_ACCEPTED),
          severity: 'warning',
        });
      } else {
        showAlert({
          message: t(TRANSLATIONS.INVITATION_ACCEPTED_ERROR),
          severity: 'error',
        });
      }
    },
  });
};
