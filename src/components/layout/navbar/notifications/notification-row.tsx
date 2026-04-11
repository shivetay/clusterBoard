'use client';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  buildNotificationParams,
  getNotificationHref,
  notificationKindToTranslationKey,
} from '@/lib/utils';
import { formatDate } from '@/lib/utils/formatDate';
import { TRANSLATIONS } from '@/locales';
import type { INotificationItem } from '@/types/notification.type';

import {
  NotificationListItemText,
  NotificationPrimaryText,
  NotificationRowButton,
  NotificationRowRoot,
  NotificationSecondaryText,
} from './notifications.styled';

type TNotificationRowProps = {
  notification: INotificationItem;
  onMarkRead: (id: string) => void;
  onOpenAndMarkRead: (id: string, href: string) => void;
  isBusy: boolean;
};

export function NotificationRow({
  notification,
  onMarkRead,
  onOpenAndMarkRead,
  isBusy,
}: TNotificationRowProps) {
  const { t } = useTranslation();
  const titleKey = notificationKindToTranslationKey(notification.kind);
  const params = buildNotificationParams(notification);
  const href = getNotificationHref(notification);

  return (
    <NotificationRowRoot
      disablePadding
      disableGutters
      secondaryAction={
        <IconButton
          edge="end"
          size="small"
          disabled={isBusy}
          aria-label={t(TRANSLATIONS.NOTIFICATIONS_MARK_ONE_READ)}
          onClick={() => onMarkRead(notification.id)}
        >
          <CheckCircleOutlineIcon fontSize="small" />
        </IconButton>
      }
    >
      <NotificationRowButton
        disabled={isBusy}
        aria-label={t(TRANSLATIONS.NOTIFICATIONS_GO_TO_ITEM)}
        onClick={() => onOpenAndMarkRead(notification.id, href)}
      >
        <NotificationListItemText
          primary={
            <NotificationPrimaryText>
              {t(titleKey, params)}
            </NotificationPrimaryText>
          }
          secondary={
            <NotificationSecondaryText>
              {formatDate(notification.created_at)}
              {notification.meta.body_preview
                ? ` · ${notification.meta.body_preview}`
                : ''}
            </NotificationSecondaryText>
          }
        />
      </NotificationRowButton>
    </NotificationRowRoot>
  );
}
