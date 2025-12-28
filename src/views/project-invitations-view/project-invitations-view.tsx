'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '@/components/features/modal/modal.styled';
import { useDeleteInvitation } from '@/lib';
import { formatDate } from '@/lib/utils/formatDate';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import type { IInvitationData } from '@/types';
import {
  BackButton,
  DeleteButton,
  InvitationsContainer,
} from './project-invitation-view.styled';

interface IProjectInvitationsViewProps {
  invitations: IInvitationData[];
}

const getInvitationStatus = (invitation: IInvitationData): string => {
  // Check status field first (from backend)
  if (invitation.status === 'cancelled') {
    return TRANSLATIONS.INVITATION_STATUS_CANCELLED;
  }
  if (invitation.status === 'accepted' || invitation.accepted_at) {
    return TRANSLATIONS.INVITATION_STATUS_ACCEPTED;
  }
  if (invitation.status === 'expired') {
    return TRANSLATIONS.INVITATION_STATUS_EXPIRED;
  }
  if (invitation.expires_at) {
    const expiresAt = new Date(invitation.expires_at);
    const now = new Date();
    if (expiresAt < now) {
      return TRANSLATIONS.INVITATION_STATUS_EXPIRED;
    }
  }
  return TRANSLATIONS.INVITATION_STATUS_PENDING;
};

export function ProjectInvitationsView({
  invitations,
}: IProjectInvitationsViewProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { deleteInvitation, isPending } = useDeleteInvitation();
  const { setIsOpen, setModalContent } = useModal();

  const handleBack = () => {
    router.back();
  };

  const handleDeleteClick = (invitation: IInvitationData) => {
    const invitationId = invitation.id || invitation._id;
    if (!invitationId) return;

    // Convert to string if it's an object (MongoDB ObjectId)
    const invitationIdString =
      typeof invitationId === 'string' ? invitationId : String(invitationId);

    setModalContent(
      <AddProjectModalContainer>
        <AddProjectModalHeader>
          <AddProjectModalTitle as="h2" variant="h2">
            {t(TRANSLATIONS.DELETE_INVITATION_MODAL_TITLE)}
          </AddProjectModalTitle>
        </AddProjectModalHeader>
        <Box display="flex" flexDirection="row" gap={2} width="100%">
          <ModalButton
            onClick={() => setIsOpen(false)}
            variant="outlined"
            color="secondary"
            disabled={isPending}
          >
            {t(TRANSLATIONS.CANCEL)}
          </ModalButton>
          <ModalButton
            onClick={() => {
              setIsOpen(false);
              deleteInvitation(invitationIdString);
            }}
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            {t(TRANSLATIONS.DELETE_INVITATION)}
          </ModalButton>
        </Box>
      </AddProjectModalContainer>,
    );
    setIsOpen(true);
  };

  return (
    <PageContainer>
      <BackButton color="primary" variant="contained" onClick={handleBack}>
        {t(TRANSLATIONS.BACK)}
      </BackButton>
      <Box sx={{ mt: 3, borderRadius: '2px' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t(TRANSLATIONS.INVITATIONS)}
        </Typography>
        {invitations.length === 0 ? (
          <Typography variant="body1">
            No invitations found for this project.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {invitations.map((invitation) => {
              // Ensure ID is a string (handle both id and _id fields)
              const rawId = invitation.id || invitation._id;
              const invitationId =
                typeof rawId === 'string' ? rawId : String(rawId);
              const recipientName =
                invitation.recipient_name || invitation.user?.name || null;
              const recipientEmail =
                invitation.invitee_email || invitation.email || '';

              return (
                <InvitationsContainer
                  key={invitationId}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <DeleteButton
                    onClick={() => handleDeleteClick(invitation)}
                    disabled={isPending}
                    aria-label={t(TRANSLATIONS.DELETE_INVITATION)}
                  >
                    <DeleteIcon />
                  </DeleteButton>
                  <Typography variant="h6">
                    {invitation.project?.project_name || 'Unknown Project'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(TRANSLATIONS.SENT_TO)}:{' '}
                    {recipientName || recipientEmail || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(TRANSLATIONS.STATUS)}:{' '}
                    {t(getInvitationStatus(invitation))}
                  </Typography>
                  {invitation.expires_at && (
                    <Typography variant="body2" color="text.secondary">
                      {t(TRANSLATIONS.EXPIRES_AT)}:{' '}
                      {formatDate(invitation.expires_at)}
                    </Typography>
                  )}
                </InvitationsContainer>
              );
            })}
          </Box>
        )}
      </Box>
    </PageContainer>
  );
}
