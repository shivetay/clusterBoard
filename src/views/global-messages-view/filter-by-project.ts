import type { TMySentProjectMessage } from '@/types/project-message.type';

export function filterMySentMessagesByProject(
  messages: TMySentProjectMessage[],
  projectId: string | null,
): TMySentProjectMessage[] {
  if (!projectId) return messages;
  return messages.filter((m) => m.project_id === projectId);
}
