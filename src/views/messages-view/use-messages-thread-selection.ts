'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TPublicProjectMessage } from '@/types';

export function useMessagesThreadSelection(messages: TPublicProjectMessage[]) {
  const [selectedRootId, setSelectedRootId] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setSelectedRootId(null);
      return;
    }
    setSelectedRootId((prev) => {
      if (prev && messages.some((r) => r.id === prev)) return prev;
      return messages[0]?.id ?? null;
    });
  }, [messages]);

  const selectedThread = useMemo(
    () => messages.find((m) => m.id === selectedRootId) ?? null,
    [messages, selectedRootId],
  );

  return { selectedRootId, setSelectedRootId, selectedThread };
}
