'use client';

import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import type { TMySentProjectMessage } from '@/types/project-message.type';
import { GlobalMessageRow } from './global-message-row';

export type TGlobalMessagesListProps = {
  messages: TMySentProjectMessage[];
  hasAnyMessages: boolean;
  currentUserId: string | undefined;
  onEdit: (m: TMySentProjectMessage) => void;
  onDelete: (projectId: string, messageId: string) => void;
  onReply: (projectId: string, parentId: string) => void;
};

export function GlobalMessagesList({
  messages,
  hasAnyMessages,
  currentUserId,
  onEdit,
  onDelete,
  onReply,
}: TGlobalMessagesListProps) {
  const { t } = useTranslation();

  if (messages.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
        {hasAnyMessages
          ? t(TRANSLATIONS.MESSAGES_NONE_FILTERED)
          : t(TRANSLATIONS.MESSAGES_NONE_SENT)}
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 2, pr: { md: 3 } }}>
      {messages.map((m) => (
        <GlobalMessageRow
          key={m.id}
          message={m}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </Stack>
  );
}
