'use client';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components/ui';
import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useNotifications,
} from '@/lib/api/hooks';
import { TRANSLATIONS } from '@/locales';

import { NotificationRow } from './notification-row';
import {
  NotificationsEmptyText,
  NotificationsList,
  NotificationsLoadingArea,
  NotificationsLoadingCaption,
  NotificationsPanelHeader,
  NotificationsPanelRoot,
  NotificationsPanelScroll,
  NotificationsPanelTitle,
} from './notifications.styled';

const NOTIFICATIONS_LOADING_SPINNER_SIZE_PX = 28;
/** After marking read, close the panel when this was the last item in the list. */
const NOTIFICATION_PANEL_AUTO_CLOSE_MAX_COUNT = 1;

type TNotificationsPopoverPanelProps = {
  onRequestClose: () => void;
};

export function NotificationsPopoverPanel({
  onRequestClose,
}: TNotificationsPopoverPanelProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useNotifications();
  const deleteOne = useDeleteNotificationMutation();
  const deleteAll = useDeleteAllNotificationsMutation();

  const notifications = data?.notifications ?? [];
  const hasItems = notifications.length > 0;

  const handleMarkOne = (id: string) => {
    deleteOne.mutate(id, {
      onSuccess: () => {
        if (notifications.length <= NOTIFICATION_PANEL_AUTO_CLOSE_MAX_COUNT)
          onRequestClose();
      },
    });
  };

  const handleOpenAndMarkRead = (id: string, href: string) => {
    deleteOne.mutate(id, {
      onSuccess: () => {
        onRequestClose();
        router.push(href);
      },
    });
  };

  const handleMarkAll = () => {
    deleteAll.mutate(undefined, {
      onSuccess: () => onRequestClose(),
    });
  };

  const busy = deleteOne.isPending || deleteAll.isPending;

  return (
    <NotificationsPanelRoot>
      <NotificationsPanelHeader>
        <NotificationsPanelTitle>
          {t(TRANSLATIONS.NOTIFICATIONS_TITLE)}
        </NotificationsPanelTitle>
        {hasItems && (
          <CustomButton
            size="small"
            variant="text"
            disabled={busy}
            onClick={handleMarkAll}
          >
            {t(TRANSLATIONS.NOTIFICATIONS_MARK_ALL_READ)}
          </CustomButton>
        )}
      </NotificationsPanelHeader>

      <NotificationsPanelScroll>
        {isLoading && (
          <NotificationsLoadingArea>
            <CircularProgress size={NOTIFICATIONS_LOADING_SPINNER_SIZE_PX} />
            <NotificationsLoadingCaption>
              {t(TRANSLATIONS.NOTIFICATIONS_LOADING)}
            </NotificationsLoadingCaption>
          </NotificationsLoadingArea>
        )}

        {!isLoading && !hasItems && (
          <NotificationsEmptyText>
            {t(TRANSLATIONS.NOTIFICATIONS_EMPTY)}
          </NotificationsEmptyText>
        )}

        {!isLoading && hasItems && (
          <NotificationsList dense disablePadding>
            {notifications.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onMarkRead={handleMarkOne}
                onOpenAndMarkRead={handleOpenAndMarkRead}
                isBusy={busy}
              />
            ))}
          </NotificationsList>
        )}
      </NotificationsPanelScroll>
    </NotificationsPanelRoot>
  );
}
