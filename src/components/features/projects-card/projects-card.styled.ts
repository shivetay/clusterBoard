/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, CardContent, styled, Typography } from '@mui/material';

export const CardContainer = styled(Card)(({ theme }) => ({
  background: theme.palette.background.bgSecondaryTransparent,
  backdropFilter: 'blur(7px)',
  WebkitBackdropFilter: 'blur(7px)',
  color: theme.palette.text.secondary,
}));

export const ProjectCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

export const ProjectTitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.75),
}));

export const ProjectInfoContainer = styled(Box)(() => ({
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
}));

export const ProjectInvestors = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  fontSize: theme.spacing(2),
  fontWeight: 600,
  '& span': {
    marginRight: theme.spacing(1),
  },
}));
