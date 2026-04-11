/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';

import { Box, styled } from '@mui/material';
import { glassEffects } from '@/theme';

export const MessagesSplitContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
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
  [theme.breakpoints.up('md')]: {
    width: '34%',
    maxWidth: 380,
    flexShrink: 0,
  },
}));

export const MessagesDetailColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
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

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));
