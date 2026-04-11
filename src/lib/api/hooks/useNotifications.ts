'use client';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import type { INotificationsResponse } from '@/types/notification.type';
import apiClient from '../apiClient';

async function fetchNotifications(): Promise<INotificationsResponse> {
  const res = await apiClient.get<{
    status: string;
    data: INotificationsResponse;
  }>('/notifications');
  return res.data.data;
}

export function useNotifications() {
  const { userId, isLoaded } = useAuth();

  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: fetchNotifications,
    enabled: Boolean(isLoaded && userId),
    staleTime: 15_000,
  });
}
