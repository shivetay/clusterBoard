/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';
import { CustomButton } from '@/components';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
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
  fontSize: theme.spacing(1.75),
  padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
  lineHeight: 2,
  borderRadius: '10px',
  border: `1px solid ${theme.palette.border.main}`,
  backdropFilter: 'blur(12px)',
  color: theme.palette.background.gradientText,
  backgroundColor: theme.palette.background.default,
}));

export const ProjectAddButton = styled(CustomButton)(({ theme }) => ({
  '& svg': {
    transition: 'all 0.3s ease-in-out',
    color: theme.palette.background.gradientText,
    width: theme.spacing(4),
    height: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
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
