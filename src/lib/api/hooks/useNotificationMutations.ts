'use client';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { NOTIFICATIONS_QUERY_KEY } from './useNotifications';

export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await apiClient.delete(`/notifications/${notificationId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEY, userId],
      });
    },
  });
}

export function useDeleteAllNotificationsMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/notifications/all');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEY, userId],
      });
    },
  });
}
