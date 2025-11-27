/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, styled, Typography } from '@mui/material';
import Link from 'next/link';

export const ProjectHex = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-4),
  right: theme.spacing(-4),
  width: theme.spacing(12),
  height: theme.spacing(12),

  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  backgroundColor: theme.palette.background.primaryTransparent,
}));

export const ProjectCardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    scale: 1.03,
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(1.5),
  },
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  background: theme.palette.background.transparent,
  backdropFilter: 'blur(12px)',
  color: theme.palette.text.secondary,

  border: `1px solid ${theme.palette.border.main}`,
}));

export const ProjectTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.5),
  fontWeight: 600,
  marginTop: 0,
  color: theme.palette.text.primary,
}));

export const ProjectInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
}));

export const ProjectInvestors = styled(Box)(({ theme }) => ({
  display: 'flex',

  margin: theme.spacing(1, 0, 1.5, 0),
  fontSize: theme.spacing(1.5),
  fontWeight: 400,
  color: theme.palette.text.tertiary,
  gap: theme.spacing(2),

  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const ProjectDateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1, 0, 1.5, 0),
  fontSize: theme.spacing(1.5),
  fontWeight: 400,
  color: theme.palette.text.tertiary,
  gap: theme.spacing(2),
  '& span': {
    marginRight: theme.spacing(1),
  },
}));
