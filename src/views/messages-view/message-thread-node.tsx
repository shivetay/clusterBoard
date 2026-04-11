'use client';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ActionButtons } from '@/components/features/project-stage-container/project-stage-container.styled';
import {
  CommentContainer,
  CommentDetails,
  CommentText,
} from '@/components/ui/stage-task/stage-task.styled';
import { formatDateForInput } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import type { TPublicProjectMessage } from '@/types';

export type TMessageThreadNodeProps = {
  message: TPublicProjectMessage;
  depth: number;
  currentUserId: string | undefined;
  onEdit: (m: TPublicProjectMessage) => void;
  onDelete: (messageId: string) => void;
  onReply: (parentId: string) => void;
};

export function MessageThreadNode({
  message,
  depth,
  currentUserId,
  onEdit,
  onDelete,
  onReply,
}: TMessageThreadNodeProps) {
  const { t } = useTranslation();
  const isOwn = message.author_id === currentUserId;

  return (
    <Box sx={{ pl: depth > 0 ? 2 : 0 }}>
      <CommentContainer>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CommentDetails>
            {t(TRANSLATIONS.AUTHOR_NAME)}: {message.author_name}
          </CommentDetails>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={0.5}>
            <ActionButtons
              aria-label={t(TRANSLATIONS.MESSAGES_PAGE_REPLY)}
              startIcon={<MapsUgcOutlinedIcon />}
              onClick={() => onReply(message.id)}
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
              onClick={() => onDelete(message.id)}
            />
          </Box>
        </Box>
        <CommentText sx={{ whiteSpace: 'pre-wrap' }}>
          {message.body}
        </CommentText>
        <CommentDetails>
          {message.is_edited && ` ${t(TRANSLATIONS.EDITED)} `}
          {t(TRANSLATIONS.DATE)}: {formatDateForInput(message.updated_at)}
        </CommentDetails>
      </CommentContainer>
      {message.replies.map((reply) => (
        <MessageThreadNode
          key={reply.id}
          message={reply}
          depth={depth + 1}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </Box>
  );
}
