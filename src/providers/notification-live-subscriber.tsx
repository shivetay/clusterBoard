'use client';

import { useAuth } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { NOTIFICATIONS_QUERY_KEY } from '@/lib/api/hooks/useNotifications';
import { subscribeNotificationEvents } from '@/lib/api/notificationSseClient';

/**
 * Keeps the notifications query fresh: Mongo change stream over SSE when supported,
 * plus the polling interval defined on `useNotifications`.
 */
export function NotificationLiveSubscriber() {
  const { userId, isLoaded, getToken } = useAuth();
  const queryClient = useQueryClient();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const ac = new AbortController();

    const invalidate = () => {
      void queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEY, userId],
      });
    };

    void subscribeNotificationEvents(
      () => getTokenRef.current(),
      invalidate,
      ac.signal,
    );

    return () => ac.abort();
  }, [isLoaded, userId, queryClient]);

  return null;
}
