/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
/** biome-ignore-all lint/style/useTemplate: <lint> */

'use client';
import { Box, Container, styled, Typography } from '@mui/material';
import { glassEffects, glowAnimation } from '@/theme';

// Hero Section
export const HeroSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(10, 4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 4),
  },
}));

export const HeroContainer = styled(Container)(() => ({
  maxWidth: '1152px', // max-w-6xl
  margin: '0 auto',
  display: 'flex',
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(8),
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.25rem', // text-4xl
  fontWeight: 700,
  lineHeight: 1.2,
  textWrap: 'balance',
  [theme.breakpoints.up('md')]: {
    fontSize: '3.75rem', // text-6xl
  },
}));

export const HeroTitleSpan = styled('span')(({ theme }) => ({
  display: 'block',
  color: theme.palette.primary.main,
  marginTop: theme.spacing(2),
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem', // text-lg
  color: theme.palette.text.secondary,
  textWrap: 'balance',
  lineHeight: 1.75,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem', // text-xl
  },
}));

export const HeroActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  paddingTop: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

export const HeroFeatures = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(6),
  paddingTop: theme.spacing(4),
  fontSize: '0.875rem', // text-sm
  color: theme.palette.text.secondary,
}));

export const HeroFeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const HeroImageContainer = styled(Box)(() => ({
  position: 'relative',
}));

export const HeroImageCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(3), // rounded-xl
  overflow: 'hidden',
  ...glassEffects.strong,
  ...glowAnimation,
}));

export const HeroImage = styled('img')({
  width: '100%',
  height: 'auto',
});

export const HeroStatCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  ...glassEffects.light,
  borderRadius: theme.spacing(2.5), // rounded-lg
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const HeroStatCardBottom = styled(HeroStatCard)(({ theme }) => ({
  bottom: `-${theme.spacing(4)}`,
  left: `-${theme.spacing(4)}`,
}));

export const HeroStatCardTop = styled(HeroStatCard)(({ theme }) => ({
  top: `-${theme.spacing(4)}`,
  right: `-${theme.spacing(4)}`,
}));

export const HeroStatValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem', // text-2xl
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const HeroStatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem', // text-xs
  color: theme.palette.text.secondary,
}));

// Why Section
export const WhySection = styled('section')(({ theme }) => ({
  padding: theme.spacing(10, 4),
}));

export const WhyContainer = styled(Container)({
  maxWidth: '1280px', // max-w-5xl
  margin: '0 auto',
});

export const WhyHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(12),
}));

export const WhyTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.875rem', // text-3xl
  fontWeight: 700,
  textWrap: 'balance',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem', // text-5xl
  },
}));

export const WhyTitleSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ModulesTitleSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const PricingTitleSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const WhyGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

export const WhyCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  ...glassEffects.strong,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const WhyCardIcon = styled(Box)(({ theme }) => ({
  height: theme.spacing(6),
  width: theme.spacing(6),
  borderRadius: theme.spacing(2.5), // rounded-lg
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main + '1A', // 10% opacity
}));

export const WhyCardIconSecondary = styled(WhyCardIcon)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main + '1A', // 10% opacity
}));

export const WhyCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem', // text-lg
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const WhyCardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem', // text-sm
  color: theme.palette.text.secondary,
  lineHeight: 1.75,
}));

// Modules Section
export const ModulesSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(20, 4),
}));

export const ModulesHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(16),
}));

export const ModulesTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.875rem', // text-3xl
  fontWeight: 700,
  textWrap: 'balance',
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem', // text-5xl
  },
}));

export const ModulesDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem', // text-lg
  maxWidth: '672px', // max-w-2xl
  margin: '0 auto',
  textWrap: 'balance',
  lineHeight: 1.75,
}));

export const ModulesGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  margin: '0 auto',
  alignItems: 'stretch',
}));

export const ModuleCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8),
  ...glassEffects.strong,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  transition: 'border-color 0.2s',
  width: '100%',
  height: '100%',
  minWidth: 0,
  '&:hover': {
    borderColor: `${theme.palette.primary.main}80`, // 50% opacity
  },
}));

export const ModuleCardSecondary = styled(ModuleCard)(({ theme }) => ({
  '&:hover': {
    borderColor: `${theme.palette.secondary.main}80`, // 50% opacity
  },
}));

export const ModuleCardIcon = styled(Box)(({ theme }) => ({
  height: theme.spacing(8),
  width: theme.spacing(8),
  borderRadius: theme.spacing(3.5), // rounded-xl
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main + '1A', // 10% opacity
}));

export const ModuleCardIconSecondary = styled(ModuleCardIcon)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main + '1A', // 10% opacity
}));

export const ModuleCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem', // text-2xl
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ModuleCardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.75,
}));

export const ModuleCardFeature = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  fontSize: '0.875rem', // text-sm
  color: theme.palette.text.secondary,
}));

// Pricing Section
export const PricingSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(10, 4),
}));

export const PricingHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(16),
}));

export const PricingTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.875rem', // text-3xl
  fontWeight: 700,
  textWrap: 'balance',
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem', // text-5xl
  },
}));

export const PricingDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem', // text-lg
  maxWidth: '672px', // max-w-2xl
  margin: '0 auto',
  textWrap: 'balance',
  lineHeight: 1.75,
}));

export const PricingGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  margin: '0 auto',
}));

export const PricingCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8),
  ...glassEffects.strong,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
}));

export const PricingCardFeatured = styled(PricingCard)(({ theme }) => ({
  borderColor: `${theme.palette.primary.main}80`, // 50% opacity
  position: 'relative',
}));

export const PricingCardBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-1.5),
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(0.5, 2),
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
}));

export const PricingCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const PricingCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem', // text-2xl
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const PricingCardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem', // text-sm
}));

export const PricingCardPrice = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const PricingCardPriceAmount = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing(1),
}));

export const PricingCardPriceValue = styled(Typography)(({ theme }) => ({
  fontSize: '3rem', // text-5xl
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const PricingCardPriceCurrency = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem', // text-lg
  color: theme.palette.text.secondary,
}));

export const PricingCardPricePeriod = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem', // text-sm
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

export const PricingCardPriceSavings = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem', // text-xs
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(1),
}));

export const PricingCardFeatures = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const PricingCardFeature = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  fontSize: '0.875rem', // text-sm
}));

// Legacy exports (keeping for backward compatibility)
export const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'center',
  height: '100vh',
  padding: theme.spacing(2, 4),
  margin: theme.spacing(0, 'auto'),
  ...glassEffects.light,
  width: '100%',
}));

export const MainTitle = styled(Typography)(() => ({
  textAlign: 'center',
}));

export const MainDescription = styled('p')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  textAlign: 'center',
}));
