'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddProjectMessageModal,
  EditProjectMessageModal,
} from '@/components/features';
import { deleteProjectMessageAction } from '@/lib/actions';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TMySentProjectMessage } from '@/types/project-message.type';
import { filterMySentMessagesByProject } from './filter-by-project';

type TProjectOption = { id: string; project_name: string };

export function useGlobalMessages(
  initialMessages: TMySentProjectMessage[],
  projectOptions: TProjectOption[],
) {
  const router = useRouter();
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const { setModalContent } = useModal();
  const [filterProjectId, setFilterProjectId] = useState<string | null>(null);
  const [composeProjectId, setComposeProjectId] = useState<string>('');

  const filteredMessages = useMemo(
    () => filterMySentMessagesByProject(initialMessages, filterProjectId),
    [initialMessages, filterProjectId],
  );

  const handleDelete = useCallback(
    async (projectId: string, messageId: string) => {
      try {
        const result = await deleteProjectMessageAction(projectId, messageId);
        if (result.success) {
          showAlert({
            message: t(
              TRANSLATION_GROUPS.MESSAGES.MESSAGE_REMOVED_SUCCESSFULLY,
            ),
            severity: 'success',
          });
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
    [router, showAlert, t],
  );

  const handleEdit = useCallback(
    (m: TMySentProjectMessage) => {
      setModalContent(
        <EditProjectMessageModal
          projectId={m.project_id}
          messageId={m.id}
          initialBody={m.body}
        />,
      );
    },
    [setModalContent],
  );

  const handleReply = useCallback(
    (projectId: string, parentId: string) => {
      setModalContent(
        <AddProjectMessageModal
          projectId={projectId}
          parent_message_id={parentId}
        />,
      );
    },
    [setModalContent],
  );

  const openNewMessage = useCallback(() => {
    if (!composeProjectId) {
      showAlert({
        message: t(TRANSLATION_GROUPS.MESSAGES.MESSAGES_PICK_PROJECT_FOR_NEW),
        severity: 'warning',
      });
      return;
    }
    setModalContent(
      <AddProjectMessageModal
        projectId={composeProjectId}
        parent_message_id={null}
      />,
    );
  }, [composeProjectId, setModalContent, showAlert, t]);

  const listSummary = useMemo(
    () => ({
      visible: filteredMessages.length,
      total: initialMessages.length,
    }),
    [filteredMessages.length, initialMessages.length],
  );

  return {
    filterProjectId,
    setFilterProjectId,
    composeProjectId,
    setComposeProjectId,
    filteredMessages,
    projectOptions,
    listSummary,
    handleDelete,
    handleEdit,
    handleReply,
    openNewMessage,
  };
}
