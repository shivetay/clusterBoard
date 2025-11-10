/** biome-ignore-all lint/style/noMagicNumbers: <tyling> */
'use client';
import { Box, Stack, styled } from '@mui/material';
import { CustomButton } from '@/components';

export const ProjectInfoContainer = styled(Stack)<{ cardColor: string }>(
  ({ theme, cardColor }) => ({
    width: '100%',
    padding: theme.spacing(3.75, 2),
    position: 'relative',
    borderRadius: '2.25rem',
    backdropFilter: 'blur(7px)',
    WebkitBackdropFilter: 'blur(7px)',
    background: `linear-gradient(
      135deg,
      ${cardColor}5c 5%,
      rgba(35, 34, 40, 0.35) 100%
    )`,
  }),
);

export const ProjectInvestorContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const ProjectStageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const ProjectAddStageButton = styled(CustomButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ProjectStepperContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  width: 'min-content',
  minWidth: theme.spacing(40),
}));
