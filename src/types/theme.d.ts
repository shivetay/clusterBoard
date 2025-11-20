// Global type declarations for MUI theme extensions
declare module '@mui/material/styles' {
  interface TypeBackground {
    default?: string;
    transparent?: string;
    buttonBg?: string;
    bgSecondary?: string;
    bgSecondaryTransparent?: string;
  }

  interface PaletteOptions {
    border?: {
      main: string;
    };
    background?: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
      bgSecondary?: string;
      bgSecondaryTransparent?: string;
    };
  }

  interface Palette {
    border: {
      main: string;
    };
    background: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
      bgSecondary?: string;
      bgSecondaryTransparent?: string;
    };
  }
}

export {};
