'use client';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import type { INotificationsResponse } from '@/types/notification.type';
import apiClient from '../apiClient';

/** Shared query key prefix for notifications + live subscriber invalidation. */
export const NOTIFICATIONS_QUERY_KEY = 'notifications' as const;

const NOTIFICATIONS_STALE_TIME_MS = 15_000;
const SSE_REFETCH_INTERVAL = 45_000;
const SSE_REFETCH_INTERVAL_IN_BACKGROUND = 8_000;

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
    queryKey: [NOTIFICATIONS_QUERY_KEY, userId],
    queryFn: fetchNotifications,
    enabled: Boolean(isLoaded && userId),
    staleTime: NOTIFICATIONS_STALE_TIME_MS,
    /** Fallback when SSE is down or Mongo has no replica set — keeps UI feeling live. */
    refetchInterval: () => {
      if (typeof document === 'undefined') return false;
      return document.hidden
        ? SSE_REFETCH_INTERVAL
        : SSE_REFETCH_INTERVAL_IN_BACKGROUND;
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
}
