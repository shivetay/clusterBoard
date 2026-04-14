import { TRANSLATION_GROUPS } from '@/locales/pl/locales';
import type {
  INotificationItem,
  TNotificationKind,
} from '@/types/notification.type';

export function notificationKindToTranslationKey(
  kind: TNotificationKind,
): string {
  switch (kind) {
    case 'comment_created':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_COMMENT_CREATED;
    case 'comment_edited':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_COMMENT_EDITED;
    case 'comment_deleted':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_COMMENT_DELETED;
    case 'stage_created':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_STAGE_CREATED;
    case 'stage_edited':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_STAGE_EDITED;
    case 'stage_deleted':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_STAGE_DELETED;
    case 'stage_closed':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_STAGE_CLOSED;
    case 'project_status_changed':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_PROJECT_STATUS_CHANGED;
    case 'investor_joined_project':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_INVESTOR_JOINED;
    case 'project_message_received':
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_PROJECT_MESSAGE_RECEIVED;
    default:
      return TRANSLATION_GROUPS.NOTIFICATIONS.NOTIF_GENERIC;
  }
}

export function buildNotificationParams(
  n: INotificationItem,
): Record<string, string> {
  const m = n.meta ?? {};
  return {
    actor: n.actor_name,
    project: n.project_name,
    preview: m.body_preview ?? '',
    stage: m.stage_name ?? '',
    previous_status: m.previous_status ?? '',
    new_status: m.new_status ?? '',
  };
}
