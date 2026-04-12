/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';

import { Box, styled } from '@mui/material';
import { glassEffects } from '@/theme';

/** Vertical space reserved for shell (navbar, back link, title, padding). */
const messagesLayoutViewportReserve = 220;
const messagesLayoutMinHeight = 280;
const messagesLayoutMaxHeight = 720;

export const MessagesSplitContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minHeight: messagesLayoutMinHeight,
  height: `clamp(${messagesLayoutMinHeight}px, calc(100dvh - ${messagesLayoutViewportReserve}px), ${messagesLayoutMaxHeight}px)`,
  maxHeight: `clamp(${messagesLayoutMinHeight}px, calc(100dvh - ${messagesLayoutViewportReserve}px), ${messagesLayoutMaxHeight}px)`,
  minWidth: 0,
  overflow: 'hidden',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 420,
  },
}));

export const MessagesListColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
  minHeight: 0,

  [theme.breakpoints.down('md')]: {
    flex: '0 1 45%',
    maxHeight: '45%',
  },

  [theme.breakpoints.up('md')]: {
    flex: '0 0 34%',
    width: '34%',
    maxWidth: 380,
    flexShrink: 0,
  },
}));

/** Scrolls thread previews; keep “New thread” button fixed above. */
export const MessagesListScrollArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
  paddingRight: theme.spacing(0.5),
}));

export const MessagesDetailColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflow: 'hidden',
}));

export const MessageListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  ...glassEffects.light,
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  border:
    selected === true
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.border.main}`,
  transition: theme.transitions.create(['border-color', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    borderColor: theme.palette.primary.light,
  },
}));

export const MessageThreadRoot = styled(Box)(({ theme }) => ({
  ...glassEffects.medium,
  padding: theme.spacing(2),
  minWidth: 0,
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));
