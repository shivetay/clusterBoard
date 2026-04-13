'use client';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ActionButtons } from '@/components/features/project-stage-container/project-stage-container.styled';
import {
  CommentContainer,
  CommentDetails,
  CommentText,
} from '@/components/ui/stage-task/stage-task.styled';
import { formatDateForInput } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import type { TMySentProjectMessage } from '@/types/project-message.type';
import { MessageThreadRoot } from '../messages-view/messages-view.styled';

export type TGlobalMessageRowProps = {
  message: TMySentProjectMessage;
  currentUserId: string | undefined;
  onEdit: (m: TMySentProjectMessage) => void;
  onDelete: (projectId: string, messageId: string) => void;
  onReply: (projectId: string, parentId: string) => void;
};

export function GlobalMessageRow({
  message,
  currentUserId,
  onEdit,
  onDelete,
  onReply,
}: TGlobalMessageRowProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const isOwn = message.author_id === currentUserId;

  const contextLine =
    message.parent_author_name !== null
      ? t(TRANSLATIONS.MESSAGES_IN_REPLY_TO, {
          author: message.parent_author_name,
        })
      : t(TRANSLATIONS.MESSAGES_ROOT_THREAD);

  return (
    <MessageThreadRoot>
      <CommentContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {message.project_name}
            </Typography>
            <CommentDetails sx={{ mb: 0.5 }}>{contextLine}</CommentDetails>
            <CommentDetails>
              {t(TRANSLATIONS.AUTHOR_NAME)}: {message.author_name}
            </CommentDetails>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 0.5,
            }}
          >
            <ActionButtons
              aria-label={t(TRANSLATIONS.MESSAGES_OPEN_IN_PROJECT)}
              startIcon={<OpenInNewOutlinedIcon />}
              onClick={() =>
                router.push(`/project/${message.project_id}/messages`)
              }
            />
            <ActionButtons
              aria-label={t(TRANSLATIONS.MESSAGES_PAGE_REPLY)}
              startIcon={<MapsUgcOutlinedIcon />}
              onClick={() => onReply(message.project_id, message.id)}
            />
            <ActionButtons
              aria-label={t(TRANSLATIONS.MESSAGE_EDIT_HEADER)}
              disabled={!isOwn}
              startIcon={<EditOutlinedIcon />}
              onClick={() => onEdit(message)}
            />
            <ActionButtons
              aria-label={t(TRANSLATIONS.DELETE_MESSAGE)}
              disabled={!isOwn}
              startIcon={<DeleteForeverOutlinedIcon />}
              onClick={() => onDelete(message.project_id, message.id)}
            />
          </Box>
        </Box>
        <CommentText sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
          {message.body}
        </CommentText>
        <CommentDetails>
          {message.is_edited && ` ${t(TRANSLATIONS.EDITED)} `}
          {t(TRANSLATIONS.DATE)}: {formatDateForInput(message.updated_at)}
        </CommentDetails>
      </CommentContainer>
    </MessageThreadRoot>
  );
}
