/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, keyframes, styled, Typography } from '@mui/material';
import Link from 'next/link';

const borderGlow = keyframes`
  0%, 100% {
  
    border-color: #F2B437;
    box-shadow: 0 0 12px #f2b437;
  }
  50% {
    border-color: #0FA3B1;
    box-shadow: 0 0 20px #0FA3B1;
  }
`;

const borderGlowAnimation = () => {
  return {
    background: 'linear-gradient(to right, #FFD77F, #68B7FF, #68B7FF)',
    border: '1px solid',
    transition: 'all 0.3s ease-in-out',

    animation: `${borderGlow} 3s ease-in-out infinite`,
  };
};

export const GridCardContainer = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'extended' && prop !== 'span',
})<{ extended?: boolean; span?: number }>(({ extended, span, theme }) => ({
  gridColumn: extended ? `span ${span} / span ${span}` : 'span 1 / span 1',
  borderRadius: '16px',

  ...(extended ? borderGlowAnimation() : {}),

  [theme.breakpoints.down('md')]: {
    gridColumn: 'span 1 / span 1',
  },
}));

export const CardWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.transparent,
  border: `1px solid ${theme.palette.border.secondary}`,
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
  height: '100%',
  '&:hover': {
    scale: 1.02,
    '& svg': {
      color: theme.palette.background.gradientText,
    },
  },

  [theme.breakpoints.down('sm')]: {
    // width: '400px',
  },
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  background: theme.palette.background.transparent,
  borderRadius: '16px',
  height: '100%',
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
  fontSize: theme.spacing(2.5),
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: theme.spacing(1.75),
  marginBottom: theme.spacing(0.5),
  marginTop: 0,

  [theme.breakpoints.down('sm')]: {
    // fontSize: theme.spacing(2.5),
  },
}));

export const CountHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    // fontSize: theme.spacing(2.5),
  },
}));
export const CountHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.75),
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    // fontSize: theme.spacing(2.5),
  },
}));

export const CountHeaderCount = styled('span')(({ theme }) => ({
  fontSize: theme.spacing(4.5),
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    // fontSize: theme.spacing(2.5),
  },
}));

export const CardHelperText = styled('span')(({ theme }) => ({
  fontSize: theme.spacing(1.5),
  color: theme.palette.text.tertiary,
}));

export const SpannedCardDescriptionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.75),
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: theme.spacing(1.75),
  marginLeft: theme.spacing(2),
}));

export const SpannedCountHeader = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(to right, ${theme.palette.background.gradientText}, ${theme.palette.background.gradientTextSecondary})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: theme.spacing(6),
  fontWeight: 700,
  lineHeight: 1,
}));

export const SpannedMaxCountHeaderCount = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(4.5),
  fontWeight: 400,
  color: theme.palette.text.tertiary,
  margin: theme.spacing(0, 1),
  display: 'inline',
  [theme.breakpoints.down('sm')]: {
    // fontSize: theme.spacing(2.5),
  },
}));
