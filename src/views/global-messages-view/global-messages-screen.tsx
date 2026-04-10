'use client';

import { useAuth } from '@clerk/nextjs';
import { useGetUserProjects } from '@/lib';
import type { TMySentProjectMessage } from '@/types/project-message.type';
import { useUser } from '@/stores';
import { GlobalMessagesView } from './global-messages-view';
import { useGlobalMessages } from './use-global-messages';

export type TGlobalMessagesScreenProps = {
  initialMessages: TMySentProjectMessage[];
};

export function GlobalMessagesScreen({
  initialMessages,
}: TGlobalMessagesScreenProps) {
  const { isLoaded } = useAuth();
  const { userInfo } = useUser();
  const { data: userProjects, isLoading } = useGetUserProjects();
  const projectOptions =
    userProjects?.map((p) => ({
      id: p.id,
      project_name: p.project_name,
    })) ?? [];

  const vm = useGlobalMessages(initialMessages, projectOptions);

  if (!isLoaded || isLoading) {
    return <GlobalMessagesView showLoader />;
  }

  return (
    <GlobalMessagesView
      topBar={{
        visibleCount: vm.listSummary.visible,
        totalCount: vm.listSummary.total,
        filterProjectId: vm.filterProjectId,
        onFilterProjectId: vm.setFilterProjectId,
        composeProjectId: vm.composeProjectId,
        onComposeProjectId: vm.setComposeProjectId,
        projectOptions: vm.projectOptions,
        onNewMessage: vm.openNewMessage,
      }}
      list={{
        messages: vm.filteredMessages,
        hasAnyMessages: initialMessages.length > 0,
        currentUserId: userInfo?.id,
        onEdit: vm.handleEdit,
        onDelete: vm.handleDelete,
        onReply: vm.handleReply,
      }}
    />
  );
}
