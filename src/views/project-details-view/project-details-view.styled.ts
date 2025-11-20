/** biome-ignore-all lint/style/noMagicNumbers: <tyling> */
'use client';
import { Box, Stack, styled, Typography } from '@mui/material';
import { CustomButton } from '@/components';

export const ProjectInfoContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3.75, 2),
  borderRadius: '10px',
  background: `linear-gradient(150deg, ${theme.palette.background.bgSecondary} 15%, ${theme.palette.background.transparent} 65%, ${theme.palette.background.default} 85%)`,

  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '400px',
    background: `linear-gradient(150deg, ${theme.palette.background.bgSecondary} 25%, ${theme.palette.background.transparent} 85%, ${theme.palette.background.default} 100%)`,
  },
}));

export const ProjectInvestorContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const Header = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2),
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
