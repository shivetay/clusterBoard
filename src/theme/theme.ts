'use client';
import { createTheme } from '@mui/material';

// Design system colors based on Figma Design Guide
const colors = {
  // Primary colors
  primary: '#F2B437', // Golden yellow - primary buttons, links, key actions
  primaryForeground: '#16161A', // Text on primary-colored backgrounds

  // Secondary colors
  secondary: '#0FA3B1', // Teal - secondary actions, accents
  secondaryForeground: '#16161A', // Text on secondary-colored backgrounds

  // Background colors
  backgroundBase: '#25252E', // Main app background
  backgroundCard: '#2C2C36B3', // Card backgrounds (70% opacity)
  backgroundPopover: '#2A2A34', // Dropdown menus, popovers
  backgroundMuted: '#303039', // Hover states, secondary backgrounds
  backgroundInput: '#2C2C3699', // Input field backgrounds (60% opacity)

  // Text colors
  foreground: '#F2F2F0', // Primary text
  foregroundMuted: '#8A8A98', // Secondary text, labels

  // Border colors
  border: '#3E3E4A66', // Card borders, dividers (40% opacity)
  borderInput: '#3E3E4A66', // Input field borders (40% opacity)

  // Chart colors
  chart1: '#F2B437', // Golden yellow
  chart2: '#0FA3B1', // Teal
  chart3: '#C2D94D', // Lime
  chart4: '#4DA7B3', // Blue-teal
  chart5: '#F5D993', // Light yellow

  // Status colors
  error: '#FF453A',
  warning: '#F2B437',
};

// Spacing scale (in pixels)
const spacing = {
  xs: 4, // Tight spacing, badges
  sm: 8, // Default gap between related elements
  md: 12, // Small section padding
  lg: 16, // Standard padding (cards, buttons)
  xl: 24, // Medium section spacing
  '2xl': 32, // Large section gaps
  '3xl': 48, // Major section divisions
  '4xl': 64, // Page-level spacing
};

// Border radius scale (in pixels)
const borderRadius = {
  sm: 2, // Subtle rounding
  md: 4, // Input fields, small cards
  lg: 6, // Standard cards, buttons
  xl: 10, // Large cards, modals
  '2xl': 12, // Project cards
};

