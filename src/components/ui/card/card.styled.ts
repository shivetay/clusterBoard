/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, CardActionArea, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { glassEffects, glowAnimation } from '@/theme';

export const GridCardContainer = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'extended' && prop !== 'span',
})<{ extended?: boolean; span?: number }>(({ extended, span, theme }) => ({
  gridColumn: extended ? `span ${span} / span ${span}` : 'span 1 / span 1',
  borderRadius: '2px',

  ...(extended ? glowAnimation : {}),

  [theme.breakpoints.down('md')]: {
    gridColumn: 'span 1 / span 1',
  },
}));

export const CardWrapper = styled(CardActionArea)(({ theme }) => ({
  ...glassEffects.light,
  borderRadius: '2px',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  '&:hover': {
    scale: 1.02,
    '& svg': {
      color: theme.palette.background.gradientText,
    },
  },
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  background: theme.palette.background.transparent,
  borderRadius: '2px',
  height: '100%',
  '& .MuiCardContent-root:last-child': {
    paddingBottom: 0,
  },
}));

export const CardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'iconColor',
})<{ iconColor?: string }>(({ theme, iconColor }) => ({
  marginBottom: theme.spacing(2),
  color: iconColor,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {},
}));

export const MainIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  '& svg': {
    width: theme.spacing(5),
    height: theme.spacing(5),
    transition: 'all 0.3s ease-in-out',
    color: theme.palette.background.gradientTextSecondary,
  },

  '&:hover': {
    color: theme.palette.background.gradientText,
  },
}));

export const IconContainer = styled('svg')(({ theme }) => ({
  width: theme.spacing(2.5),
  height: theme.spacing(2.5),
  color: theme.palette.text.tertiary,
}));

export const DescriptionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  marginTop: 0,
}));

export const CountHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: theme.spacing(1),
}));
export const CountHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  color: theme.palette.text.secondary,
  lineHeight: theme.typography.h3.lineHeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  margin: 0,
}));

export const CountHeaderCount = styled('span')(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  color: theme.palette.text.secondary,
  lineHeight: theme.typography.h2.lineHeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  margin: 0,
}));

export const CardHelperText = styled('span')(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.caption.fontWeight,
  color: theme.palette.text.tertiary,
  lineHeight: theme.typography.caption.lineHeight,
  letterSpacing: theme.typography.caption.letterSpacing,
}));

export const SpannedCardDescriptionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  color: theme.palette.text.primary,
  lineHeight: theme.typography.h3.lineHeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  margin: theme.spacing(1, 2, 1, 3),
}));

export const SpannedCountHeader = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(to right, ${theme.palette.background.gradientText}, ${theme.palette.background.gradientTextSecondary})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  lineHeight: theme.typography.h1.lineHeight,
  letterSpacing: theme.typography.h1.letterSpacing,
}));

export const SpannedMaxCountHeaderCount = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: 400,
  color: theme.palette.text.tertiary,
  lineHeight: theme.typography.h2.lineHeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  margin: theme.spacing(0, 1),
  display: 'inline',
}));
