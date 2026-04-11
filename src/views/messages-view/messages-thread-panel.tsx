'use client';

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import type { TPublicProjectMessage } from '@/types';
import { MessageThreadNode } from './message-thread-node';
import {
  MessagesDetailColumn,
  MessageThreadRoot,
} from './messages-view.styled';

export type TMessagesThreadPanelProps = {
  selectedThread: TPublicProjectMessage | null;
  currentUserId: string | undefined;
  onEdit: (m: TPublicProjectMessage) => void;
  onDelete: (messageId: string) => void;
  onReply: (parentId: string) => void;
};

export function MessagesThreadPanel({
  selectedThread,
  currentUserId,
  onEdit,
  onDelete,
  onReply,
}: TMessagesThreadPanelProps) {
  const { t } = useTranslation();

  return (
    <MessagesDetailColumn>
      {!selectedThread ? (
        <Typography variant="body2" color="text.secondary">
          {t(TRANSLATIONS.MESSAGES_PAGE_SELECT)}
        </Typography>
      ) : (
        <MessageThreadRoot>
          <MessageThreadNode
            message={selectedThread}
            depth={0}
            currentUserId={currentUserId}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
          />
        </MessageThreadRoot>
      )}
    </MessagesDetailColumn>
  );
}