// Glassmorphism effects (backdrop blur + styling)
// Usage in styled components:
//   - Light glass (cards): import { glassEffects } from '@/theme'; then use ...glassEffects.light
//   - Medium glass: ...glassEffects.medium
//   - Strong glass (dialogs): ...glassEffects.strong
//   - Overlay glass (backdrops): ...glassEffects.overlay
// Or use MUI Paper with elevation prop:
//   - <Paper> = light glass (blur 12px)
//   - <Paper elevation={1}> = medium glass (blur 16px)
//   - <Paper elevation={2}> = strong glass (blur 24px + saturate)
const glassEffects = {
  light: {
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    backgroundColor: colors.backgroundCard, // 70% opacity already
    border: `1px solid ${colors.border}`,
  },
  medium: {
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    backgroundColor: colors.backgroundCard,
    border: `1px solid ${colors.border}`,
  },
  strong: {
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    backgroundColor: colors.backgroundCard,
    border: `1px solid ${colors.primary}33`, // 20% opacity
  },
  overlay: {
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

// Border glow animation styles
// Usage: Add className="MuiCard-animated" to Card component for glow effect
// Or import { glowAnimation } from '@/theme' and spread in styled components
const glowAnimation = {
  animation: 'borderGlow 3000ms ease-in-out infinite',
  borderColor: `${colors.primary}66`,
  boxShadow: `0 0 12px ${colors.primary}40`,
};

// Background glow animation styles
// Usage: Add className="background-glow" or import { backgroundGlowAnimation } from '@/theme'
const backgroundGlowAnimation = {
  animation: 'backgroundGlow 3000ms ease-in-out infinite',
  backgroundColor: colors.backgroundCard,
};

export const mainTheme = createTheme({
  spacing: (factor: number) => `${spacing.sm * factor}px`,
  shape: {
    borderRadius: borderRadius.lg,
  },
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.primaryForeground,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.secondaryForeground,
    },
    border: {
      main: colors.border,
      secondary: colors.borderInput,
    },
    background: {
      default: colors.backgroundBase,
      paper: colors.backgroundCard,
      transparent: colors.backgroundCard,
      bgSecondary: colors.backgroundPopover,
      gradientText: colors.primary,
      gradientTextSecondary: colors.secondary,
      primaryTransparent: `${colors.primary}1A`,
      bgLight: colors.backgroundMuted,
      bgLightTransparent: colors.backgroundMuted,
    },
    text: {
      primary: colors.foreground,
      secondary: colors.primary,
      dark: colors.primaryForeground,
      tertiary: colors.foregroundMuted,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
    // Headings
    h1: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '3rem', // 48px
      fontWeight: 600,
      lineHeight: 1.167, // 56px
      letterSpacing: '-0.02em',
      color: colors.foreground,
    },
    h2: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '2.25rem', // 36px
      fontWeight: 600,
      lineHeight: 1.222, // 44px
      letterSpacing: '-0.01em',
      color: colors.foreground,
    },
    h3: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.333, // 32px
      letterSpacing: 0,
      color: colors.foreground,
    },
    h4: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.556, // 28px
      letterSpacing: 0,
      color: colors.foreground,
    },
    h5: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 0,
      color: colors.foreground,
    },
    h6: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.429, // 20px
      letterSpacing: 0,
      color: colors.foreground,
    },
    // Body text
    body1: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5, // 24px
      letterSpacing: 0,
      color: colors.foreground,
    },
    body2: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.429, // 20px
      letterSpacing: 0,
      color: colors.foreground,
    },
    // Button text
    button: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.429,
      letterSpacing: 0,
      textTransform: 'none',
    },
    // Labels
    caption: {
      fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: 1.333, // 16px
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: '"Geist Mono", monospace',
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.429, // 20px
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px',
        },
        a: {
          textDecoration: 'none',
          color: colors.primary,
        },
        '@keyframes borderGlow': {
          '0%, 100%': {
            borderColor: `${colors.primary}66`, // 40% opacity
            boxShadow: `0 0 12px ${colors.primary}40`, // 25% opacity
          },
          '50%': {
            borderColor: `${colors.secondary}80`, // 50% opacity
            boxShadow: `0 0 20px ${colors.secondary}59`, // 35% opacity
          },
        },
        '@keyframes backgroundGlow': {
          '0%, 100%': {
            backgroundColor: `${colors.primary}1A`, // Primary at 10% opacity
            boxShadow: `inset 0 0 20px ${colors.primary}26`, // Inner glow 15%
          },
          '50%': {
            backgroundColor: `${colors.secondary}1A`, // Secondary at 10% opacity
            boxShadow: `inset 0 0 30px ${colors.secondary}33`, // Inner glow 20%
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
          fontSize: '0.875rem', // 14px
          fontWeight: 500,
          textTransform: 'none',
          padding: `${spacing.sm}px ${spacing.lg}px`, // 8px 16px
          minHeight: '36px', // h-9
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        sizeSmall: {
          padding: `6px ${spacing.md}px`, // 6px 12px
          minHeight: '32px', // h-8
        },
        sizeLarge: {
          padding: `${spacing.sm}px ${spacing.xl}px`, // 8px 24px
          minHeight: '40px', // h-10
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: colors.primaryForeground,
          '&:hover': {
            backgroundColor: colors.primary,
            opacity: 0.9,
          },
          '&:active': {
            opacity: 0.8,
          },
          '&:disabled': {
            opacity: 0.5,
          },
        },
        outlined: {
          borderColor: colors.border,
          color: colors.foreground,
          '&:hover': {
            backgroundColor: colors.backgroundMuted,
            borderColor: colors.border,
          },
        },
        text: {
          color: colors.foreground,
          '&:hover': {
            backgroundColor: colors.backgroundMuted,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius['2xl'], // 12px
          backgroundColor: colors.backgroundCard,
          backdropFilter: 'blur(12px)', // Light glass effect
          WebkitBackdropFilter: 'blur(12px)', // Safari support
          padding: spacing.xl, // 24px
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: `${colors.primary}33`, // 20% opacity on hover
          },
          // Animated variant with border glow
          '&.MuiCard-animated': {
            animation: 'borderGlow 3000ms ease-in-out infinite',
            borderColor: `${colors.primary}66`,
            boxShadow: `0 0 12px ${colors.primary}40`,
            '&:hover': {
              animationPlayState: 'paused',
            },
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: borderRadius['2xl'],
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        focusHighlight: {
          background: 'transparent',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.lg, // 6px
            backgroundColor: colors.backgroundInput,
            '& fieldset': {
              borderColor: colors.borderInput,
            },
            '&:hover fieldset': {
              borderColor: colors.borderInput,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              borderWidth: '1px',
            },
            '&.Mui-disabled': {
              opacity: 0.5,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '0.875rem', // 14px
            padding: `${spacing.sm}px ${spacing.md}px`, // 8px 12px
            color: colors.foreground,
            '&::placeholder': {
              color: colors.foregroundMuted,
              opacity: 1,
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // 14px
          fontFamily: '"Geist Sans", "Poppins", Arial, Helvetica, sans-serif',
          minHeight: '36px', // h-9
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius['2xl'], // 12px
          border: `1px solid ${colors.primary}33`, // 20% opacity
          backgroundColor: colors.backgroundCard,
          backdropFilter: 'blur(24px) saturate(180%)', // Strong glass effect
          WebkitBackdropFilter: 'blur(24px) saturate(180%)', // Safari support
          padding: spacing.xl, // 24px
          maxWidth: '500px',
          boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(4px)', // Overlay glass effect
          WebkitBackdropFilter: 'blur(4px)', // Safari support
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundCard,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.lg,
        },
        elevation1: {
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        elevation2: {
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${colors.primary}33`,
          boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem', // 18px
          fontWeight: 600,
          lineHeight: 1.556, // 28px
          marginBottom: spacing.sm, // 8px
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
          marginTop: spacing.sm,
          marginBottom: spacing.xl,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 0,
          marginTop: spacing.xl, // 24px
          gap: spacing.md, // 12px
          justifyContent: 'flex-end',
        },
      },
    },
  },
});

// Export glass effects and animations for use in styled components
export {
  glassEffects,
  glowAnimation,
  backgroundGlowAnimation,
  spacing,
  borderRadius,
};

export default mainTheme;
