/** biome-ignore-all lint/style/noMagicNumbers: <tyling> */
'use client';
import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import { CustomButton } from '@/components/ui';
import { glassEffects } from '@/theme';

export const ProjectInfoContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  ...glassEffects.medium,
  // [theme.breakpoints.down('sm')]: {
  //   margin: '0 auto',
  //   width: '400px',
  // },
}));

export const ProjectHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

export const Header = styled(Typography)(({ theme }) => ({
  // color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2),
  },
}));

export const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.tertiary,
  marginBottom: theme.spacing(4),
}));

export const SectionDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.border.main,
}));

export const ProjectInvestorContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 6,
  paddingTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const Label = styled('p')(({ theme }) => ({
  color: theme.palette.text.tertiary,
  margin: 0,
  fontSize: theme.typography.body2.fontSize,
}));

export const ProjectsActionsContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

export const ProjectAddStageButton = styled(CustomButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: 0,
}));
