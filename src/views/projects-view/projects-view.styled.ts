/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';
import { CustomButton } from '@/components';
import { glassEffects } from '@/theme';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0, 0, 1),
  },
}));

export const ActionContainerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

export const ProjectsCount = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
  lineHeight: 2,
  borderRadius: '12px',
  ...glassEffects.light,
  color: theme.palette.background.gradientText,
  backgroundColor: theme.palette.background.default,
}));

export const ProjectAddButton = styled(CustomButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    paddingRight: 0,
  },

  '& svg': {
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    color: theme.palette.background.gradientText,
    width: theme.spacing(4),
    height: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: 0,
      paddingRight: 0,
    },
  },
  '&:hover': {
    scale: 1.02,

    '& svg': {
      rotate: '45deg',
    },
  },
}));

export const ProjectsContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,minmax(0, 1fr))',
  gap: theme.spacing(3),
  paddingRight: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: theme.spacing(1),
    padding: 0,
  },
}));
