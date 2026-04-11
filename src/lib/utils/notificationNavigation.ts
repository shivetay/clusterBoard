import type { INotificationItem } from '@/types/notification.type';

/**
 * In-app path for a notification (opens relevant project / messages view).
 */
export function getNotificationHref(notification: INotificationItem): string {
  const { project_id, kind, meta } = notification;

  if (kind === 'project_message_received') {
    const base = `/project/${project_id}/messages`;
    const mid = meta.message_id;
    return mid ? `${base}?message=${encodeURIComponent(mid)}` : base;
  }

  const stageId = meta.stage_id;
  const taskId = meta.task_id;
  if (stageId && taskId) {
    return `/project/${project_id}?stage=${encodeURIComponent(stageId)}&task=${encodeURIComponent(taskId)}`;
  }
  if (stageId) {
    return `/project/${project_id}?stage=${encodeURIComponent(stageId)}`;
  }

  return `/project/${project_id}`;
}
