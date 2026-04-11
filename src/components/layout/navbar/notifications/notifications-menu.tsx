'use client';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Badge } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/lib/api/hooks';
import { TRANSLATIONS } from '@/locales';
import {
  NotificationsPopover,
  NotificationsTriggerButton,
} from './notifications.styled';
import { NotificationsPopoverPanel } from './notifications-popover-panel';

export function NotificationsMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { data } = useNotifications();
  const total = data?.counts.total ?? 0;
  const open = Boolean(anchorEl);

  return (
    <>
      <NotificationsTriggerButton
        aria-label={t(TRANSLATIONS.NOTIFICATIONS_ARIA)}
        $hasUnread={total > 0}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge
          color="primary"
          overlap="circular"
          badgeContent={total > 0 ? total : undefined}
          invisible={total === 0}
        >
          <NotificationsActiveOutlinedIcon />
        </Badge>
      </NotificationsTriggerButton>
      <NotificationsPopover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <NotificationsPopoverPanel onRequestClose={() => setAnchorEl(null)} />
      </NotificationsPopover>
    </>
  );
}
