/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { glassEffects } from '@/theme';

export const NotificationsPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[8],
    ...glassEffects.medium,
    backgroundImage: 'none',
    maxHeight: '70vh',
    overflow: 'hidden',
  },
}));

export const NotificationsPanelRoot = styled(Box)(({ theme }) => ({
  width: theme.spacing(45),
  maxWidth: 'min(92vw, 360px)',
  maxHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const NotificationsPanelHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const NotificationsPanelTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  fontWeight: theme.typography.fontWeightBold,
}));

export const NotificationsPanelScroll = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  flex: 1,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const NotificationsLoadingArea = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const NotificationsLoadingCaption = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  ...theme.typography.caption,
}));

export const NotificationsEmptyText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

export const NotificationsList = styled(List)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

export const NotificationsTriggerButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== '$hasUnread',
})<{ $hasUnread?: boolean }>(({ theme, $hasUnread }) => ({
  color: $hasUnread ? theme.palette.primary.main : theme.palette.common.white,
}));

export const NotificationRowRoot = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingRight: theme.spacing(7),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': {
    borderBottom: 'none',
  },
}));

export const NotificationRowButton = styled(ListItemButton)(({ theme }) => ({
  alignItems: 'flex-start',
  textAlign: 'left',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const NotificationPrimaryText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));

export const NotificationSecondaryText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export const NotificationListItemText = styled(ListItemText)(() => ({
  marginTop: 0,
  marginBottom: 0,
}));
