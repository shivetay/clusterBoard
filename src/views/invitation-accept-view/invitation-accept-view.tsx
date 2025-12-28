'use client';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, Loader, PageContainer } from '@/components';
import { useAcceptInvitation } from '@/lib';
import { formatDate } from '@/lib/utils/formatDate';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import type { IInvitationData } from '@/types';
import {
  ButtonContainer,
  Header,
  InvitationAcceptCard,
  InvitationAcceptContainer,
  InvitationAcceptHeader,
  ProjectTitle,
} from './invitation-accept.styled';

export function InvitationAcceptView({
  invitationDetails,
  error,
}: {
  invitationDetails: IInvitationData | null;
  error?: 'cancelled' | 'error';
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const token = searchParams.get('token');
  const { mutate: acceptInvitation } = useAcceptInvitation();

  useEffect(() => {
    if (!token) {
      showAlert({
        message: t(TRANSLATIONS.INVALID_INVITATION_LINK),
        severity: 'error',
      });
      router.push('/projects');
      return;
    }

    if (!isSignedIn) {
      router.push(`/sign-in?redirect=/invite/accept?token=${token}`);
      return;
    }

    // Handle errors from server
    if (error) {
      if (error === 'cancelled') {
        showAlert({
          message: t(TRANSLATIONS.INVITATION_CANCELLED),
          severity: 'error',
        });
      } else {
        showAlert({
          message: t(TRANSLATIONS.INVALID_INVITATION_LINK),
          severity: 'error',
        });
      }
      router.push('/projects');
      return;
    }

    if (!invitationDetails) {
      showAlert({
        message: t(TRANSLATIONS.INVALID_INVITATION_LINK),
        severity: 'error',
      });
      router.push('/projects');
      return;
    }
  }, [token, isSignedIn, router, showAlert, t, error, invitationDetails]);

  const handleAcceptInvitation = () => {
    if (token && isSignedIn) {
      acceptInvitation(token);
    }
  };
  const handleCancelInvitation = () => {
    router.push('/projects');
  };

  if (!isLoaded || error || !invitationDetails) {
    return <Loader />;
  }

  const {
    project: { project_name, owner: { owner_name } = { owner_name: '' } },
    expires_at = '',
  } = invitationDetails;

  return (
    <PageContainer
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <InvitationAcceptContainer>
        <InvitationAcceptCard>
          <InvitationAcceptHeader variant="h3" as="h1">
            {t(TRANSLATIONS.INVITATION_ACCEPT_HEADER)}
          </InvitationAcceptHeader>
          <InvitationAcceptCard>
            <ProjectTitle>{t(TRANSLATIONS.PROJECT_NAME)}</ProjectTitle>
            <Header variant="h3" as="h1">
              {project_name}
            </Header>
            <ProjectTitle>{t(TRANSLATIONS.OWNER_NAME)}</ProjectTitle>
            <Header variant="h3" as="h1">
              {owner_name}
            </Header>
            <ProjectTitle>{t(TRANSLATIONS.EXPIRES_AT)}</ProjectTitle>
            <Header variant="h3" as="h1">
              {formatDate(expires_at)}
            </Header>
          </InvitationAcceptCard>
          <ButtonContainer>
            <CustomButton
              color="secondary"
              variant="outlined"
              onClick={handleCancelInvitation}
              disabled={!token || !isSignedIn}
            >
              {t(TRANSLATIONS.CANCEL_INVITATION)}
            </CustomButton>
            <CustomButton
              color="primary"
              variant="contained"
              onClick={handleAcceptInvitation}
              disabled={!token || !isSignedIn}
            >
              {t(TRANSLATIONS.ACCEPT_INVITATION)}
            </CustomButton>
          </ButtonContainer>
        </InvitationAcceptCard>
      </InvitationAcceptContainer>
    </PageContainer>
  );
}

export default InvitationAcceptView;
