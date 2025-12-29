/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { glassEffects } from '@/theme';

export const ProjectCardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    scale: 1.03,
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(1.5),
  },
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  ...glassEffects.light,
  color: theme.palette.text.secondary,
}));

export const ProjectTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

export const ProjectTitle = styled(Typography)(() => ({
  marginTop: 0,
})) as typeof Typography;

export const ProjectInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
}));

export const ProjectInvestors = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: theme.spacing(0, 0, 1.5, 0),
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  letterSpacing: theme.typography.body1.letterSpacing,
  color: theme.palette.text.tertiary,
  gap: theme.spacing(2),

  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const ProjectDateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(1, 0, 1.5, 0),
  fontSize: theme.spacing(1.5),
  fontWeight: 400,
  color: theme.palette.text.tertiary,
  gap: theme.spacing(2),
  '& span': {
    marginRight: theme.spacing(1),
  },
}));

export const InvestorText = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
}));
