export type TNotificationKind =
  | 'comment_created'
  | 'comment_edited'
  | 'comment_deleted'
  | 'stage_created'
  | 'stage_edited'
  | 'stage_deleted'
  | 'stage_closed'
  | 'project_status_changed'
  | 'investor_joined_project'
  | 'project_message_received';

export interface INotificationMeta {
  stage_id?: string;
  task_id?: string;
  comment_id?: string;
  message_id?: string;
  stage_name?: string;
  previous_status?: string;
  new_status?: string;
  body_preview?: string;
  is_reply?: boolean;
}

export interface INotificationItem {
  id: string;
  kind: TNotificationKind;
  project_id: string;
  project_name: string;
  actor_clerk_id: string;
  actor_name: string;
  meta: INotificationMeta;
  created_at: string;
}

export interface INotificationsResponse {
  notifications: INotificationItem[];
  counts: { total: number; messages: number };
}
