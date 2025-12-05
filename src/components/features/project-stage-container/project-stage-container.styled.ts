/** biome-ignore-all lint/style/noMagicNumbers: <styled> */
'use client';
import { Box, Divider, styled, Typography } from '@mui/material';
import { CustomButton } from '@/components/ui';
import { glassEffects } from '@/theme';

export const ProjectStageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const ProjectStageListContainer = styled(Box)(({ theme }) => ({
  ...glassEffects.medium,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

export const ProjectStageHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',

  maxHeight: '22px',
  gap: theme.spacing(1),
}));

export const StageButton = styled(CustomButton)(({ theme }) => ({
  padding: 0,
  margin: 0,

  maxHeight: '22px !important',
  height: '22px !important',
  minHeight: '22px !important',
  backgroundColor: theme.palette.background.gradientText,
  color: theme.palette.text.dark,
  fontSize: theme.typography.body2.fontSize,

  '&:hover': {
    backgroundColor: theme.palette.background.gradientText,
    color: theme.palette.text.dark,
  },
}));

export const StageDivider = styled(Divider)(({ theme }) => {
  const primaryColor = theme.palette.text.secondary;
  const faded = theme.palette.background.primaryTransparent;
  return {
    width: '90%',
    backgroundImage: `linear-gradient(to right, ${primaryColor}, ${faded})`,
    borderColor: primaryColor,
    height: '1px',
    border: 'none',
  };
});

export const StageDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.tertiary,

  fontSize: theme.typography.body2.fontSize,
}));
