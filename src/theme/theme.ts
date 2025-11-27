'use client';
import { createTheme } from '@mui/material';

// Define custom colors based on your globals.css
const colors = {
  primary: '#F2B437',
  secondary: '#0FA3B1',
  background: '#0F1113',
  backgroundSecondary: '#080c0e',
  backgroundTransparent: '#080c0e66',
  backgroundLight: '#1F2225',
  backgroundLightTransparent: '#1F222566',
  textTertiary: '#76828b',
  textMain: '#f3f2f5',
  textDark: '#020304',
  textAcent: '#F2B437',
  error: '#FF453A',
  errorSecondary: '#FF453A',
  borders: '#1b232866',
  bordersSecondary: '#252f3740',
  inputBorder: '#0e121699',
  warning: '#F2B437',
  primaryTransparent: '#F2B4371A',
};

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: colors.textMain,
    },
    border: {
      main: colors.borders,
      secondary: colors.bordersSecondary,
    },
    background: {
      default: colors.background,
      transparent: colors.backgroundTransparent,
      bgSecondary: colors.backgroundSecondary,
      //TODO fix this in txt
      gradientText: colors.primary,
      gradientTextSecondary: colors.secondary,
      primaryTransparent: colors.primaryTransparent,
      bgLight: colors.backgroundLight,
      bgLightTransparent: colors.backgroundLightTransparent,
    },
    text: {
      primary: colors.textMain,
      secondary: colors.textAcent,
      dark: colors.textDark,
      tertiary: colors.textTertiary,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
  },
  typography: {
    htmlFontSize: 16, // Set 1 rem = 16px
    fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
    h1: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '2.25rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h2: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h3: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h4: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h5: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h6: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '.75rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    body1: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      color: colors.textMain,
    },
    body2: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      color: colors.textMain,
    },
    button: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      textTransform: 'none', // Disable uppercase transformation
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px', // Ensure 1 rem = 16px
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
          textTransform: 'none',
          fontWeight: 400,
          transition:
            'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'transparent',
            boxShadow:
              '0 8px 16px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        focusHighlight: {
          background: 'transparent',
        },
      },
    },
  },
});

export default mainTheme;
