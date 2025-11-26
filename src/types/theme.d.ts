// Global type declarations for MUI theme extensions
declare module '@mui/material/styles' {
  interface TypeBackground {
    default?: string;
    transparent?: string;
    buttonBg?: string;
    bgSecondary?: string;
    bgSecondaryTransparent?: string;
    gradientText?: string;
    gradientTextSecondary?: string;
    primaryTransparent?: string;
  }

  interface TypeText {
    primary: string;
    secondary: string;
    dark: string;
    tertiary: string;
  }

  interface PaletteOptions {
    border?: {
      main?: string;
      secondary?: string;
    };
    background?: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
      bgSecondary?: string;
      bgSecondaryTransparent?: string;
      gradientText?: string;
      gradientTextSecondary?: string;
      primaryTransparent?: string;
    };
    text: {
      primary: string;
      secondary: string;
      dark: string;
      tertiary: string;
    };
  }

  interface Palette {
    border: {
      main: string;
      secondary: string;
    };
    background: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
      bgSecondary?: string;
      bgSecondaryTransparent?: string;
      gradientText?: string;
      gradientTextSecondary?: string;
      primaryTransparent?: string;
    };
    text: {
      primary: string;
      secondary: string;
      dark: string;
      tertiary: string;
    };
  }
}

export {};
