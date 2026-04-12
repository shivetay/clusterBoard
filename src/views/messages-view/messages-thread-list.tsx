'use client';

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components';
import { formatDateForInput } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import type { TPublicProjectMessage } from '@/types';
import {
  MessageListItem,
  MessagesListColumn,
  MessagesListScrollArea,
} from './messages-view.styled';
import { previewMessageBody } from './preview-message-body';

export type TMessagesThreadListProps = {
  messages: TPublicProjectMessage[];
  selectedRootId: string | null;
  onSelectRoot: (id: string) => void;
  onNewThread: () => void;
};

export function MessagesThreadList({
  messages,
  selectedRootId,
  onSelectRoot,
  onNewThread,
}: TMessagesThreadListProps) {
  const { t } = useTranslation();

  return (
    <MessagesListColumn>
      <CustomButton
        color="primary"
        variant="contained"
        onClick={onNewThread}
        sx={{ alignSelf: 'flex-start', flexShrink: 0 }}
      >
        {t(TRANSLATIONS.MESSAGES_PAGE_NEW_THREAD)}
      </CustomButton>
      <MessagesListScrollArea>
        {messages.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {t(TRANSLATIONS.MESSAGES_PAGE_NO_THREADS)}
          </Typography>
        ) : (
          messages.map((root) => (
            <MessageListItem
              key={root.id}
              selected={root.id === selectedRootId}
              onClick={() => onSelectRoot(root.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRoot(root.id);
                }
              }}
            >
              <Typography variant="subtitle2" color="text.primary">
                {root.author_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDateForInput(root.created_at)}
              </Typography>
              <Typography
                variant="body2"
                color="text.tertiary"
                sx={{ mt: 0.5 }}
              >
                {previewMessageBody(root.body)}
              </Typography>
            </MessageListItem>
          ))
        )}
      </MessagesListScrollArea>
    </MessagesListColumn>
  );
}
