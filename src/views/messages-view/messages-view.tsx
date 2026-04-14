'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, InnerContainer, PageContainer } from '@/components';
import {
  AddProjectMessageModal,
  EditProjectMessageModal,
} from '@/components/features';
import { deleteProjectMessageAction } from '@/lib/actions';
import { findRootMessageIdForMessageId } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import { useUser } from '@/stores';
import type { TPublicProjectMessage } from '@/types';
import { MessagesThreadList } from './messages-thread-list';
import { MessagesThreadPanel } from './messages-thread-panel';
import { MessagesSplitContainer } from './messages-view.styled';
import { useMessagesThreadSelection } from './use-messages-thread-selection';

type TMessagesViewProps = {
  projectId: string;
  messages?: TPublicProjectMessage[];
};

export function MessagesView({ projectId, messages = [] }: TMessagesViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const { setModalContent } = useModal();
  const { userInfo } = useUser();
  const { selectedRootId, setSelectedRootId, selectedThread } =
    useMessagesThreadSelection(messages);

  const messageFromUrl = searchParams.get('message');

  useEffect(() => {
    if (!messageFromUrl || messages.length === 0) return;
    const rootId = findRootMessageIdForMessageId(messages, messageFromUrl);
    if (rootId) setSelectedRootId(rootId);
  }, [messageFromUrl, messages, setSelectedRootId]);

  const handleBack = () => {
    router.push(`/project/${projectId}`);
  };

  const handleDelete = useCallback(
    async (messageId: string) => {
      try {
        const result = await deleteProjectMessageAction(projectId, messageId);
        if (result.success) {
          showAlert({
            message: t(
              TRANSLATION_GROUPS.MESSAGES.MESSAGE_REMOVED_SUCCESSFULLY,
            ),
            severity: 'success',
          });
          if (messageId === selectedRootId) {
            setSelectedRootId(null);
          }
          router.refresh();
        } else {
          showAlert({
            message: t(TRANSLATION_GROUPS.ERRORS.ERROR_REMOVE_MESSAGE),
            severity: 'error',
          });
        }
      } catch {
        showAlert({
          message: t(TRANSLATION_GROUPS.ERRORS.ERROR_REMOVE_MESSAGE),
          severity: 'error',
        });
      }
    },
    [projectId, router, selectedRootId, setSelectedRootId, showAlert, t],
  );

  const handleEdit = useCallback(
    (m: TPublicProjectMessage) => {
      setModalContent(
        <EditProjectMessageModal
          projectId={projectId}
          messageId={m.id}
          initialBody={m.body}
        />,
      );
    },
    [projectId, setModalContent],
  );

  const handleReply = useCallback(
    (parentId: string) => {
      setModalContent(
        <AddProjectMessageModal
          projectId={projectId}
          parent_message_id={parentId}
        />,
      );
    },
    [projectId, setModalContent],
  );

  const openNewThread = useCallback(() => {
    setModalContent(
      <AddProjectMessageModal projectId={projectId} parent_message_id={null} />,
    );
  }, [projectId, setModalContent]);

  return (
    <PageContainer>
      <CustomButton
        sx={{ marginBottom: 2, marginLeft: 0 }}
        color="primary"
        variant="contained"
        onClick={handleBack}
      >
        {t(TRANSLATION_GROUPS.COMMON.BACK)}
      </CustomButton>
      <InnerContainer pageTitle={TRANSLATION_GROUPS.MESSAGES.WIADOMOSCI}>
        <MessagesSplitContainer>
          <MessagesThreadList
            messages={messages}
            selectedRootId={selectedRootId}
            onSelectRoot={setSelectedRootId}
            onNewThread={openNewThread}
          />
          <MessagesThreadPanel
            selectedThread={selectedThread}
            currentUserId={userInfo?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReply={handleReply}
          />
        </MessagesSplitContainer>
      </InnerContainer>
    </PageContainer>
  );
}

export default MessagesView;
