'use client';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import type { INotificationsResponse } from '@/types/notification.type';
import apiClient from '../apiClient';

/** Shared query key prefix for notifications + live subscriber invalidation. */
export const NOTIFICATIONS_QUERY_KEY = 'notifications' as const;

const NOTIFICATIONS_STALE_TIME_MS = 15_000;
/** Poll more often while the tab is visible (SSE fallback). */
const NOTIFICATIONS_REFETCH_INTERVAL_VISIBLE_MS = 8_000;
/** Poll less often when the tab is hidden to save work; requires `refetchIntervalInBackground`. */
const NOTIFICATIONS_REFETCH_INTERVAL_HIDDEN_MS = 45_000;

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
        ? NOTIFICATIONS_REFETCH_INTERVAL_HIDDEN_MS
        : NOTIFICATIONS_REFETCH_INTERVAL_VISIBLE_MS;
    },
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
}
